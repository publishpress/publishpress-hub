<?php

/**
 * Service for handling EDD plugin updates.
 *
 * @package PublishPress\Hub\Application\Service
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

class EddPluginUpdateService implements BootableInterface
{
    use BootableTrait;

    private const HUB_DOWNLOAD_ID = 404405;

    private string $apiUrl;
    private string $pluginFile;
    private string $pluginVersion;
    private int $eddItemId;
    private string $pluginAuthor;
    private string $updaterValue;
    private LicensePersistenceInterface $licensePersistence;
    private ?\Alledia\EDD_SL_Plugin_Updater $updater = null;

    /**
     * @since 1.0.0
     */
    public function __construct(
        string $apiUrl,
        string $pluginFile,
        string $pluginVersion,
        int $eddItemId,
        string $pluginAuthor,
        string $updaterValue,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->apiUrl = $apiUrl;
        $this->pluginFile = $pluginFile;
        $this->pluginVersion = $pluginVersion;
        $this->eddItemId = $eddItemId;
        $this->pluginAuthor = $pluginAuthor;
        $this->updaterValue = $updaterValue;
        $this->licensePersistence = $licensePersistence;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        add_action(
            AbstractHooks::ACTION_ADMIN_INIT,
            [$this, 'initializeUpdateManager']
        );
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Initialize the EDD plugin updater.
     *
     * @since 1.0.0
     */
    public function initializeUpdateManager(): void
    {
        if ($this->updater !== null) {
            return;
        }

        $licenseStatus = $this->getLicenseStatus();

        $updateConfig = [
            'version' => $this->pluginVersion,
            'license' => $this->updaterValue,
            'license_status' => $licenseStatus,
            'item_id' => $this->eddItemId,
            'author' => $this->pluginAuthor,
            'beta' => false,
            'wp_override' => true,
        ];

        $this->updater = new \Alledia\EDD_SL_Plugin_Updater(
            $this->apiUrl,
            $this->pluginFile,
            $updateConfig
        );
    }

    /**
     * Get the license status for the Hub plugin.
     *
     * @return string
     * @since 1.0.0
     */
    private function getLicenseStatus(): string
    {
        $isValid = $this->licensePersistence->getLicenseStatus(self::HUB_DOWNLOAD_ID);

        return $isValid ? 'valid' : 'invalid';
    }

    /**
     * Get the updater instance.
     *
     * @return \Alledia\EDD_SL_Plugin_Updater|null
     * @since 1.0.0
     */
    public function getUpdater(): ?\Alledia\EDD_SL_Plugin_Updater
    {
        return $this->updater;
    }
}
