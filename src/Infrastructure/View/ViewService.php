<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\View;

use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;
use PublishPress\Hub\Infrastructure\View\Exception\TemplateNotFoundException;

class ViewService implements ViewServiceInterface
{
    private string $templatesBasePath;

    public function __construct(string $templatesBasePath)
    {
        $this->templatesBasePath = $templatesBasePath;
    }

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
