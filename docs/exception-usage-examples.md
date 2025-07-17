# Exception Usage Examples

## Overview

This document provides practical examples of how to use the domain exceptions and WordPress error adapter in your code.

## Domain Layer Usage

### License Validation Service

```php
<?php

namespace PublishPress\Hub\Domain\Service;

use PublishPress\Hub\Domain\Entity\License;
use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidException;
use PublishPress\Hub\Domain\Exception\License\LicenseMissingException;

class LicenseValidator
{
    /**
     * Validate a license.
     *
     * @param License $license
     * @throws LicenseExpiredException
     * @throws LicenseInvalidException
     * @throws LicenseMissingException
     */
    public function validateLicense(License $license): void
    {
        if ($license->getKey() === '') {
            throw new LicenseMissingException();
        }

        if (!$license->isValid()) {
            throw new LicenseInvalidException();
        }

        if ($license->isExpired()) {
            throw new LicenseExpiredException();
        }
    }
}
```

### License Entity

```php
<?php

namespace PublishPress\Hub\Domain\Entity;

use PublishPress\Hub\Domain\Exception\License\LicenseNoActivationsLeftException;

class License
{
    private string $key;
    private bool $isValid;
    private bool $isExpired;
    private int $activationsLeft;

    public function activate(): void
    {
        if ($this->activationsLeft <= 0) {
            throw new LicenseNoActivationsLeftException();
        }

        $this->activationsLeft--;
    }

    public function getKey(): string
    {
        return $this->key;
    }

    public function isValid(): bool
    {
        return $this->isValid;
    }

    public function isExpired(): bool
    {
        return $this->isExpired;
    }
}
```

## Application Layer Usage

### License Service with Exception Handling

```php
<?php

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\DomainExceptionMapperInterface;
use PublishPress\Hub\Domain\Exception\DomainException;
use PublishPress\Hub\Domain\Service\LicenseValidator;
use PublishPress\Hub\Domain\Entity\License;

class LicenseService
{
    public function __construct(
        private LicenseValidator $licenseValidator,
        private DomainExceptionMapperInterface $exceptionMapper
    ) {}

    /**
     * Validate a license and return result with error details.
     *
     * @param string $licenseKey
     * @return array
     */
    public function validateLicense(string $licenseKey): array
    {
        try {
            $license = new License($licenseKey);
            $this->licenseValidator->validateLicense($license);

            return [
                'valid' => true,
                'message' => 'License is valid'
            ];
        } catch (DomainException $exception) {
            $metadata = $this->exceptionMapper->mapToErrorMetadata($exception);
            $httpStatus = $this->exceptionMapper->mapToHttpStatusCode($exception);

            return [
                'valid' => false,
                'error_code' => $metadata['error_code'],
                'message' => $exception->getMessage(),
                'http_status' => $httpStatus,
                'license_status' => $metadata['license_status'] ?? null
            ];
        }
    }
}
```

### WordPress Integration with WP_Error

```php
<?php

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Domain\Exception\DomainException;
use PublishPress\Hub\Domain\Service\LicenseValidator;
use PublishPress\Hub\Domain\Entity\License;

class WordPressLicenseService
{
    public function __construct(
        private LicenseValidator $licenseValidator,
        private WordPressErrorAdapter $wpErrorAdapter
    ) {}

    /**
     * Validate a license and return WP_Error on failure.
     *
     * @param string $licenseKey
     * @return true|WP_Error
     */
    public function validateLicense(string $licenseKey)
    {
        try {
            $license = new License($licenseKey);
            $this->licenseValidator->validateLicense($license);

            return true;
        } catch (DomainException $exception) {
            return $this->wpErrorAdapter->toWPError($exception);
        }
    }

    /**
     * Activate a license with WordPress error handling.
     *
     * @param string $licenseKey
     * @return true|WP_Error
     */
    public function activateLicense(string $licenseKey)
    {
        try {
            $license = new License($licenseKey);
            $license->activate();

            return true;
        } catch (DomainException $exception) {
            return $this->wpErrorAdapter->toWPError($exception);
        }
    }
}
```

## REST API Usage

### REST API Controller

```php
<?php

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Application\Service\WordPressLicenseService;
use PublishPress\Hub\Domain\Exception\DomainException;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class LicenseController
{
    public function __construct(
        private WordPressLicenseService $licenseService
    ) {}

    /**
     * Handle license validation request.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function validateLicense(WP_REST_Request $request)
    {
        $licenseKey = $request->get_param('license_key');

        if (empty($licenseKey)) {
            return new WP_Error(
                'missing_license_key',
                'License key is required',
                ['status' => 400]
            );
        }

        $result = $this->licenseService->validateLicense($licenseKey);

        if ($result instanceof WP_Error) {
            return $result;
        }

        return new WP_REST_Response([
            'valid' => true,
            'message' => 'License is valid'
        ], 200);
    }
}
```

## Testing Examples

### Domain Exception Tests

```php
<?php

namespace PublishPress\Hub\Tests\Unit\Domain\Exception\License;

use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidException;
use PublishPress\Hub\Domain\Exception\License\LicenseMissingException;
use PHPUnit\Framework\TestCase;

class LicenseExceptionTest extends TestCase
{
    public function testLicenseExpiredException(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals('License has expired.', $exception->getMessage());
        // Note: No getErrorCode() test - that's presentation logic
    }

    public function testLicenseInvalidException(): void
    {
        $exception = new LicenseInvalidException();

        $this->assertEquals('License key is invalid.', $exception->getMessage());
        // Note: No getErrorCode() test - that's presentation logic
    }

    public function testLicenseMissingException(): void
    {
        $exception = new LicenseMissingException();

        $this->assertEquals('License key is missing.', $exception->getMessage());
        // Note: No getErrorCode() test - that's presentation logic
    }
}
```

### Exception Mapper Tests

```php
<?php

namespace PublishPress\Hub\Tests\Unit\Application\Service;

use PublishPress\Hub\Application\Service\DomainExceptionMapper;
use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidException;
use PHPUnit\Framework\TestCase;

class DomainExceptionMapperTest extends TestCase
{
    private DomainExceptionMapper $mapper;

    protected function setUp(): void
    {
        $this->mapper = new DomainExceptionMapper();
    }

    public function testMapsLicenseExpiredToHttp400(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals(400, $this->mapper->mapToHttpStatusCode($exception));
    }

    public function testMapsLicenseExpiredToCorrectMetadata(): void
    {
        $exception = new LicenseExpiredException();

        $metadata = $this->mapper->mapToErrorMetadata($exception);

        $this->assertEquals('license_expired', $metadata['error_code']);
        $this->assertEquals('expired', $metadata['license_status']);
        $this->assertEquals('License has expired.', $metadata['message']);
    }

    public function testMapsLicenseInvalidToCorrectMetadata(): void
    {
        $exception = new LicenseInvalidException();

        $metadata = $this->mapper->mapToErrorMetadata($exception);

        $this->assertEquals('license_invalid', $metadata['error_code']);
        $this->assertEquals('invalid', $metadata['license_status']);
        $this->assertEquals('License key is invalid.', $metadata['message']);
    }
}
```

### WordPress Error Adapter Tests

```php
<?php

namespace PublishPress\Hub\Tests\Unit\Application\Service;

use PublishPress\Hub\Application\Service\DomainExceptionMapper;
use PublishPress\Hub\Application\Service\WordPressErrorAdapter;
use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PHPUnit\Framework\TestCase;

class WordPressErrorAdapterTest extends TestCase
{
    private WordPressErrorAdapter $adapter;

    protected function setUp(): void
    {
        $this->adapter = new WordPressErrorAdapter(new DomainExceptionMapper());
    }

    public function testConvertsDomainExceptionToWPError(): void
    {
        $exception = new LicenseExpiredException();

        $wpError = $this->adapter->toWPError($exception);

        $this->assertEquals('license_expired', $wpError->get_error_code());
        $this->assertEquals('License has expired.', $wpError->get_error_message());
        $this->assertEquals(400, $wpError->get_error_data()['status']);
    }

    public function testWPErrorContainsOriginalException(): void
    {
        $exception = new LicenseExpiredException();

        $wpError = $this->adapter->toWPError($exception);

        $this->assertTrue($this->adapter->isFromDomainException($wpError));
        $this->assertSame($exception, $this->adapter->getDomainException($wpError));
    }
}
```

## Benefits of This Approach

### 1. Clean Architecture Compliance
- **Domain Layer**: Pure business logic without HTTP concerns
- **Application Layer**: Handles technical concerns like HTTP mapping
- **Clear Separation**: Business rules vs. presentation logic

### 2. Flexibility
- Same domain exception can map to different HTTP codes in different contexts
- Easy to add new exception types without changing domain logic
- Support for multiple presentation formats (REST API, CLI, etc.)

### 3. Testability
- Domain exceptions can be tested without HTTP concerns
- Exception mapper can be tested independently
- WordPress integration can be tested separately

### 4. WordPress Integration
- Seamless conversion to `WP_Error` objects
- Preserves original domain exception for debugging
- Maintains WordPress coding standards

## Migration Guide

When migrating from the old application service exceptions:

1. **Update Imports**: Change from `Application\Service\Exception` to `Domain\Exception\License`
2. **Use Exception Mapper**: Inject `DomainExceptionMapperInterface` for HTTP mapping
3. **Add WordPress Adapter**: Use `WordPressErrorAdapter` for WordPress integration
4. **Update Tests**: Modify tests to use new exception locations and patterns

This approach provides a clean, maintainable, and testable solution that follows Clean Architecture principles while maintaining excellent WordPress integration.
