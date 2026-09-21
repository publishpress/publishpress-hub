<?php

/**
 * Base exception for the application.
 *
 * @package PublishPress\Hub\Application\Exception\Base
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Exception\Base;
defined( 'ABSPATH' ) || exit;

use Exception;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Exception\ExceptionCode;
use PublishPress\Hub\Domain\Exception\Traits\ContextTrait;

class ApplicationException extends Exception implements WithContextInterface
{
    use ContextTrait;

    /**
     * @param string $message The exception message.
     * @param string $code The exception code.
     * @param array<string, mixed> $context The context of the exception.
     * @since 1.0.0
     */
    public function __construct(
        string $message,
        string $code = ExceptionCode::APPLICATION_GENERIC,
        array $context = []
    ) {
        parent::__construct($message, 0);
        $this->setContext($context);
        $this->code = $code;
    }
}
