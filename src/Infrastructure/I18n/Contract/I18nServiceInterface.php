<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\I18n\Contract;

use PublishPress\Hub\Application\Contract\BootableInterface;

interface I18nServiceInterface extends BootableInterface
{
    /**
     * Get the current WordPress locale
     *
     * @since 1.0.0
     */
    public function getLocale(): string;

    /**
     * Get the text domain
     *
     * @since 1.0.0
     */
    public function getTextDomain(): string;
}
