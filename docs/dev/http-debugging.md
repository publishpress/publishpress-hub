# HTTP Request Debugging Guide

This guide explains how to debug HTTP requests and responses in the PublishPress Hub application, particularly for EDD (Easy Digital Downloads) API calls.

## Overview

The application includes comprehensive debugging capabilities for HTTP requests through the `HttpDebugger` utility class and integrated debugging in the `EddSubscriptionAdapter`.

## Enabling Debugging

### 1. WordPress Debug Configuration

Add the following to your `wp-config.php`:

```php
// Enable WordPress debugging
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false); // Recommended for production debugging
```

### 2. Debug Log Location

Debug logs are written to: `wp-content/debug.log`

## Debugging EDD API Requests

### Automatic Debugging

The `EddSubscriptionAdapter` automatically logs request and response details when `WP_DEBUG` is enabled. This includes:

- **Request Details**: Method, URL, body parameters, headers, timeout settings
- **Response Details**: Status code, response headers, response body, error information

### Example Debug Output

When debugging is enabled, you'll see log entries like:

```
[HTTP_DEBUG] REQUEST: {
    "timestamp": "2024-01-15 10:30:45",
    "method": "GET",
    "url": "https://your-edd-store.com/edd-api/",
    "body": {
        "edd_action": "check_license",
        "license": "your-license-key",
        "item_id": "123",
        "url": "https://your-site.com"
    },
    "timeout": 15,
    "sslverify": true,
    "headers": []
}

[HTTP_DEBUG] RESPONSE: {
    "timestamp": "2024-01-15 10:30:46",
    "error": false,
    "status_code": 200,
    "status_message": "OK",
    "headers": {
        "content-type": "application/json",
        "server": "nginx"
    },
    "body": "{\"license\":\"valid\",\"item_id\":123,\"success\":true}",
    "cookies": []
}
```

## Using the HttpDebugger Utility

### Basic Usage

```php
use PublishPress\Hub\Infrastructure\Remote\HttpDebugger;

// Debug a request
HttpDebugger::debugRequest('POST', 'https://api.example.com', [
    'body' => ['key' => 'value'],
    'headers' => ['Authorization' => 'Bearer token']
]);

// Debug a response
HttpDebugger::debugResponse($wpResponse);
```

### Advanced Debugging

```php
// Debug raw HTTP request (for network-level debugging)
HttpDebugger::debugRawRequest('POST', 'https://api.example.com', $args);

// Get debug info as array (useful for testing)
$debugInfo = HttpDebugger::getDebugInfo('GET', 'https://api.example.com', $args);

// Format response for debugging
$formattedResponse = HttpDebugger::formatResponse($wpResponse);
```

## Testing with the Debug Script

Use the provided debug script to test EDD API calls:

```bash
# Run the debug script
php debug-edd-requests.php
```

**Note**: Update the script with your actual license key and download ID before running.

## Debugging Specific Scenarios

### 1. License Validation Issues

When debugging license validation problems:

1. Check the request body for correct parameters
2. Verify the license key format
3. Confirm the download ID is correct
4. Check response status codes and error messages

### 2. Network Connectivity Issues

For network-related problems:

1. Use `debugRawRequest()` to see the exact HTTP request
2. Check timeout settings
3. Verify SSL certificate validation
4. Review response headers for server information

### 3. API Response Parsing

For response parsing issues:

1. Check the raw response body
2. Verify JSON format
3. Review response headers for content-type
4. Look for error messages in the response

## Debugging Best Practices

### 1. Selective Debugging

Only enable debugging when needed:

```php
// Conditional debugging
if (defined('WP_DEBUG') && WP_DEBUG) {
    HttpDebugger::debugRequest($method, $url, $args);
}
```

### 2. Sensitive Data Handling

Be careful with sensitive information in debug logs:

```php
// Sanitize sensitive data before logging
$debugArgs = $args;
$debugArgs['body']['license'] = '***REDACTED***';
HttpDebugger::debugRequest($method, $url, $debugArgs);
```

### 3. Performance Considerations

Debug logging can impact performance:

- Disable in production environments
- Use log rotation for large debug files
- Consider using different log levels

## Troubleshooting Common Issues

### Issue: No Debug Output

**Solution**: Verify that `WP_DEBUG` is enabled and the log file is writable.

### Issue: Incomplete Request Information

**Solution**: Check that all request parameters are being passed correctly to the debug method.

### Issue: Response Body is Empty

**Solution**: Verify the API endpoint is responding correctly and check for network issues.

### Issue: SSL Certificate Errors

**Solution**: Review the `sslverify` parameter and server certificate configuration.

## Integration with Testing

The `HttpDebugger` utility can be used in tests to verify request/response behavior:

```php
public function testLicenseValidation()
{
    $debugInfo = HttpDebugger::getDebugInfo('GET', $url, $args);
    $this->assertArrayHasKey('body', $debugInfo);
    $this->assertArrayHasKey('edd_action', $debugInfo['body']);
}
```

## Additional Resources

- [WordPress HTTP API Documentation](https://developer.wordpress.org/reference/functions/wp_remote_request/)
- [EDD API Documentation](https://docs.easydigitaldownloads.com/article/1135-edd-api)
- [PHP Error Logging](https://www.php.net/manual/en/function.error-log.php)
