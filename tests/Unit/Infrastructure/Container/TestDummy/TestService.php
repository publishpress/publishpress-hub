<?php

declare(strict_types=1);

namespace PublishPress\Hub\Tests\Unit\Infrastructure\Container\TestDummy;

class TestService
{
    public function __construct()
    {
    }

    public function isInitialized(): bool
    {
        return true;
    }
}
