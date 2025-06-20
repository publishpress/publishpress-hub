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
                $definition['iconFile'],
                $definition['description']
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
                'description' => __('Improve content quality with customizable editorial checklists.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Permissions',
                'slugFree' => 'press-permit-core',
                'slugPro' => 'presspermit-pro',
                'iconFile' => 'icon-permissions',
                'description' => __('Advanced user role and permission management.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Authors',
                'slugFree' => 'publishpress-authors',
                'slugPro' => 'publishpress-authors-pro',
                'iconFile' => 'icon-authors',
                'description' => __('Add many authors to one WordPress post.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Blocks',
                'slugFree' => 'advanced-gutenberg',
                'slugPro' => 'advanced-gutenberg-pro',
                'iconFile' => 'icon-blocks',
                'description' => __('Take the control of the new Gutenberg editor.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Capabilities',
                'slugFree' => 'capability-manager-enhanced',
                'slugPro' => 'capabilities-pro',
                'iconFile' => 'icon-capabilities',
                'description' => __('Fine-grained user role management for WordPress sites.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Future',
                'slugFree' => 'post-expirator',
                'slugPro' => 'publishpress-future-pro',
                'iconFile' => 'icon-future',
                'description' => __('Automatically run actions on a scheduled future moment.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Planner',
                'slugFree' => 'publishpress',
                'slugPro' => 'publishpress-pro',
                'iconFile' => 'icon-planner',
                'description' => __('Organize, schedule and plan your WordPress content.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Revisions',
                'slugFree' => 'revisionary',
                'slugPro' => 'revisionary-pro',
                'iconFile' => 'icon-revisions',
                'description' => __('Manage, schedule and approve WordPress revisions.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Series',
                'slugFree' => 'organize-series',
                'slugPro' => 'publishpress-series-pro',
                'iconFile' => 'icon-series',
                'description' => __('Group WordPress content together into a series.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Statuses',
                'slugFree' => 'publishpress-statuses',
                'slugPro' => 'publishpress-statuses-pro',
                'iconFile' => 'icon-statuses',
                'description' => __('Manage custom statuses for your WordPress posts.', 'publishpress-hub'),
            ],
        ];
    }
}
