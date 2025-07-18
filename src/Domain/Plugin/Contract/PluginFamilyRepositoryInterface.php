<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

interface PluginFamilyRepositoryInterface
{
    public function registerFamily(PluginFamilyInterface $family): void;

    public function findFamilyBySlug(string $slug): ?PluginFamilyInterface;

    public function getAllFamilies(): array;

    public function reset(): void;
}
