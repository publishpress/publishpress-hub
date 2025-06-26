<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Exception;

use PublishPress\Hub\Application\Service\Contracts\HttpExceptionInterface;

class LicenseMissingUrlException extends ServiceException implements HttpExceptionInterface
{
    public function __construct()
    {
        parent::__construct('URL not provided for validation.');
    }

    public function getErrorCode(): string
    {
        return 'license_missing_url';
    }

    public function getHttpStatusCode(): int
    {
        return 400;
    }
}
