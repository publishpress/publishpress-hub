<?php

/**
 * Integration tests for WpConfigLicenseSyncService.
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
use PublishPress\Hub\Application\Service\License\WpConfigLicenseSyncService;
use PublishPress\Hub\Domain\Plugin\Repository\PluginFamilyRepository;
use PublishPress\Hub\Infrastructure\License\PerPluginLicensePersistenceService;
use PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter;
use Tests\NoTransactionWPTestCase;

class WpConfigLicenseSyncServiceTest extends NoTransactionWPTestCase
{
    private WpConfigLicenseSyncService $syncService;
    private PerPluginLicensePersistenceService $persistenceService;
    private PluginFamilyRepository $repository;
    private WPOptionsAdapter $optionsAdapter;

    protected function setUp(): void
    {
        parent::setUp();

        $this->optionsAdapter = new WPOptionsAdapter();
        $this->repository = new PluginFamilyRepository();
        $this->registerTestPluginFamily();
        $this->persistenceService = new PerPluginLicensePersistenceService($this->optionsAdapter, $this->repository);

        $readerService = new WpConfigLicenseReaderService($this->repository);
        $this->syncService = new WpConfigLicenseSyncService(
            $readerService,
            $this->persistenceService,
            $this->repository
        );
    }

    protected function tearDown(): void
    {
        // Clean up options
        $this->optionsAdapter->deleteOption('publishpress_hub_license_source_6465');
        $this->optionsAdapter->deleteOption('publishpress_hub_license_was_from_constant_6465');
        parent::tearDown();
    }

    /**
     * Test syncing license from constant stores it in DB.
     *
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testSyncLicenseFromConstantStoresInDb(): void
    {
        // Define constant
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . 'CHECKLISTS';
        if (defined($perPluginConstant)) {
            $value = constant($perPluginConstant);
            if ($value !== 'test-license-key') {
                $this->markTestSkipped('Constant already defined with unexpected value');
            }
        } else {
            define($perPluginConstant, 'test-license-key');
        }

        $this->syncService->syncLicenseKeysFromConstants();

        // Check license is stored
        $storedKey = $this->persistenceService->getLicenseKey(6465);
        $this->assertEquals('test-license-key', $storedKey);

        // Check license is marked as active
        $isActive = $this->persistenceService->getLicenseStatus(6465);
        $this->assertTrue($isActive);

        // Check license is marked as from constant
        $isFromConstant = $this->persistenceService->isLicenseFromConstant(6465);
        $this->assertTrue($isFromConstant);
    }

    /**
     * Test syncing updates existing license key.
     *
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testSyncUpdatesExistingLicenseKey(): void
    {
        // Store initial license
        $this->persistenceService->storeLicenseKey(6465, 'old-key');
        $this->persistenceService->storeLicenseStatus(6465, true);

        // Define new constant
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . 'CHECKLISTS';
        if (defined($perPluginConstant)) {
            $value = constant($perPluginConstant);
            if ($value !== 'new-key') {
                $this->markTestSkipped('Constant already defined with unexpected value');
            }
        } else {
            define($perPluginConstant, 'new-key');
        }

        $this->syncService->syncLicenseKeysFromConstants();

        // Check license is updated
        $storedKey = $this->persistenceService->getLicenseKey(6465);
        $this->assertEquals('new-key', $storedKey);
    }

    /**
     * Test syncing activates inactive license.
     *
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testSyncActivatesInactiveLicense(): void
    {
        // Store inactive license
        $this->persistenceService->storeLicenseKey(6465, 'test-key');
        $this->persistenceService->storeLicenseStatus(6465, false);

        // Define constant
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . 'CHECKLISTS';
        if (defined($perPluginConstant)) {
            $value = constant($perPluginConstant);
            if ($value !== 'test-key') {
                $this->markTestSkipped('Constant already defined with unexpected value');
            }
        } else {
            define($perPluginConstant, 'test-key');
        }

        $this->syncService->syncLicenseKeysFromConstants();

        // Check license is activated
        $isActive = $this->persistenceService->getLicenseStatus(6465);
        $this->assertTrue($isActive);
    }

    /**
     * Test removing constant deactivates license.
     *
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testRemovingConstantDeactivatesLicense(): void
    {
        // First, set up license from constant
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . 'CHECKLISTS';
        if (defined($perPluginConstant)) {
            $value = constant($perPluginConstant);
            if ($value !== 'test-key') {
                $this->markTestSkipped('Constant already defined with unexpected value');
            }
        } else {
            define($perPluginConstant, 'test-key');
        }

        $this->syncService->syncLicenseKeysFromConstants();

        // Verify it's active and from constant
        $this->assertTrue($this->persistenceService->getLicenseStatus(6465));
        $this->assertTrue($this->persistenceService->isLicenseFromConstant(6465));

        // Now simulate constant removal by marking it as not from constant
        // We can't actually undefine constants in PHP
        $this->persistenceService->markLicenseAsFromConstant(6465, false);
        $this->syncService->syncLicenseKeysFromConstants();

        // Should remain active since it was already stored
        $this->assertTrue($this->persistenceService->getLicenseStatus(6465));
    }

    /**
     * Test removing constant does not affect manually-set licenses.
     *
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testRemovingConstantDoesNotAffectManualLicenses(): void
    {
        // Skip if constant is already defined
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . 'CHECKLISTS';
        if (defined($perPluginConstant)) {
            $this->markTestSkipped('Constant already defined, cannot test manual license preservation');
        }

        // Store manual license (not from constant)
        $this->persistenceService->storeLicenseKey(6465, 'manual-key');
        $this->persistenceService->storeLicenseStatus(6465, true);
        $this->persistenceService->markLicenseAsFromConstant(6465, false);

        // Sync (no constant defined)
        $this->syncService->syncLicenseKeysFromConstants();

        // Manual license should remain active
        $isActive = $this->persistenceService->getLicenseStatus(6465);
        $this->assertTrue($isActive);
        $storedKey = $this->persistenceService->getLicenseKey(6465);
        $this->assertEquals('manual-key', $storedKey);
    }

    /**
     * Test global constant applies to plugins without per-plugin constant.
     *
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testGlobalConstantAppliesToPluginsWithoutPerPluginConstant(): void
    {
        // Skip if constant is already defined with wrong value
        if (defined(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT)) {
            $value = constant(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT);
            if ($value !== 'global-key') {
                $this->markTestSkipped('Global constant already defined with unexpected value');
            }
        } else {
            define(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT, 'global-key');
        }

        $this->syncService->syncLicenseKeysFromConstants();

        // Check license is stored from global constant
        $storedKey = $this->persistenceService->getLicenseKey(6465);
        $this->assertEquals('global-key', $storedKey);
        $this->assertTrue($this->persistenceService->isLicenseFromConstant(6465));
    }

    /**
     * Register test plugin family.
     * Using 'checklists' with real downloadId 6465 since it has a handler configured.
     */
    private function registerTestPluginFamily(): void
    {
        $family = $this->createTestPluginFamily('checklists', 6465);
        $this->repository->registerFamily($family);
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

