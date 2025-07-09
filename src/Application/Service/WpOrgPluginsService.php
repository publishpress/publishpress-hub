<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\Service\Contracts\WPOrgPluginsServiceInterface;
use PublishPress\Hub\Application\Service\Exception\FetchingPluginInformationException;
use stdClass;

class WpOrgPluginsService implements WPOrgPluginsServiceInterface
{
    /**
     * Service initialization status.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        $this->initialized = true;
        return $this;
    }

    /**
     * Get plugin information from WordPress.org.
     *
     * @since 1.0.0
     * @param string $slug The plugin slug
     * @return stdClass The plugin information
     * @throws FetchingPluginInformationException If getting plugin information fails
     */
    public function getPluginInformationFromWpOrg(string $slug): stdClass
    {
        if (!function_exists('plugins_api')) {
            require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        }

        $api = plugins_api('plugin_information', [
            'slug' => $slug,
            'fields' => [
                'downloadlink' => true,
                'version' => true
            ],
        ]);

        if (is_wp_error($api)) {
            throw new FetchingPluginInformationException('Failed to get plugin information: ' . $api->get_error_message());
        }

        return $api;
    }
}
