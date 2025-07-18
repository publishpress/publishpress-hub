<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Plugin;

use PublishPress\Hub\Application\Service\PluginStatusService;
use PublishPress\Hub\Domain\Plugin\Entity\FreePlugin;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginChecker;
use Tests\NoTransactionWPTestCase;

/**
 * Integration tests for the FreePlugin domain entity with proper architecture.
 */
class FreePluginTest extends NoTransactionWPTestCase
{
    private PluginStatusService $pluginStatusService;

    protected function setUp(): void
    {
        parent::setUp();

        $pluginChecker = new WordPressPluginChecker();
        $this->pluginStatusService = new PluginStatusService($pluginChecker);
    }

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
        $this->assertEquals('test-plugin.php', $plugin->getFileName());
        $this->assertEquals('https://publishpress.com/pricing/test-plugin/', $plugin->getDetailsUrl());
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

    public function testInitialStateIsNotInstalled(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $this->assertFalse($plugin->isInstalled());
        $this->assertFalse($plugin->isActive());
        $this->assertFalse($plugin->isLicensed());
    }

    public function testSetInstalledState(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $plugin->setInstalled(true, '1.0.3', 'custom/path/test-plugin.php');

        $this->assertTrue($plugin->isInstalled());
        $this->assertEquals('1.0.3', $plugin->getVersion());
        $this->assertEquals('custom/path/test-plugin.php', $plugin->getPath());
    }

    public function testSetActiveState(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $plugin->setActive(true);

        $this->assertTrue($plugin->isActive());
    }

    public function testSetLicensedState(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $plugin->setLicensed(true);

        $this->assertTrue($plugin->isLicensed());
    }

    public function testRefreshPluginStatusFromWordPress(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        // Initially not installed
        $this->assertFalse($plugin->isInstalled());

        // Create the plugin file
        $this->createPluginFile($plugin, '1.0.0');

        // Refresh status from WordPress
        $this->pluginStatusService->refreshPluginStatus($plugin);

        // Should now be installed but not active
        $this->assertTrue($plugin->isInstalled());
        $this->assertFalse($plugin->isActive());
        $this->assertEquals('1.0.0', $plugin->getVersion());
    }

    public function testRefreshPluginStatusWhenActive(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin Active',
            'test-plugin-active',
            'test-plugin-active.php',
            'https://publishpress.com/pricing/test-plugin-active/'
        );

        // Create and activate the plugin
        $this->createPluginFile($plugin, '1.0.0');
        activate_plugin($plugin->getPath());

        // Refresh status from WordPress
        $this->pluginStatusService->refreshPluginStatus($plugin);

        // Should be both installed and active
        $this->assertTrue($plugin->isInstalled());
        $this->assertTrue($plugin->isActive());
    }

    public function testInfrastructureCheckWithoutUpdatingEntity(): void
    {
        $plugin = new FreePlugin(
            'Test Plugin Infrastructure',
            'test-plugin-infrastructure',
            'test-plugin-infrastructure.php',
            'https://publishpress.com/pricing/test-plugin-infrastructure/'
        );

        // Ensure no file exists initially
        $this->deletePluginFile($plugin);

        // Check without updating entity state
        $this->assertFalse($this->pluginStatusService->isPluginInstalled($plugin));
        $this->assertFalse($this->pluginStatusService->isPluginActive($plugin));

        // Entity state should remain unchanged
        $this->assertFalse($plugin->isInstalled());
        $this->assertFalse($plugin->isActive());

        // Create the plugin file
        $this->createPluginFile($plugin, '1.0.0');

        // Check again
        $this->assertTrue($this->pluginStatusService->isPluginInstalled($plugin));
        $this->assertFalse($this->pluginStatusService->isPluginActive($plugin));

        // Entity state should still be unchanged
        $this->assertFalse($plugin->isInstalled());
        $this->assertFalse($plugin->isActive());
    }

    private function createPluginFile(FreePlugin $plugin, string $version = '1.0.0'): void
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

    private function deletePluginFile(FreePlugin $plugin): void
    {
        $pluginFilePath = WP_PLUGIN_DIR . '/' . $plugin->getPath();

        if (file_exists($pluginFilePath)) {
            unlink($pluginFilePath);
            rmdir(dirname($pluginFilePath));
        }
    }
}
