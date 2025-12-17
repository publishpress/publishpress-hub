<?php

/**
 * Service for reading license keys from WordPress constants.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;

class WpConfigLicenseReaderService
{
    public const GLOBAL_LICENSE_CONSTANT = 'PUBLISHPRESS_HUB_LICENSE_KEY';
    public const PER_PLUGIN_LICENSE_CONSTANT_PREFIX = 'PUBLISHPRESS_HUB_LICENSE_KEY_';

    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    /**
     * @since 1.0.0
     */
    public function __construct(PluginFamilyRepositoryInterface $pluginFamilyRepository)
    {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    /**
     * Read license keys from WordPress constants.
     * Per-plugin constants take precedence over global constant.
     *
     * @return array<int, string> Array mapping download IDs to license keys
     * @since 1.0.0
     */
    public function readLicenseKeysFromConstants(): array
    {
        $licenseKeys = [];
        $globalLicenseKey = $this->getGlobalLicenseKey();

        $families = $this->pluginFamilyRepository->getAllFamilies();

        foreach ($families as $family) {
            $downloadId = $family->getProPlugin()->getDownloadId();
            $slug = $family->getSlug();

            // Check per-plugin constant first (takes precedence)
            $perPluginLicenseKey = $this->getPerPluginLicenseKey($slug);

            if ($perPluginLicenseKey !== null) {
                $licenseKeys[$downloadId] = $perPluginLicenseKey;
            } elseif ($globalLicenseKey !== null) {
                // Fall back to global constant if no per-plugin constant
                $licenseKeys[$downloadId] = $globalLicenseKey;
            }
        }

        return $licenseKeys;
    }

    /**
     * Get the global license key constant value.
     *
     * @return string|null The license key if constant is defined, null otherwise
     * @since 1.0.0
     */
    private function getGlobalLicenseKey(): ?string
    {
        if (!defined(self::GLOBAL_LICENSE_CONSTANT)) {
            return null;
        }

        $value = constant(self::GLOBAL_LICENSE_CONSTANT);

        if (empty($value) || !is_string($value)) {
            return null;
        }

        return trim($value);
    }

    /**
     * Get the per-plugin license key constant value.
     *
     * @param string $slug The plugin family slug
     * @return string|null The license key if constant is defined, null otherwise
     * @since 1.0.0
     */
    private function getPerPluginLicenseKey(string $slug): ?string
    {
        $constantName = self::PER_PLUGIN_LICENSE_CONSTANT_PREFIX . strtoupper($slug);

        if (!defined($constantName)) {
            return null;
        }

        $value = constant($constantName);

        if (empty($value) || !is_string($value)) {
            return null;
        }

        return trim($value);
    }
}

