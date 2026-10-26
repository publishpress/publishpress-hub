<?php

/**
 * Check the actual release ZIP for required MCP assets and development-file leaks.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli' || count($argv) !== 2) {
    exit("Supply a built PublishPress Hub ZIP.\n");
}
$zip = new ZipArchive();
if ($zip->open($argv[1]) !== true) {
    throw new RuntimeException('Cannot open the release ZIP.');
}
try {
    $prefix = 'publishpress-hub/';
    foreach (range(0, $zip->numFiles - 1) as $index) {
        $name = $zip->getNameIndex($index);
        if (strpos($name, $prefix) !== 0 || strpos($name, '../') !== false) {
            throw new RuntimeException('Unexpected release archive path.');
        }
        $relative = substr($name, strlen($prefix));
        if (strpos($relative, 'resources/dist/mcp/') === 0 && substr($relative, -1) !== '/') {
            throw new RuntimeException('Obsolete Desktop extension assets must not ship in the plugin.');
        }
        if (
            preg_match('#^(\.git|\.agents|\.codex|\.claude|\.cursor|bin|docs|tests|node_modules|resources/src)(/|$)#', $relative)
            || preg_match('#(^|/)([^/]+\.log|\.env(?:\.[^/]*)?|auth\.json|\.phpcs-plugin-review\.xml)$#', $relative)
        ) {
            throw new RuntimeException('Development or private file in release: ' . $relative);
        }
    }
    foreach (['publishpress-hub.php', 'src/Application/Service/Mcp/WordPressWriteService.php'] as $required) {
        if ($zip->locateName($prefix . $required) === false) {
            throw new RuntimeException('Required release file is missing: ' . $required);
        }
    }
    echo "Release package passed: no build scripts, frontend sources, agent configuration or logs.\n";
} finally {
    $zip->close();
}
