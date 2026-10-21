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
$renderFlow = static function () use ($controller): string {
    ob_start();
    $controller->showConnectionPage();
    return ob_get_clean();
};
try {
    update_option('publishpress_hub_mcp_enabled', false);
    $html = $renderFlow();
    $check(strpos($html, 'data-mcp-stage="disabled"') !== false
        && preg_match('/class="mcp-panel mcp-connect-step"[^>]*hidden/', $html) === 1,
        'Disabled connection hides the client setup and keeps the welcome toggle');
    update_option('publishpress_hub_mcp_enabled', true);
    update_option('home', 'http://mcp-test.example');
    update_option('siteurl', 'http://mcp-test.example');
    $html = $renderFlow();
    $check(strpos($html, 'data-mcp-stage="prerequisite"') !== false
        && preg_match('/class="mcp-panel mcp-next-step"[^>]*hidden/', $html) === 0,
        'Incomplete prerequisites show the next required step');
    update_option('home', 'https://mcp-test.example');
    update_option('siteurl', 'https://mcp-test.example');
    update_user_option($actor->ID, $setupOption, false);
    update_user_option($actor->ID, $reviewOption, false);
    $html = $renderFlow();
    $check(strpos($html, 'data-mcp-stage="access"') !== false
        && preg_match('/class="mcp-manage-controls"[^>]*hidden/', $html) === 0
        && preg_match('/class="mcp-panel mcp-connect-step"[^>]*hidden/', $html) === 1
        && strpos($html, 'Save and continue') !== false,
        'New setup requires action review before connecting even with default actions selected');
    update_user_option($actor->ID, $reviewOption, true);
    $html = $renderFlow();
    $check(strpos($html, 'data-mcp-stage="connect"') !== false
        && preg_match('/class="mcp-panel mcp-connect-step"[^>]*hidden/', $html) === 0
        && preg_match('/class="mcp-manage-controls"[^>]*hidden/', $html) === 1,
        'Saved action review reveals app setup without repeating access controls');
    update_user_option($actor->ID, $setupOption, true);
    $html = $renderFlow();
    $check(strpos($html, 'data-mcp-stage="manage"') !== false
        && preg_match('/class="mcp-panel mcp-connect-step"[^>]*hidden/', $html) === 1
        && preg_match('/class="mcp-manage-controls"[^>]*hidden/', $html) === 0
        && strpos($html, 'data-mcp-reconnect') !== false,
        'Confirmed setup shows management controls and the reconnect action');
    $selection = $connection->getDisabledActions();
    update_user_option($actor->ID, $setupOption, false);
    $check(strpos($renderFlow(), 'data-mcp-stage="connect"') !== false
        && $selection === $connection->getDisabledActions(),
        'Reopening setup preserves action selections and the enabled connection');
    $connection->saveExposureSettings(true, false, []);
    $check(strpos($renderFlow(), 'data-mcp-stage="access"') !== false,
        'An empty exposure selection shows access controls before app setup');
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
