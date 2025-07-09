<?php

namespace PublishPress\Hub\Application\Service\Contracts;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use stdClass;

interface WPOrgPluginsServiceInterface extends ServiceInterface
{
    /**
     * Get plugin information from WordPress.org.
     *
     * @since 1.0.0
     * @param string $slug The plugin slug
     * @return stdClass The plugin information
     * @throws FetchingPluginInformationException If getting plugin information fails
     */
    public function getPluginInformationFromWpOrg(string $slug): stdClass;
}
