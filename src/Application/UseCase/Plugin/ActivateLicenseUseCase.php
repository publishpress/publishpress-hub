<?php

/**
 * Use case for activating a license.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Application\Service\License\WpConfigLicenseReaderService;
use WP_REST_Request;

class ActivateLicenseUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicenseManagementService $licenseManagement;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        LicenseManagementService $licenseManagement
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licenseManagement = $licenseManagement;
    }

    /**
     * Activates a license for a plugin family and updates plugin status.
     *
     * @param WP_REST_Request $request Request containing familySlug and licenseKey parameters.
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
        $licenseKey = $request->get_param('licenseKey');

        // Get family with updated status to ensure we have current information
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        $plugin = $family->getProPlugin();
        $downloadId = $plugin->getDownloadId();

        // Check if license is from constant
        if ($this->licenseManagement->isLicenseFromConstant($downloadId)) {
            // Get constant value directly
            $constantLicenseKey = $this->getConstantLicenseKey($familySlug);

            if ($constantLicenseKey === null) {
                throw new LicenseInvalidException([
                    'message' => esc_html__(
                        'License constant is not defined in wp-config.php.',
                        'publishpress-hub'
                    ),
                ]);
            }

            // If no key provided, use constant value
            if (empty($licenseKey)) {
                $licenseKey = $constantLicenseKey;
            }

            // Verify provided key matches constant value
            if ($licenseKey !== $constantLicenseKey) {
                throw new LicenseInvalidException([
                    'message' => esc_html__(
                        'This license key is managed via wp-config.php constant. You cannot use a different license key.',
                        'publishpress-hub'
                    ),
                ]);
            }

            // Sync from constant (no API validation)
            $this->licenseManagement->syncLicenseFromConstant($licenseKey, $downloadId);
        } else {
            // Normal activation with API validation
            $this->licenseManagement->activateAndStoreLicense($licenseKey, $downloadId);
        }

        $this->pluginStatusService->updatePluginStatus($plugin);

        return [
            'slug' => esc_html($plugin->getSlug()),
            'licensed' => $plugin->isLicensed(),
        ];
    }

    /**
     * Get license key from WordPress constant.
     *
     * @param string $familySlug The plugin family slug
     * @return string|null The license key if constant is defined, null otherwise
     * @since 1.0.0
     */
    private function getConstantLicenseKey(string $familySlug): ?string
    {
        // Check per-plugin constant first (takes precedence)
        $perPluginConstant = WpConfigLicenseReaderService::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . strtoupper($familySlug);
        if (defined($perPluginConstant)) {
            $value = constant($perPluginConstant);
            if (!empty($value) && is_string($value)) {
                return trim($value);
            }
        }

        // Fall back to global constant
        if (defined(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT)) {
            $value = constant(WpConfigLicenseReaderService::GLOBAL_LICENSE_CONSTANT);
            if (!empty($value) && is_string($value)) {
                return trim($value);
            }
        }

        return null;
    }
}
