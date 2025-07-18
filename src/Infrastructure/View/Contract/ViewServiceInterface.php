<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\View\Contract;

interface ViewServiceInterface
{
    public function render(string $templatePath, array $context = []): void;
}
