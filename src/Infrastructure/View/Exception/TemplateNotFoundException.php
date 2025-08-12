<?php

/**
 * Template not found exception.
 *
 * @package PublishPress\Hub\Infrastructure\View\Exception
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\View\Exception;

use Exception;

class TemplateNotFoundException extends Exception
{
    /**
     * @param string $templateName The template name.
     * @since 1.0.0
     */
    public function __construct(string $templateName)
    {
        parent::__construct(sprintf('Template "%s" not found.', $templateName));
    }
}
