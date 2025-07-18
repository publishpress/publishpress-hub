<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\View\Exception;

use Exception;

class TemplateNotFoundException extends Exception
{
    public function __construct(string $templateName)
    {
        parent::__construct(sprintf('Template "%s" not found.', $templateName));
    }
}
