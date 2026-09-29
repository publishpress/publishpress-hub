<?php

/**
 * Checklists license option handler.
 *
 * @package PublishPress\Hub\Infrastructure\License\Handlers
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License\Handlers;
defined( 'ABSPATH' ) || exit;

use stdClass;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseOptionHandlerInterface;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class SerializedArrayHandler implements LicenseOptionHandlerInterface
{
    private string $optionName;
    private string $licenseKeyKey;
    private string $licenseStatusKey;
    private string $licenseExpirationKey;
    private string $licenseStatusInvalid;
    private string $licenseStatusValid;

    private WPOptionsAdapterInterface $optionsAdapter;

    public function __construct(
        WPOptionsAdapterInterface $optionsAdapter,
        string $optionName,
        ?string $licenseKeyKey = null,
        ?string $licenseStatusKey = null,
        ?string $licenseStatusValid = null,
        ?string $licenseStatusInvalid = null
    ) {
        $this->optionsAdapter = $optionsAdapter;
        $this->optionName = $optionName;
        $this->licenseKeyKey = $licenseKeyKey ?? 'license_key';
        $this->licenseStatusKey = $licenseStatusKey ?? 'license_status';
        $this->licenseExpirationKey = 'license_expiration';
        $this->licenseStatusValid = $licenseStatusValid ?? 'valid';
        $this->licenseStatusInvalid = $licenseStatusInvalid ?? 'invalid';
    }

    /**
     * Store the license key for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the license key.
     * @param string $licenseKey The license key to store.
     * @since 1.0.0
     */
    public function storeLicenseKey(int $downloadId, string $licenseKey): void
    {
        $currentValue = $this->optionsAdapter->getOption($this->optionName);

        if (empty($currentValue)) {
            $currentValue = [];
        }

        $currentValue[$this->licenseKeyKey] = $licenseKey;
        $currentValue[$this->licenseStatusKey] = $this->licenseStatusInvalid;

        $this->optionsAdapter->updateOption($this->optionName, $currentValue);
    }

    /**
     * Store the license status for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the license status.
     * @param bool $isLicenseValid The license status to store.
     * @since 1.0.0
     */
    public function storeLicenseStatus(int $downloadId, bool $isLicenseValid): void
    {
        $currentValue = $this->optionsAdapter->getOption($this->optionName);

        if (empty($currentValue)) {
            $currentValue = [];
            $currentValue[$this->licenseKeyKey] = '';
        }

        $value = $isLicenseValid ? $this->licenseStatusValid : $this->licenseStatusInvalid;
        $currentValue[$this->licenseStatusKey] = $value;

        $this->optionsAdapter->updateOption($this->optionName, $currentValue);
    }

    /**
     * Get the license key for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The license key if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseKey(int $downloadId): ?string
    {
        $currentValue = $this->optionsAdapter->getOption($this->optionName);

        if (empty($currentValue)) {
            return null;
        }

        return $currentValue[$this->licenseKeyKey] ?? null;
    }

    /**
     * Get the license status for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return bool The license status.
     * @since 1.0.0
     */
    public function getLicenseStatus(int $downloadId): bool
    {
        $currentValue = $this->optionsAdapter->getOption($this->optionName);

        if (empty($currentValue)) {
            return false;
        }

        return $currentValue[$this->licenseStatusKey] === $this->licenseStatusValid;
    }

    /**
     * Store the license expiration date for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the expiration date.
     * @param string|null $expirationDate The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function storeLicenseExpirationDate(int $downloadId, ?string $expirationDate): void
    {
        $currentValue = $this->optionsAdapter->getOption($this->optionName);

        if (empty($currentValue)) {
            $currentValue = [];
        }

        $currentValue[$this->licenseExpirationKey] = $expirationDate;

        $this->optionsAdapter->updateOption($this->optionName, $currentValue);
    }

    /**
     * Get the license expiration date for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseExpirationDate(int $downloadId): ?string
    {
        $currentValue = $this->optionsAdapter->getOption($this->optionName);

        if (empty($currentValue)) {
            return null;
        }

        return $currentValue[$this->licenseExpirationKey] ?? null;
    }

    /**
     * Remove the license key and status for a specific download ID.
     *
     * @param int $downloadId The download ID to remove the license key for.
     * @since 1.0.0
     */
    public function remove(int $downloadId): void
    {
        $currentValue = $this->optionsAdapter->getOption($this->optionName);

        if (empty($currentValue)) {
            return;
        }

        unset($currentValue[$this->licenseKeyKey]);
        unset($currentValue[$this->licenseStatusKey]);
        unset($currentValue[$this->licenseExpirationKey]);

        $this->optionsAdapter->updateOption($this->optionName, $currentValue);
    }
}
