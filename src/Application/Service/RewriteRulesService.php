<?php

/**
 * Rewrite rules service for managing WordPress rewrite rules.
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
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

class RewriteRulesService implements BootableInterface
{
    use BootableTrait;

    public const FLUSH_OPTION_KEY = 'publishpress_hub_flush_rewrite_rules';

    private HooksServiceInterface $hooksService;

    /**
     * @param HooksServiceInterface $hooksService
     * @since 1.0.0
     */
    public function __construct(HooksServiceInterface $hooksService)
    {
        $this->hooksService = $hooksService;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_INIT, [$this, 'maybeFlushRewriteRules']);
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Check if rewrite rules need to be flushed and flush them.
     *
     * This is called on the init hook to ensure all routes are registered
     * before flushing. This is the WordPress recommended approach.
     *
     * @since 1.0.0
     */
    public function maybeFlushRewriteRules(): void
    {
        if (get_option(self::FLUSH_OPTION_KEY)) {
            flush_rewrite_rules();
            delete_option(self::FLUSH_OPTION_KEY);
        }
    }

    /**
     * Set the flush option to true.
     *
     * @since 1.0.0
     */
    public static function setFlushOption(): void
    {
        update_option(self::FLUSH_OPTION_KEY, true);
    }
}
