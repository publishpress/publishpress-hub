<?php

declare(strict_types=1);


namespace Tests\Unit\Domain\Plugin;

use InvalidArgumentException;
use PublishPress\Hub\Domain\Plugin\Contracts\FreePluginInterface;
use PublishPress\Hub\Domain\Plugin\FreePlugin;
use PublishPress\Hub\Domain\Plugin\Plugin;
use Tests\NoTransactionWPTestCase;

/**
 * Unit tests for the FreePlugin domain entity.
 */
class FreePluginTest extends NoTransactionWPTestCase
{
    public function testConstructorWithValidParameters(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $this->assertEquals('Test Plugin', $plugin->getName());
        $this->assertEquals('test-plugin', $plugin->getSlug());
        $this->assertEquals('test-plugin.php', $plugin->getPluginFileName());
        $this->assertEquals('https://publishpress.com/pricing/test-plugin/', $plugin->getDetailsUrl());
    }

    public function testGetPath(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $this->assertEquals('test-plugin/test-plugin.php', $plugin->getPath());
    }

    public function testGetFamily(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $this->assertNull($plugin->getFamily());
    }

    public function testIsInstalledReturnsFalseIfNotInstalled(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin Not Installed',
            'test-plugin-not-installed',
            'test-plugin-not-installed.php',
            'https://publishpress.com/pricing/test-plugin-not-installed/'
        );

        $this->deletePluginFile($plugin);

        $this->assertFalse($plugin->isInstalled());
    }

    public function testIsInstalledReturnsTrueIfInstalled(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin Installed',
            'test-plugin-installed',
            'test-plugin-installed.php',
            'https://publishpress.com/pricing/test-plugin-installed/'
        );

        $this->createPluginFile($plugin, '1.0.0');

        $this->assertTrue($plugin->isInstalled());
    }

    public function testIsActiveReturnsFalseIfNotActive(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin Not Active',
            'test-plugin-not-active',
            'test-plugin-not-active.php',
            'https://publishpress.com/pricing/test-plugin-not-active/'
        );

        $this->assertFalse($plugin->isActive());
    }

    public function testIsActiveReturnsTrueIfActive(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin Active',
            'test-plugin-active',
            'test-plugin-active.php',
            'https://publishpress.com/pricing/test-plugin-active/'
        );

        $this->createPluginFile($plugin, '1.0.0');
        activate_plugin($plugin->getPath());

        $this->assertTrue($plugin->isActive());
    }

    public function testSetInstalled(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin Set Installed',
            'test-plugin-set-installed',
            'test-plugin-set-installed.php',
            'https://publishpress.com/pricing/test-plugin-set-installed/'
        );

        $this->createPluginFile($plugin, '1.0.3');

        $plugin->setInstalled('1.0.3', WP_PLUGIN_DIR . '/new-' . $plugin->getPath());

        $this->assertEquals('1.0.3', $plugin->getVersion());
        $this->assertEquals(WP_PLUGIN_DIR . '/new-test-plugin-set-installed/test-plugin-set-installed.php', $plugin->getPath());
    }

    private function createPluginFile(FreePluginInterface $plugin, string $version = '1.0.0'): void
    {
        $this->deletePluginFile($plugin);

        $pluginFilePath = WP_PLUGIN_DIR . '/' . $plugin->getPath();
        mkdir(dirname($pluginFilePath), 0755, true);

        $slug = $plugin->getSlug();
        $name = $plugin->getName();

        file_put_contents($pluginFilePath, '<?php
/**
 * Plugin Name: ' . $name . '
 * Plugin URI: https://publishpress.com/pricing/' . $slug . '/
 * Description: A test plugin for integration testing
 * Version: ' . $version . '
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL v2 or later
 * Text Domain: ' . $slug . '
 */
echo "' . $name . '";');
    }

    private function deletePluginFile(FreePluginInterface $plugin): void
    {
        $pluginFilePath = WP_PLUGIN_DIR . '/' . $plugin->getPath();

        if (file_exists($pluginFilePath)) {
            unlink($pluginFilePath);
            rmdir(dirname($pluginFilePath));
        }
    }
}
