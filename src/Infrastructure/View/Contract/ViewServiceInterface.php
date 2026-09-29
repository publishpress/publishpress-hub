<?php

/**
 * View service interface.
 *
 * @package PublishPress\Hub\Infrastructure\View\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\View\Contract;

defined('ABSPATH') || exit;

interface ViewServiceInterface
{
    /**
     * Render a template.
     *
     * @param string $templatePath The template path.
     * @param array<string, mixed> $context The context.
     * @since 1.0.0
     */
    public function render(string $templatePath, array $context = []): void;
}
