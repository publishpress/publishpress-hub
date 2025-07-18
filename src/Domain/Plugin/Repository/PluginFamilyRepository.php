<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Repository;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;

class PluginFamilyRepository implements PluginFamilyRepositoryInterface
{
    private array $families = [];

    public function registerFamily(PluginFamilyInterface $family): void
    {
        $this->families[$family->getSlug()] = $family;
    }

    public function findFamilyBySlug(string $slug): ?PluginFamilyInterface
    {
        return $this->families[$slug] ?? null;
    }

    public function getAllFamilies(): array
    {
        return array_values($this->families);
    }

    public function reset(): void
    {
        $this->families = [];
    }
}
