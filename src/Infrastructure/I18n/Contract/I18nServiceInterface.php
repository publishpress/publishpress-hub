<?php

/**
 * I18n service interface.
 *
 * @package PublishPress\Hub\Infrastructure\I18n\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\I18n\Contract;

use PublishPress\Hub\Application\Contract\BootableInterface;

interface I18nServiceInterface extends BootableInterface
{
    /**
     * Get the locale.
     *
     * @return string The locale.
     * @since 1.0.0
     */
    public function getLocale(): string;

    /**
     * Get the user locale.
     *
     * @return string The user locale.
     * @since 1.0.0
     */
    public function getUserLocale(): string;

    /**
     * Get the text domain.
     *
     * @return string The text domain.
     * @since 1.0.0
     */
    public function getTextDomain(): string;
}
