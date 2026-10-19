<?php

/**
 * Hub access service.
 *
 * @package PublishPress\Hub\Application\Service\Access
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Access;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Contract\AccessInterface;
use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

class HubAccessService implements AccessInterface, BootableInterface
{
    use BootableTrait;

    public const CAPABILITY = 'manage_publishpress_hub';

    public const MCP_CAPABILITY = 'manage_options';

    public const READ_CAPABILITY = 'read';

    public const PLUGIN_NAME = 'PublishPress Hub';

    public const VIEWER_ROLE = 'publishpress_hub_manager';

    public const VIEWER_ROLE_DISPLAY_NAME = 'PublishPress Hub Manager';

    public const ADMIN_ROLE = 'administrator';

    /**
     * On load.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        add_filter(
            AbstractHooks::FILTER_PLUGIN_CAPABILITIES,
            [self::class, 'filterCmePluginCapabilities']
        );
    }

    /**
     * On init.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        return;
    }

    /**
     * Check if current user can view the Hub.
     *
     * @param int|\WP_User|null $user Optional user ID or WP_User object.
     * @return bool
     * @since 1.0.0
     */
    public function canUserViewHub($user = null): bool
    {
        if (empty($user)) {
            return self::canManageHub();
        }

        return user_can($user, self::CAPABILITY);
    }

    /**
     * Check if the current user can access Hub features.
     *
     * @return bool
     * @since 1.0.0
     */
    public static function canManageHub(): bool
    {
        return current_user_can(self::CAPABILITY);
    }

    /**
     * Check access to MCP administration and the MCP connection.
     *
     * MCP requires administrator-level access independently of Hub viewer access.
     *
     * @return bool
     * @since 1.2.0
     */
    public static function canManageMcp(): bool
    {
        return current_user_can(self::MCP_CAPABILITY);
    }

    /**
     * Check if the current user can install plugins through the Hub.
     *
     * @return bool
     * @since 1.0.0
     */
    public static function canInstallPlugins(): bool
    {
        return self::canManageHub() && current_user_can('install_plugins');
    }

    /**
     * Check if the current user can delete plugins through the Hub.
     *
     * @return bool
     * @since 1.0.0
     */
    public static function canDeletePlugins(): bool
    {
        return self::canManageHub() && current_user_can('delete_plugins');
    }

    /**
     * Check if the current user can activate or deactivate plugins through the Hub.
     *
     * @return bool
     * @since 1.0.0
     */
    public static function canActivatePlugins(): bool
    {
        return self::canManageHub() && current_user_can('activate_plugins');
    }

    /**
     * Check if the current user can update plugins through the Hub.
     *
     * @return bool
     * @since 1.0.0
     */
    public static function canUpdatePlugins(): bool
    {
        return self::canManageHub() && current_user_can('update_plugins');
    }

    /**
     * Check if the current user can upgrade plugins through the Hub.
     *
     * @return bool
     * @since 1.0.0
     */
    public static function canUpgradePlugins(): bool
    {
        return self::canInstallPlugins() && current_user_can('delete_plugins');
    }

    /**
     * Check if the current user can resolve plugin conflicts through the Hub.
     *
     * @return bool
     * @since 1.0.0
     */
    public static function canResolvePluginConflict(): bool
    {
        return self::canManageHub()
            && current_user_can('delete_plugins')
            && current_user_can('activate_plugins');
    }

    /**
     * Register capabilities for PublishPress Capabilities plugin.
     *
     * @param array<string, array<string>> $pluginCaps Existing plugin capabilities.
     * @return array<string, array<string>> Modified plugin capabilities.
     * @since 1.0.0
     */
    public static function filterCmePluginCapabilities(array $pluginCaps): array
    {
        $pluginCaps[self::PLUGIN_NAME] = [
            self::CAPABILITY,
        ];

        return $pluginCaps;
    }

    /**
     * Setup the capability and role. This resets user's customizations related
     * to the capability and role.
     *
     * @return void
     * @since 1.0.0
     */
    public static function setupCapabilityAndRole(): void
    {
        self::createUserRole(self::VIEWER_ROLE, self::VIEWER_ROLE_DISPLAY_NAME);
        self::addViewerRoleCapability();
        self::addRoleCapability(self::ADMIN_ROLE, self::CAPABILITY);
    }

    /**
     * Add the capability required for the Hub Manager role to access the WordPress admin.
     *
     * @return void
     * @since 1.0.6
     */
    public static function addViewerRoleCapability(): void
    {
        self::addRoleCapability(self::VIEWER_ROLE, self::READ_CAPABILITY);
    }

    /**
     * Create a user role.
     *
     * @param string $role The name of the role.
     * @param string $roleDisplayName The display name of the role.
     * @return void
     * @since 1.0.0
     */
    private static function createUserRole(string $role, string $roleDisplayName): void
    {
        $roleInstance = get_role($role);
        if (!$roleInstance) {
            if (function_exists('wpcom_vip_add_role')) {
                $roleInstance = call_user_func(
                    'wpcom_vip_add_role',
                    $role,
                    $roleDisplayName,
                    [
                        self::READ_CAPABILITY => true,
                        self::CAPABILITY => true,
                    ]
                );
            } else {
                // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.custom_role_add_role
                $roleInstance = add_role(
                    $role,
                    $roleDisplayName,
                    [
                        self::READ_CAPABILITY => true,
                        self::CAPABILITY => true,
                    ]
                );
            }
        }
    }

    /**
     * Add a capability to a role.
     *
     * @param string $role The name of the role.
     * @param string $capability The capability to add.
     * @return void
     * @since 1.0.0
     */
    private static function addRoleCapability(string $role, string $capability): void
    {
        $roleInstance = get_role($role);
        if ($roleInstance && ! $roleInstance->has_cap($capability)) {
            $roleInstance->add_cap($capability);
        }
    }
}
