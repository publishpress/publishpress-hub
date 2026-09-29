<?php

/**
 * Domain exception.
 *
 * @package PublishPress\Hub\Domain\Exception\Base
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\Base;

defined('ABSPATH') || exit;

use Exception;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Exception\ExceptionCode;
use PublishPress\Hub\Domain\Exception\Traits\ContextTrait;

class DomainException extends Exception implements WithContextInterface
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
        string $code = ExceptionCode::DOMAIN_GENERIC,
        array $context = []
    ) {
        parent::__construct($message, 0);
        $this->setContext($context);
        $this->code = $code;
    }
}
