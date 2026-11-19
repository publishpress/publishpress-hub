<?php

/**
 * Load Hub classes and dependency definitions in the isolated WordPress fixture.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

// phpcs:disable PSR1.Files.SideEffects -- This test bootstrap deliberately loads classes and defines fixture constants.

$hubRoot = dirname(__DIR__, 2) . '/';
require_once $hubRoot . 'lib/vendor/publishpress/psr-container/lib/autoload.php';
spl_autoload_register(static function (string $class) use ($hubRoot): void {
    $prefix = 'PublishPress\\Hub\\';
    if (strpos($class, $prefix) === 0) {
        $file = $hubRoot . 'src/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
        if (is_file($file)) {
            require_once $file;
        }
    }
});
foreach (
    [
    'PUBLISHPRESS_HUB_PATH' => $hubRoot,
    'PUBLISHPRESS_HUB_SRC_PATH' => $hubRoot . 'src/',
    'PUBLISHPRESS_HUB_URL' => 'https://mcp-test.example/wp-content/plugins/publishpress-hub/',
    'PUBLISHPRESS_HUB_VERSION' => '1.2.0',
    'PUBLISHPRESS_HUB_PLUGIN_FILE' => $hubRoot . 'publishpress-hub.php',
    ] as $constant => $value
) {
    if (!defined($constant)) {
        define($constant, $value);
    }
}
