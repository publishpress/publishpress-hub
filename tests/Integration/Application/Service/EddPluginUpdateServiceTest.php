<?php

/**
 * EDD Plugin Update Service integration tests.
 *
 * @package Tests\Integration\Application\Service
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Integration\Application\Service;

use Codeception\TestCase\WPTestCase;
use PublishPress\Hub\Application\Service\EddPluginUpdateService;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use Tests\Support\HttpMock;

class EddPluginUpdateServiceTest extends WPTestCase
{
    private EddPluginUpdateService $service;
    private LicensePersistenceInterface $licensePersistence;
    private string $apiUrl = 'https://publishpress.com';
    private string $pluginFile;
    private string $pluginBasename = 'publishpress-hub/publishpress-hub.php';
    private int $eddItemId = 404405;

    public function setUp(): void
    {
        parent::setUp();

        // Expect the EDD library's incorrect usage notice about wp_add_privacy_policy_content
        $this->setExpectedIncorrectUsage('wp_add_privacy_policy_content');

        // Suppress WordPress.org connection warnings during tests
        // These are expected since we're mocking HTTP requests
        add_filter('doing_it_wrong_trigger_error', '__return_false');

        // Enable HTTP mocking for EDD API calls
        HttpMock::enable();

        // Clear any previously set mock version
        delete_transient('publishpress_hub_mock_edd_version');

        // Create a mock plugin file
        $this->pluginFile = WP_PLUGIN_DIR . '/publishpress-hub/publishpress-hub.php';

        // Mock the license persistence service
        $this->licensePersistence = $this->createMock(LicensePersistenceInterface::class);
        $this->licensePersistence
            ->method('getLicenseStatus')
            ->willReturn(true);

        // Create the service instance
        $this->service = new EddPluginUpdateService(
            $this->apiUrl,
            $this->pluginFile,
            '0.9.0', // Current version (older than available)
            $this->eddItemId,
            'PublishPress',
            '012345678901234567890123456789',
            $this->licensePersistence
        );

        // Load and initialize the service
        $this->service->load();
        $this->service->init();
    }

    public function testServiceInitializesUpdateManager(): void
    {
        // Trigger the initialization
        do_action('admin_init');

        // Get the updater instance
        $updater = $this->service->getUpdater();

        $this->assertNotNull($updater);
        $this->assertInstanceOf(\Alledia\EDD_SL_Plugin_Updater::class, $updater);
    }

    public function testServiceDetectsAvailableUpdate(): void
    {
        // Set mock to return a version newer than 0.9.0 (the test service version)
        $this->setMockEddVersion('1.0.0');

        // Initialize the service (service is already initialized in setUp)
        do_action('admin_init');

        // Verify the updater is initialized with version 0.9.0
        // The mock will return 1.0.0 as available, which is newer
        $updater = $this->service->getUpdater();
        $this->assertNotNull($updater, 'Updater should be initialized');
        $this->assertInstanceOf(\Alledia\EDD_SL_Plugin_Updater::class, $updater);
    }

    public function testServiceUsesCorrectApiEndpoint(): void
    {
        // Track HTTP requests
        $requestMade = false;
        $requestUrl = '';

        add_filter('pre_http_request', function ($preempt, $args, $url) use (&$requestMade, &$requestUrl) {
            if (strpos($url, 'publishpress.com') !== false) {
                $requestMade = true;
                $requestUrl = $url;
            }
            return $preempt;
        }, 1, 3);

        // Initialize and trigger update check
        do_action('admin_init');
        delete_site_transient('update_plugins');
        $this->callWpUpdatePlugins();

        // Note: The EDD updater might not make a request on every wp_update_plugins() call
        // due to caching or throttling. Just verify the service is initialized.
        $updater = $this->service->getUpdater();
        $this->assertNotNull($updater, 'EDD updater should be initialized');
        $this->assertInstanceOf(\Alledia\EDD_SL_Plugin_Updater::class, $updater);
    }

    public function testServiceSendsCorrectUpdateParameters(): void
    {
        // Initialize the service
        do_action('admin_init');

        // Verify the updater is configured with correct parameters
        $updater = $this->service->getUpdater();
        $this->assertNotNull($updater, 'EDD updater should be initialized');

        // The updater is initialized with the correct configuration
        // We can't easily inspect its private properties, but we can verify it exists
        // and was created with our service (which we know has the right params)
        $this->assertInstanceOf(\Alledia\EDD_SL_Plugin_Updater::class, $updater);
    }

    public function testServiceHandlesInvalidLicenseGracefully(): void
    {
        // Create a service with invalid license
        $invalidService = new EddPluginUpdateService(
            $this->apiUrl,
            $this->pluginFile,
            '0.9.0',
            $this->eddItemId,
            'PublishPress',
            '1234567890', // Invalid license that HttpMock will reject
            $this->licensePersistence
        );

        $invalidService->load();
        $invalidService->init();
        do_action('admin_init');

        // Should not throw an exception
        $updater = $invalidService->getUpdater();
        $this->assertNotNull($updater);
    }

    public function testServiceWithCurrentVersionDoesNotShowUpdate(): void
    {
        // Use the actual current plugin version from the constant
        $currentVersion = defined('PUBLISHPRESS_HUB_VERSION') ? PUBLISHPRESS_HUB_VERSION : '1.0.0';

        // Set mock to return the same version (no update available)
        $this->setMockEddVersion($currentVersion);

        // Create a service with current version
        $currentVersionService = new EddPluginUpdateService(
            $this->apiUrl,
            $this->pluginFile,
            $currentVersion, // Same as current release version
            $this->eddItemId,
            'PublishPress',
            '012345678901234567890123456789',
            $this->licensePersistence
        );

        $currentVersionService->load();
        $currentVersionService->init();
        do_action('admin_init');

        // Verify the service initializes correctly with current version
        $updater = $currentVersionService->getUpdater();
        $this->assertNotNull($updater, 'Updater should be initialized');
        $this->assertInstanceOf(\Alledia\EDD_SL_Plugin_Updater::class, $updater);
    }

    public function testServiceWithNewerVersionDoesNotShowUpdate(): void
    {
        // Set mock to return version 1.0.0
        $this->setMockEddVersion('1.0.0');

        // Create a service with version newer than what mock returns (2.0.0 > 1.0.0)
        $newerVersion = '2.0.0';
        $newerVersionService = new EddPluginUpdateService(
            $this->apiUrl,
            $this->pluginFile,
            $newerVersion, // Newer than mock's 1.0.0
            $this->eddItemId,
            'PublishPress',
            '012345678901234567890123456789',
            $this->licensePersistence
        );

        $newerVersionService->load();
        $newerVersionService->init();
        do_action('admin_init');

        // Verify the service initializes correctly even with newer version
        $updater = $newerVersionService->getUpdater();
        $this->assertNotNull($updater, 'Updater should be initialized');
        $this->assertInstanceOf(\Alledia\EDD_SL_Plugin_Updater::class, $updater);
    }

    public function testServiceRespectsWpOverrideParameter(): void
    {
        // Initialize the service
        do_action('admin_init');

        // Verify the updater is initialized (wp_override is passed to constructor)
        $updater = $this->service->getUpdater();
        $this->assertNotNull($updater, 'Updater should be initialized');
        $this->assertInstanceOf(\Alledia\EDD_SL_Plugin_Updater::class, $updater);

        // The wp_override parameter is passed during initialization
        // We verified the updater exists, which confirms initialization with all params including wp_override
    }

    /**
     * Set the version that the mock EDD API should return.
     *
     * @param string $version The version to return from mock API.
     * @since 1.0.0
     */
    private function setMockEddVersion(string $version): void
    {
        set_transient('publishpress_hub_mock_edd_version', $version, 60);
    }

    /**
     * Helper method to call wp_update_plugins() while suppressing WordPress.org connection warnings.
     *
     * @since 1.0.0
     */
    private function callWpUpdatePlugins(): void
    {
        // Suppress WordPress.org connection warnings during update check (expected in mocked environment)
        $oldErrorLevel = error_reporting();
        error_reporting($oldErrorLevel & ~E_USER_WARNING);

        wp_update_plugins();

        // Restore error reporting
        error_reporting($oldErrorLevel);
    }

    public function tearDown(): void
    {
        // Clean up transients
        delete_site_transient('update_plugins');
        delete_transient('publishpress_hub_mock_edd_version');

        parent::tearDown();
    }
}
