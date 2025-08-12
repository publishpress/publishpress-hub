<?php

/**
 * View service.
 *
 * @package PublishPress\Hub\Infrastructure\View
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\View;

use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;
use PublishPress\Hub\Infrastructure\View\Exception\TemplateNotFoundException;

class ViewService implements ViewServiceInterface
{
    private string $templatesBasePath;

    /**
     * @param string $templatesBasePath The templates base path.
     * @since 1.0.0
     */
    public function __construct(string $templatesBasePath)
    {
        $this->templatesBasePath = $templatesBasePath;
    }

    /**
     * Render a template.
     *
     * @param string $templatePath The template path.
     * @param array<string, mixed> $context The context.
     * @since 1.0.0
     */
    public function render(string $templatePath, array $context = []): void
    {
        $templatePath = "{$this->templatesBasePath}$templatePath.php";

        if (! file_exists($templatePath)) {
            throw new TemplateNotFoundException(
                sprintf(
                    // translators: %s is the template path
                    esc_html__('Template not found: %s', 'publishpress-hub'),
                    esc_html($templatePath)
                )
            );
        }

        require $templatePath;
    }
}
