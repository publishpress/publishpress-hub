<?php

/**
 * Verify desktop packaging, credential lifecycle and download authorization.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

use PublishPress\Hub\Infrastructure\Container\AbstractDependencies;

$_SERVER['HTTPS'] = 'on';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
require __DIR__ . '/admin-smoke.php';
$installer = $container->get(AbstractDependencies::MCP_DESKTOP_INSTALLER_SERVICE);
$keys = ['home', 'siteurl', 'publishpress_hub_mcp_enabled'];
$saved = [];
foreach ($keys as $key) {
    $saved[$key] = get_option($key, null);
}
$passwords = get_user_meta(1, '_application_passwords', true);
$roleOptions = get_option(wp_roles()->role_key);
$path = '';
$checks = 0;
$failure = null;
$dieHandler = static fn() => static function (): void {
    throw new RuntimeException('Request denied.');
};
try {
    get_role('administrator')->add_cap('manage_options');
    get_role('administrator')->add_cap('edit_users');
    wp_set_current_user(0);
    wp_set_current_user(1);
    update_option('home', 'https://mcp-test.example');
    update_option('siteurl', 'https://mcp-test.example');
    update_option('publishpress_hub_mcp_enabled', true);
    $before = WP_Application_Passwords::get_user_application_passwords(1);
    $check($installer->isAvailable(), 'An authorized HTTPS connection offers the installer');
    $check(count(WP_Application_Passwords::get_user_application_passwords(1)) === count($before),
        'Rendering availability does not create a password');
    $unexpectedFile = PUBLISHPRESS_HUB_PATH . 'resources/dist/mcp/desktop-bridge/server/unexpected.txt';
    file_put_contents($unexpectedFile, 'Do not include this unrelated file.');
    try {
        $bundle = $installer->create();
    } finally {
        wp_delete_file($unexpectedFile);
    }
    $check(substr($bundle['filename'], -5) === '.mcpb' && substr($bundle['content'], 0, 2) === 'PK',
        'Installer is an actual MCPB ZIP download');
    $path = wp_tempnam('desktop-installer-test');
    file_put_contents($path, $bundle['content']);
    $zip = new ZipArchive();
    $check($zip->open($path) === true, 'The generated archive can be opened');
    $check($zip->numFiles === 3, 'The installer contains the compiled bridge, licenses and its generated manifest');
    $check($zip->locateName('server/unexpected.txt') === false, 'Unrelated files are excluded from the download');
    $manifest = json_decode($zip->getFromName('manifest.json'), true);
    $check($zip->locateName('server/bridge.mjs') !== false
        && $zip->locateName('node_modules/') === false,
        'Installer includes the compiled official bridge');
    $notices = $zip->getFromName('THIRD-PARTY-LICENSES.txt');
    $check(is_string($notices) && strpos($notices, '@automattic/mcp-wordpress-remote@') !== false,
        'Installer includes consolidated third-party license notices');
    $zip->close();
    $check($manifest['user_config']['url']['default'] === rest_url('mcp/publishpress')
        && $manifest['user_config']['username']['default'] === wp_get_current_user()->user_login,
        'Connection details are prefilled for this site and user');
    $check($manifest['user_config']['password']['sensitive'] === true
        && $manifest['server']['mcp_config']['env']['WP_API_PASSWORD'] === '${user_config.password}',
        'The desktop client manages the password as sensitive user configuration');
    $check($manifest['server']['entry_point'] === 'server/bridge.mjs'
        && $manifest['server']['mcp_config']['env']['OAUTH_ENABLED'] === 'false'
        && $manifest['version'] === PUBLISHPRESS_HUB_VERSION,
        'The generated manifest launches the bridge directly using application-password authentication');
    $secret = $manifest['user_config']['password']['default'];
    $after = WP_Application_Passwords::get_user_application_passwords(1);
    $new = array_values(array_filter($after, static fn(array $item): bool => !in_array($item['uuid'], array_column($before, 'uuid'), true)));
    add_filter('application_password_is_api_request', '__return_true');
    $authenticated = wp_authenticate_application_password(null, wp_get_current_user()->user_login, $secret);
    remove_filter('application_password_is_api_request', '__return_true');
    $check(count($new) === 1 && $authenticated instanceof WP_User && $authenticated->ID === 1,
        'A separate valid application password is created for the download');
    if (DIRECTORY_SEPARATOR === '/') {
        $outsideFile = wp_tempnam('desktop-outside-fixture');
        file_put_contents($outsideFile, 'Outside the desktop runtime.');
        $link = PUBLISHPRESS_HUB_PATH . 'resources/dist/mcp/desktop-bridge/server/bridge.mjs';
        $backup = $link . '.fixture-backup';
        rename($link, $backup);
        symlink($outsideFile, $link);
        $rejected = false;
        try {
            $installer->create();
        } catch (RuntimeException $exception) {
            $rejected = true;
        } finally {
            wp_delete_file($link);
            rename($backup, $link);
            wp_delete_file($outsideFile);
        }
        $check($rejected && count(WP_Application_Passwords::get_user_application_passwords(1)) === count($after),
            'Symbolic links cannot include files outside the shipped runtime');
    }
    $manifest['user_config']['password']['default'] = 'REDACTED';
    file_put_contents(sys_get_temp_dir() . '/publishpress-desktop-manifest.json', wp_json_encode($manifest));
    $failure = static function (string $url) use ($after): string {
        if (count(WP_Application_Passwords::get_user_application_passwords(1)) > count($after)) {
            throw new RuntimeException('Simulated packaging failure.');
        }
        return $url;
    };
    add_filter('home_url', $failure);
    $failed = false;
    try {
        $installer->create();
    } catch (RuntimeException $exception) {
        $failed = true;
    }
    remove_filter('home_url', $failure);
    $check($failed && count(WP_Application_Passwords::get_user_application_passwords(1)) === count($after),
        'Packaging failure revokes the newly created password');
    update_option('publishpress_hub_mcp_enabled', false);
    $check(!$installer->isAvailable(), 'Disabled connections do not offer an installer');
    update_option('publishpress_hub_mcp_enabled', true);
    add_filter('wp_die_handler', $dieHandler);
    $_SERVER['REQUEST_METHOD'] = 'GET';
    $denied = false;
    try {
        $controller->downloadInstaller();
    } catch (RuntimeException $exception) {
        $denied = true;
    }
    $check($denied, 'GET requests cannot mint credentials');
    $_SERVER['REQUEST_METHOD'] = 'POST';
    $_REQUEST['_wpnonce'] = 'invalid';
    $denied = false;
    try {
        $controller->downloadInstaller();
    } catch (RuntimeException $exception) {
        $denied = true;
    }
    $check($denied, 'Download requires a valid nonce');
    wp_set_current_user(0);
    $check(!$installer->isAvailable(), 'Anonymous users cannot create an installer');
    $denied = false;
    try {
        $installer->create();
    } catch (RuntimeException $exception) {
        $denied = true;
    }
    $check($denied, 'The service independently enforces authorization');
    echo "Completed $checks desktop installer checks with WordPress $wp_version.\n";
} finally {
    remove_filter('wp_die_handler', $dieHandler);
    if ($failure) {
        remove_filter('home_url', $failure);
    }
    if ($path) {
        wp_delete_file($path);
    }
    update_user_meta(1, '_application_passwords', $passwords);
    update_option(wp_roles()->role_key, $roleOptions);
    foreach ($saved as $key => $value) {
        if ($value === null) {
            delete_option($key);
        } else {
            update_option($key, $value);
        }
    }
}
