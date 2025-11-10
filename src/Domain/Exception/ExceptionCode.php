<?php

/**
 * Exception codes registry.
 *
 * @package PublishPress\Hub\Domain\Exception
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception;

/**
 * Exception codes registry.
 *
 * @since 1.0.0
 */
final class ExceptionCode
{
    // Domain exceptions (1000-1999)
    public const DOMAIN_GENERIC = 'DOMAIN_001';
    public const PLUGIN_NOT_FOUND = 'DOMAIN_101';
    public const PLUGIN_FAMILY_NOT_FOUND = 'DOMAIN_102';
    public const PLUGIN_NOT_INSTALLED = 'DOMAIN_103';
    public const PLUGIN_NOT_ACTIVATED = 'DOMAIN_104';
    public const PLUGIN_ALREADY_INSTALLED = 'DOMAIN_105';
    public const PLUGIN_INSTALL_FAILED = 'DOMAIN_106';
    public const PLUGIN_ACTIVATION_FAILED = 'DOMAIN_107';
    public const PLUGIN_DEACTIVATION_FAILED = 'DOMAIN_108';
    public const PLUGIN_FREE_PRO_CONFLICT = 'DOMAIN_109';

    // License exceptions (2000-2999)
    public const LICENSE_GENERIC = 'LICENSE_001';
    public const LICENSE_MISSING = 'LICENSE_201';
    public const LICENSE_MISSING_URL = 'LICENSE_202';
    public const LICENSE_INVALID = 'LICENSE_203';
    public const LICENSE_EXPIRED = 'LICENSE_204';
    public const LICENSE_DISABLED = 'LICENSE_205';
    public const LICENSE_KEY_MISMATCH = 'LICENSE_206';
    public const LICENSE_NOT_ACTIVABLE = 'LICENSE_207';
    public const LICENSE_NO_ACTIVATIONS_LEFT = 'LICENSE_208';
    public const LICENSE_SITE_INACTIVE = 'LICENSE_209';
    public const LICENSE_INVALID_ITEM_ID = 'LICENSE_210';
    public const LICENSE_INVALID_ITEM_NAME = 'LICENSE_211';
    public const LICENSE_ACTIVATION_FAILED = 'LICENSE_212';
    public const LICENSE_DEACTIVATION_FAILED = 'LICENSE_213';
    public const LICENSE_SERVER_ERROR = 'LICENSE_214';
    public const LICENSE_SERVER_INVALID_RESPONSE = 'LICENSE_215';
    public const LICENSE_SERVER_UNKNOWN = 'LICENSE_216';

    // Application exceptions (3000-3999)
    public const APPLICATION_GENERIC = 'APP_001';

    // Infrastructure exceptions (4000-4999)
    public const INFRASTRUCTURE_GENERIC = 'INFRA_001';
    public const TEMPLATE_NOT_FOUND = 'INFRA_401';
    public const REMOTE_ACCESS_DENIED = 'INFRA_402';
    public const CONTAINER_NOT_FOUND = 'INFRA_403';

    // Unknown/Generic (9000-9999)
    public const UNKNOWN_ERROR = 'UNKNOWN_001';

    /**
     * Get all exception codes.
     *
     * @return array<string, string> Array of constant name => value.
     * @since 1.0.0
     */
    public static function getAllCodes(): array
    {
        $reflection = new \ReflectionClass(self::class);
        return $reflection->getConstants();
    }

    /**
     * Check if a code is valid.
     *
     * @param string $code The code to check.
     * @return bool True if valid, false otherwise.
     * @since 1.0.0
     */
    public static function isValid(string $code): bool
    {
        return in_array($code, self::getAllCodes(), true);
    }
}

