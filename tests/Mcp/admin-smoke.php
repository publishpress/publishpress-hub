<?php

/**
 * Verify the real connection template and exposure-setting persistence.
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
    preg_match('/id="mcp-config-desktop"[^>]*>(.*?)<\/textarea>/s', $html, $desktopMatch);
    $desktopConfig = json_decode(html_entity_decode($desktopMatch[1] ?? '', ENT_QUOTES, 'UTF-8'), true);
    $check(isset($desktopConfig['mcpServers'][$clientIdentifier]) && !isset($desktopConfig['mcpServers']['publishpress']),
        'Manual configuration uses the stable site-specific server name');

    $check(
        substr_count($html, 'name="enabled_actions[]"') === 10,
        'Connection screen limits the current plugin page to ten action controls'
    );
    $check(strpos($html, 'name="mcp_writes_enabled"') !== false, 'Connection screen contains the write opt-in control');
    $check(strpos($html, 'Connection diagnostics') !== false, 'Connection diagnostics render successfully');
    $check(strpos($html, 'Connection setup checklist') !== false
        && strpos($html, 'dashicons-yes-alt') !== false
        && strpos($html, 'dashicons-dismiss') !== false,
        'Setup checklist distinguishes ready prerequisites from remaining client setup');
    $check(strpos($html, 'id="mcp-client-setup"') !== false
        && strpos($html, 'cli-usage.md#using-with-mcp-clients') === false
        && strpos($html, 'After you download') !== false
        && strpos($html, '@automattic/mcp-wordpress-remote@latest') !== false,
        'Client setup provides in-page app instructions and remote bridge configuration');

    $check(substr_count($html, 'name="mcp_client"') === 2
        && strpos($html, 'mcp-client-assistant') !== false
        && strpos($html, 'Download configuration') !== false,
        'Client setup offers app choices, assisted setup and downloadable configuration');
    preg_match('/id="mcp-config-assistant"[^>]*>(.*?)<\/textarea>/s', $html, $promptMatch);
    $check(strpos(html_entity_decode($promptMatch[1] ?? '', ENT_QUOTES, 'UTF-8'), rest_url('mcp/publishpress')) !== false,
        'Assisted setup prompt includes the current site endpoint');
    $check(strpos(html_entity_decode($promptMatch[1] ?? '', ENT_QUOTES, 'UTF-8'), $clientIdentifier) !== false,
        'Assisted setup uses the same site-specific server name');
    $check(strpos($html, 'PASTE_YOUR_APPLICATION_PASSWORD_HERE') !== false
        && strpos($html, 'Hub cannot detect whether your app has been configured.') !== false,
        'Client setup uses a password placeholder and does not claim external setup is complete');
    $connection->saveExposureSettings(false, false, $names);
    ob_start();
    $controller->showConnectionPage();
    $disabledHtml = ob_get_clean();
    $check(strpos($disabledHtml, 'Connection setup checklist') !== false
        && strpos($disabledHtml, 'id="mcp-client-setup"') !== false,
        'Setup guidance remains available before the connection is enabled');

    $_GET['plugin'] = 'z-fixture';
    ob_start();
    $controller->showConnectionPage();
    $pluginHtml = ob_get_clean();
    $check(strpos($pluginHtml, 'Other plugin action') !== false
        && strpos($pluginHtml, 'name="enabled_actions[]" value="hub-fixture/') === false,
        'Plugin tabs isolate action controls');
    $_GET = ['action_page' => '2'];
    ob_start();
    $controller->showConnectionPage();
    $pageHtml = ob_get_clean();
    $check(substr_count($pageHtml, 'name="enabled_actions[]"') === 5, 'Second page renders only remaining plugin actions');
    $_GET = ['search' => 'Pagination action 12', 'behavior' => 'read'];
    ob_start();
    $controller->showConnectionPage();
    $filteredHtml = ob_get_clean();
    $check(substr_count($filteredHtml, 'name="enabled_actions[]"') === 1,
        'Search and behavior filters narrow displayed actions');
    $_GET = [];
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
