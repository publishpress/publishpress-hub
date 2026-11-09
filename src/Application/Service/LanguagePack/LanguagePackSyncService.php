<?php

/**
 * Downloads current language packs into the PublishPress uploads directory.
 *
 * Plugins register a text domain and repository. Deactivating Hub stops new
 * downloads and leaves files already stored there in place.
 *
 * @package PublishPress\Hub\Application\Service\LanguagePack
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\LanguagePack;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use WP_Error;
use ZipArchive;

class LanguagePackSyncService implements BootableInterface
{
    use BootableTrait;

    public const STATUS_OPTION = 'publishpress_hub_language_pack_status';

    public const CHECK_HOOK = 'publishpress_hub_check_language_pack';

    private const CHECKED_TRANSIENT = 'publishpress_hub_language_pack_checked';

    /**
     * @return void
     */
    protected function onLoad(): void
    {
        add_action('admin_init', [$this, 'checkFromAdmin']);
        add_action(self::CHECK_HOOK, [$this, 'sync']);
        register_deactivation_hook(PUBLISHPRESS_HUB_PLUGIN_FILE, [self::class, 'deactivate']);
    }

    /**
     * @return void
     */
    protected function onInit(): void
    {
        if (wp_next_scheduled(self::CHECK_HOOK)) {
            return;
        }

        wp_schedule_event(time() + HOUR_IN_SECONDS, 'daily', self::CHECK_HOOK);
    }

    /**
     * Stop scheduling new downloads. Packs already on disk stay where they are.
     *
     * @return void
     */
    public static function deactivate(): void
    {
        wp_clear_scheduled_hook(self::CHECK_HOOK);
    }

    /**
     * @return void
     */
    public function checkFromAdmin(): void
    {
        if (!current_user_can(HubAccessService::CAPABILITY)) {
            return;
        }

        global $plugin_page;

        $page = is_string($plugin_page) ? $plugin_page : '';
        $onHubScreen = in_array($page, ['publishpress-hub', 'publishpress-hub-plugins-dashboard'], true);
        if (!$onHubScreen && get_transient(self::CHECKED_TRANSIENT)) {
            return;
        }

        $this->sync();
        set_transient(self::CHECKED_TRANSIENT, '1', HOUR_IN_SECONDS);
    }

    /**
     * @return void
     */
    public function sync(): void
    {
        $locale = determine_locale();
        if (!LanguagePackPolicy::isEligibleLocale($locale)) {
            $this->storeStatus(
                'idle',
                __('Site locale is English. No language pack is downloaded.', 'publishpress-hub')
            );
            return;
        }

        $packs = $this->packs();
        if ($packs === []) {
            $this->storeStatus(
                'idle',
                __('No language packs are registered.', 'publishpress-hub')
            );
            return;
        }

        $messages = [];
        $state = 'current';
        foreach ($packs as $pack) {
            $result = $this->syncDomain($pack['domain'], $pack['repository'], $pack['version'], $locale);
            $messages[] = $result['message'];
            if ($result['state'] === 'error') {
                $state = 'error';
            } elseif ($result['state'] === 'installed' && $state !== 'error') {
                $state = 'installed';
            }
        }

        $this->storeStatus($state, implode(' ', $messages));
    }

    /**
     * Plugins pass a text domain, or an array with domain and repository.
     *
     * The repository is the package-server and GitHub name. It does not have to
     * match the text domain.
     *
     * @return array<int, array{domain: string, repository: string, version: string}>
     */
    private function packs(): array
    {
        $registered = apply_filters('publishpress_hub_language_pack_domains', []);
        if (!is_array($registered)) {
            return [];
        }

        $packs = [];
        foreach ($registered as $entry) {
            if (!is_array($entry)) {
                continue;
            }

            $domain = isset($entry['domain']) ? (string) $entry['domain'] : '';
            $repository = isset($entry['repository']) ? (string) $entry['repository'] : $domain;
            $version = isset($entry['version']) ? (string) $entry['version'] : '';
            if (!$this->isSafeName($domain) || !$this->isSafeName($repository) || !LanguagePackPolicy::isPluginVersion($version)) {
                continue;
            }

            $packs[] = [
                'domain' => $domain,
                'repository' => $repository,
                'version' => $version,
            ];
        }

        return $packs;
    }

    private function isSafeName(string $value): bool
    {
        return preg_match('/^[A-Za-z0-9_-]+$/', $value) === 1;
    }

    /**
     * @return array{state: string, message: string}
     */
    private function syncDomain(string $domain, string $repository, string $version, string $locale): array
    {
        $filesystem = $this->filesystem();
        if ($filesystem === null) {
            return [
                'state' => 'error',
                'message' => __('Language pack directory is not available.', 'publishpress-hub'),
            ];
        }

        $directory = $this->packDirectory();
        if ($directory === '') {
            return [
                'state' => 'error',
                'message' => __('Language pack directory is not available.', 'publishpress-hub'),
            ];
        }

        $markerPath = $directory . '/' . $domain . '-' . $locale . '.release';
        $installed = '';
        if (is_readable($markerPath)) {
            $marker = $filesystem->get_contents($markerPath);
            $installed = is_string($marker) ? trim($marker) : '';
        }

        $moPath = $directory . '/' . LanguagePackPolicy::packFileName($domain, $locale, 'mo');
        $phpPath = $directory . '/' . LanguagePackPolicy::packFileName($domain, $locale, 'l10n.php');
        if (is_readable($moPath) && !LanguagePackPolicy::needsRelease($installed, $version)) {
            if (!is_readable($phpPath)) {
                $phpError = $this->ensurePhpCatalog($moPath, $directory, $domain, $locale);
                if ($phpError !== '') {
                    return [
                        'state' => 'error',
                        'message' => $phpError,
                    ];
                }
            }

            return [
                'state' => 'current',
                'message' => sprintf(
                    /* translators: 1: text domain, 2: locale, 3: plugin version */
                    __('Language pack for %1$s (%2$s) matches %3$s.', 'publishpress-hub'),
                    $domain,
                    $locale,
                    $version
                ),
            ];
        }

        $downloaded = $this->downloadAndInstall($domain, $repository, $version, $locale, $directory);
        if ($downloaded !== '') {
            return [
                'state' => 'error',
                'message' => $downloaded,
            ];
        }

        if (!$filesystem->put_contents($markerPath, $version, FS_CHMOD_FILE)) {
            return [
                'state' => 'error',
                'message' => __('Language pack could not be stored. The installed pack was left in place.', 'publishpress-hub'),
            ];
        }

        return [
            'state' => 'installed',
            'message' => sprintf(
                /* translators: 1: text domain, 2: locale, 3: plugin version */
                __('Language pack for %1$s (%2$s) installed for %3$s.', 'publishpress-hub'),
                $domain,
                $locale,
                $version
            ),
        ];
    }

    /**
     * @return string Error message, or an empty string when the pack was installed.
     */
    private function downloadAndInstall(string $domain, string $repository, string $version, string $locale, string $directory): string
    {
        $url = 'https://' . LanguagePackPolicy::PACKAGE_SERVER_HOST
            . '/v1/translations/' . rawurlencode($repository) . '/' . rawurlencode($version)
            . '/' . rawurlencode($domain) . '/' . rawurlencode($locale)
            . '/download';
        $url = apply_filters('publishpress_hub_language_pack_download_url', $url, $domain, $locale, $version);
        if (!is_string($url) || !$this->isAllowedDownloadUrl($url)) {
            return __('Language pack URL was rejected.', 'publishpress-hub');
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        $temporary = download_url($url);
        if ($temporary instanceof WP_Error) {
            return sprintf(
                /* translators: 1: text domain, 2: locale */
                __('Language pack download failed for %1$s (%2$s). The installed pack was left in place.', 'publishpress-hub'),
                $domain,
                $locale
            );
        }

        $error = $this->installZip($temporary, $domain, $locale, $directory);
        wp_delete_file($temporary);

        return $error;
    }

    /**
     * @return string Error message, or an empty string when the pack files were stored.
     */
    private function installZip(string $zipPath, string $domain, string $locale, string $directory): string
    {
        $filesystem = $this->filesystem();
        if ($filesystem === null) {
            return __('Language pack directory is not available.', 'publishpress-hub');
        }

        if (!class_exists(ZipArchive::class)) {
            return __('Language pack could not be unpacked.', 'publishpress-hub');
        }

        $zip = new ZipArchive();
        if ($zip->open($zipPath) !== true) {
            return __('Language pack could not be unpacked.', 'publishpress-hub');
        }

        $files = [];
        for ($index = 0; $index < $zip->numFiles; $index++) {
            $name = $zip->getNameIndex($index);
            if (!is_string($name) || !LanguagePackPolicy::isAllowedEntry($name, $domain, $locale)) {
                continue;
            }

            $contents = $zip->getFromIndex($index);
            if (!is_string($contents) || $contents === '') {
                $zip->close();
                return __('Language pack could not be unpacked.', 'publishpress-hub');
            }

            $files[$name] = $contents;
        }
        $zip->close();

        $poName = LanguagePackPolicy::packFileName($domain, $locale, 'po');
        $moName = LanguagePackPolicy::packFileName($domain, $locale, 'mo');
        $jsonName = LanguagePackPolicy::packFileName($domain, $locale, 'json');
        if (!isset($files[$poName], $files[$moName], $files[$jsonName])) {
            return __('Language pack is missing a catalog file. The installed pack was left in place.', 'publishpress-hub');
        }

        if (!wp_mkdir_p($directory)) {
            return __('Language pack directory is not available.', 'publishpress-hub');
        }

        $moTemp = $directory . '/' . $domain . '-' . $locale . '.incoming.mo';
        if (!$filesystem->put_contents($moTemp, $files[$moName], FS_CHMOD_FILE)) {
            wp_delete_file($moTemp);
            return __('Language pack could not be stored. The installed pack was left in place.', 'publishpress-hub');
        }

        if (!class_exists('\WP_Translation_File')) {
            wp_delete_file($moTemp);
            return __('Language pack PHP catalog could not be built. The installed pack was left in place.', 'publishpress-hub');
        }

        $php = \WP_Translation_File::transform($moTemp, 'php');
        if (!is_string($php) || strpos($php, '<?php') !== 0) {
            wp_delete_file($moTemp);
            return __('Language pack PHP catalog could not be built. The installed pack was left in place.', 'publishpress-hub');
        }

        $phpName = LanguagePackPolicy::packFileName($domain, $locale, 'l10n.php');
        $poTemp = $directory . '/' . $poName . '.new';
        $jsonTemp = $directory . '/' . $jsonName . '.new';
        $phpTemp = $directory . '/' . $phpName . '.new';
        if (
            !$filesystem->put_contents($poTemp, $files[$poName], FS_CHMOD_FILE)
            || !$filesystem->put_contents($jsonTemp, $files[$jsonName], FS_CHMOD_FILE)
            || !$filesystem->put_contents($phpTemp, $php, FS_CHMOD_FILE)
        ) {
            wp_delete_file($moTemp);
            wp_delete_file($poTemp);
            wp_delete_file($jsonTemp);
            wp_delete_file($phpTemp);
            return __('Language pack could not be stored. The installed pack was left in place.', 'publishpress-hub');
        }

        $renamed = $filesystem->move($moTemp, $directory . '/' . $moName, true)
            && $filesystem->move($poTemp, $directory . '/' . $poName, true)
            && $filesystem->move($jsonTemp, $directory . '/' . $jsonName, true)
            && $filesystem->move($phpTemp, $directory . '/' . $phpName, true);
        if (!$renamed) {
            wp_delete_file($moTemp);
            wp_delete_file($poTemp);
            wp_delete_file($jsonTemp);
            wp_delete_file($phpTemp);
            return __('Language pack could not be stored. The installed pack was left in place.', 'publishpress-hub');
        }

        return '';
    }

    /**
     * Build the PHP catalog WordPress loads before the .mo file.
     *
     * The zip never contains this file. It is generated from the installed .mo.
     *
     * @return string Error message, or an empty string when the catalog is in place.
     */
    private function ensurePhpCatalog(string $moPath, string $directory, string $domain, string $locale): string
    {
        $phpPath = $directory . '/' . LanguagePackPolicy::packFileName($domain, $locale, 'l10n.php');
        if (!is_readable($moPath) || !class_exists('\WP_Translation_File')) {
            return __('Language pack PHP catalog could not be built. The installed pack was left in place.', 'publishpress-hub');
        }

        $php = \WP_Translation_File::transform($moPath, 'php');
        if (!is_string($php) || strpos($php, '<?php') !== 0) {
            return __('Language pack PHP catalog could not be built. The installed pack was left in place.', 'publishpress-hub');
        }

        return $this->storePackFile($phpPath, $php);
    }

    /**
     * @return string Error message, or an empty string when the file was stored.
     */
    private function storePackFile(string $destination, string $contents): string
    {
        $filesystem = $this->filesystem();
        if ($filesystem === null) {
            return __('Language pack directory is not available.', 'publishpress-hub');
        }

        $temporary = $destination . '.new';
        if (!$filesystem->put_contents($temporary, $contents, FS_CHMOD_FILE)) {
            wp_delete_file($temporary);
            return __('Language pack could not be stored. The installed pack was left in place.', 'publishpress-hub');
        }

        if (!$filesystem->move($temporary, $destination, true)) {
            wp_delete_file($temporary);
            return __('Language pack could not be stored. The installed pack was left in place.', 'publishpress-hub');
        }

        return '';
    }

    /**
     * Initialize the native filesystem and its file permission constants.
     *
     * @since 1.2.0
     */
    private function filesystem(): ?\WP_Filesystem_Base
    {
        global $wp_filesystem;

        require_once ABSPATH . 'wp-admin/includes/file.php';
        if (empty($wp_filesystem) && !WP_Filesystem()) {
            return null;
        }

        return $wp_filesystem;
    }

    private function packDirectory(): string
    {
        $uploads = wp_upload_dir(null, false);
        if (!is_array($uploads) || !empty($uploads['error']) || empty($uploads['basedir'])) {
            return '';
        }

        return rtrim((string) $uploads['basedir'], '/\\') . '/' . LanguagePackPolicy::DIRECTORY;
    }

    private function isAllowedDownloadUrl(string $url): bool
    {
        $parts = wp_parse_url($url);
        if (!is_array($parts)) {
            return false;
        }

        $scheme = $parts['scheme'] ?? '';
        if ($scheme !== 'https' && $scheme !== 'http') {
            return false;
        }

        $host = $parts['host'] ?? '';
        $allowed = [
            LanguagePackPolicy::PACKAGE_SERVER_HOST,
            'publishpress.com',
            'wordpress.org',
            'downloads.wordpress.org',
        ];
        $home = wp_parse_url(home_url(), PHP_URL_HOST);
        if (is_string($home) && $home !== '') {
            $allowed[] = $home;
        }

        return in_array($host, $allowed, true);
    }

    private function storeStatus(string $state, string $message): void
    {
        update_option(self::STATUS_OPTION, [
            'state' => $state,
            'message' => $message,
        ], false);
    }
}
