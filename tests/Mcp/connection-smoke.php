<?php

/**
 * Isolated MCP integration checks against a real WordPress and released adapter.
 * Run: php connection-smoke.php /path/to/wp-load.php /path/to/mcp-adapter
 * Uses request-local users and option filters; does not install plugins or change database settings.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli' || count($argv) !== 3) {
    exit("Run from CLI with WordPress bootstrap and adapter directory.\n");
}

$_SERVER['HTTP_HOST'] = $_SERVER['HTTP_HOST'] ?? 'mcp-test.example';
require $argv[1];
require __DIR__ . '/bootstrap-hub.php';
require_once dirname(__DIR__, 2) . '/src/Application/Contract/BootableInterface.php';
require_once dirname(__DIR__, 2) . '/src/Application/Traits/BootableTrait.php';
require_once dirname(__DIR__, 2) . '/src/Application/Service/Mcp/McpConnectionService.php';
require __DIR__ . '/fixture-abilities.php';

$checks = 0;
$check = static function (bool $condition, string $message) use (&$checks): void {
    if (!$condition) {
        throw new RuntimeException($message);
    }
    ++$checks;
    echo "PASS: $message\n";
};
$enabled = false;
$writesEnabled = false;
$disabledActions = [];
add_filter('pre_option_publishpress_hub_mcp_writes_enabled', static function () use (&$writesEnabled) {
    return $writesEnabled ? '1' : '0';
});
add_filter('pre_option_publishpress_hub_mcp_disabled_abilities', static function () use (&$disabledActions) {
    return $disabledActions;
});
add_filter('pre_option_publishpress_hub_mcp_enabled', static function () use (&$enabled) {
    return $enabled ? '1' : '0';
});
$siteAddress = 'https://mcp-test.example';
add_filter('pre_option_home', static function () use (&$siteAddress) {
    return $siteAddress;
});
add_filter('pre_option_siteurl', static function () use (&$siteAddress) {
    return $siteAddress;
});
$connection = new \PublishPress\Hub\Application\Service\Mcp\McpConnectionService(
    new \PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter()
);
$connection->load();
$check(!$connection->isEnabled(), 'Connection defaults to disabled');
$check(!$connection->isAvailable(), 'Missing adapter does not enable the connection');

require $argv[2] . '/mcp-adapter.php';
$check($connection->isAvailable(), 'Released adapter is detected');
$originalVersion = $wp_version;
$wp_version = '6.7';
$check(!$connection->isAvailable(), 'Older WordPress leaves the MCP integration unavailable');
$wp_version = $originalVersion;
$probe = new class {
    public int $calls = 0;

    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps -- Matches the external adapter API.
    public function create_server(...$arguments): void
    {
        ++$this->calls;
    }
};
$connection->registerServer($probe);
$check($probe->calls === 0, 'Disabled integration does not register a server');
$enabled = true;
$siteAddress = 'http://mcp-test.example';
$connection->registerServer($probe);
$check($probe->calls === 0, 'HTTP-only sites do not register the endpoint');
$siteAddress = 'https://mcp-test.example';

// Initialize registries lazily, as WordPress does during server creation.
wp_get_abilities();
if (!wp_has_ability_category('publishpress')) {
    do_action('wp_abilities_api_categories_init');
}
if (!isset(wp_get_abilities()['hub-fixture/list-items'])) {
    do_action('wp_abilities_api_init');
}

$names = $connection->getAbilityNames();
$check(in_array('hub-fixture/list-items', $names, true), 'Shared category exposes plugin read actions');
$check(!in_array('hub-fixture/create-item', $names, true), 'Write actions are excluded by default');
$writesEnabled = true;
$check(
    in_array('hub-fixture/create-item', $connection->getAbilityNames(), true),
    'Write opt-in exposes registered write actions'
);
$disabledActions = ['hub-fixture/get-item'];
$check(
    !in_array('hub-fixture/get-item', $connection->getAbilityNames(), true),
    'Per-action exposure controls exclude deselected actions'
);
$disabledActions = [];

// Request-local user objects avoid modifying accounts or roles in the database.
$setUser = static function (array $caps, bool $authenticated = true): void {
    $user = new WP_User();
    $user->ID = $authenticated ? 1 : 0;
    $user->allcaps = $caps;
    $GLOBALS['current_user'] = $user;
};
$setUser(['read' => true]);
$check(!$connection->canConnect(), 'Subscriber cannot open the connection');
$setUser(['read' => true, 'edit_posts' => true]);
$check(!$connection->canConnect(), 'Editor cannot open the connection');
$setUser(['read' => true, 'manage_options' => true]);
$check($connection->canConnect(), 'manage_options permits the connection');
$ability = wp_get_ability('hub-fixture/list-items');
$check(is_wp_error($ability->execute([])), 'Connection permission alone does not grant plugin actions');

$setUser(['read' => true, 'manage_options' => true, 'use_fixture_actions' => true]);
$result = $ability->execute([]);
$check(!is_wp_error($result) && !empty($result['items']), 'Authorized list action executes with validated output');
$roleAbility = wp_get_ability('hub-fixture/get-item');
$role = $roleAbility->execute(['item' => 'example']);
$check(!is_wp_error($role) && $role['slug'] === 'example', 'Authorized fixture inspection returns data');
$check(is_wp_error($roleAbility->execute([])), 'Missing item is rejected by the input schema');
$check(is_wp_error($roleAbility->execute(['item' => 'unknown-item'])), 'Unknown item returns an error');
$check(
    is_wp_error($roleAbility->execute(['item' => 'example', 'unexpected' => true])),
    'Unexpected arguments are rejected'
);

rest_get_server();
$adapter = \WP\MCP\Core\McpAdapter::instance();
$server = $adapter->get_server('publishpress');
$check($server !== null && !is_wp_error($server), 'Adapter creates the dedicated PublishPress server');
$schemas = $server->get_schemas();
foreach (['2025-11-25', '2026-07-28'] as $revision) {
    $projected = 0;
    foreach ($connection->getActionCatalog() as $action) {
        $component = \WP\MCP\Domain\Tools\McpTool::fromAbility(wp_get_ability($action['name']));
        if (!is_wp_error($component)) {
            $component->get_protocol_record($schemas->forVersion($revision));
            ++$projected;
        }
    }
    $check(
        $projected === count($connection->getActionCatalog()),
        'Every action schema projects to MCP revision ' . $revision
    );
}
$check(
    $server->get_mcp_tool('hub-fixture-list-items') !== null,
    'Dedicated server contains the registered plugin tool'
);
$tool = \WP\MCP\Domain\Tools\McpTool::fromAbility($ability);
$check(!is_wp_error($tool), 'Private ability can be registered as a direct custom-server tool');
$check(!is_wp_error($tool->execute([])), 'Adapter invokes the plugin ability successfully');
$denied = \WP\MCP\Abilities\ExecuteAbilityAbility::check_permission([
    'ability_name' => $ability->get_name(), 'parameters' => [],
]);
$check(is_wp_error($denied), 'Default-server execution rejects the private ability');
$meta = $ability->get_meta();
$check($meta['public'] === false && $meta['mcp']['public'] === false, 'Public exposure is explicitly disabled');
$discovery = \WP\MCP\Abilities\DiscoverAbilitiesAbility::execute([]);
$check(
    strpos(wp_json_encode($discovery), 'hub-fixture/') === false,
    'Default-server discovery omits the private plugin actions'
);

$call = static function (array $body, ?string $session = null): WP_REST_Response {
    $request = new WP_REST_Request('POST', '/mcp/publishpress');
    $request->set_header('Content-Type', 'application/json');
    $request->set_header('Accept', 'application/json, text/event-stream');
    if ($session !== null) {
        $request->set_header('Mcp-Session-Id', $session);
        $request->set_header('MCP-Protocol-Version', '2025-11-25');
    }
    $request->set_body(wp_json_encode($body));
    return rest_do_request($request);
};
$initialize = $call([
    'jsonrpc' => '2.0', 'id' => 10, 'method' => 'initialize',
    'params' => [
        'protocolVersion' => '2025-11-25', 'capabilities' => (object) [],
        'clientInfo' => ['name' => 'publishpress-smoke', 'version' => '1.0.0'],
    ],
]);
$check($initialize->get_status() === 200, 'Authorized MCP initialization succeeds through REST');
$session = $initialize->get_headers()['Mcp-Session-Id'] ?? null;
$check(is_string($session), 'Adapter returns an MCP session');
$call(['jsonrpc' => '2.0', 'method' => 'notifications/initialized'], $session);
$list = $call(['jsonrpc' => '2.0', 'id' => 11, 'method' => 'tools/list', 'params' => (object) []], $session);
$check(
    strpos(wp_json_encode($list->get_data()), 'hub-fixture-list-items') !== false,
    'MCP tools/list exposes the plugin schema'
);
$check(
    strpos(wp_json_encode($list->get_data()), 'hub-fixture-create-item') !== false,
    'MCP tools/list exposes opted-in write schemas'
);
$execute = $call([
    'jsonrpc' => '2.0', 'id' => 12, 'method' => 'tools/call',
    'params' => ['name' => 'hub-fixture-list-items', 'arguments' => (object) []],
], $session);
$check(
    $execute->get_status() === 200 && strpos(wp_json_encode($execute->get_data()), 'example') !== false,
    'MCP tools/call returns fixture data through REST'
);
$terminate = new WP_REST_Request('DELETE', '/mcp/publishpress');
$terminate->set_header('Mcp-Session-Id', $session);
$terminate->set_header('MCP-Protocol-Version', '2025-11-25');
rest_do_request($terminate);
$expired = $call([
    'jsonrpc' => '2.0', 'id' => 13, 'method' => 'tools/list', 'params' => (object) [],
], $session);
$check($expired->get_status() === 404, 'A terminated session requires client reinitialization');
$reinitialized = $call([
    'jsonrpc' => '2.0', 'id' => 14, 'method' => 'initialize',
    'params' => [
        'protocolVersion' => '2025-11-25', 'capabilities' => (object) [],
        'clientInfo' => ['name' => 'publishpress-smoke', 'version' => '1.0.0'],
    ],
]);
$replacement = $reinitialized->get_headers()['Mcp-Session-Id'] ?? null;
$check(
    $reinitialized->get_status() === 200 && is_string($replacement) && $replacement !== $session,
    'The same authenticated account can initialize a fresh session without replacing credentials'
);
$refreshedList = $call([
    'jsonrpc' => '2.0', 'id' => 15, 'method' => 'tools/list', 'params' => (object) [],
], $replacement);
$check(
    $refreshedList->get_status() === 200
        && strpos(wp_json_encode($refreshedList->get_data()), 'hub-fixture-list-items') !== false,
    'Tool discovery works after client session recovery'
);
$terminate->set_header('Mcp-Session-Id', $replacement);
rest_do_request($terminate);

$setUser(['read' => true]);
$check(is_wp_error($tool->execute([])), 'Adapter tool execution enforces plugin permissions');
$request = new WP_REST_Request('POST', '/mcp/publishpress');
$request->set_body_params(['jsonrpc' => '2.0', 'id' => 1, 'method' => 'initialize', 'params' => []]);
$response = rest_do_request($request);
$check(in_array($response->get_status(), [401, 403], true), 'Actual REST endpoint denies subscribers');
$enabled = false;
$setUser(['manage_options' => true]);
$check(!$connection->canConnect(), 'Disabling the connection revokes access');
foreach ($connection->getActionCatalog() as $action) {
    wp_unregister_ability($action['name']);
}
$check($connection->getAbilityNames() === [], 'Unregistered plugin abilities disappear from selection');
echo "Completed $checks integration checks with WordPress $wp_version / MCP Adapter " . WP_MCP_VERSION . ".\n";
