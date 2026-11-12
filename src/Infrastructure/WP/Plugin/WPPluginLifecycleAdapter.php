<?php

/**
 * WordPress plugin lifecycle adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Plugin;

defined('ABSPATH') || exit;

use InvalidArgumentException;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;
use RuntimeException;

class WPPluginLifecycleAdapter
{
    private WPFileSystemAdapter $fileSystemAdapter;

    private array $allowedDownloadDomains;

    private PackageSignatureVerifier $packageSignatureVerifier;

    /**
     * @param WPFileSystemAdapter $fileSystemAdapter The file system adapter.
     * @since 1.0.0
     */
    public function __construct(
        WPFileSystemAdapter $fileSystemAdapter,
        array $allowedDownloadDomains,
        array $packageSignaturePublicKeys = PackageSignatureVerifier::PUBLIC_KEYS
    ) {
        $this->fileSystemAdapter = $fileSystemAdapter;
        $this->allowedDownloadDomains = $allowedDownloadDomains;
        $this->packageSignatureVerifier = new PackageSignatureVerifier(
            $packageSignaturePublicKeys
        );
    }

    /**
     * Install a plugin.
     *
     * @param string $slug The slug.
     * @param string $downloadUrl The download URL.
     * @return bool True if the plugin was installed, false otherwise.
     * @throws InvalidArgumentException When the download URL is invalid or from an untrusted domain.
     * @since 1.0.0
     */
    public function installPlugin(string $slug, string $downloadUrl): bool
    {
        $this->validateDownloadUrl($downloadUrl);

        // Additional validation using WordPress function if available
        if (function_exists('wp_http_validate_url')) {
            $validatedUrl = wp_http_validate_url($downloadUrl);
            if (!$validatedUrl) {
                throw new InvalidArgumentException(
                    esc_html__('Download URL failed WordPress validation', 'publishpress-hub')
                );
            }
            $downloadUrl = $validatedUrl;
        }

        if (!function_exists('download_url')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        $tmpFile = $this->downloadPackage($downloadUrl);

        // Validate the downloaded file is a valid ZIP archive
        if (!file_exists($tmpFile)) {
            throw new RuntimeException(
                esc_html__('Downloaded plugin file does not exist', 'publishpress-hub')
            );
        }

        $fileSize = filesize($tmpFile);
        if ($fileSize === false || $fileSize === 0) {
            wp_delete_file($tmpFile);
            throw new RuntimeException(
                esc_html__('Downloaded plugin file is empty', 'publishpress-hub')
            );
        }

        // Check ZIP file signature (magic bytes: PK\x03\x04)
        // WP_Filesystem reads whole files; a local stream keeps signature checks bounded to four bytes.
        $fileHandle = fopen($tmpFile, 'rb'); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen
        if ($fileHandle === false) {
            wp_delete_file($tmpFile);
            throw new RuntimeException(
                esc_html__('Cannot read downloaded plugin file', 'publishpress-hub')
            );
        }

        $magicBytes = fread($fileHandle, 4); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fread
        fclose($fileHandle); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose -- Required after inspecting ZIP magic bytes.

        if ($magicBytes !== "PK\x03\x04") {
            wp_delete_file($tmpFile);
            throw new RuntimeException(
                esc_html__('Downloaded file is not a valid ZIP archive. The download URL may be returning an error page.', 'publishpress-hub')
            );
        }

        // Delete the plugin folder if exists
        if ($this->fileSystemAdapter->exists(WP_PLUGIN_DIR . '/' . $slug)) {
            $this->fileSystemAdapter->delete(WP_PLUGIN_DIR . '/' . $slug, true);
        }

        $unzipResult = $this->fileSystemAdapter->unzip($tmpFile, WP_PLUGIN_DIR);
        $this->fileSystemAdapter->delete($tmpFile);

        if (is_wp_error($unzipResult)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to unzip plugin file: %s', 'publishpress-hub'),
                    esc_html($unzipResult->get_error_message())
                )
            );
        }

        if (!$unzipResult) {
            throw new RuntimeException(
                esc_html__('Failed to unzip plugin file', 'publishpress-hub')
            );
        }

        return true;
    }

    /**
     * Activate a plugin.
     *
     * @param string $pluginPath The plugin path.
     * @return bool True if the plugin was activated, false otherwise.
     * @since 1.0.0
     */
    public function activatePlugin(string $pluginPath): bool
    {
        $result = activate_plugin($pluginPath);

        if (is_wp_error($result)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to activate plugin: %s', 'publishpress-hub'),
                    esc_html($result->get_error_message())
                )
            );
        }

        return true;
    }

    /**
     * Deactivate a plugin.
     *
     * @param string $pluginPath The plugin path.
     * @return bool True if the plugin was deactivated, false otherwise.
     * @since 1.0.0
     */
    public function deactivatePlugin(string $pluginPath): bool
    {
        deactivate_plugins($pluginPath);
        return true;
    }

    /**
     * Switch editions without deleting either copy, restoring activation on failure.
     *
     * @since 1.1.0
     */
    public function switchActivePlugin(string $previousPath, string $selectedPath): void
    {
        if (is_plugin_active_for_network($previousPath) || is_plugin_active_for_network($selectedPath)) {
            throw new RuntimeException(esc_html__(
                'Resolve conflicts for network-active plugins from Network Admin.',
                'publishpress-hub'
            ));
        }

        $paths = [$previousPath, $selectedPath];
        $original = array_values(array_intersect((array) get_option('active_plugins', []), $paths));
        $complete = false;
        $restore = static function () use ($paths, $original, &$complete): void {
            if ($complete) {
                return;
            }
            // Restore only these editions; preserve unrelated activation changes.
            $active = array_values(array_diff((array) get_option('active_plugins', []), $paths));
            $active = array_values(array_unique(array_merge($active, $original)));
            sort($active);
            update_option('active_plugins', $active);
            $restored = array_values(array_intersect((array) get_option('active_plugins', []), $paths));
            if (array_diff($original, $restored) || array_diff($restored, $original)) {
                throw new RuntimeException(esc_html__(
                    'Activation recovery failed. Both plugin copies were retained. Please restore the previous version from the Plugins screen.',
                    'publishpress-hub'
                ));
            }
            $complete = true;
        };
        // Activation hooks may terminate PHP instead of throwing an exception.
        register_shutdown_function($restore);

        try {
            $this->deactivatePlugin($previousPath);
            if (is_plugin_active($previousPath)) {
                throw new RuntimeException(esc_html__('The other plugin could not be deactivated.', 'publishpress-hub'));
            }
            $this->activatePlugin($selectedPath);
            if (!is_plugin_active($selectedPath)) {
                throw new RuntimeException(esc_html__('The selected plugin did not remain active.', 'publishpress-hub'));
            }
            $complete = true;
        } catch (\Throwable $error) {
            $restore();
            throw new RuntimeException(
                esc_html__('The selected plugin could not be activated. Neither copy was deleted and the previous activation settings were restored.', 'publishpress-hub'),
                0,
                $error
            );
        }
    }

    /**
     * Check cleanup is occurring in a fresh request with the selected edition active.
     *
     * @since 1.1.0
     */
    public function canRemoveConflictingPlugin(string $previousPath, string $selectedPath): bool
    {
        $previousFile = realpath(WP_PLUGIN_DIR . '/' . $previousPath);
        return is_plugin_active($selectedPath)
            && !is_plugin_active($previousPath)
            && !in_array($previousFile, get_included_files(), true);
    }

    /**
     * Run the uninstallation process for a plugin executing the uninstall.php file
     * or registered uninstall hook.
     *
     * This function will run the uninstallation process for a plugin.
     * It will not delete the plugin from the filesystem.
     *
     * @param string $pluginPath The plugin path.
     * @return bool True if the uninstall.php file has been found and included, false otherwise.
     * @throws RuntimeException
     * @see https://developer.wordpress.org/reference/functions/uninstall_plugin/
     * @see https://developer.wordpress.org/reference/functions/register_uninstall_hook/
     */
    public function uninstallPlugin(string $pluginPath): bool
    {
        if (!function_exists('uninstall_plugin')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $result = uninstall_plugin($pluginPath);

        return $result === true;
    }

    /**
     * Delete a plugin from the filesystem.
     *
     * This function will delete a plugin from the filesystem.
     * It will not run the uninstallation process.
     *
     * @param string $pluginPath The plugin path.
     * @return bool True if the plugin has been deleted, false otherwise.
     * @throws RuntimeException
     * @see https://developer.wordpress.org/reference/functions/delete_plugins/
     */
    public function deletePlugin(string $pluginPath): bool
    {
        if (!function_exists('delete_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $result = delete_plugins([$pluginPath]);

        if (is_wp_error($result)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to delete plugin: %s', 'publishpress-hub'),
                    esc_html($result->get_error_message())
                )
            );
        }

        return $result === true;
    }

    /**
     * Update a plugin.
     *
     * This function will update a plugin using WordPress native Plugin_Upgrader.
     *
     * @param string $pluginPath The plugin path.
     * @param array<string, mixed>|null $updateInfo The update information.
     * @return bool True if the plugin was updated, false otherwise.
     * @throws RuntimeException
     * @since 1.0.0
     */
    public function updatePlugin(string $pluginPath, ?array $updateInfo = null): bool
    {
        if (!class_exists('Plugin_Upgrader')) {
            require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        }

        if (!function_exists('get_plugin_updates')) {
            require_once ABSPATH . 'wp-admin/includes/update.php';
        }

        // Ensure update information is available
        if (!function_exists('wp_update_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/update.php';
        }

        // Refresh update cache to ensure we have the latest update information
        // This is asynchronous, so we need to wait for it to complete
        $updateResult = wp_update_plugins();

        // If wp_update_plugins returns an error, we still try to proceed
        // as the update information might already be cached

        // Verify the plugin has an update available
        $updates = get_plugin_updates();
        if (empty($updates) || !isset($updates[$pluginPath])) {
            $this->primePluginUpdateTransient($pluginPath, $updateInfo);
            $updates = get_plugin_updates();

            if (empty($updates) || !isset($updates[$pluginPath])) {
                throw new RuntimeException(
                    esc_html__('No update available for this plugin', 'publishpress-hub')
                );
            }
        }

        // Ensure the update information is properly structured
        $updateInfo = $updates[$pluginPath];
        if (!is_object($updateInfo) || !isset($updateInfo->update)) {
            throw new RuntimeException(
                esc_html__('Invalid update information for this plugin', 'publishpress-hub')
            );
        }

        // Create a silent skin for the upgrader to avoid requiring admin functions
        $skin = new class extends \WP_Upgrader_Skin {
            public function feedback($string, ...$args)
            {
                // Silent - do nothing
            }

            public function header()
            {
                // Silent - do nothing
            }

            public function footer()
            {
                // Silent - do nothing
            }
        };

        $upgrader = new \Plugin_Upgrader($skin);

        $packageUrl = (string) ($updateInfo->update->package ?? '');
        if ($packageUrl === '') {
            throw new RuntimeException(esc_html__('Update package not available', 'publishpress-hub'));
        }

        $this->validateDownloadUrl($packageUrl);
        $verifiedPackage = $this->downloadPackage($packageUrl);
        $preDownload = static function ($reply, $package) use ($verifiedPackage, $packageUrl) {
            return $package === $packageUrl ? $verifiedPackage : $reply;
        };
        add_filter('upgrader_pre_download', $preDownload, 10, 2);

        try {
            $result = $upgrader->upgrade($pluginPath);
        } finally {
            remove_filter('upgrader_pre_download', $preDownload, 10);
            if (file_exists($verifiedPackage)) {
                wp_delete_file($verifiedPackage);
            }
        }

        if (is_wp_error($result)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to update plugin: %s', 'publishpress-hub'),
                    esc_html($result->get_error_message())
                )
            );
        }

        if ($result === false) {
            throw new RuntimeException(
                esc_html__('Plugin update failed', 'publishpress-hub')
            );
        }

        return true;
    }

    /**
     * Prime WordPress update transient using Hub-detected update information.
     *
     * @param string $pluginPath The plugin path.
     * @param array<string, mixed>|null $updateInfo The update information.
     * @throws RuntimeException
     * @since 1.0.0
     */
    private function primePluginUpdateTransient(string $pluginPath, ?array $updateInfo): void
    {
        if (empty($updateInfo)) {
            return;
        }

        $package = $this->getUpdatePackageUrl($updateInfo);
        $version = $this->getUpdateVersion($updateInfo);

        if (empty($package) || empty($version)) {
            return;
        }

        $this->validateDownloadUrl($package);

        $transient = get_site_transient('update_plugins');
        if (!is_object($transient)) {
            $transient = new \stdClass();
        }

        if (!isset($transient->response) || !is_array($transient->response)) {
            $transient->response = [];
        }

        $transient->response[$pluginPath] = $this->createUpdateTransientEntry($pluginPath, $version, $package);

        set_site_transient('update_plugins', $transient);
    }

    /**
     * Create a WordPress plugin update transient entry.
     *
     * @param string $pluginPath The plugin path.
     * @param string $version The available version.
     * @param string $package The update package URL.
     * @return \stdClass
     * @since 1.0.0
     */
    private function createUpdateTransientEntry(string $pluginPath, string $version, string $package): \stdClass
    {
        $slug = dirname($pluginPath);
        $entry = new \stdClass();
        $entry->id = $slug;
        $entry->slug = $slug;
        $entry->plugin = $pluginPath;
        $entry->new_version = $version;
        $entry->url = '';
        $entry->package = $package;
        $entry->icons = [];
        $entry->banners = [];
        $entry->banners_rtl = [];

        return $entry;
    }

    /**
     * Get the update package URL from update info.
     *
     * @param array<string, mixed> $updateInfo The update information.
     * @return string
     * @since 1.0.0
     */
    private function getUpdatePackageUrl(array $updateInfo): string
    {
        if (!empty($updateInfo['package']) && is_string($updateInfo['package'])) {
            return $updateInfo['package'];
        }

        if (!empty($updateInfo['download_link']) && is_string($updateInfo['download_link'])) {
            return $updateInfo['download_link'];
        }

        return '';
    }

    /**
     * Get the available version from update info.
     *
     * @param array<string, mixed> $updateInfo The update information.
     * @return string
     * @since 1.0.0
     */
    private function getUpdateVersion(array $updateInfo): string
    {
        foreach (['new_version', 'version', 'stable_version'] as $versionKey) {
            if (!empty($updateInfo[$versionKey]) && is_string($updateInfo[$versionKey])) {
                return $updateInfo[$versionKey];
            }
        }

        return '';
    }

    /**
     * Validate a download URL.
     *
     * @param string $downloadUrl The download URL.
     * @throws InvalidArgumentException When the download URL is invalid or from an untrusted domain.
     * @since 1.0.0
     */
    private function validateDownloadUrl(string $downloadUrl): void
    {
        if (!filter_var($downloadUrl, FILTER_VALIDATE_URL)) {
            throw new InvalidArgumentException(
                esc_html__('Invalid download URL provided', 'publishpress-hub')
            );
        }

        $urlParts = wp_parse_url($downloadUrl);
        if (!isset($urlParts['scheme']) || !in_array($urlParts['scheme'], ['http', 'https'], true)) {
            throw new InvalidArgumentException(
                esc_html__('Download URL must use HTTP or HTTPS protocol', 'publishpress-hub')
            );
        }

        $host = $urlParts['host'] ?? '';
        if (!in_array($host, $this->allowedDownloadDomains, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    // translators: %s is the hostname
                    esc_html__('Download URL is not from an allowed domain: %s', 'publishpress-hub'),
                    esc_html($host)
                )
            );
        }
    }

    private function downloadPackage(string $downloadUrl): string
    {
        if (!function_exists('wp_tempnam')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        $tmpFile = wp_tempnam($downloadUrl);
        if (!$tmpFile) {
            throw new RuntimeException(esc_html__('Could not create a temporary package file', 'publishpress-hub'));
        }

        $response = wp_safe_remote_get($downloadUrl, [
            'timeout' => 300, // phpcs:ignore WordPressVIPMinimum.Performance.RemoteRequestTimeout.timeout_timeout -- Plugin ZIP downloads can be large.
            'redirection' => 5,
            'stream' => true,
            'filename' => $tmpFile,
        ]);

        if (is_wp_error($response)) {
            wp_delete_file($tmpFile);
            throw new RuntimeException(sprintf(
                esc_html__('Failed to download plugin: %s', 'publishpress-hub'),
                esc_html($response->get_error_message())
            ));
        }

        if (wp_remote_retrieve_response_code($response) !== 200) {
            wp_delete_file($tmpFile);
            throw new RuntimeException(esc_html__('The plugin package download failed', 'publishpress-hub'));
        }

        $headers = [];
        foreach (['x-publishpress-signature', 'x-publishpress-signature-key-id'] as $name) {
            $headers[$name] = (string) wp_remote_retrieve_header($response, $name);
        }

        try {
            $verificationUrl = $this->packageSignatureVerifier->requiresSignature($downloadUrl)
                ? $downloadUrl
                : $this->getFinalResponseUrl($response, $downloadUrl);
            $this->packageSignatureVerifier->verify(
                $verificationUrl,
                $tmpFile,
                $headers
            );
        } catch (RuntimeException $error) {
            wp_delete_file($tmpFile);
            throw $error;
        }

        return $tmpFile;
    }

    private function getFinalResponseUrl(array $response, string $fallback): string
    {
        if (
            !isset($response['http_response'])
            || !is_object($response['http_response'])
            || !method_exists($response['http_response'], 'get_response_object')
        ) {
            return $fallback;
        }

        $responseObject = $response['http_response']->get_response_object();
        return is_object($responseObject) && !empty($responseObject->url)
            ? (string) $responseObject->url
            : $fallback;
    }
}
