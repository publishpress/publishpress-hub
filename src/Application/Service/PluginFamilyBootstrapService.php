<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\Hooks as ApplicationHooks;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\FreePlugin;
use PublishPress\Hub\Domain\Plugin\PluginFamily;
use PublishPress\Hub\Domain\Plugin\ProPlugin;

/**
 * Plugin Family Bootstrap Service.
 *
 * This service is responsible for defining, instantiating, and registering
 * all PublishPress plugin families in the hub following DDD principles.
 *
 * @since 1.0.0
 */
class PluginFamilyBootstrapService implements ServiceInterface
{
    /**
     * Whether the service is initialized.
     *
     * @since 1.0.0
     */
    private bool $initialized = false;

    /**
     * The plugin family repository.
     *
     * @since 1.0.0
     */
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct(PluginFamilyRepositoryInterface $pluginFamilyRepository)
    {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
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
        add_action(ApplicationHooks::ACTION_INIT, [$this, 'bootstrapPluginFamilies'], 5);
    }

    /**
     * Bootstrap all PublishPress plugin families.
     *
     * This method defines all plugin families and registers them in the repository.
     * Each plugin family will check if it's installed and register itself accordingly.
     *
     * @since 1.0.0
     */
    public function bootstrapPluginFamilies(): void
    {
        $pluginDefinitions = $this->getPluginFamiliesDefinitions();

        foreach ($pluginDefinitions as $definition) {
            // Create plugins without family reference first to avoid circular dependency
            $freePlugin = new FreePlugin(
                $definition['free_name'],
                $definition['free_slug'],
                $definition['free_file_name'],
                $definition['free_detailsUrl']
            );

            $proPlugin = new ProPlugin(
                $definition['pro_name'],
                $definition['pro_slug'],
                $definition['pro_file_name'],
                $definition['pro_detailsUrl'],
                $definition['edd_item_id'],
                $definition['free_slug']
            );

            // Create the plugin family
            $pluginFamily = new PluginFamily(
                $definition['icon_file'],
                $definition['description'],
                $definition['changelogUrl']
            );

            $pluginFamily->setFreePlugin($freePlugin);
            $pluginFamily->setProPlugin($proPlugin);

            // Now set the family reference on the plugins
            $freePlugin->setFamily($pluginFamily);
            $proPlugin->setFamily($pluginFamily);

            $this->pluginFamilyRepository->registerFamily($pluginFamily);
        }
    }

    /**
     * Get the definitions of all PublishPress plugin families.
     *
     * This method contains the configuration of all PublishPress plugin families.
     *
     * @since 1.0.0
     * @return array
     */
    private function getPluginFamiliesDefinitions(): array
    {
        return [
            [
                'name' => 'PublishPress Checklists',
                'slug' => 'publishpress-checklists',
                'icon_file' => 'icon-checklists',
                'description' => __('Improve content quality with customizable editorial checklists.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-checklists/',
                'free_name' => 'PublishPress Checklists',
                'free_slug' => 'publishpress-checklists',
                'free_file_name' => 'publishpress-checklists.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/publishpress-checklists/',
                'pro_name' => 'PublishPress Checklists Pro',
                'pro_slug' => 'publishpress-checklists-pro',
                'pro_file_name' => 'publishpress-checklists-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/checklists/',
                'edd_item_id' => 6465,
            ],
            [
                'name' => 'PublishPress Permissions',
                'slug' => 'publishpress-permissions',
                'icon_file' => 'icon-permissions',
                'description' => __('Advanced user role and permission management.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-for-permissions-pro/',
                'free_name' => 'PublishPress Permissions',
                'free_slug' => 'press-permit-core',
                'free_file_name' => 'press-permit-core.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/press-permit-core/',
                'pro_name' => 'PublishPress Permissions Pro',
                'pro_slug' => 'presspermit-pro',
                'pro_file_name' => 'presspermit-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/permissions/',
                'edd_item_id' => 34506,
            ],
            [
                'name' => 'PublishPress Authors',
                'slug' => 'publishpress-authors',
                'icon_file' => 'icon-authors',
                'description' => __('Add many authors to one WordPress post.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-multiple-authors/',
                'free_name' => 'PublishPress Authors',
                'free_slug' => 'publishpress-authors',
                'free_file_name' => 'publishpress-authors.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/publishpress-authors/',
                'pro_name' => 'PublishPress Authors Pro',
                'pro_slug' => 'publishpress-authors-pro',
                'pro_file_name' => 'publishpress-authors-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/authors/',
                'edd_item_id' => 7203,
            ],
            [
                'name' => 'PublishPress Blocks',
                'slug' => 'publishpress-blocks',
                'icon_file' => 'icon-blocks',
                'description' => __('Take the control of the new Gutenberg editor.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-blocks/',
                'free_name' => 'PublishPress Blocks',
                'free_slug' => 'advanced-gutenberg',
                'free_file_name' => 'advanced-gutenberg.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/advanced-gutenberg/',
                'pro_name' => 'PublishPress Blocks Pro',
                'pro_slug' => 'advanced-gutenberg-pro',
                'pro_file_name' => 'advanced-gutenberg-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/blocks/',
                'edd_item_id' => 98972,
            ],
            [
                'name' => 'PublishPress Capabilities',
                'slug' => 'publishpress-capabilities',
                'icon_file' => 'icon-capabilities',
                'description' => __('Fine-grained user role management for WordPress sites.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-capabilities-pro/',
                'free_name' => 'PublishPress Capabilities',
                'free_slug' => 'capability-manager-enhanced',
                'free_file_name' => 'capsman-enhanced.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/capability-manager-enhanced/',
                'pro_name' => 'PublishPress Capabilities Pro',
                'pro_slug' => 'capabilities-pro',
                'pro_file_name' => 'capabilities-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/capabilities/',
                'edd_item_id' => 44811,
            ],
            [
                'name' => 'PublishPress Future',
                'slug' => 'publishpress-future',
                'icon_file' => 'icon-future',
                'description' => __('Automatically run actions on a scheduled future moment.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-for-publishpress-future-pro/',
                'free_name' => 'PublishPress Future',
                'free_slug' => 'post-expirator',
                'free_file_name' => 'post-expirator.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/post-expirator/',
                'pro_name' => 'PublishPress Future Pro',
                'pro_slug' => 'publishpress-future-pro',
                'pro_file_name' => 'publishpress-future-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/future/',
                'edd_item_id' => 129032,
            ],
            [
                'name' => 'PublishPress Planner',
                'slug' => 'publishpress-planner',
                'icon_file' => 'icon-planner',
                'description' => __('Organize, schedule and plan your WordPress content.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-publishpress/',
                'free_name' => 'PublishPress Planner',
                'free_slug' => 'publishpress',
                'free_file_name' => 'publishpress.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/publishpress/',
                'pro_name' => 'PublishPress Planner Pro',
                'pro_slug' => 'publishpress-pro',
                'pro_file_name' => 'publishpress-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/planner/',
                'edd_item_id' => 49742,
            ],
            [
                'name' => 'PublishPress Revisions',
                'slug' => 'publishpress-revisions',
                'icon_file' => 'icon-revisions',
                'description' => __('Manage, schedule and approve WordPress revisions.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-revisions-pro/',
                'free_name' => 'PublishPress Revisions',
                'free_slug' => 'revisionary',
                'free_file_name' => 'revisionary.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/revisionary/',
                'pro_name' => 'PublishPress Revisions Pro',
                'pro_slug' => 'revisionary-pro',
                'pro_file_name' => 'revisionary-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/revisions/',
                'edd_item_id' => 40280,
            ],
            [
                'name' => 'PublishPress Series',
                'slug' => 'publishpress-series',
                'icon_file' => 'icon-series',
                'description' => __('Group WordPress content together into a series.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-series-pro/',
                'free_name' => 'PublishPress Series',
                'free_slug' => 'organize-series',
                'free_file_name' => 'orgSeries.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/organize-series/',
                'pro_name' => 'PublishPress Series Pro',
                'pro_slug' => 'publishpress-series-pro',
                'pro_file_name' => 'publishpress-series-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/series/',
                'edd_item_id' => 110550,
            ],
            [
                'name' => 'PublishPress Statuses',
                'slug' => 'publishpress-statuses',
                'icon_file' => 'icon-statuses',
                'description' => __('Manage custom statuses for your WordPress posts.', 'publishpress-hub'),
                'changelogUrl' => 'https://publishpress.com/knowledge-base/changelogs-for-publishpress-statuses-pro/',
                'free_name' => 'PublishPress Statuses',
                'free_slug' => 'publishpress-statuses',
                'free_file_name' => 'publishpress-statuses.php',
                'free_detailsUrl' => 'https://wordpress.org/plugins/publishpress-statuses/',
                'pro_name' => 'PublishPress Statuses Pro',
                'pro_slug' => 'publishpress-statuses-pro',
                'pro_file_name' => 'publishpress-statuses-pro.php',
                'pro_detailsUrl' => 'https://publishpress.com/statuses/',
                'edd_item_id' => 336700,
            ],
        ];
    }
}
