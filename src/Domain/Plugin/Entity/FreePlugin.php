<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Entity;

use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Entity\Traits\PluginStateTrait;

/**
 * Free plugin entity.
 * Uses composition (trait) instead of inheritance for better Clean Code practices.
 *
 * @since 1.0.0
 */
class FreePlugin implements PluginInterface
{
    use PluginStateTrait;

    public function __construct(
        string $name,
        string $slug,
        string $fileName,
        string $detailsUrl
    ) {
        $this->initializePluginState($name, $slug, $fileName, $detailsUrl);
    }
}
