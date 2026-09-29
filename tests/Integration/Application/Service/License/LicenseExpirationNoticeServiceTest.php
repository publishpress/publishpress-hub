<?php

/**
 * Tests for license expiration notice service.
 *
 * @package Tests\Integration\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Integration\Application\Service\License;

use Codeception\TestCase\WPTestCase;
use PublishPress\Hub\Application\Service\License\LicenseExpirationNoticeService;
use PublishPress\Hub\Application\Service\License\LicenseStatusStorageService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Domain\Plugin\Entity\PluginFamily;
use PublishPress\Hub\Domain\Plugin\Entity\ProPlugin;

class LicenseExpirationNoticeServiceTest extends WPTestCase
{
    private LicenseExpirationNoticeService $service;
    private LicenseStatusStorageService $licenseStatusStorage;
    private PluginStatusService $pluginStatusService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $this->licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([]);

        $this->pluginStatusService = $this->createMock(PluginStatusService::class);
        $this->pluginStatusService->method('getAllPluginFamiliesWithUpdatedStatus')->willReturn([]);

        $this->service = new LicenseExpirationNoticeService(
            $this->licenseStatusStorage,
            $this->pluginStatusService
        );
    }

    public function testInitRegistersHooks(): void
    {
        $this->service->init();

        $this->assertTrue(has_action('admin_init', [$this->service, 'handleDismissRequest']) !== false);
        $this->assertTrue(has_action('admin_notices', [$this->service, 'displayExpiredLicenseNotices']) !== false);
    }

    public function testGetExpiredLicensesReturnsEmptyArrayWhenNoExpiredLicenses(): void
    {
        $licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([]);

        $service = new LicenseExpirationNoticeService(
            $licenseStatusStorage,
            $this->pluginStatusService
        );

        $result = $service->getExpiredLicensesForNotice();

        $this->assertIsArray($result);
        $this->assertEmpty($result);
    }

    public function testGetExpiredLicensesReturnsFormattedData(): void
    {
        $downloadId = 12345;
        $pluginName = 'Test Pro Plugin';

        $licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([
            $downloadId => [
                'status' => 'expired',
                'expires' => '2024-01-01'
            ]
        ]);

        $proPlugin = $this->createMock(ProPlugin::class);
        $proPlugin->method('getDownloadId')->willReturn($downloadId);
        $proPlugin->method('getName')->willReturn($pluginName);

        $family = $this->createMock(PluginFamily::class);
        $family->method('getProPlugin')->willReturn($proPlugin);

        $pluginStatusService = $this->createMock(PluginStatusService::class);
        $pluginStatusService->method('getAllPluginFamiliesWithUpdatedStatus')->willReturn([$family]);

        $service = new LicenseExpirationNoticeService(
            $licenseStatusStorage,
            $pluginStatusService
        );

        $result = $service->getExpiredLicensesForNotice();

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertEquals($pluginName, $result[0]['name']);
        $this->assertEquals($downloadId, $result[0]['downloadId']);
    }

    public function testDisplayExpiredLicenseNoticesDoesNotDisplayWhenNoExpiredLicenses(): void
    {
        $_SERVER['REQUEST_URI'] = '/wp-admin/index.php';
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);
        set_current_screen('dashboard');

        ob_start();
        $this->service->displayExpiredLicenseNotices();
        $output = ob_get_clean();

        $this->assertEmpty($output);
    }

    public function testDisplayExpiredLicenseNoticesDisplaysSingleExpiredLicense(): void
    {
        $downloadId = 12345;
        $pluginName = 'Test Pro Plugin';

        $_SERVER['REQUEST_URI'] = '/wp-admin/index.php';
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);
        set_current_screen('dashboard');

        $this->licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $this->licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([
            $downloadId => [
                'status' => 'expired',
                'expires' => '2024-01-01'
            ]
        ]);

        $proPlugin = $this->createMock(ProPlugin::class);
        $proPlugin->method('getDownloadId')->willReturn($downloadId);
        $proPlugin->method('getName')->willReturn($pluginName);

        $family = $this->createMock(PluginFamily::class);
        $family->method('getProPlugin')->willReturn($proPlugin);

        $this->pluginStatusService = $this->createMock(PluginStatusService::class);
        $this->pluginStatusService->method('getAllPluginFamiliesWithUpdatedStatus')->willReturn([$family]);

        $service = new LicenseExpirationNoticeService(
            $this->licenseStatusStorage,
            $this->pluginStatusService
        );

        ob_start();
        $service->displayExpiredLicenseNotices();
        $output = ob_get_clean();

        $this->assertStringContainsString('notice notice-error', $output);
        $this->assertStringContainsString($pluginName, $output);
        $this->assertStringContainsString('Manage licenses', $output);
        $this->assertStringNotContainsString('is-dismissible', $output);
        $this->assertStringContainsString('pp-hub-admin-license-notice', $output);
        $this->assertStringNotContainsString('data-nonce=', $output);
    }

    public function testDisplayExpiredLicenseNoticesDisplaysMultipleExpiredLicenses(): void
    {
        $downloadId1 = 12345;
        $pluginName1 = 'Test Pro Plugin 1';
        $downloadId2 = 67890;
        $pluginName2 = 'Test Pro Plugin 2';

        $_SERVER['REQUEST_URI'] = '/wp-admin/index.php';
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);
        set_current_screen('dashboard');

        $this->licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $this->licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([
            $downloadId1 => ['status' => 'expired'],
            $downloadId2 => ['status' => 'expired']
        ]);

        $proPlugin1 = $this->createMock(ProPlugin::class);
        $proPlugin1->method('getDownloadId')->willReturn($downloadId1);
        $proPlugin1->method('getName')->willReturn($pluginName1);

        $proPlugin2 = $this->createMock(ProPlugin::class);
        $proPlugin2->method('getDownloadId')->willReturn($downloadId2);
        $proPlugin2->method('getName')->willReturn($pluginName2);

        $family1 = $this->createMock(PluginFamily::class);
        $family1->method('getProPlugin')->willReturn($proPlugin1);

        $family2 = $this->createMock(PluginFamily::class);
        $family2->method('getProPlugin')->willReturn($proPlugin2);

        $this->pluginStatusService = $this->createMock(PluginStatusService::class);
        $this->pluginStatusService->method('getAllPluginFamiliesWithUpdatedStatus')
            ->willReturn([$family1, $family2]);

        $service = new LicenseExpirationNoticeService(
            $this->licenseStatusStorage,
            $this->pluginStatusService
        );

        ob_start();
        $service->displayExpiredLicenseNotices();
        $output = ob_get_clean();

        $this->assertStringContainsString('notice notice-error', $output);
        $this->assertStringContainsString($pluginName1, $output);
        $this->assertStringContainsString($pluginName2, $output);
        $this->assertStringContainsString('2 plugin(s) have expired licenses', $output);
        $this->assertStringNotContainsString('is-dismissible', $output);
        $this->assertStringContainsString('pp-hub-admin-license-notice', $output);
        $this->assertStringNotContainsString('data-nonce=', $output);
    }

    public function testDisplayExpiredLicenseNoticesDisplaysWhenDismissed(): void
    {
        $downloadId = 12345;
        $pluginName = 'Test Pro Plugin';

        $_SERVER['REQUEST_URI'] = '/wp-admin/index.php';
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);
        set_current_screen('dashboard');

        $this->licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $this->licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([
            $downloadId => ['status' => 'expired']
        ]);

        $proPlugin = $this->createMock(ProPlugin::class);
        $proPlugin->method('getDownloadId')->willReturn($downloadId);
        $proPlugin->method('getName')->willReturn($pluginName);

        $family = $this->createMock(PluginFamily::class);
        $family->method('getProPlugin')->willReturn($proPlugin);

        $this->pluginStatusService = $this->createMock(PluginStatusService::class);
        $this->pluginStatusService->method('getAllPluginFamiliesWithUpdatedStatus')->willReturn([$family]);

        $service = new LicenseExpirationNoticeService(
            $this->licenseStatusStorage,
            $this->pluginStatusService
        );

        // Generate hash the same way the service does: downloadId:expirationDate
        // Since expirationDate is not set in the mock, it will be empty
        $expiredLicenses = $service->getExpiredLicensesForNotice();
        $hashData = [];
        foreach ($expiredLicenses as $license) {
            $hashData[] = $license['downloadId'] . ':' . ($license['expirationDate'] ?? '');
        }
        sort($hashData);
        $expectedHash = md5(implode('|', $hashData));

        // Set dismissed state with timestamp (not expired)
        $dismissalData = [
            'hash' => $expectedHash,
            'dismissed_at' => time(),
            'expires_at' => time() + (30 * DAY_IN_SECONDS)
        ];
        update_user_meta($userId, LicenseExpirationNoticeService::DISMISS_META_KEY, $dismissalData);

        ob_start();
        $service->displayExpiredLicenseNotices();
        $output = ob_get_clean();

        $this->assertStringContainsString('notice notice-error', $output);
        $this->assertStringContainsString($pluginName, $output);
    }

    public function testDisplayExpiredLicenseNoticesRedisplaysAfterDismissalExpires(): void
    {
        $downloadId = 12345;
        $pluginName = 'Test Pro Plugin';

        $_SERVER['REQUEST_URI'] = '/wp-admin/index.php';
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);
        set_current_screen('dashboard');

        $this->licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $this->licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([
            $downloadId => ['status' => 'expired']
        ]);

        $proPlugin = $this->createMock(ProPlugin::class);
        $proPlugin->method('getDownloadId')->willReturn($downloadId);
        $proPlugin->method('getName')->willReturn($pluginName);

        $family = $this->createMock(PluginFamily::class);
        $family->method('getProPlugin')->willReturn($proPlugin);

        $this->pluginStatusService = $this->createMock(PluginStatusService::class);
        $this->pluginStatusService->method('getAllPluginFamiliesWithUpdatedStatus')->willReturn([$family]);

        $service = new LicenseExpirationNoticeService(
            $this->licenseStatusStorage,
            $this->pluginStatusService
        );

        // Set dismissed state with expired timestamp (more than 1 month ago)
        $dismissalData = [
            'hash' => md5((string) $downloadId),
            'dismissed_at' => time() - (31 * DAY_IN_SECONDS), // 31 days ago
            'expires_at' => time() - DAY_IN_SECONDS // Expired yesterday
        ];
        update_user_meta($userId, LicenseExpirationNoticeService::DISMISS_META_KEY, $dismissalData);

        ob_start();
        $service->displayExpiredLicenseNotices();
        $output = ob_get_clean();

        // Notice should display because dismissal has expired
        $this->assertStringContainsString('notice notice-error', $output);
        $this->assertStringContainsString($pluginName, $output);
    }

    public function testDisplayExpiredLicenseNoticesRedisplaysWhenLicensesChange(): void
    {
        $downloadId1 = 12345;
        $downloadId2 = 67890;
        $pluginName1 = 'Test Pro Plugin 1';
        $pluginName2 = 'Test Pro Plugin 2';

        $_SERVER['REQUEST_URI'] = '/wp-admin/index.php';
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);
        set_current_screen('dashboard');

        // Initially dismissed for plugin 1 only (with valid timestamp)
        $dismissalData = [
            'hash' => md5((string) $downloadId1),
            'dismissed_at' => time(),
            'expires_at' => time() + (30 * DAY_IN_SECONDS)
        ];
        update_user_meta($userId, LicenseExpirationNoticeService::DISMISS_META_KEY, $dismissalData);

        // Now plugin 2 also expired
        $this->licenseStatusStorage = $this->createMock(LicenseStatusStorageService::class);
        $this->licenseStatusStorage->method('getAllExpiredLicenses')->willReturn([
            $downloadId1 => ['status' => 'expired'],
            $downloadId2 => ['status' => 'expired']
        ]);

        $proPlugin1 = $this->createMock(ProPlugin::class);
        $proPlugin1->method('getDownloadId')->willReturn($downloadId1);
        $proPlugin1->method('getName')->willReturn($pluginName1);

        $proPlugin2 = $this->createMock(ProPlugin::class);
        $proPlugin2->method('getDownloadId')->willReturn($downloadId2);
        $proPlugin2->method('getName')->willReturn($pluginName2);

        $family1 = $this->createMock(PluginFamily::class);
        $family1->method('getProPlugin')->willReturn($proPlugin1);

        $family2 = $this->createMock(PluginFamily::class);
        $family2->method('getProPlugin')->willReturn($proPlugin2);

        $this->pluginStatusService = $this->createMock(PluginStatusService::class);
        $this->pluginStatusService->method('getAllPluginFamiliesWithUpdatedStatus')
            ->willReturn([$family1, $family2]);

        $service = new LicenseExpirationNoticeService(
            $this->licenseStatusStorage,
            $this->pluginStatusService
        );

        ob_start();
        $service->displayExpiredLicenseNotices();
        $output = ob_get_clean();

        // Notice should display because licenses changed
        $this->assertStringContainsString('notice notice-error', $output);
        $this->assertStringContainsString($pluginName1, $output);
        $this->assertStringContainsString($pluginName2, $output);
    }

    public function testHandleDismissRequestIgnoresWhenNoParameter(): void
    {
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);

        // No dismiss parameter
        $this->service->handleDismissRequest();

        // Should not set dismissal
        $dismissed = get_user_meta($userId, LicenseExpirationNoticeService::DISMISS_META_KEY, true);
        $this->assertEmpty($dismissed);
    }

    public function testHandleDismissRequestIgnoresInvalidNonce(): void
    {
        $userId = $this->factory()->user->create(['role' => 'administrator']);
        $user = get_user_by('id', $userId);
        $user->add_cap('manage_publishpress_hub');
        wp_set_current_user($userId);

        $_GET[LicenseExpirationNoticeService::DISMISS_PARAM] = '1';
        $_GET['nonce'] = 'invalid_nonce';

        $this->service->handleDismissRequest();

        // Should not set dismissal
        $dismissed = get_user_meta($userId, LicenseExpirationNoticeService::DISMISS_META_KEY, true);
        $this->assertEmpty($dismissed);
    }

    public function testHandleDismissRequestIgnoresWhenNoCapability(): void
    {
        $userId = $this->factory()->user->create(['role' => 'subscriber']);
        wp_set_current_user($userId);

        $_GET[LicenseExpirationNoticeService::DISMISS_PARAM] = '1';
        $_GET['nonce'] = wp_create_nonce(LicenseExpirationNoticeService::DISMISS_NONCE_ACTION);

        $this->service->handleDismissRequest();

        // Should not set dismissal
        $dismissed = get_user_meta($userId, LicenseExpirationNoticeService::DISMISS_META_KEY, true);
        $this->assertEmpty($dismissed);
    }
}
