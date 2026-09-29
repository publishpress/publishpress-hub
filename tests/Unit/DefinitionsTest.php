<?php

declare(strict_types=1);

namespace {
    if (! defined('PUBLISHPRESS_HUB_PATH')) {
        define('PUBLISHPRESS_HUB_PATH', dirname(__DIR__, 2) . '/');
    }

    if (! defined('PUBLISHPRESS_HUB_URL')) {
        define('PUBLISHPRESS_HUB_URL', 'https://example.test/wp-content/plugins/publishpress-hub/');
    }

    if (! defined('PUBLISHPRESS_HUB_SRC_PATH')) {
        define('PUBLISHPRESS_HUB_SRC_PATH', dirname(__DIR__, 2) . '/src/');
    }

    if (! defined('PUBLISHPRESS_HUB_VERSION')) {
        define('PUBLISHPRESS_HUB_VERSION', '1.0.0-test');
    }

    if (! defined('PUBLISHPRESS_HUB_PLUGIN_FILE')) {
        define('PUBLISHPRESS_HUB_PLUGIN_FILE', dirname(__DIR__, 2) . '/publishpress-hub.php');
    }

    if (! defined('HOUR_IN_SECONDS')) {
        define('HOUR_IN_SECONDS', 3600);
    }
}

namespace PublishPress\Hub {
    if (! function_exists('PublishPress\Hub\home_url')) {
        function home_url(): string
        {
            return 'https://example.test';
        }
    }

    if (! function_exists('PublishPress\Hub\apply_filters')) {
        function apply_filters(string $hookName, $value)
        {
            if ($hookName === 'publishpress_hub_allowed_download_domains') {
                $value[] = 'attacker.example.com';
            }

            return $value;
        }
    }
}

namespace PublishPress\Hub\Tests\Unit {
    use Codeception\Test\Unit;
    use PublishPress\Hub\Infrastructure\Container\AbstractDependencies;

    class DefinitionsTest extends Unit
    {
        public function testAllowedDownloadDomainsCannotBeExtendedByFilter(): void
        {
            $definitions = require dirname(__DIR__, 2) . '/src/definitions.php';

            $this->assertSame(
                [
                    'publishpress.com',
                    'pkg.publishpress.com',
                    'wordpress.org',
                    'downloads.wordpress.org',
                ],
                $definitions[AbstractDependencies::ALLOWED_DOWNLOAD_DOMAINS]
            );
        }
    }
}
