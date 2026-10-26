<?php

/**
 * Verify the React mount, structured setup data and exposure-setting persistence.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

use PublishPress\Hub\Infrastructure\Container\AbstractDependencies;

if (PHP_SAPI !== 'cli' || count($argv) !== 3) {
    exit("Supply a disposable WordPress bootstrap and adapter directory.\n");
}
$_SERVER['HTTP_HOST'] = 'mcp-test.example';
require $argv[1];
require __DIR__ . '/bootstrap-hub.php';
require_once ABSPATH . 'wp-admin/includes/template.php';
if ($GLOBALS['table_prefix'] !== 'mcp_smoke_') {
    throw new RuntimeException('Use the isolated mcp_smoke_ fixture.');
}
require __DIR__ . '/fixture-abilities.php';
require_once dirname(__DIR__, 2) . '/src/Application/Contract/BootableInterface.php';
require_once dirname(__DIR__, 2) . '/src/Application/Traits/BootableTrait.php';
require_once dirname(__DIR__, 2) . '/src/Application/Service/Mcp/McpConnectionService.php';
require_once dirname(__DIR__, 2) . '/src/Admin/Page/McpPageController.php';
require $argv[2] . '/mcp-adapter.php';
add_action('wp_abilities_api_init', static function (): void {
    foreach (range(1, 12) as $index) {
        wp_register_ability('hub-fixture/page-' . $index, [
            'label' => 'Pagination action ' . $index, 'description' => 'Pagination fixture.',
            'category' => 'publishpress', 'input_schema' => ['type' => 'object'],
            'output_schema' => ['type' => 'object'], 'execute_callback' => static fn() => (object) [],
            'permission_callback' => '__return_true', 'meta' => ['annotations' => ['readonly' => true]],
        ]);
    }
    wp_register_ability('z-fixture/read-item', [
        'label' => 'Other plugin action', 'description' => 'Other plugin fixture.',
        'category' => 'publishpress', 'input_schema' => ['type' => 'object'],
        'output_schema' => ['type' => 'object'], 'execute_callback' => static fn() => (object) [],
        'permission_callback' => '__return_true', 'meta' => ['annotations' => ['readonly' => true]],
    ]);
});
wp_get_abilities();
$container = new \PublishPress\Hub\Infrastructure\Container\DependencyContainer(
    require dirname(__DIR__, 2) . '/src/definitions.php'
);
$connection = $container->get(AbstractDependencies::MCP_CONNECTION_SERVICE);
$controller = $container->get(AbstractDependencies::MCP_PAGE_CONTROLLER);
$setupService = $container->get(AbstractDependencies::MCP_SETUP_SERVICE);
$actor = new WP_User();
$actor->ID = 1;
$actor->allcaps = ['read' => true, 'manage_options' => true];
$GLOBALS['current_user'] = $actor;
$checks = 0;
$check = static function (bool $condition, string $message) use (&$checks): void {
    if (!$condition) {
        throw new RuntimeException($message);
    }
    ++$checks;
    echo "PASS: $message\n";
};
$keys = [$connection::ENABLED_OPTION, $connection::WRITE_ENABLED_OPTION, $connection::DISABLED_ABILITIES_OPTION];
$original = [];
foreach ($keys as $key) {
    $original[$key] = get_option($key, null);
}
try {
    $check(
        $connection === $container->get(AbstractDependencies::MCP_CONNECTION_SERVICE),
        'Container shares the MCP connection instance'
    );
    $controller->load();
    $controller->init();
    $check($controller->isInitialized(), 'Container-resolved controller follows the boot lifecycle');
    $names = array_column($connection->getActionCatalog(), 'name');
    $connection->saveExposureSettings(true, false, $names);
    $check(
        $connection->isEnabled() && !get_option($connection::WRITE_ENABLED_OPTION),
        'Connection saves read-only exposure'
    );
    $check(
        !in_array('hub-fixture/create-item', $connection->getAbilityNames(), true),
        'Saved read-only mode excludes mutations'
    );
    $selected = array_values(array_diff($names, ['hub-fixture/get-item']));
    update_option($connection::DISABLED_ABILITIES_OPTION, ['inactive-plugin/action']);
    $connection->saveExposureSettings(true, true, $selected);
    $check(
        in_array('hub-fixture/create-item', $connection->getAbilityNames(), true),
        'Saved write opt-in exposes mutations'
    );
    $check(
        !in_array('hub-fixture/get-item', $connection->getAbilityNames(), true),
        'Saved action exclusions are enforced'
    );
    $check(
        in_array('inactive-plugin/action', get_option($connection::DISABLED_ABILITIES_OPTION), true),
        'Inactive plugin exposure preferences are retained'
    );
    ob_start();
    $controller->showConnectionPage();
    $html = ob_get_clean();
    $clientIdentifier = $connection->getClientIdentifier();
    $endpointOverride = 'https://same-host.example/site-one/wp-json/mcp/publishpress';
    $overrideEndpoint = static function () use (&$endpointOverride): string {
        return $endpointOverride;
    };
    add_filter('rest_url', $overrideEndpoint);
    try {
        $firstIdentifier = $connection->getClientIdentifier();
        $check($firstIdentifier === $connection->getClientIdentifier(), 'Client identity is stable for repeated setup');
        $endpointOverride = 'https://same-host.example/site-two/wp-json/mcp/publishpress';
        $secondIdentifier = $connection->getClientIdentifier();
        $endpointOverride = 'https://another-host.example/site-one/wp-json/mcp/publishpress';
        $check(count(array_unique([$firstIdentifier, $secondIdentifier, $connection->getClientIdentifier()])) === 3,
            'Client identities distinguish different domains and subdirectory sites');
    } finally {
        remove_filter('rest_url', $overrideEndpoint);
    }
    $state = $setupService->getState();
    $check(strpos($html, 'id="publishpress-hub-mcp-page-container"') !== false
        && strpos($html, 'mcp-connection-settings') === false,
        'PHP renders only the React mount and loading placeholder');
    $manual = json_decode($state['clientSetups']['manual']['content'], true);
    $check(isset($manual['mcpServers'][$clientIdentifier]) && !isset($manual['mcpServers']['publishpress']),
        'Manual configuration uses the stable site-specific server name');
    $check(count($state['actionView']['actions']) === 10, 'Structured action data is bounded to ten controls per page');
    $check(is_bool($state['writesEnabled']), 'Structured connection data contains write access');
    $check(!empty($state['diagnostics']), 'Connection diagnostics are available as structured data');
    $check(array_keys($state['clientSetups']) === ['assistant', 'manual'], 'Client setup offers assisted and manual choices');
    $check($state['selectedClient'] !== 'desktop' && strpos($state['clientSetups']['assistant']['content'], 'Do not test writes during setup') !== false,
        'Assisted setup is selected and verifies without changing site data');
    $previousClient = get_user_option('publishpress_hub_mcp_client');
    update_user_option($actor->ID, 'publishpress_hub_mcp_client', 'desktop');
    $check($setupService->getState()['selectedClient'] === 'assistant', 'Legacy Desktop preferences fall back to assisted setup');
    if ($previousClient === false) {
        delete_user_option($actor->ID, 'publishpress_hub_mcp_client');
    } else {
        update_user_option($actor->ID, 'publishpress_hub_mcp_client', $previousClient);
    }
    $check(strpos($state['clientSetups']['assistant']['content'], rest_url('mcp/publishpress')) !== false,
        'Assisted setup prompt includes the current site endpoint');
    $check(strpos($state['clientSetups']['assistant']['content'], $clientIdentifier) !== false,
        'Assisted setup uses the same site-specific server name');
    $check(strpos($state['clientSetups']['manual']['content'], 'PASTE_YOUR_APPLICATION_PASSWORD_HERE') !== false,
        'Client configuration contains a password placeholder');
    $connection->saveExposureSettings(false, false, $names);
    $check($setupService->getState()['setupStage'] === 'disabled', 'Disabled state is provided to React');
    $pluginState = $setupService->getState(['plugin' => 'z-fixture']);
    $check(count($pluginState['actionView']['actions']) === 1
        && $pluginState['actionView']['actions'][0]['plugin'] === 'z-fixture', 'Plugin filters isolate action data');
    $check(count($setupService->getState(['action_page' => 2])['actionView']['actions']) === 5,
        'Second page returns only remaining plugin actions');
    $check(count($setupService->getState(['search' => 'Pagination action 12', 'behavior' => 'read'])['actionView']['actions']) === 1,
        'Search and behavior filters narrow returned actions');
    $connection->saveExposureSettings(true, true, $names);
    $connection->saveExposureSettings(true, true, [], ['hub-fixture/get-item']);
    $check(in_array('hub-fixture/get-item', $connection->getDisabledActions(), true)
        && !in_array('z-fixture/read-item', $connection->getDisabledActions(), true)
        && !in_array('hub-fixture/page-12', $connection->getDisabledActions(), true),
        'Saving a scoped page preserves selections on other pages and plugins');
    $connection->saveExposureSettings(false, false, [], []);
    $check(!in_array('z-fixture/read-item', $connection->getDisabledActions(), true),
        'Saving connection switches without displayed actions preserves plugin selections');
    $actor->allcaps = ['read' => true];
    ob_start();
    $controller->showConnectionPage();
    $check(ob_get_clean() === '', 'Unauthorized users cannot render connection settings');
    $check(
        !$container->get(AbstractDependencies::MCP_ADAPTER_INSTALLATION_SERVICE)->install(),
        'Unauthorized users cannot install the adapter through the service'
    );
    $actor->allcaps = ['read' => true, 'manage_publishpress_hub' => true];
    $check(
        !\PublishPress\Hub\Application\Service\Access\HubAccessService::canManageMcp(),
        'Hub viewer access does not grant MCP administration'
    );
    echo 'Registered actions: ' . count($names) . ".\n";
    echo "Completed $checks admin integration checks with WordPress $wp_version.\n";
} finally {
    foreach ($original as $key => $value) {
        if ($value === null) {
            delete_option($key);
        } else {
            update_option($key, $value);
        }
    }
}
