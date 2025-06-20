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
$envFile = preg_replace('/WP_TESTS_AUTH_HASH=.*/', "WP_TESTS_AUTH_HASH={$authHash}", $envFile);
$envFile = preg_replace('/WP_TESTS_APP_PASSWORD=.*/', "WP_TESTS_APP_PASSWORD={$password}", $envFile);
file_put_contents($basePath . '.env', $envFile);

codecept_debug('Updating .env file with auth hash');

putenv("WP_TESTS_AUTH_HASH={$authHash}");
putenv("WP_TESTS_APP_PASSWORD={$password}");

