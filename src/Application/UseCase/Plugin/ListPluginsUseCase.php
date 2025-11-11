<?php

/**
 * Use case for listing plugins.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginFamilyDto;
use PublishPress\Hub\Application\Service\License\Contract\LicenseManagementServiceInterface;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class ListPluginsUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicensePersistenceInterface $licensePersistence;

    private LicenseManagementServiceInterface $licenseManagement;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        LicensePersistenceInterface $licensePersistence,
        LicenseManagementServiceInterface $licenseManagement
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licensePersistence = $licensePersistence;
        $this->licenseManagement = $licenseManagement;
    }

    /**
     * Lists plugins.
     *
     * @param WP_REST_Request $request Request containing familySlug parameter.
     * @return array<string, mixed> The response data with plugin slug and installation status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $families = $this->pluginStatusService->getAllPluginFamiliesWithUpdatedStatus();

        $plugins = [];

        /** @var PluginFamilyInterface $family */
        foreach ($families as $family) {
            $freePlugin = $family->getFreePlugin();
            $proPlugin = $family->getProPlugin();

            $dto = new PluginFamilyDto();
            $dto->setName(esc_html($family->getName()))
                ->setSlug(esc_html($family->getSlug()))
                ->setIconPath(esc_html($family->getIconPath()))
                ->setDescription(esc_html($family->getDescription()))
                ->setChangelogUrl(esc_html($family->getChangelogUrl()))
                ->setFreePluginName(esc_html($freePlugin->getName()))
                ->setFreePluginSlug(esc_html($freePlugin->getSlug()))
                ->setFreePluginVersion(esc_html($freePlugin->getVersion()))
                ->setFreePluginDetailsUrl(esc_html($freePlugin->getDetailsUrl()))
                ->setFreePluginIsInstalled($freePlugin->isInstalled())
                ->setFreePluginIsActive($freePlugin->isActive())
                ->setFreePluginPath(esc_html($freePlugin->getPath()))
                ->setProPluginName(esc_html($proPlugin->getName()))
                ->setProPluginSlug(esc_html($proPlugin->getSlug()))
                ->setProPluginVersion(esc_html($proPlugin->getVersion()))
                ->setProPluginDetailsUrl(esc_html($proPlugin->getDetailsUrl()))
                ->setProPluginIsInstalled($proPlugin->isInstalled())
                ->setProPluginIsActive($proPlugin->isActive())
                ->setProPluginIsLicensed($proPlugin->isLicensed())
                ->setProPluginPath(esc_html($proPlugin->getPath()))
                ->setIsAnyVersionInstalled($family->hasAnyVersionInstalled())
                ->setIsAnyVersionActive($family->hasAnyVersionActive())
                ->setHasConflictingInstallations($family->hasConflictingInstallations());

            $expirationDate = $this->getLicenseExpirationDate($proPlugin);
            $dto->setProPluginLicenseExpirationDate($expirationDate);

            $pluginData = $dto->toArray();

            $licenseKey = $this->getLicenseKey($proPlugin);
            $pluginData['proPlugin']['licenseKey'] = esc_html($licenseKey);

            // Format expiration date for display using WordPress date format
            if (!empty($expirationDate)) {
                $pluginData['proPlugin']['licenseExpirationDateFormatted'] = $this->formatExpirationDate($expirationDate);
            }

            $plugins[] = $pluginData;
        }

        return [
            'success' => true,
            'plugins' => $plugins,
        ];
    }

    /**
     * Gets the license key for a given plugin.
     *
     * @param ProPluginInterface $proPlugin The plugin.
     * @return string The license key.
     * @since 1.0.0
     */
    private function getLicenseKey(ProPluginInterface $proPlugin): string
    {
        return $this->licensePersistence->getLicenseKey($proPlugin->getDownloadId()) ?? '';
    }

    /**
     * Gets the license expiration date for a given plugin.
     *
     * @param ProPluginInterface $proPlugin The plugin.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    private function getLicenseExpirationDate(ProPluginInterface $proPlugin): ?string
    {
        return $this->licenseManagement->getStoredLicenseExpirationDate($proPlugin->getDownloadId());
    }

    /**
     * Formats the expiration date using WordPress date format.
     *
     * @param string $expirationDate The expiration date in ISO format (YYYY-MM-DD).
     * @return string The formatted date.
     * @since 1.0.0
     */
    private function formatExpirationDate(string $expirationDate): string
    {
        $timestamp = strtotime($expirationDate);

        if ($timestamp === false) {
            return $expirationDate;
        }

        return date_i18n(get_option('date_format'), $timestamp);
    }
}
