# ContextTrait Usage Guide

## Overview

The `ContextTrait` provides a reusable way to add context information to domain exceptions, making them more informative while maintaining domain purity.

## Basic Usage

### Using the Trait

```php
<?php

namespace PublishPress\Hub\Domain\Exception;

use PublishPress\Hub\Domain\Exception\ContextTrait;

class MyDomainException extends DomainException
{
    use ContextTrait;

    public function __construct(array $context = [])
    {
        parent::__construct('My business rule was violated.');
        $this->setContext($context);
    }
}
```

### Using with Base Class Constructor (Recommended)

For exception hierarchies, you can create a base class that handles context:

```php
<?php

namespace PublishPress\Hub\Domain\Exception;

abstract class MyBaseException extends DomainException
{
    use ContextTrait;

    public function __construct(string $message, array $context = [])
    {
        parent::__construct($message);
        $this->setContext($context);
    }
}

class MySpecificException extends MyBaseException
{
    public function __construct(array $context = [])
    {
        parent::__construct('Specific business rule violated.', $context);
    }
}
```

### License Exceptions (Already Implemented)

All license exceptions automatically get context capability through the `LicenseException` base class:

```php
<?php

namespace PublishPress\Hub\Domain\Exception\License;

class LicenseExpiredException extends LicenseException
{
    public function __construct(array $context = [])
    {
        parent::__construct('License has expired.', $context);
    }
}

// Usage
throw new LicenseExpiredException([
    'license_key' => 'abc123def456',
    'expiry_date' => '2024-01-15',
    'days_expired' => 30
]);
```

## Trait Methods

### `setContext(array $context): void`
Sets the context information for the exception.

```php
$this->setContext([
    'user_id' => 123,
    'action' => 'license_validation',
    'timestamp' => time()
]);
```

### `getContext(): array`
Retrieves the context information.

```php
$context = $exception->getContext();
// Returns: ['user_id' => 123, 'action' => 'license_validation', ...]
```

### `hasContext(): bool`
Checks if the exception has any context information.

```php
if ($exception->hasContext()) {
    // Process context information
}
```

## Advanced Usage Examples

### Plugin Installation Exception

```php
<?php

namespace PublishPress\Hub\Domain\Exception\Plugin;

use PublishPress\Hub\Domain\Exception\ContextTrait;
use PublishPress\Hub\Domain\Exception\DomainException;

class PluginInstallationException extends DomainException
{
    use ContextTrait;

    public function __construct(array $context = [])
    {
        parent::__construct('Plugin installation failed.');
        $this->setContext($context);
    }
}

// Usage
throw new PluginInstallationException([
    'plugin_slug' => 'my-plugin',
    'version' => '1.2.3',
    'error_type' => 'dependency_missing',
    'missing_dependencies' => ['php-extension', 'wordpress-version']
]);
```

### User Permission Exception

```php
<?php

namespace PublishPress\Hub\Domain\Exception\User;

use PublishPress\Hub\Domain\Exception\ContextTrait;
use PublishPress\Hub\Domain\Exception\DomainException;

class InsufficientPermissionException extends DomainException
{
    use ContextTrait;

    public function __construct(array $context = [])
    {
        parent::__construct('Insufficient permissions for this action.');
        $this->setContext($context);
    }
}

// Usage
throw new InsufficientPermissionException([
    'user_id' => 456,
    'required_capability' => 'manage_options',
    'current_capabilities' => ['read', 'edit_posts'],
    'action' => 'install_plugin'
]);
```

## Application Layer Integration

### Enhanced Exception Mapper

The `DomainExceptionMapper` automatically detects and processes context from any exception using the trait:

```php
<?php

namespace PublishPress\Hub\Application\Service;

class DomainExceptionMapper
{
    public function mapToErrorMetadata(DomainException $exception): array
    {
        $metadata = [
            'error_code' => $this->getErrorCode($exception),
            'message' => $this->getEnhancedMessage($exception),
        ];

        // Automatically add context if available
        if ($this->hasContext($exception)) {
            $metadata['context'] = $this->getContext($exception);
        }

        return $metadata;
    }

    private function getEnhancedMessage(DomainException $exception): string
    {
        $baseMessage = $exception->getMessage();
        $context = $this->getContext($exception);

        // Enhance message based on exception type and context
        if ($exception instanceof LicenseExpiredException && !empty($context)) {
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

        if ($exception instanceof PluginInstallationException && !empty($context)) {
            if (isset($context['plugin_slug'])) {
                $baseMessage .= " Plugin: {$context['plugin_slug']}";
            }
            if (isset($context['error_type'])) {
                $baseMessage .= " Error: {$context['error_type']}";
            }
        }

        return $baseMessage;
    }
}
```

### WordPress Error Adapter

The `WordPressErrorAdapter` preserves context in WP_Error objects:

```php
<?php

namespace PublishPress\Hub\Application\Service;

class WordPressErrorAdapter
{
    public function toWPError(DomainException $exception): WP_Error
    {
        $errorCode = $this->exceptionMapper->mapToErrorMetadata($exception)['error_code'];
        $message = $exception->getMessage();
        $httpStatusCode = $this->exceptionMapper->mapToHttpStatusCode($exception);

        $wpError = new WP_Error($errorCode, $message, [
            'status' => $httpStatusCode,
            'domain_exception' => $exception,
        ]);

        // Add context as additional data
        if ($this->exceptionMapper->hasContext($exception)) {
            $context = $this->exceptionMapper->getContext($exception);
            $wpError->add_data(['context' => $context]);
        }

        return $wpError;
    }
}
```

## Testing with Context

### Domain Exception Tests

```php
<?php

namespace PublishPress\Hub\Tests\Unit\Domain\Exception;

use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PHPUnit\Framework\TestCase;

class LicenseExpiredExceptionTest extends TestCase
{
    public function testExceptionHasFixedMessage(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals('License has expired.', $exception->getMessage());
    }

    public function testExceptionPreservesContext(): void
    {
        $context = [
            'license_key' => 'test123',
            'expiry_date' => '2024-01-15',
            'days_expired' => 30
        ];

        $exception = new LicenseExpiredException($context);

        $this->assertEquals($context, $exception->getContext());
        $this->assertTrue($exception->hasContext());
    }

    public function testExceptionWorksWithoutContext(): void
    {
        $exception = new LicenseExpiredException();

        $this->assertEquals([], $exception->getContext());
        $this->assertFalse($exception->hasContext());
    }
}
```

### Application Layer Tests

```php
<?php

namespace PublishPress\Hub\Tests\Unit\Application\Service;

use PublishPress\Hub\Application\Service\DomainExceptionMapper;
use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PHPUnit\Framework\TestCase;

class DomainExceptionMapperTest extends TestCase
{
    private DomainExceptionMapper $mapper;

    protected function setUp(): void
    {
        $this->mapper = new DomainExceptionMapper();
    }

    public function testDetectsContextCapability(): void
    {
        $exception = new LicenseExpiredException(['test' => 'value']);

        $metadata = $this->mapper->mapToErrorMetadata($exception);

        $this->assertArrayHasKey('context', $metadata);
        $this->assertEquals(['test' => 'value'], $metadata['context']);
    }

    public function testEnhancesMessageWithContext(): void
    {
        $exception = new LicenseExpiredException([
            'days_expired' => 30,
            'expiry_date' => '2024-01-15'
        ]);

        $metadata = $this->mapper->mapToErrorMetadata($exception);

        $this->assertStringContainsString('expired 30 days ago', $metadata['message']);
        $this->assertStringContainsString('on 2024-01-15', $metadata['message']);
    }
}
```

## Best Practices

### 1. Use Descriptive Context Keys
```php
// ✅ Good: Descriptive keys
$context = [
    'license_key' => 'abc123',
    'expiry_date' => '2024-01-15',
    'days_expired' => 30
];

// ❌ Bad: Generic keys
$context = [
    'key' => 'abc123',
    'date' => '2024-01-15',
    'count' => 30
];
```

### 2. Keep Context Relevant
```php
// ✅ Good: Relevant context
$context = [
    'plugin_slug' => 'my-plugin',
    'error_type' => 'dependency_missing',
    'missing_dependencies' => ['php-extension']
];

// ❌ Bad: Irrelevant context
$context = [
    'plugin_slug' => 'my-plugin',
    'server_time' => time(),
    'random_data' => 'unrelated'
];
```

### 3. Use Consistent Context Structure
```php
// ✅ Good: Consistent structure
$context = [
    'entity_id' => 123,
    'entity_type' => 'license',
    'action' => 'validation',
    'timestamp' => time()
];

// ❌ Bad: Inconsistent structure
$context = [
    'id' => 123,
    'type' => 'license',
    'what_happened' => 'validation',
    'when' => time()
];
```

### 4. Handle Context Gracefully
```php
// Always check if context exists before using it
if ($exception->hasContext()) {
    $context = $exception->getContext();
    // Process context
}
```

## Benefits

1. **Reusability**: Can be used by any exception class
2. **Consistency**: All exceptions with context work the same way
3. **Flexibility**: Easy to add context to new exception types
4. **Maintainability**: Context logic is centralized in the trait
5. **Testability**: Easy to test context functionality
6. **Future-Proof**: Can be extended with new context features

The `ContextTrait` provides a clean, reusable solution for adding context to domain exceptions while maintaining Clean Architecture principles.
