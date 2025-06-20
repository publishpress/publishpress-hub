<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Plugin;

/**
 * Plugin Bootstrap Service.
 *
 * This service is responsible for defining, instantiating, and registering
 * all PublishPress plugins in the hub following DDD principles.
 *
 * @since 1.0.0
 */
class PluginBootstrapService implements ServiceInterface
{
    /**
     * Whether the service is initialized.
     *
     * @since 1.0.0
     */
    private bool $initialized = false;

    /**
     * The plugin repository.
     *
     * @since 1.0.0
     */
    private PluginRepositoryInterface $pluginRepository;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct(PluginRepositoryInterface $pluginRepository)
    {
        $this->pluginRepository = $pluginRepository;
    }

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        if ($this->initialized) {
            return $this;
        }

        $this->initialized = true;

        $this->bootstrapPlugins();

        return $this;
    }

    /**
     * Check if the service is initialized.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Bootstrap all PublishPress plugins.
     *
     * This method defines all plugins and registers them in the repository.
     * Each plugin will check if it's installed and register itself accordingly.
     *
     * @since 1.0.0
     */
    private function bootstrapPlugins(): void
    {
        $pluginDefinitions = $this->getPluginDefinitions();

        foreach ($pluginDefinitions as $definition) {
            $plugin = new Plugin(
                $definition['name'],
                $definition['slugFree'],
                $definition['slugPro'],
                $definition['iconFile']
            );

            $this->pluginRepository->register($plugin);
        }
    }

    /**
     * Get the definitions of all PublishPress plugins.
     *
     * This method contains the configuration of all PublishPress plugins.
     *
     * @since 1.0.0
     * @return array
     */
    private function getPluginDefinitions(): array
    {
        return [
            [
                'name' => 'PublishPress Checklists',
                'slugFree' => 'publishpress-checklists',
                'slugPro' => 'publishpress-checklists-pro',
                'iconFile' => 'icon-checklists',
            ],
            [
                'name' => 'PublishPress Permissions',
                'slugFree' => 'press-permit-core',
                'slugPro' => 'presspermit-pro',
                'iconFile' => 'icon-permissions',
            ],
            [
                'name' => 'PublishPress Authors',
                'slugFree' => 'publishpress-authors',
                'slugPro' => 'publishpress-authors-pro',
                'iconFile' => 'icon-authors',
            ],
            [
                'name' => 'PublishPress Blocks',
                'slugFree' => 'advanced-gutenberg',
                'slugPro' => 'advanced-gutenberg-pro',
                'iconFile' => 'icon-blocks',
            ],
            [
                'name' => 'PublishPress Capabilities',
                'slugFree' => 'capability-manager-enhanced',
                'slugPro' => 'capabilities-pro',
                'iconFile' => 'icon-capabilities',
            ],
            [
                'name' => 'PublishPress Future',
                'slugFree' => 'post-expirator',
                'slugPro' => 'publishpress-future-pro',
                'iconFile' => 'icon-future',
            ],
            [
                'name' => 'PublishPress Planner',
                'slugFree' => 'publishpress',
                'slugPro' => 'publishpress-pro',
                'iconFile' => 'icon-planner',
            ],
            [
                'name' => 'PublishPress Revisions',
                'slugFree' => 'revisionary',
                'slugPro' => 'revisionary-pro',
                'iconFile' => 'icon-revisions',
            ],
            [
                'name' => 'PublishPress Series',
                'slugFree' => 'organize-series',
                'slugPro' => 'publishpress-series-pro',
                'iconFile' => 'icon-series',
            ],
            [
                'name' => 'PublishPress Statuses',
                'slugFree' => 'publishpress-statuses',
                'slugPro' => 'publishpress-statuses-pro',
                'iconFile' => 'icon-statuses',
            ],
        ];
    }
}
