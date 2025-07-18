<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Plugin;

use PublishPress\Hub\Application\Service\PluginStatusService;
use PublishPress\Hub\Domain\Plugin\Entity\ProPlugin;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginChecker;
use Tests\NoTransactionWPTestCase;

/**
 * Integration tests for the ProPlugin domain entity with proper architecture.
 */
class ProPluginTest extends NoTransactionWPTestCase
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
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
        );

        $this->assertEquals('Test Pro Plugin', $plugin->getName());
        $this->assertEquals('test-pro-plugin', $plugin->getSlug());
        $this->assertEquals('test-pro-plugin.php', $plugin->getFileName());
        $this->assertEquals('https://publishpress.com/pricing/test-pro-plugin/', $plugin->getDetailsUrl());
        $this->assertEquals('test-pro-plugin/test-pro-plugin.php', $plugin->getPath());
    }

    public function testGetFamily(): void
    {
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
        );

        $this->assertNull($plugin->getFamily());
    }

    public function testInitialStateIsNotInstalled(): void
    {
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
        );

        $this->assertFalse($plugin->isInstalled());
        $this->assertFalse($plugin->isActive());
        $this->assertFalse($plugin->isLicensed());
    }

    public function testSetInstalledState(): void
    {
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
        );

        $plugin->setInstalled(true, '1.0.3', 'custom/path/test-pro-plugin.php');

        $this->assertTrue($plugin->isInstalled());
        $this->assertEquals('1.0.3', $plugin->getVersion());
        $this->assertEquals('custom/path/test-pro-plugin.php', $plugin->getPath());
    }

    public function testSetActiveState(): void
    {
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
        );

        $plugin->setActive(true);

        $this->assertTrue($plugin->isActive());
    }

    public function testSetLicensedState(): void
    {
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
        );

        $plugin->setLicensed(true);

        $this->assertTrue($plugin->isLicensed());
    }

    public function testDownloadIdFunctionality(): void
    {
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
        );

        // Initial download ID should be 0
        $this->assertEquals(0, $plugin->getDownloadId());

        // Set download ID
        $plugin->setDownloadId(12345);

        $this->assertEquals(12345, $plugin->getDownloadId());
    }

    public function testRefreshPluginStatusFromWordPress(): void
    {
        $plugin = new ProPlugin(
            'Test Pro Plugin',
            'test-pro-plugin',
            'test-pro-plugin.php',
            'https://publishpress.com/pricing/test-pro-plugin/'
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
        $plugin = new ProPlugin(
            'Test Pro Plugin Active',
            'test-pro-plugin-active',
            'test-pro-plugin-active.php',
            'https://publishpress.com/pricing/test-pro-plugin-active/'
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
        $plugin = new ProPlugin(
            'Test Pro Plugin Infrastructure',
            'test-pro-plugin-infrastructure',
            'test-pro-plugin-infrastructure.php',
            'https://publishpress.com/pricing/test-pro-plugin-infrastructure/'
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

    private function createPluginFile(ProPlugin $plugin, string $version = '1.0.0'): void
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
 * Description: A test pro plugin for integration testing
 * Version: ' . $version . '
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL v2 or later
 * Text Domain: ' . $slug . '
 */
echo "' . $name . '";');
    }

    private function deletePluginFile(ProPlugin $plugin): void
    {
        $pluginFilePath = WP_PLUGIN_DIR . '/' . $plugin->getPath();

        if (file_exists($pluginFilePath)) {
            unlink($pluginFilePath);
            rmdir(dirname($pluginFilePath));
        }
    }
}
