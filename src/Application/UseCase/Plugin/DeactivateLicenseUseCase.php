<?php

/**
 * Use case for deactivating a license.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class DeactivateLicenseUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicenseManagementService $licenseManagement;

    private LicensePersistenceInterface $licensePersistence;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        LicenseManagementService $licenseManagement,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licenseManagement = $licenseManagement;
        $this->licensePersistence = $licensePersistence;
    }

    /**
     * Deactivates a license for a plugin family and updates plugin status.
     *
     * @param WP_REST_Request $request Request containing familySlug parameter.
     * @throws PluginNotFoundException
     * @throws LicenseInvalidException
     * @throws PluginAlreadyInstalledException
     * @throws PluginInstallException
     * @throws LicenseException
     * @return array<string, mixed> The response data with plugin slug and license status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        $plugin = $this->getPlugin($familySlug);
        $licenseKey = $this->getLicenseKey($plugin);
        $this->guardAgainstWpConfigLicense($plugin);

        $this->licenseManagement->deactivateAndRemoveLicenseFromAllPlugins(
            $licenseKey,
            $plugin->getDownloadId()
        );

        $this->pluginStatusService->updatePluginStatus($plugin);

        return [
            'slug' => esc_html($plugin->getSlug()),
            'licensed' => $plugin->isLicensed(),
        ];
    }

    /**
     * Gets the plugin for a given family slug.
     *
     * @param string $familySlug The slug of the family.
     * @return ProPluginInterface The plugin.
     * @since 1.0.0
     */
    private function getPlugin(string $familySlug): ProPluginInterface
    {
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        return $family->getProPlugin();
    }

    /**
     * Gets the license key for a given plugin.
     *
     * @param ProPluginInterface $plugin The plugin.
     * @return string The license key.
     * @since 1.0.0
     */
    private function getLicenseKey(ProPluginInterface $plugin): string
    {
        $downloadId = $plugin->getDownloadId();
        $licenseKey = $this->licenseManagement->getStoredLicenseKey($downloadId);

        if (!$licenseKey) {
            throw new LicenseInvalidException([
                'plugin_slug' => esc_html($plugin->getSlug()),
                'error_message' => esc_html__('No license key found', 'publishpress-hub'),
            ]);
        }

        return $licenseKey;
    }

    /**
     * Prevent deactivating licenses managed in wp-config.php.
     *
     * @param ProPluginInterface $plugin The plugin.
     * @throws LicenseInvalidException
     * @since 1.0.0
     */
    private function guardAgainstWpConfigLicense(ProPluginInterface $plugin): void
    {
        if (!$this->licensePersistence->isLicenseFromConstant($plugin->getDownloadId())) {
            return;
        }

        throw new LicenseInvalidException([
            'plugin_slug' => esc_html($plugin->getSlug()),
            'error_message' => esc_html__(
                'This license key is managed in wp-config.php and cannot be deactivated from the Hub.',
                'publishpress-hub'
            ),
        ]);
    }
}
