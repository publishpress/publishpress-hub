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
defined( 'ABSPATH' ) || exit;

use InvalidArgumentException;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;
use RuntimeException;

class WPPluginLifecycleAdapter
{
    private WPFileSystemAdapter $fileSystemAdapter;

    private array $allowedDownloadDomains;

    /**
     * @param WPFileSystemAdapter $fileSystemAdapter The file system adapter.
     * @since 1.0.0
     */
    public function __construct(WPFileSystemAdapter $fileSystemAdapter, array $allowedDownloadDomains)
    {
        $this->fileSystemAdapter = $fileSystemAdapter;
        $this->allowedDownloadDomains = $allowedDownloadDomains;
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

        $tmpFile = download_url($downloadUrl);

        if (is_wp_error($tmpFile)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to download plugin: %s', 'publishpress-hub'),
                    esc_html($tmpFile->get_error_message())
                )
            );
        }

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

        return true;
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

        // The upgrade method can accept either a string (single plugin) or array (multiple plugins)
        // For a single plugin, pass as string to match WordPress core expectations
        // The plugin path should be in the format 'plugin-folder/plugin-file.php'
        $result = $upgrader->upgrade($pluginPath);

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
}
