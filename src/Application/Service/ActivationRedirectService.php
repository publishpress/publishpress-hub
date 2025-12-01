<?php

/**
 * Service for handling plugin activation redirects.
 *
 * @package PublishPress\Hub\Application\Service
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Environment\Contract\EnvironmentServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class ActivationRedirectService implements BootableInterface
{
    use BootableTrait;

    private const WELCOME_PAGE_OPTION_NAME = 'publishpress_hub_welcome_page_disabled';

    private HooksServiceInterface $hooksService;

    private SecurityServiceInterface $securityService;

    private WPOptionsAdapterInterface $optionsAdapter;

    private EnvironmentServiceInterface $environmentService;

    /**
     * @param HooksServiceInterface $hooksService
     * @param SecurityServiceInterface $securityService
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @param EnvironmentServiceInterface $environmentService
     * @since 1.0.0
     */
    public function __construct(
        HooksServiceInterface $hooksService,
        SecurityServiceInterface $securityService,
        WPOptionsAdapterInterface $optionsAdapter,
        EnvironmentServiceInterface $environmentService
    ) {
        $this->hooksService = $hooksService;
        $this->securityService = $securityService;
        $this->optionsAdapter = $optionsAdapter;
        $this->environmentService = $environmentService;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        if (!$this->environmentService->isAdminArea()) {
            return;
        }

        $this->hooksService->addAction(
            AbstractHooks::ACTION_ADMIN_INIT,
            [$this, 'handleActivationRedirect']
        );
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        // No initialization needed
    }

    /**
     * Handle activation redirect.
     *
     * @return void
     * @since 1.0.0
     */
    public function handleActivationRedirect(): void
    {
        // Check if redirect is disabled via constant
        if (defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE_REDIRECT')
            && constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE_REDIRECT')) {
            return;
        }

        // Don't redirect if welcome page is disabled
        if ($this->isWelcomePageDisabled()) {
            return;
        }

        // Check if we're already on the welcome page
        if (isset($_GET['page']) && 'publishpress-hub' === $_GET['page']) {
            delete_transient(PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT);
            return;
        }

        // Check if activation redirect transient exists
        if (!get_transient(PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT)) {
            return;
        }

        // Only redirect for users with manage_options capability
        if (!$this->securityService->userCan('manage_options')) {
            delete_transient(PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT);
            return;
        }

        // Don't redirect during AJAX requests
        if (wp_doing_ajax()) {
            return;
        }

        // Don't redirect during cron
        if (wp_doing_cron()) {
            return;
        }

        // Delete the transient
        delete_transient(PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT);

        // Redirect to welcome page
        $redirectUrl = admin_url('admin.php?page=publishpress-hub');
        wp_safe_redirect($redirectUrl);
        exit;
    }

    /**
     * Check if welcome page is disabled.
     *
     * @return bool
     * @since 1.0.0
     */
    private function isWelcomePageDisabled(): bool
    {
        // Check constant first
        if (defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')
            && constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')) {
            return true;
        }

        // Check option
        return (bool) $this->optionsAdapter->getOption(self::WELCOME_PAGE_OPTION_NAME, false);
    }
}

