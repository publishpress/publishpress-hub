<?php

/**
 * Service for bootstrapping the Hub plugin.
 *
 * @package PublishPress\Hub\Application\Service
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\AccessInterface;
use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Entity\FreePlugin;
use PublishPress\Hub\Domain\Plugin\Entity\PluginFamily;
use PublishPress\Hub\Domain\Plugin\Entity\ProPlugin;
use PublishPress\Hub\Infrastructure\Debug\DebugLogService;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Remote\HttpDebugger;

class HubBootstrapService implements BootableInterface
{
    use BootableTrait;

    /**
     * @var array<string, BootableInterface>
     */
    private array $servicesToInit = [];

    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    private AccessInterface $accessService;

    private DebugLogService $debugLogService;

    private string $eddSubscriptionApiUrl;

    /**
     * @var array<string>
     */
    private array $allowedDownloadDomains;

    /**
     * @param BootableInterface[] $servicesToInit
     * @param PluginFamilyRepositoryInterface $pluginFamilyRepository
     * @param AccessInterface $accessService
     * @param DebugLogService $debugLogService
     * @param string $eddSubscriptionApiUrl
     * @param array<string> $allowedDownloadDomains
     * @since 1.0.0
     */
    public function __construct(
        array $servicesToInit,
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        AccessInterface $accessService,
        DebugLogService $debugLogService,
        string $eddSubscriptionApiUrl,
        array $allowedDownloadDomains
    ) {
        $this->servicesToInit = $servicesToInit;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->accessService = $accessService;
        $this->debugLogService = $debugLogService;
        $this->eddSubscriptionApiUrl = $eddSubscriptionApiUrl;
        $this->allowedDownloadDomains = $allowedDownloadDomains;
    }

    /**
     * Loads the Hub Bootstrap service, preparing it for being initialized.
     *
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->debugLogService->migrateLegacyPublicLog();
        HttpDebugger::setLogFilePath($this->debugLogService->getLogFilePath());
        HttpDebugger::setAllowedRequestUrls($this->eddSubscriptionApiUrl, $this->allowedDownloadDomains);
        HttpDebugger::initialize();

        $this->addHooks();
        $this->loadServices();

        $this->pluginFamilyRepository->reset();
    }

    /**
     * Initializes the Hub Bootstrap service, making it ready for use.
     *
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        $this->initServices();
        $this->registerPluginFamilies();
    }

    /**
     * Adds hooks to the Hub Bootstrap service.
     *
     * @since 1.0.0
     */
    private function addHooks(): void
    {
        add_action(AbstractHooks::ACTION_INIT, [$this, 'init']);
    }

    /**
     * Loads the services for the Hub Bootstrap.
     *
     * @since 1.0.0
     */
    private function loadServices(): void
    {
        foreach ($this->servicesToInit as $service) {
            // Skip admin controllers if user can't view the Hub
            if ($this->shouldSkipAdminService($service)) {
                continue;
            }

            $service->load();
        }
    }

    /**
     * Initializes the services for the Hub Bootstrap.
     *
     * @since 1.0.0
     */
    private function initServices(): void
    {
        foreach ($this->servicesToInit as $service) {
            // Skip admin controllers if user can't view the Hub
            if ($this->shouldSkipAdminService($service)) {
                continue;
            }

            $service->init();
        }
    }

    /**
     * Check if an admin service should be skipped based on user permissions.
     *
     * @param BootableInterface $service
     * @return bool
     * @since 1.0.0
     */
    private function shouldSkipAdminService(BootableInterface $service): bool
    {
        // Only check in admin area
        if (!is_admin()) {
            return false;
        }

        // Check if this service is in the Hub\Admin namespace (admin controllers)
        $serviceClass = get_class($service);
        $isAdminService = strpos($serviceClass, 'PublishPress\\Hub\\Admin\\') === 0;

        if ($isAdminService) {
            return !$this->accessService->canUserViewHub();
        }

        return false;
    }

    /**
     * Registers the plugin families for the Hub Bootstrap.
     *
     * @since 1.0.0
     */
    private function registerPluginFamilies(): void
    {
        $pluginFamilies = require __DIR__ . '/../../Domain/Plugin/plugin-families.php';

        foreach ($pluginFamilies as $pluginFamily) {
            $family = $this->createPluginFamily($pluginFamily);
            $this->pluginFamilyRepository->registerFamily($family);
        }
    }

    /**
     * Creates a PluginFamily entity from configuration data.
     *
     * @param array<string, mixed> $pluginFamily
     * @return PluginFamily
     */
    private function createPluginFamily(array $pluginFamily): PluginFamily
    {
        $family = new PluginFamily(
            $pluginFamily['name'],
            $pluginFamily['slug'],
            $pluginFamily['icon_file_name'],
            $pluginFamily['description'],
            $pluginFamily['changelog_url']
        );

        $freePlugin = $this->createFreePlugin($pluginFamily, $family);
        $proPlugin = $this->createProPlugin($pluginFamily, $family);

        $family->setFreePlugin($freePlugin);
        $family->setProPlugin($proPlugin);

        return $family;
    }

    /**
     * Creates a FreePlugin entity from configuration data.
     *
     * @param array<string, mixed> $pluginFamily
     * @param PluginFamily $family
     * @return FreePlugin
     */
    private function createFreePlugin(array $pluginFamily, PluginFamily $family): FreePlugin
    {
        $freePlugin = new FreePlugin(
            $pluginFamily['free_name'],
            $pluginFamily['free_slug'],
            $pluginFamily['free_file_name'],
            $pluginFamily['free_details_url']
        );

        $freePlugin->setFamily($family);

        return $freePlugin;
    }

    /**
     * Creates a ProPlugin entity from configuration data.
     *
     * @param array<string, mixed> $pluginFamily
     * @param PluginFamily $family
     * @return ProPlugin
     */
    private function createProPlugin(array $pluginFamily, PluginFamily $family): ProPlugin
    {
        $proPlugin = new ProPlugin(
            $pluginFamily['pro_name'],
            $pluginFamily['pro_slug'],
            $pluginFamily['pro_file_name'],
            $pluginFamily['pro_details_url'],
            $pluginFamily['edd_item_id']
        );

        $proPlugin->setFamily($family);

        return $proPlugin;
    }
}
