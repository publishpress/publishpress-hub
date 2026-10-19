<?php

/**
 * Build a site-specific desktop extension using the WordPress remote bridge.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Mcp;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Service\Access\HubAccessService;
use RuntimeException;
use Throwable;
use WP_Application_Passwords;
use ZipArchive;

class McpDesktopInstallerService
{
    private const RUNTIME_PATH = 'resources/dist/mcp/desktop-bridge/';

    private McpConnectionService $connection;

    /**
     * Constructor.
     *
     * @param McpConnectionService $connection
     * @since 1.2.0
     */
    public function __construct(McpConnectionService $connection)
    {
        $this->connection = $connection;
    }

    /**
     * Check download prerequisites without creating credentials.
     *
     * @return bool
     * @since 1.2.0
     */
    public function isAvailable(): bool
    {
        return HubAccessService::canManageMcp()
            && $this->connection->isEnabled()
            && $this->connection->isAvailable()
            && wp_is_using_https()
            && class_exists(ZipArchive::class)
            && wp_is_application_passwords_available_for_user(wp_get_current_user())
            && current_user_can('create_app_password', get_current_user_id())
            && is_readable(PUBLISHPRESS_HUB_PATH . self::RUNTIME_PATH . 'THIRD-PARTY-LICENSES.txt')
            && is_readable(PUBLISHPRESS_HUB_PATH . self::RUNTIME_PATH . 'server/bridge.mjs');
    }

    /**
     * Create a downloadable bundle, removing temporary secrets on every path.
     *
     * @return array{filename: string, content: string}
     * @throws RuntimeException When prerequisites, credentials or packaging fail.
     * @since 1.2.0
     */
    public function create(): array
    {
        if (!$this->isAvailable()) {
            throw new RuntimeException('Desktop installer prerequisites are unavailable.');
        }
        require_once ABSPATH . 'wp-admin/includes/file.php';
        $path = wp_tempnam('publishpress-desktop');
        $uuid = '';
        $zip = new ZipArchive();
        $opened = false;
        try {
            // The credential ZIP is local even when WP_Filesystem uses a remote transport.
            // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.chmod_chmod -- Make the temporary file private before writing credentials.
            if (!$path || !chmod($path, 0600)) {
                throw new RuntimeException('Cannot prepare the desktop bundle.');
            }
            $opened = $zip->open($path, ZipArchive::OVERWRITE) === true;
            if (!$opened) {
                throw new RuntimeException('Cannot open the desktop bundle.');
            }
            $this->addRuntimeFiles($zip);
            $credential = WP_Application_Passwords::create_new_application_password(get_current_user_id(), [
                'name' => __('PublishPress - Claude Desktop', 'publishpress-hub'),
            ]);
            if (is_wp_error($credential)) {
                throw new RuntimeException('Cannot create the application password.');
            }
            [$password, $item] = $credential;
            $uuid = $item['uuid'];
            $manifest = wp_json_encode($this->getManifest($password), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
            if (!$manifest || !$zip->addFromString('manifest.json', $manifest)) {
                throw new RuntimeException('Cannot configure the desktop bundle.');
            }
            $closed = $zip->close();
            $opened = false;
            if (!$closed) {
                throw new RuntimeException('Cannot finish the desktop bundle.');
            }
            // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown -- Local temporary ZIP; must never be cached.
            $content = file_get_contents($path);
            if ($content === false || $content === '') {
                throw new RuntimeException('Cannot read the desktop bundle.');
            }
            return [
                'filename' => $this->connection->getClientIdentifier() . '.mcpb',
                'content' => $content,
            ];
        } catch (Throwable $exception) {
            if ($uuid !== '') {
                WP_Application_Passwords::delete_application_password(get_current_user_id(), $uuid);
            }
            throw $exception;
        } finally {
            if ($opened) {
                $zip->close();
            }
            if ($path) {
                wp_delete_file($path);
            }
        }
    }

    /**
     * Add shipped runtime files to a fresh archive without following symbolic links.
     *
     * @param ZipArchive $zip Download archive.
     * @return void
     * @throws RuntimeException When a runtime file is missing, outside the bundle or unreadable.
     * @since 1.2.0
     */
    private function addRuntimeFiles(ZipArchive $zip): void
    {
        $directory = realpath(PUBLISHPRESS_HUB_PATH . self::RUNTIME_PATH);
        if ($directory === false) {
            throw new RuntimeException('Desktop runtime files are unavailable.');
        }
        $prefix = $directory . DIRECTORY_SEPARATOR;
        foreach (['server/bridge.mjs', 'THIRD-PARTY-LICENSES.txt'] as $relative) {
            $filename = $prefix . str_replace('/', DIRECTORY_SEPARATOR, $relative);
            $resolved = realpath($filename);
            if (is_link($filename) || $resolved === false || strpos($resolved, $prefix) !== 0 || !is_readable($resolved)) {
                throw new RuntimeException('Invalid desktop runtime file.');
            }
            if (!$zip->addFile($resolved, $relative)) {
                throw new RuntimeException('Cannot add a desktop runtime file.');
            }
        }
    }

    /**
     * Describe a bundled bridge with client-managed sensitive configuration.
     *
     * @param string $password Newly created application password.
     * @return array<string, mixed>
     * @since 1.2.0
     */
    private function getManifest(string $password): array
    {
        $host = (string) wp_parse_url(home_url(), PHP_URL_HOST);
        return [
            'manifest_version' => '0.3',
            'name' => $this->connection->getClientIdentifier(),
            'display_name' => 'PublishPress - ' . $host . (string) wp_parse_url(home_url(), PHP_URL_PATH),
            'version' => PUBLISHPRESS_HUB_VERSION,
            'description' => __('Connect to the selected PublishPress actions on your WordPress site.', 'publishpress-hub'),
            'author' => ['name' => 'PublishPress', 'url' => 'https://publishpress.com'],
            'license' => 'GPL-2.0-or-later',
            'server' => [
                'type' => 'node',
                'entry_point' => 'server/bridge.mjs',
                'mcp_config' => [
                    'command' => 'node',
                    'args' => ['${__dirname}/server/bridge.mjs'],
                    'env' => [
                        'OAUTH_ENABLED' => 'false',
                        'WP_API_URL' => '${user_config.url}',
                        'WP_API_USERNAME' => '${user_config.username}',
                        'WP_API_PASSWORD' => '${user_config.password}',
                    ],
                ],
            ],
            'compatibility' => ['runtimes' => ['node' => '>=22.0.0']],
            'tools_generated' => true,
            'user_config' => [
                'url' => [
                    'type' => 'string', 'title' => __('Server URL', 'publishpress-hub'),
                    'description' => __('The PublishPress MCP endpoint on your WordPress site.', 'publishpress-hub'),
                    'default' => rest_url('mcp/publishpress'), 'required' => true,
                ],
                'username' => [
                    'type' => 'string', 'title' => __('Username', 'publishpress-hub'),
                    'description' => __('The WordPress account used for this connection.', 'publishpress-hub'),
                    'default' => wp_get_current_user()->user_login, 'required' => true,
                ],
                'password' => [
                    'type' => 'string', 'title' => __('Application password', 'publishpress-hub'),
                    'description' => __('A separate application password for this account. Revoke it in your WordPress profile to remove access.', 'publishpress-hub'),
                    'default' => $password, 'sensitive' => true, 'required' => true,
                ],
            ],
        ];
    }
}
