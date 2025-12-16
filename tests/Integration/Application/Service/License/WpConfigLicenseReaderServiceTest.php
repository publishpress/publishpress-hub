<?php

/**
 * Integration tests for WpConfigLicenseReaderService.
 *
 * @package Tests\Integration\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Integration\Application\Service\License;

use PublishPress\Hub\Application\Service\License\WpConfigLicenseReaderService;
use PublishPress\Hub\Domain\Plugin\Repository\PluginFamilyRepository;
use Tests\NoTransactionWPTestCase;

class WpConfigLicenseReaderServiceTest extends NoTransactionWPTestCase
{
    private WpConfigLicenseReaderService $readerService;
    private PluginFamilyRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->repository = new PluginFamilyRepository();
        $this->registerTestPluginFamilies();
        $this->readerService = new WpConfigLicenseReaderService($this->repository);
    }

    protected function tearDown(): void
    {
        // Clean up constants
        if (defined(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT)) {
            // Can't undefine constants, but we can test with different values
        }
        parent::tearDown();
    }

    /**
     * Test reading global license constant.
     */
    public function testReadGlobalLicenseConstant(): void
    {
        // Define global constant
        if (!defined(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT)) {
            define(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT, 'global-test-key');
        }

        $licenseKeys = $this->readerService->readLicenseKeysFromConstants();

        $this->assertNotEmpty($licenseKeys);
        // Should have license keys for all plugin families
        $this->assertCount(2, $licenseKeys); // We registered 2 test families
        $this->assertEquals('global-test-key', $licenseKeys[1000]);
        $this->assertEquals('global-test-key', $licenseKeys[2000]);
    }

    /**
     * Test reading per-plugin license constant.
     */
    public function testReadPerPluginLicenseConstant(): void
    {
        // Define per-plugin constant
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . 'TEST_PLUGIN';
        if (!defined($perPluginConstant)) {
            define($perPluginConstant, 'plugin-specific-key');
        }

        $licenseKeys = $this->readerService->readLicenseKeysFromConstants();

        $this->assertNotEmpty($licenseKeys);
        $this->assertEquals('plugin-specific-key', $licenseKeys[1000]);
    }

    /**
     * Test per-plugin constant takes precedence over global.
     */
    public function testPerPluginConstantTakesPrecedence(): void
    {
        // Define both global and per-plugin constants
        if (!defined(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT)) {
            define(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT, 'global-key');
        }
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . 'TEST_PLUGIN';
        if (!defined($perPluginConstant)) {
            define($perPluginConstant, 'plugin-key');
        }

        $licenseKeys = $this->readerService->readLicenseKeysFromConstants();

        // Per-plugin constant should take precedence
        $this->assertEquals('plugin-key', $licenseKeys[1000]);
        // Other plugin should use global
        $this->assertEquals('global-key', $licenseKeys[2000]);
    }

    /**
     * Test reading returns empty array when no constants defined.
     */
    public function testReadReturnsEmptyWhenNoConstantsDefined(): void
    {
        // Don't define any constants
        $licenseKeys = $this->readerService->readLicenseKeysFromConstants();

        $this->assertIsArray($licenseKeys);
        $this->assertEmpty($licenseKeys);
    }

    /**
     * Test reading handles empty constant values.
     */
    public function testReadHandlesEmptyConstantValues(): void
    {
        if (!defined(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT)) {
            define(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT, '');
        }

        $licenseKeys = $this->readerService->readLicenseKeysFromConstants();

        // Empty values should be ignored
        $this->assertEmpty($licenseKeys);
    }

    /**
     * Register test plugin families.
     */
    private function registerTestPluginFamilies(): void
    {
        $pluginFamilies = require __DIR__ . '/../../../../src/Domain/Plugin/plugin-families.php';

        foreach ($pluginFamilies as $pluginFamily) {
            // Only register test plugins for testing
            if (in_array($pluginFamily['slug'], ['checklists', 'authors'], true)) {
                $family = $this->createPluginFamilyFromArray($pluginFamily);
                $this->repository->registerFamily($family);
            }
        }

        // Also register a test plugin family
        $testFamily = $this->createTestPluginFamily('test-plugin', 1000);
        $this->repository->registerFamily($testFamily);

        $testFamily2 = $this->createTestPluginFamily('test-plugin-2', 2000);
        $this->repository->registerFamily($testFamily2);
    }

    /**
     * Create plugin family from array.
     */
    private function createPluginFamilyFromArray(array $data): \PublishPress\Hub\Domain\Plugin\Entity\PluginFamily
    {
        $family = new \PublishPress\Hub\Domain\Plugin\Entity\PluginFamily(
            $data['name'],
            $data['slug'],
            $data['icon_file_name'],
            $data['description'],
            $data['changelog_url']
        );

        $freePlugin = new \PublishPress\Hub\Domain\Plugin\Entity\FreePlugin(
            $data['free_name'],
            $data['free_slug'],
            $data['free_file_name'],
            $data['free_details_url']
        );

        $proPlugin = new \PublishPress\Hub\Domain\Plugin\Entity\ProPlugin(
            $data['pro_name'],
            $data['pro_slug'],
            $data['pro_file_name'],
            $data['pro_details_url'],
            $data['edd_item_id']
        );

        $family->setFreePlugin($freePlugin);
        $family->setProPlugin($proPlugin);

        return $family;
    }

    /**
     * Create test plugin family.
     */
    private function createTestPluginFamily(string $slug, int $downloadId): \PublishPress\Hub\Domain\Plugin\Entity\PluginFamily
    {
        $family = new \PublishPress\Hub\Domain\Plugin\Entity\PluginFamily(
            'Test Plugin ' . $slug,
            $slug,
            'icon-' . $slug,
            'Test description',
            'https://example.com/changelog'
        );

        $freePlugin = new \PublishPress\Hub\Domain\Plugin\Entity\FreePlugin(
            'Test Free ' . $slug,
            $slug . '-free',
            $slug . '-free.php',
            'https://example.com/free'
        );

        $proPlugin = new \PublishPress\Hub\Domain\Plugin\Entity\ProPlugin(
            'Test Pro ' . $slug,
            $slug . '-pro',
            $slug . '-pro.php',
            'https://example.com/pro',
            $downloadId
        );

        $family->setFreePlugin($freePlugin);
        $family->setProPlugin($proPlugin);

        return $family;
    }
}

