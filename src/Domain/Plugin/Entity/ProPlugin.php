<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Entity;

use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Domain\Plugin\Entity\Traits\PluginStateTrait;

/**
 * Pro plugin entity.
 * Uses composition (trait) instead of inheritance for better Clean Code practices.
 *
 * @since 1.0.0
 */
class ProPlugin implements ProPluginInterface
{
    use PluginStateTrait;

    private int $downloadId = 0;

    public function __construct(
        string $name,
        string $slug,
        string $fileName,
        string $detailsUrl
    ) {
        $this->initializePluginState($name, $slug, $fileName, $detailsUrl);
    }

    public function getDownloadId(): int
    {
        return $this->downloadId;
    }

    public function setDownloadId(int $downloadId): self
    {
        $this->downloadId = $downloadId;
        return $this;
    }
}
