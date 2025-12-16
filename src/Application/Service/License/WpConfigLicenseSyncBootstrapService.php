<?php

/**
 * Bootstrap service for syncing license keys from WordPress constants.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Environment\Contract\EnvironmentServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;

class WpConfigLicenseSyncBootstrapService implements BootableInterface
{
    use BootableTrait;

    private HooksServiceInterface $hooksService;
    private WpConfigLicenseSyncService $syncService;
    private EnvironmentServiceInterface $environmentService;

    /**
     * @since 1.0.0
     */
    public function __construct(
        HooksServiceInterface $hooksService,
        WpConfigLicenseSyncService $syncService,
        EnvironmentServiceInterface $environmentService
    ) {
        $this->hooksService = $hooksService;
        $this->syncService = $syncService;
        $this->environmentService = $environmentService;
    }

    /**
     * On load.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->addHooks();
    }

    /**
     * On init.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        // Sync will happen via admin_init hook
    }

    /**
     * Add hooks.
     *
     * @return void
     * @since 1.0.0
     */
    private function addHooks(): void
    {
        // Use priority 20 to ensure plugin families are registered first (they register on priority 10)
        $this->hooksService->addAction(AbstractHooks::ACTION_ADMIN_INIT, [$this, 'syncLicenses'], 20);
    }

    /**
     * Sync licenses from constants.
     *
     * @return void
     * @since 1.0.0
     */
    public function syncLicenses(): void
    {
        $this->syncService->syncLicenseKeysFromConstants();
    }
}

