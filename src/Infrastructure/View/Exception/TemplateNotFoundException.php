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

use PublishPress\Hub\Domain\Exception\ExceptionCode;
use PublishPress\Hub\Infrastructure\Exception\Base\InfrastructureException;

class TemplateNotFoundException extends InfrastructureException
{
    /**
     * @param string $templateName The template name.
     * @param array<string, mixed> $context Optional context information.
     * @since 1.0.0
     */
    public function __construct(string $templateName, array $context = [])
    {
        $context['template_name'] = $templateName;
        parent::__construct(
            sprintf('Template "%s" not found.', $templateName),
            ExceptionCode::TEMPLATE_NOT_FOUND,
            $context
        );
    }
}
