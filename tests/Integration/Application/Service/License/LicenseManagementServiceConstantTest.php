<?php

/**
 * Integration tests for LicenseManagementService with constant-based licenses.
 *
 * @package Tests\Integration\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Integration\Application\Service\License;

use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Domain\Plugin\Repository\PluginFamilyRepository;
use PublishPress\Hub\Infrastructure\License\LicenseApiService;
use PublishPress\Hub\Infrastructure\License\PerPluginLicensePersistenceService;
use PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter;
use PublishPress\Hub\Infrastructure\Edd\Subscription\EddSubscriptionAdapter;
use Tests\NoTransactionWPTestCase;

class LicenseManagementServiceConstantTest extends NoTransactionWPTestCase
{
    private LicenseManagementService $licenseManagement;
    private PerPluginLicensePersistenceService $persistenceService;
    private WPOptionsAdapter $optionsAdapter;

    protected function setUp(): void
    {
        parent::setUp();

        $this->optionsAdapter = new WPOptionsAdapter();
        $repository = new PluginFamilyRepository();
        $this->persistenceService = new PerPluginLicensePersistenceService($this->optionsAdapter, $repository);

        // Create EDD adapter - we won't actually call API in these tests since we're testing constant functionality
        $remoteService = new \PublishPress\Hub\Infrastructure\Remote\RemoteService(
            new \PublishPress\Hub\Infrastructure\WP\Remote\WPRemoteAdapter()
        );
        $cacheService = new \PublishPress\Hub\Infrastructure\Cache\CacheService(
            'test',
            new \PublishPress\Hub\Infrastructure\WP\Cache\WPCacheAdapter()
        );

        $eddAdapter = new EddSubscriptionAdapter(
            'https://publishpress.com',
            home_url(),
            'Test/1.0',
            $remoteService,
            $cacheService
        );

        $licenseApiService = new LicenseApiService($eddAdapter);

        $this->licenseManagement = new LicenseManagementService(
            $licenseApiService,
            $this->persistenceService
        );
    }

    protected function tearDown(): void
    {
        // Clean up
        $this->optionsAdapter->deleteOption('publishpress_hub_license_source_1000');
        $this->optionsAdapter->deleteOption('publishpress_hub_license_was_from_constant_1000');
        parent::tearDown();
    }

    /**
     * Test isLicenseFromConstant returns true for constant-based licenses.
     */
    public function testIsLicenseFromConstantReturnsTrue(): void
    {
        $this->persistenceService->storeLicenseKey(1000, 'test-key');
        $this->persistenceService->markLicenseFromConstant(1000, true);

        $isFromConstant = $this->licenseManagement->isLicenseFromConstant(1000);

        $this->assertTrue($isFromConstant);
    }

    /**
     * Test isLicenseFromConstant returns false for manual licenses.
     */
    public function testIsLicenseFromConstantReturnsFalseForManualLicenses(): void
    {
        $this->persistenceService->storeLicenseKey(1000, 'test-key');
        $this->persistenceService->markLicenseFromConstant(1000, false);

        $isFromConstant = $this->licenseManagement->isLicenseFromConstant(1000);

        $this->assertFalse($isFromConstant);
    }

    /**
     * Test syncLicenseFromConstant stores license without API validation.
     */
    public function testSyncLicenseFromConstantStoresWithoutApiValidation(): void
    {
        $this->licenseManagement->syncLicenseFromConstant('test-key', 1000);

        $storedKey = $this->persistenceService->getLicenseKey(1000);
        $this->assertEquals('test-key', $storedKey);

        $isActive = $this->persistenceService->getLicenseStatus(1000);
        $this->assertTrue($isActive);

        $isFromConstant = $this->persistenceService->isLicenseFromConstant(1000);
        $this->assertTrue($isFromConstant);
    }

    /**
     * Test deactivateAndRemoveLicense throws exception for constant-based licenses.
     */
    public function testDeactivateAndRemoveLicenseThrowsExceptionForConstantLicense(): void
    {
        $this->persistenceService->storeLicenseKey(1000, 'test-key');
        $this->persistenceService->markLicenseFromConstant(1000, true);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('wp-config.php constant');

        $this->licenseManagement->deactivateAndRemoveLicense('test-key', 1000);
    }
}

