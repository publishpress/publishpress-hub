<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Contract;

interface BootableInterface
{
    public function isLoaded(): bool;

    public function isInitialized(): bool;

    public function load(): void;

    public function init(): void;
}
