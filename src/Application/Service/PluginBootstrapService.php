<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use PublishPress\Hub\Application\Hooks as ApplicationHooks;
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

        $this->registerHooks();

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
     * Register the hooks.
     *
     * @since 1.0.0
     */
    private function registerHooks(): void
    {
        add_action(ApplicationHooks::ACTION_INIT, [$this, 'bootstrapPlugins'], 5);
    }

    /**
     * Bootstrap all PublishPress plugins.
     *
     * This method defines all plugins and registers them in the repository.
     * Each plugin will check if it's installed and register itself accordingly.
     *
     * @since 1.0.0
     */
    public function bootstrapPlugins(): void
    {
        $pluginDefinitions = $this->getPluginDefinitions();

        foreach ($pluginDefinitions as $definition) {
            $plugin = new Plugin(
                $definition['name'],
                $definition['slugFree'],
                $definition['slugPro'],
                $definition['pluginFileNameFree'],
                $definition['pluginFileNamePro'],
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
                'pluginFileNameFree' => 'publishpress-checklists.php',
                'pluginFileNamePro' => 'publishpress-checklists-pro.php',
                'iconFile' => 'icon-checklists',
                'description' => __('Improve content quality with customizable editorial checklists.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Permissions',
                'slugFree' => 'press-permit-core',
                'slugPro' => 'presspermit-pro',
                'pluginFileNameFree' => 'press-permit-core.php',
                'pluginFileNamePro' => 'presspermit-pro.php',
                'iconFile' => 'icon-permissions',
                'description' => __('Advanced user role and permission management.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Authors',
                'slugFree' => 'publishpress-authors',
                'slugPro' => 'publishpress-authors-pro',
                'pluginFileNameFree' => 'publishpress-authors.php',
                'pluginFileNamePro' => 'publishpress-authors-pro.php',
                'iconFile' => 'icon-authors',
                'description' => __('Add many authors to one WordPress post.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Blocks',
                'slugFree' => 'advanced-gutenberg',
                'slugPro' => 'advanced-gutenberg-pro',
                'pluginFileNameFree' => 'advanced-gutenberg.php',
                'pluginFileNamePro' => 'advanced-gutenberg-pro.php',
                'iconFile' => 'icon-blocks',
                'description' => __('Take the control of the new Gutenberg editor.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Capabilities',
                'slugFree' => 'capability-manager-enhanced',
                'slugPro' => 'capabilities-pro',
                'pluginFileNameFree' => 'capsman-enhanced.php',
                'pluginFileNamePro' => 'capabilities-pro.php',
                'iconFile' => 'icon-capabilities',
                'description' => __('Fine-grained user role management for WordPress sites.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Future',
                'slugFree' => 'post-expirator',
                'slugPro' => 'publishpress-future-pro',
                'pluginFileNameFree' => 'post-expirator.php',
                'pluginFileNamePro' => 'publishpress-future-pro.php',
                'iconFile' => 'icon-future',
                'description' => __('Automatically run actions on a scheduled future moment.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Planner',
                'slugFree' => 'publishpress',
                'slugPro' => 'publishpress-pro',
                'pluginFileNameFree' => 'publishpress.php',
                'pluginFileNamePro' => 'publishpress-pro.php',
                'iconFile' => 'icon-planner',
                'description' => __('Organize, schedule and plan your WordPress content.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Revisions',
                'slugFree' => 'revisionary',
                'slugPro' => 'revisionary-pro',
                'pluginFileNameFree' => 'revisionary.php',
                'pluginFileNamePro' => 'revisionary-pro.php',
                'iconFile' => 'icon-revisions',
                'description' => __('Manage, schedule and approve WordPress revisions.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Series',
                'slugFree' => 'organize-series',
                'slugPro' => 'publishpress-series-pro',
                'pluginFileNameFree' => 'orgSeries.php',
                'pluginFileNamePro' => 'publishpress-series-pro.php',
                'iconFile' => 'icon-series',
                'description' => __('Group WordPress content together into a series.', 'publishpress-hub'),
            ],
            [
                'name' => 'PublishPress Statuses',
                'slugFree' => 'publishpress-statuses',
                'slugPro' => 'publishpress-statuses-pro',
                'pluginFileNameFree' => 'publishpress-statuses.php',
                'pluginFileNamePro' => 'publishpress-statuses-pro.php',
                'iconFile' => 'icon-statuses',
                'description' => __('Manage custom statuses for your WordPress posts.', 'publishpress-hub'),
            ],
        ];
    }
}
