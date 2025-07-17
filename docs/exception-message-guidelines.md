# Domain Exception Message Guidelines

## Overview

This document outlines the best practices for handling messages in domain exceptions, balancing domain purity with user experience.

## Core Principles

### 1. Fixed Base Messages
Domain exceptions should have **fixed, consistent base messages** that represent the business rule violation.

```php
// ✅ Good: Fixed business rule message
class LicenseExpiredException extends LicenseException
{
    public function __construct(array $context = [])
    {
        parent::__construct('License has expired.'); // Fixed message
        $this->context = $context;
    }
}

// ❌ Bad: Custom messages in domain
class LicenseExpiredException extends LicenseException
{
    public function __construct(string $customMessage)
    {
        parent::__construct($customMessage); // Inconsistent messages
    }
}
```

### 2. Context for Enhancement
Use **context arrays** to provide additional information without changing the core message.

```php
// Domain Layer: Pure business logic
$exception = new LicenseExpiredException([
    'license_key' => 'abc123def456',
    'expiry_date' => '2024-01-15',
    'days_expired' => 30
]);

// Application Layer: Enhanced message
$message = $this->exceptionMapper->getEnhancedMessage($exception);
// Result: "License has expired. (License: abc123de..., Expired: 2024-01-15)"
```

### 3. Application Layer Enhancement
Enhance messages in the application layer, not the domain layer.

```php
// Application Layer: Message enhancement
class DomainExceptionMapper
{
    private function getEnhancedMessage(DomainException $exception): string
    {
        $baseMessage = $exception->getMessage();

        if ($exception instanceof LicenseExpiredException) {
            $context = $exception->getContext();
            if (isset($context['days_expired'])) {
                $baseMessage .= " It expired {$context['days_expired']} days ago.";
            }
        }

        return $baseMessage;
    }
}
```

## Implementation Examples

### License Exceptions with Context

```php
<?php

namespace PublishPress\Hub\Domain\Exception\License;

class LicenseExpiredException extends LicenseException
{
    private $context;

    public function __construct(array $context = [])
    {
        parent::__construct('License has expired.');
        $this->context = $context;
    }

    public function getContext(): array
    {
        return $this->context;
    }
}

class LicenseInvalidException extends LicenseException
{
    private $context;

    public function __construct(array $context = [])
    {
        parent::__construct('License key is invalid.');
        $this->context = $context;
    }

    public function getContext(): array
    {
        return $this->context;
    }
}
```

### Domain Usage

```php
<?php

namespace PublishPress\Hub\Domain\Service;

class LicenseValidator
{
    public function validateLicense(License $license): void
    {
        if ($license->isExpired()) {
            throw new LicenseExpiredException([
                'license_key' => $license->getKey(),
                'expiry_date' => $license->getExpiryDate()->format('Y-m-d'),
                'days_expired' => $license->getDaysExpired()
            ]);
        }

        if (!$license->isValid()) {
            throw new LicenseInvalidException([
                'license_key' => $license->getKey(),
                'validation_errors' => $license->getValidationErrors()
            ]);
        }
    }
}
```

### Application Layer Enhancement

```php
<?php

namespace PublishPress\Hub\Application\Service;

class DomainExceptionMapper
{
    private function getEnhancedMessage(DomainException $exception): string
    {
        $baseMessage = $exception->getMessage();

        if ($exception instanceof LicenseExpiredException) {
            $context = $exception->getContext();
            $details = [];

            if (isset($context['days_expired'])) {
                $details[] = "expired {$context['days_expired']} days ago";
            }

            if (isset($context['expiry_date'])) {
                $details[] = "on {$context['expiry_date']}";
            }

            if (!empty($details)) {
                $baseMessage .= ' (' . implode(', ', $details) . ')';
            }
        }

        if ($exception instanceof LicenseInvalidException) {
            $context = $exception->getContext();
            if (isset($context['validation_errors'])) {
                $baseMessage .= ' - ' . implode(', ', $context['validation_errors']);
            }
        }

        return $baseMessage;
    }
}
```

## Benefits of This Approach

### 1. Domain Purity
- **Consistent Messages**: Same business rule always has the same base message
- **Predictable Behavior**: Domain exceptions behave consistently
- **Easy Testing**: No need to test different message variations

### 2. User Experience
- **Enhanced Context**: Users get relevant details when available
- **Consistent Format**: Base message + context follows a predictable pattern
- **Internationalization**: Base messages can be easily translated

### 3. Debugging
- **Clear Identification**: Base message clearly identifies the business rule
- **Context Preservation**: Additional context is preserved for debugging
- **Structured Data**: Context is available as structured data, not just text

### 4. Flexibility
- **Context Optional**: Context is optional and doesn't break existing code
- **Multiple Formats**: Same exception can be presented differently in different contexts
- **Future Extensibility**: Easy to add new context fields

## Testing Guidelines

### Domain Exception Tests

```php
class LicenseExpiredExceptionTest extends TestCase
{
    public function testExceptionHasFixedMessage(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals('License has expired.', $exception->getMessage());
    }

    public function testExceptionPreservesContext(): void
    {
        $context = ['license_key' => 'test123', 'expiry_date' => '2024-01-15'];
        $exception = new LicenseExpiredException($context);

        $this->assertEquals($context, $exception->getContext());
    }

    public function testExceptionWorksWithoutContext(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals([], $exception->getContext());
    }
}
```

### Application Layer Tests

```php
class DomainExceptionMapperTest extends TestCase
{
    public function testEnhancesLicenseExpiredMessage(): void
    {
        $mapper = new DomainExceptionMapper();
        $exception = new LicenseExpiredException([
            'days_expired' => 30,
            'expiry_date' => '2024-01-15'
        ]);

        $metadata = $mapper->mapToErrorMetadata($exception);

        $this->assertEquals(
            'License has expired. (expired 30 days ago, on 2024-01-15)',
            $metadata['message']
        );
    }

    public function testPreservesBaseMessageWithoutContext(): void
    {
        $mapper = new DomainExceptionMapper();
        $exception = new LicenseExpiredException();

        $metadata = $mapper->mapToErrorMetadata($exception);

        $this->assertEquals('License has expired.', $metadata['message']);
    }
}
```

## Migration Guide

When migrating from custom messages to fixed messages with context:

1. **Identify Base Messages**: Determine the core business rule message
2. **Extract Context**: Move variable information to context arrays
3. **Update Constructors**: Change from string parameters to array context
4. **Enhance Application Layer**: Add message enhancement logic
5. **Update Tests**: Test both base messages and enhanced messages

## Best Practices Summary

1. **Fixed Base Messages**: Domain exceptions should have consistent, fixed messages
2. **Context Arrays**: Use context arrays for additional information
3. **Application Enhancement**: Enhance messages in the application layer
4. **Optional Context**: Context should be optional and not break existing code
5. **Structured Data**: Keep context as structured data, not formatted strings
6. **Consistent Patterns**: Follow consistent patterns for message enhancement
7. **Test Both**: Test both base messages and enhanced messages

This approach maintains domain purity while providing excellent user experience and debugging capabilities.
