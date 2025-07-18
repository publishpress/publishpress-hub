<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\I18n\Contract;

use PublishPress\Hub\Application\Contract\BootableInterface;

interface I18nServiceInterface extends BootableInterface
{
    /**
     * @since 1.0.0
     */
    public function getLocale(): string;

    /**
     * @since 1.0.0
     */
    public function getUserLocale(): string;

    /**
     * @since 1.0.0
     */
    public function getTextDomain(): string;
}
