<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contracts;

/**
 * Interface for a pro plugin.
 *
 * @since 1.0.0
 */
interface EddPluginInterface extends FreePluginInterface
{
    /**
     * Get the slug of the free plugin.
     *
     * @return string
     */
    public function getFreePluginSlug(): string;

    /**
     * Check if the plugin is licensed.
     *
     * @return bool
     */
    public function isLicensed(): bool;

    /**
     * Get the EDD item ID of the plugin.
     *
     * @since 1.0.0
     * @return int
     */
    public function getEddItemId(): int;

    /**
     * Set the EDD item ID of the plugin.
     *
     * @param int $eddItemId
     * @return self
     */
    public function setEddItemId(int $eddItemId): self;

    /**
     * Set the slug of the free plugin.
     *
     * @param string $freePluginSlug
     * @return self
     */
    public function setFreePluginSlug(string $freePluginSlug): self;
}
