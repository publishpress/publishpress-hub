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

use stdClass;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseOptionHandlerInterface;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class ChecklistsHandler implements LicenseOptionHandlerInterface
{
    private const OPTION_NAME = 'publishpress_checklists_settings_options';

    private const OPTION_LICENSE_KEY_KEY = 'license_key';

    private const OPTION_LICENSE_STATUS_KEY = 'license_status';

    private const OPTION_LICENSE_STATUS_INVALID = 'invalid';

    private const OPTION_LICENSE_STATUS_VALID = 'valid';

    private WPOptionsAdapterInterface $optionsAdapter;

    public function __construct(WPOptionsAdapterInterface $optionsAdapter)
    {
        $this->optionsAdapter = $optionsAdapter;
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
        $currentValue = $this->optionsAdapter->getOption(self::OPTION_NAME);

        if (empty($currentValue)) {
            $currentValue = new stdClass();
        }

        $currentValue->{self::OPTION_LICENSE_KEY_KEY} = $licenseKey;
        $currentValue->{self::OPTION_LICENSE_STATUS_KEY} = self::OPTION_LICENSE_STATUS_INVALID;

        $this->optionsAdapter->updateOption(self::OPTION_NAME, $currentValue);
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
        $currentValue = $this->optionsAdapter->getOption(self::OPTION_NAME);

        if (empty($currentValue)) {
            $currentValue = new stdClass();
            $currentValue->{self::OPTION_LICENSE_KEY_KEY} = '';
        }

        $value = $isLicenseValid ? self::OPTION_LICENSE_STATUS_VALID : self::OPTION_LICENSE_STATUS_INVALID;
        $currentValue->{self::OPTION_LICENSE_STATUS_KEY} = $value;

        $this->optionsAdapter->updateOption(self::OPTION_NAME, $currentValue);
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
        $currentValue = $this->optionsAdapter->getOption(self::OPTION_NAME);

        if (empty($currentValue)) {
            return null;
        }

        return $currentValue->{self::OPTION_LICENSE_KEY_KEY};
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
        $currentValue = $this->optionsAdapter->getOption(self::OPTION_NAME);

        if (empty($currentValue)) {
            return false;
        }

        return $currentValue->{self::OPTION_LICENSE_STATUS_KEY} === self::OPTION_LICENSE_STATUS_VALID;
    }

    /**
     * Remove the license key and status for a specific download ID.
     *
     * @param int $downloadId The download ID to remove the license key for.
     * @since 1.0.0
     */
    public function remove(int $downloadId): void
    {
        $currentValue = $this->optionsAdapter->getOption(self::OPTION_NAME);

        if (empty($currentValue)) {
            return;
        }

        unset($currentValue->{self::OPTION_LICENSE_KEY_KEY});
        unset($currentValue->{self::OPTION_LICENSE_STATUS_KEY});

        $this->optionsAdapter->updateOption(self::OPTION_NAME, $currentValue);
    }
}
