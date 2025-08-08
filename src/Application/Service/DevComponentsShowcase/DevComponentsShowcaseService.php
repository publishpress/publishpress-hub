<?php

/**
 * Service for the Dev Components Showcase.
 *
 * @package PublishPress\Hub\Application\Service\DevComponentsShowcase
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\DevComponentsShowcase;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Presentation\Controller\DevComponentsShowcaseController;

class DevComponentsShowcaseService implements BootableInterface
{
    use BootableTrait;

    private DevComponentsShowcaseController $devComponentsShowcaseController;

    /**
     * @since 1.0.0
     */
    public function __construct(
        DevComponentsShowcaseController $devComponentsShowcaseController
    ) {
        $this->devComponentsShowcaseController = $devComponentsShowcaseController;
    }

    /**
     * Loads the Dev Components Showcase controller.
     *
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->devComponentsShowcaseController->load();
    }

    /**
     * Initializes the Dev Components Showcase controller.
     *
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        $this->devComponentsShowcaseController->init();
    }
}
