<?php

declare(strict_types=1);

const APP_NAME = 'api-tests';

// Generate a new app password for the test user
$user = get_user_by('login', 'admin');
$app = WP_Application_Passwords::create_new_application_password($user->ID, ['name' => APP_NAME]);
$password = $app[0];
$authHash = base64_encode("admin:{$password}");

// Udpate the .env file
$basePath = __DIR__ . '/../../';
$envFile = file_get_contents($basePath . '.env');
$envFile = preg_replace('/WP_TEST_AUTH_HASH=.*/', "WP_TEST_AUTH_HASH={$authHash}", $envFile);
$envFile = preg_replace('/WP_TEST_APP_PASSWORD=.*/', "WP_TEST_APP_PASSWORD={$password}", $envFile);
file_put_contents($basePath . '.env', $envFile);

codecept_debug('Updating .env file with auth hash');

putenv("WP_TEST_AUTH_HASH={$authHash}");
putenv("WP_TEST_APP_PASSWORD={$password}");

// Load EDD_LICENSE_FOR_TESTS from .env file if it exists
if (preg_match('/^EDD_LICENSE_FOR_TESTS=(.*)$/m', $envFile, $matches)) {
    $licenseKey = trim($matches[1]);
    // Remove surrounding quotes if present (handles both "value" and 'value')
    $licenseKey = trim($licenseKey, '"\'');
    if (!empty($licenseKey)) {
        putenv("EDD_LICENSE_FOR_TESTS={$licenseKey}");
    }
}

require_once __DIR__ . '/../../src/autoload.php';

do_action('plugins_loaded');
