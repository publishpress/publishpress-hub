<?php

/**
 * Tests for Hub access service permission checks.
 *
 * @package Tests\Integration\Application\Service\Access
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Integration\Application\Service\Access;

use Codeception\TestCase\WPTestCase;
use PublishPress\Hub\Application\Service\Access\HubAccessService;

class HubAccessServiceTest extends WPTestCase
{
    private int $hubOnlyUserId;

    private int $hubManagerUserId;

    protected function setUp(): void
    {
        parent::setUp();

        HubAccessService::setupCapabilityAndRole();

        $this->hubOnlyUserId = $this->factory()->user->create(['role' => 'editor']);
        $user = new \WP_User($this->hubOnlyUserId);
        $user->add_cap(HubAccessService::CAPABILITY);

        $this->hubManagerUserId = $this->factory()->user->create(['role' => HubAccessService::VIEWER_ROLE]);
    }

    protected function tearDown(): void
    {
        wp_set_current_user(0);

        parent::tearDown();
    }

    public function testHubOnlyUserCanManageHub(): void
    {
        wp_set_current_user($this->hubOnlyUserId);

        $this->assertTrue(HubAccessService::canManageHub());
    }

    public function testHubManagerRoleCanAccessTheWordPressAdmin(): void
    {
        wp_set_current_user($this->hubManagerUserId);

        $role = get_role(HubAccessService::VIEWER_ROLE);

        $this->assertNotNull($role);

        $role->remove_cap(HubAccessService::READ_CAPABILITY);
        HubAccessService::addViewerRoleCapability();

        $this->assertTrue(HubAccessService::canManageHub());
        $this->assertTrue(current_user_can(HubAccessService::READ_CAPABILITY));
        $this->assertTrue($role->has_cap(HubAccessService::READ_CAPABILITY));
    }

    public function testHubOnlyUserCannotInstallPlugins(): void
    {
        wp_set_current_user($this->hubOnlyUserId);

        $this->assertFalse(HubAccessService::canInstallPlugins());
    }

    public function testHubOnlyUserCannotDeletePlugins(): void
    {
        wp_set_current_user($this->hubOnlyUserId);

        $this->assertFalse(HubAccessService::canDeletePlugins());
    }

    public function testHubOnlyUserCannotActivatePlugins(): void
    {
        wp_set_current_user($this->hubOnlyUserId);

        $this->assertFalse(HubAccessService::canActivatePlugins());
    }

    public function testHubOnlyUserCannotUpdatePlugins(): void
    {
        wp_set_current_user($this->hubOnlyUserId);

        $this->assertFalse(HubAccessService::canUpdatePlugins());
    }

    public function testHubOnlyUserCannotUpgradePlugins(): void
    {
        wp_set_current_user($this->hubOnlyUserId);

        $this->assertFalse(HubAccessService::canUpgradePlugins());
    }

    public function testHubOnlyUserCannotResolvePluginConflict(): void
    {
        wp_set_current_user($this->hubOnlyUserId);

        $this->assertFalse(HubAccessService::canResolvePluginConflict());
    }

    public function testAdministratorCanPerformDestructiveHubActions(): void
    {
        $adminId = $this->factory()->user->create(['role' => 'administrator']);
        wp_set_current_user($adminId);

        $this->assertTrue(HubAccessService::canManageHub());
        $this->assertTrue(HubAccessService::canInstallPlugins());
        $this->assertTrue(HubAccessService::canDeletePlugins());
        $this->assertTrue(HubAccessService::canActivatePlugins());
        $this->assertTrue(HubAccessService::canUpdatePlugins());
        $this->assertTrue(HubAccessService::canUpgradePlugins());
        $this->assertTrue(HubAccessService::canResolvePluginConflict());
    }
}
