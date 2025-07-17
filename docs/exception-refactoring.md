# Exception Refactoring: Moving License Exceptions to Domain Layer

## Overview

This document outlines the refactoring of license-related exceptions from the Application Service layer to the Domain layer, following Clean Architecture principles.

## Problem

The original implementation had license-related exceptions in `src/Application/Service/Exception/`, which violates Clean Architecture principles:

- **Business Rule Violations**: License validation represents core business logic
- **Domain Concepts**: License status is a domain concept that should be validated at the domain layer
- **Separation of Concerns**: Application service exceptions should be for orchestration failures, not business logic

## Solution

### 1. Domain Exceptions Structure

```
src/Domain/Exception/
├── DomainException.php                    # Base domain exception
├── ContextTrait.php                       # Reusable context functionality
└── License/
    ├── LicenseException.php               # Base license exception with context
    ├── LicenseExpiredException.php        # License expired business rule
    ├── LicenseDisabledException.php       # License disabled business rule
    ├── LicenseInvalidException.php        # License invalid business rule
    └── LicenseMissingException.php        # License missing business rule
```

**Key Principle**: Domain exceptions are pure business logic without presentation concerns. Context is handled by the base class to avoid code duplication.

### 2. Application Layer Adapter

To maintain HTTP response capabilities, we created an adapter pattern that handles all presentation concerns:

```
src/Application/Service/
├── Contracts/
│   └── DomainExceptionMapperInterface.php # Interface for mapping domain exceptions
├── DomainExceptionMapper.php              # Implementation of the mapper
└── WordPressErrorAdapter.php              # WordPress-specific error conversion
```

**Key Principle**: All presentation logic (HTTP status codes, error codes, WP_Error conversion) is handled in the application layer.

### 3. Exception Classification

#### Domain Exceptions (Business Rule Violations)
- `LicenseExpiredException` - License has expired
- `LicenseDisabledException` - License key was revoked
- `LicenseInvalidException` - License key is invalid
- `LicenseMissingException` - License key is missing
- `LicenseKeyMismatchException` - License key doesn't match
- `LicenseSiteInactiveException` - Site is inactive for license
- `LicenseNotActivableException` - License cannot be activated
- `LicenseNoActivationsLeftException` - No activations remaining
- `LicenseInvalidItemIdException` - Invalid item ID for license
- `LicenseInvalidItemNameException` - Invalid item name for license
- `LicenseMissingUrlException` - License URL is missing

#### Application Service Exceptions (Technical Failures)
- `FetchingPluginInformationException` - API/network issues
- `PluginInstallationException` - Installation process failures
- `LicenseServerException` - Server communication failures

## Benefits

### 1. Clean Architecture Compliance
- **Domain Layer**: Contains pure business rule violations without presentation concerns
- **Application Layer**: Contains orchestration failures and presentation logic
- **Clear Separation**: Business logic vs. technical concerns vs. presentation concerns

### 2. Better Testability
- Domain exceptions can be tested independently without HTTP concerns
- Business rules are isolated from technical and presentation concerns
- Exception mapping can be tested separately from domain logic
- Easier to mock and test domain logic

### 3. Improved Maintainability
- Clear responsibility boundaries
- Easier to understand and modify business rules
- Better code organization
- No duplication of error code logic

### 4. Future-Proof Design
- Easy to extend with new license validation rules
- Consistent exception handling patterns
- Scalable architecture
- Flexible error code mapping

### 5. WordPress Integration Benefits
- Error codes are determined by the application layer, not domain
- Easy to change error codes without modifying domain logic
- WP_Error conversion is handled cleanly in the application layer
- Preserves original domain exceptions for debugging

## Usage Examples

### Domain Layer Usage

```php
// In a domain service or entity
class LicenseValidator
{
    public function validateLicense(License $license): void
    {
        if ($license->isExpired()) {
            throw new LicenseExpiredException();
        }

        if ($license->isDisabled()) {
            throw new LicenseDisabledException();
        }

        if (!$license->isValid()) {
            throw new LicenseInvalidException();
        }
    }
}
```

### Application Layer Usage

```php
// In an application service
class LicenseService
{
    public function __construct(
        private DomainExceptionMapperInterface $exceptionMapper
    ) {}

    public function validateLicense(string $licenseKey): array
    {
        try {
            $license = $this->licenseRepository->findByKey($licenseKey);
            $this->licenseValidator->validateLicense($license);

            return ['valid' => true];
        } catch (DomainException $exception) {
            return [
                'valid' => false,
                'error_code' => $this->exceptionMapper->mapToErrorMetadata($exception)['error_code'],
                'http_status' => $this->exceptionMapper->mapToHttpStatusCode($exception)
            ];
        }
    }
}
```

## Migration Steps

1. **Create Domain Exceptions**: Move license exceptions to domain layer
2. **Update Imports**: Change import statements in existing code
3. **Add Exception Mapper**: Implement domain exception to HTTP response mapping
4. **Update Tests**: Modify tests to use new exception locations
5. **Remove Old Exceptions**: Delete old application service exceptions

## Testing Strategy

### Domain Exception Tests
```php
class LicenseExpiredExceptionTest extends TestCase
{
    public function testExceptionHasCorrectErrorCode(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals('license_expired', $exception->getErrorCode());
    }

    public function testExceptionHasCorrectMessage(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals('License has expired.', $exception->getMessage());
    }
}
```

### Exception Mapper Tests
```php
class DomainExceptionMapperTest extends TestCase
{
    public function testMapsLicenseExpiredToHttp400(): void
    {
        $mapper = new DomainExceptionMapper();
        $exception = new LicenseExpiredException();

        $this->assertEquals(400, $mapper->mapToHttpStatusCode($exception));
    }

    public function testMapsLicenseExpiredToCorrectMetadata(): void
    {
        $mapper = new DomainExceptionMapper();
        $exception = new LicenseExpiredException();

        $metadata = $mapper->mapToErrorMetadata($exception);

        $this->assertEquals('license_expired', $metadata['error_code']);
        $this->assertEquals('expired', $metadata['license_status']);
    }
}
```

## Conclusion

This refactoring improves the codebase by:

1. **Following Clean Architecture**: Proper separation of concerns
2. **Enhancing Testability**: Business logic isolated from technical concerns
3. **Improving Maintainability**: Clear responsibility boundaries
4. **Future-Proofing**: Scalable exception handling patterns

The domain exceptions now properly represent business rule violations, while the application layer handles the technical concerns of HTTP response mapping.
