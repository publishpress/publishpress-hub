<?php

/**
 * Version tracking service.
 *
 * @package PublishPress\Hub\Application\Service
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class VersionService
{
    private const OPTION_NAME = 'publishpress_hub_version';

    private WPOptionsAdapterInterface $optionsAdapter;

    private string $currentVersion;

    /**
     * Constructor.
     *
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @param string $currentVersion
     * @since 1.0.0
     */
    public function __construct(WPOptionsAdapterInterface $optionsAdapter, string $currentVersion)
    {
        $this->optionsAdapter = $optionsAdapter;
        $this->currentVersion = $currentVersion;
    }

    /**
     * Get the stored version from the database.
     *
     * @return string|false The stored version or false if not found.
     * @since 1.0.0
     */
    public function getStoredVersion()
    {
        return $this->optionsAdapter->getOption(self::OPTION_NAME, false);
    }

    /**
     * Get the current plugin version.
     *
     * @return string The current version.
     * @since 1.0.0
     */
    public function getCurrentVersion(): string
    {
        return $this->currentVersion;
    }

    /**
     * Check if version is stored in the database.
     *
     * @return bool True if version exists, false otherwise.
     * @since 1.0.0
     */
    public function isVersionStored(): bool
    {
        return $this->getStoredVersion() !== false;
    }

    /**
     * Determine if this is a fresh installation.
     *
     * @return bool True if no version is stored (fresh install).
     * @since 1.0.0
     */
    public function isFreshInstall(): bool
    {
        return !$this->isVersionStored();
    }

    /**
     * Check if this is a reactivation of the same version.
     *
     * @return bool True if stored version matches current version.
     * @since 1.0.0
     */
    public function isReactivation(): bool
    {
        if (!$this->isVersionStored()) {
            return false;
        }

        return $this->getStoredVersion() === $this->getCurrentVersion();
    }

    /**
     * Check if this is an update from a different version.
     *
     * @return bool True if stored version differs from current version.
     * @since 1.0.0
     */
    public function isUpdate(): bool
    {
        if (!$this->isVersionStored()) {
            return false;
        }

        return $this->getStoredVersion() !== $this->getCurrentVersion();
    }

    /**
     * Store the current version to the database.
     *
     * @return bool True on success, false on failure.
     * @since 1.0.0
     */
    public function storeCurrentVersion(): bool
    {
        $currentVersion = $this->getCurrentVersion();

        if ($this->isVersionStored()) {
            return $this->optionsAdapter->updateOption(self::OPTION_NAME, $currentVersion, true);
        }

        return $this->optionsAdapter->addOption(self::OPTION_NAME, $currentVersion, true);
    }

    /**
     * Check if migration is needed from stored version to current version.
     *
     * @return bool True if versions differ and migration might be needed.
     * @since 1.0.0
     */
    public function needsMigration(): bool
    {
        return $this->isUpdate();
    }

    /**
     * Get the stored version for migration comparison.
     *
     * @return string The stored version or empty string if not found.
     * @since 1.0.0
     */
    public function getStoredVersionForMigration(): string
    {
        $version = $this->getStoredVersion();
        return $version !== false ? $version : '';
    }
}

