<?php

/**
 * Verify the React page's REST contract, authorization and scoped saves.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

use PublishPress\Hub\Infrastructure\Container\AbstractDependencies;

require __DIR__ . '/admin-smoke.php';
$actor->allcaps = ['read' => true, 'manage_options' => true];
$GLOBALS['current_user'] = $actor;
$restController = $container->get(AbstractDependencies::REST_API_MCP_CONTROLLER);
$restController->load();
$restController->init();
$restApi = $container->get(AbstractDependencies::REST_API_SERVICE);
$restApi->load();
$restApi->init();
rest_get_server();
$original = [];
foreach ($keys as $key) {
    $original[$key] = get_option($key, null);
}
$userOptions = [];
foreach (['publishpress_hub_mcp_client', 'publishpress_hub_mcp_setup_complete', 'publishpress_hub_mcp_actions_reviewed'] as $key) {
    $userOptions[$key] = get_user_option($key);
}
$oldHttps = $_SERVER['HTTPS'] ?? null;
$oldRequest = $_REQUEST;
$oldCookie = $GLOBALS['wp_rest_auth_cookie'] ?? null;
$_SERVER['HTTPS'] = 'on';
$oldHome = get_option('home');
$oldSite = get_option('siteurl');
update_option('home', 'https://mcp-test.example');
update_option('siteurl', 'https://mcp-test.example');
$call = static function (string $method, array $params = [], string $route = '/mcp/connection'): WP_REST_Response {
    $request = new WP_REST_Request($method, '/publishpress-hub/v1' . $route);
    foreach ($params as $name => $value) {
        $request->set_param($name, $value);
    }
    return rest_do_request($request);
};
try {
    $connection->saveExposureSettings(true, false, $names);
    update_user_option($actor->ID, 'publishpress_hub_mcp_setup_complete', false);
    update_user_option($actor->ID, 'publishpress_hub_mcp_actions_reviewed', false);
    $response = $call('GET');
    $data = $response->get_data();
    $check($response->get_status() === 200 && !empty($data['success']) && isset($data['state']) && !isset($data['html']),
        'REST returns structured state without rendered HTML');
    $check($data['state']['setupStage'] === 'access' && count($data['state']['actionView']['actions']) === 10,
        'Initial REST state requires review and returns a bounded action page');
    $data = $call('GET', ['plugin' => 'z-fixture'])->get_data();
    $check(count($data['state']['actionView']['actions']) === 1, 'REST filters action data by plugin');
    $data = $call('GET', ['action_page' => 2])->get_data();
    $check(count($data['state']['actionView']['actions']) === 5, 'REST paginates action data');
    $payload = ['enabled' => true, 'writesEnabled' => false, 'client' => 'manual'];
    $data = $call('POST', $payload)->get_data();
    $check($data['state']['selectedClient'] === 'manual' && !get_user_option('publishpress_hub_mcp_actions_reviewed'),
        'Saving preferences does not silently complete action review');
    $payload['reviewActions'] = true;
    $payload['displayedActions'] = ['hub-fixture/get-item', 'hub-fixture/page-12'];
    $payload['selectedActions'] = ['hub-fixture/get-item'];
    $data = $call('POST', $payload)->get_data();
    $check($data['state']['setupStage'] === 'connect' && $data['message'] === 'Changes saved. Connect your AI app to continue.',
        'Saving reviewed actions advances to app connection');
    $check(in_array('hub-fixture/page-12', $connection->getDisabledActions(), true)
        && !in_array('z-fixture/read-item', $connection->getDisabledActions(), true),
        'REST saves edits across pages while preserving unrelated plugin choices');
    $payload = ['enabled' => true, 'writesEnabled' => false, 'setupComplete' => true];
    $data = $call('POST', $payload)->get_data();
    $check($data['state']['setupStage'] === 'manage', 'Explicit app confirmation opens management');
    $payload['displayedActions'] = ['hub-fixture/get-item'];
    $data = $call('POST', $payload)->get_data();
    $check($data['message'] === 'Changes saved. Restart your AI app or refresh its PublishPress connection to update the available actions.',
        'Changing exposed actions after setup returns refresh instructions');
    $data = $call('POST', $payload)->get_data();
    $check($data['message'] === 'Changes saved.', 'Unchanged saves do not request a refresh');
    $data = $call('POST', ['enabled' => true, 'writesEnabled' => false, 'setupComplete' => false])->get_data();
    $check($data['state']['setupStage'] === 'connect' && $connection->isEnabled(), 'Reconnect preserves the enabled connection');
    $before = $connection->getDisabledActions();
    $check($call('POST', ['enabled' => true, 'writesEnabled' => false, 'selectedActions' => 'invalid'])->get_status() === 400
        && $before === $connection->getDisabledActions(), 'REST rejects malformed settings without changing exposure');
    $check($call('POST', ['enabled' => true, 'writesEnabled' => false, 'client' => 'unknown'])->get_status() === 400,
        'REST rejects unknown setup choices');
    $check($call('POST', [], '/mcp/adapter')->get_status() === 403, 'Adapter installation requires activation capability in addition to connection access');
    $actor->allcaps = ['read' => true, 'manage_publishpress_hub' => true];
    $check($call('GET')->get_status() === 403 && $call('POST', ['enabled' => false, 'writesEnabled' => false])->get_status() === 403
        && $connection->isEnabled(), 'Hub viewers cannot read or change MCP settings');
    $actor->ID = 0;
    $actor->allcaps = [];
    $check($call('GET')->get_status() === 401, 'Anonymous requests cannot read setup data');
    $actor->ID = 1;
    $actor->allcaps = ['read' => true, 'manage_options' => true];
    $GLOBALS['wp_rest_auth_cookie'] = true;
    $_REQUEST = ['_wpnonce' => 'invalid'];
    $nonceError = rest_cookie_check_errors(null);
    $check(is_wp_error($nonceError) && $nonceError->get_error_code() === 'rest_cookie_invalid_nonce',
        'WordPress REST cookie authentication rejects an invalid nonce');
    echo "Completed React administration REST checks with WordPress $wp_version.\n";
} finally {
    $actor->ID = 1;
    foreach ($original as $key => $value) {
        if ($value === null) {
            delete_option($key);
        } else {
            update_option($key, $value);
        }
    }
    foreach ($userOptions as $key => $value) {
        if ($value === false) {
            delete_user_option($actor->ID, $key);
        } else {
            update_user_option($actor->ID, $key, $value);
        }
    }
    update_option('home', $oldHome);
    update_option('siteurl', $oldSite);
    $_REQUEST = $oldRequest;
    $GLOBALS['wp_rest_auth_cookie'] = $oldCookie;
    if ($oldHttps === null) {
        unset($_SERVER['HTTPS']);
    } else {
        $_SERVER['HTTPS'] = $oldHttps;
    }
}
