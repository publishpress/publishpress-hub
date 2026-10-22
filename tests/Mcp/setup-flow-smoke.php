<?php

/**
 * Verify progressive AI connection setup and repeat connection setup.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

require __DIR__ . '/admin-smoke.php';
$actor->allcaps = ['read' => true, 'manage_options' => true];
$GLOBALS['current_user'] = $actor;
$flowOptions = [];
foreach (['home', 'siteurl', 'publishpress_hub_mcp_enabled', 'publishpress_hub_mcp_writes_enabled', 'publishpress_hub_mcp_disabled_abilities'] as $key) {
    $flowOptions[$key] = get_option($key);
}
$setupOption = 'publishpress_hub_mcp_setup_complete';
$previousSetup = get_user_option($setupOption);
$reviewOption = 'publishpress_hub_mcp_actions_reviewed';
$previousReview = get_user_option($reviewOption);
$previousHttps = $_SERVER['HTTPS'] ?? null;
$_SERVER['HTTPS'] = 'on';
$renderFlow = static fn(): array => $setupService->getState();
try {
    update_option('publishpress_hub_mcp_enabled', false);
    $check($renderFlow()['setupStage'] === 'disabled', 'Disabled connection hides setup');
    update_option('publishpress_hub_mcp_enabled', true);
    update_option('home', 'http://mcp-test.example');
    update_option('siteurl', 'http://mcp-test.example');
    $check($renderFlow()['setupStage'] === 'prerequisite', 'Incomplete prerequisites precede action review');
    update_option('home', 'https://mcp-test.example');
    update_option('siteurl', 'https://mcp-test.example');
    update_user_option($actor->ID, $setupOption, false);
    update_user_option($actor->ID, $reviewOption, false);
    $check($renderFlow()['setupStage'] === 'access', 'New setup requires action review even with default actions selected');
    update_user_option($actor->ID, $reviewOption, true);
    $check($renderFlow()['setupStage'] === 'connect', 'Reviewed actions reveal app connection');
    update_user_option($actor->ID, $setupOption, true);
    update_user_option($actor->ID, $reviewOption, false);
    $check($renderFlow()['setupStage'] === 'manage', 'Existing completed setups keep their management controls');
    $selection = $connection->getDisabledActions();
    $setupService->save(['enabled' => true, 'writesEnabled' => false, 'setupComplete' => false]);
    $check($renderFlow()['setupStage'] === 'connect' && $selection === $connection->getDisabledActions(),
        'Reopening setup preserves selected actions and migrates existing completion');
    $connection->saveExposureSettings(true, false, []);
    $check($renderFlow()['setupStage'] === 'access', 'Empty exposure returns to action selection');
    echo "Completed 7 setup flow checks with WordPress $wp_version.\n";
} finally {
    if ($previousHttps === null) {
        unset($_SERVER['HTTPS']);
    } else {
        $_SERVER['HTTPS'] = $previousHttps;
    }
    foreach ($flowOptions as $key => $value) {
        update_option($key, $value);
    }
    if ($previousReview === false) {
        delete_user_option($actor->ID, $reviewOption);
    } else {
        update_user_option($actor->ID, $reviewOption, $previousReview);
    }
    if ($previousSetup === false) {
        delete_user_option($actor->ID, $setupOption);
    } else {
        update_user_option($actor->ID, $setupOption, $previousSetup);
    }
}
