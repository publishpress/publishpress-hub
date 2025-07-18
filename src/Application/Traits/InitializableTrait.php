<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Traits;

use RuntimeException;

trait BootableTrait
{
    /**
     * @var bool
     */
    protected $loaded = false;

    /**
     * @var bool
     */
    protected $initialized = false;

    public function isLoaded(): bool
    {
        return $this->loaded;
    }

    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    public function load(): void
    {
        if ($this->isLoaded()) {
            return;
        }

        $this->onLoad();

        $this->loaded = true;
    }

    public function init(): void
    {
        if ($this->isInitialized()) {
            return;
        }

        if (!$this->isLoaded()) {
            throw new RuntimeException('Object must be loaded before initializing.');
        }

        $this->onInit();

        $this->initialized = true;
    }

    abstract protected function onLoad(): void;

    abstract protected function onInit(): void;
}
