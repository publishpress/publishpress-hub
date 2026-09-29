<?php

/**
 * Controls admin notice visibility on selected screens.
 *
 * @package PublishPress\Hub\Application\Service
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;

class AdminNoticeVisibilityService implements BootableInterface
{
    use BootableTrait;

    /**
     * Hooks where WordPress renders admin notices.
     *
     * @var string[]
     */
    private const NOTICE_HOOKS = [
        'admin_notices',
        'all_admin_notices',
        'network_admin_notices',
        'user_admin_notices',
    ];

    /**
     * Screen IDs where admin notices should be hidden.
     *
     * @var string[]
     */
    private const TARGET_SCREEN_IDS = [
        'plugins',
        'dashboard',
        'toplevel_page_publishpress-hub',
        'publishpress_page_publishpress-hub-plugins-dashboard',
    ];

    /**
     * Registers screen-based notice filtering.
     *
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        add_action('current_screen', [$this, 'filterThirdPartyNotices'], 999);
    }

    /**
     * Initializes the service.
     *
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Removes admin notice callbacks from target screens.
     *
     * @param \WP_Screen $screen Current admin screen.
     * @since 1.0.0
     */
    public function filterThirdPartyNotices(\WP_Screen $screen): void
    {
        if (!in_array($screen->id, self::TARGET_SCREEN_IDS, true)) {
            return;
        }

        foreach (self::NOTICE_HOOKS as $hookName) {
            remove_all_actions($hookName);
        }
    }
}
