<?php

declare(strict_types=1);

const APP_NAME = 'api-tests';

// Generate a new app password for the test user.
// WPLoader loads WordPress and connects to the same database as the Docker container.
// The dump.sql is loaded first, then this bootstrap runs, so our new password
// will be in the database when PhpBrowser makes REST API calls.
$user = get_user_by('login', 'admin');
$app = WP_Application_Passwords::create_new_application_password($user->ID, ['name' => APP_NAME]);
$password = $app[0];
$authHash = base64_encode("admin:{$password}");

// Update the .env file so the password persists between runs
$basePath = __DIR__ . '/../../';
$envFilePath = $basePath . '.env';
$envFile = file_exists($envFilePath) ? file_get_contents($envFilePath) : '';
$envFile = preg_replace('/WP_TEST_AUTH_HASH=.*/', "WP_TEST_AUTH_HASH={$authHash}", $envFile);
$envFile = preg_replace('/WP_TEST_APP_PASSWORD=.*/', "WP_TEST_APP_PASSWORD={$password}", $envFile);
file_put_contents($envFilePath, $envFile);

codecept_debug('Updating .env file with auth hash');

putenv("WP_TEST_AUTH_HASH={$authHash}");
putenv("WP_TEST_APP_PASSWORD={$password}");

// Load EDD_LICENSE_FOR_TESTS from .env file if it exists
if (preg_match('/^EDD_LICENSE_FOR_TESTS=(.*)$/m', $envFile, $matches)) {
    $licenseKey = trim($matches[1]);
    $licenseKey = trim($licenseKey, '"\'');
    if (!empty($licenseKey)) {
        putenv("EDD_LICENSE_FOR_TESTS={$licenseKey}");
    }
}

require_once __DIR__ . '/../../src/autoload.php';

do_action('plugins_loaded');
