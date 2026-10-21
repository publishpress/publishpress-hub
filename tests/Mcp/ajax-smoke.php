<?php
/** Exercise authenticated asynchronous MCP settings saves in the isolated fixture. */
require __DIR__ . '/admin-smoke.php';
if (!defined('DOING_AJAX')) {
    define('DOING_AJAX', true);
}
$original = [];
foreach ($keys as $key) {
    $original[$key] = get_option($key, null);
}
$actor->allcaps = ['read' => true, 'manage_options' => true];
$GLOBALS['current_user'] = $actor;
add_filter('wp_die_ajax_handler', static function () {
    return static function ($message) {
        if ($message !== '') {
            echo wp_json_encode(['error' => $message]);
        }
        throw new RuntimeException('mcp_ajax_fixture_end');
    };
});
$captureSave = static function () use ($controller) {
    $_REQUEST = $_POST;
    ob_start();
    try {
        $controller->save();
    } catch (RuntimeException $error) {
        if ($error->getMessage() !== 'mcp_ajax_fixture_end') {
            ob_end_clean();
            throw $error;
        }
    }
    return json_decode(ob_get_clean(), true);
};
$clientOption = 'publishpress_hub_mcp_client';
$originalClient = get_user_option($clientOption);
$setupOption = 'publishpress_hub_mcp_setup_complete';
$originalSetup = get_user_option($setupOption);
try {
    $_SERVER['REQUEST_METHOD'] = 'POST';
    $_POST = ['_wpnonce' => wp_create_nonce('publishpress_hub_mcp_save'), 'mcp_enabled' => '1',
        'mcp_writes_enabled' => '1', 'mcp_client' => 'assistant', 'displayed_actions' => ['hub-fixture/get-item']];
    $result = $captureSave();
    $check(!empty($result['success']) && strpos($result['data']['html'], 'mcp-actions') !== false,
        'AJAX save returns refreshed connection markup');
    $check(get_user_option($clientOption) === 'assistant'
        && preg_match('/name="mcp_client"[^>]*value="assistant"[^>]*checked/', $result['data']['html']) === 1
        && strpos($result['data']['html'], 'data-mcp-client-panel="assistant" hidden') === false,
        'Saved setup choice is restored when the page renders again');
    $_POST['mcp_client'] = 'unknown-client';
    $captureSave();
    $check(get_user_option($clientOption) === 'assistant', 'Unknown setup choices do not replace the saved preference');
    $check(in_array('hub-fixture/get-item', $connection->getDisabledActions(), true)
        && !in_array('z-fixture/read-item', $connection->getDisabledActions(), true),
        'AJAX saves retain selections outside the submitted draft scope');
    $_POST['mcp_setup_complete'] = '1';
    $captureSave();
    $check((bool) get_user_option($setupOption), 'Authorized saves record explicit app setup confirmation');
    $_POST['mcp_setup_complete'] = '0';
    $captureSave();
    $check(!get_user_option($setupOption) && $connection->isEnabled(),
        'Reopening app setup keeps the site connection enabled');
    $_POST['_wpnonce'] = 'invalid';
    $_POST['mcp_enabled'] = '0';
    $result = $captureSave();
    $check(isset($result['success']) && !$result['success'] && $connection->isEnabled(),
        'AJAX nonce rejection does not change settings');
    $_POST['_wpnonce'] = wp_create_nonce('publishpress_hub_mcp_save');
    $actor->allcaps = ['read' => true];
    $result = $captureSave();
    $check(isset($result['success']) && !$result['success'] && !empty($result['data']['message']) && $connection->isEnabled(),
        'AJAX authorization rejection does not change settings');
    $actor->allcaps = ['read' => true, 'manage_options' => true];
    $_SERVER['REQUEST_METHOD'] = 'GET';
    $result = $captureSave();
    $check(isset($result['success']) && !$result['success'] && $connection->isEnabled(),
        'AJAX saves reject requests that do not use POST');
    echo "Completed 9 AJAX save checks with WordPress $wp_version.\n";
} finally {
    if ($originalSetup === false) {
        delete_user_option(get_current_user_id(), $setupOption);
    } else {
        update_user_option(get_current_user_id(), $setupOption, $originalSetup);
    }
    if ($originalClient === false) {
        delete_user_option(get_current_user_id(), $clientOption);
    } else {
        update_user_option(get_current_user_id(), $clientOption, $originalClient);
    }
    foreach ($original as $key => $value) {
        if ($value === null) {
            delete_option($key);
        } else {
            update_option($key, $value);
        }
    }
}
