<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Exception;


/**
 * Exception thrown for service errors.
 *
 * @since 1.0.0
 */
class ServiceException extends \Exception
{
    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct(string $message = '')
    {
        parent::__construct($message);
    }
}
