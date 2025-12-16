# License Keys in wp-config.php

This document explains how to define license keys for PublishPress Hub plugins using WordPress constants in `wp-config.php`.

## Overview

You can define license keys for PublishPress Hub plugins using WordPress constants in your `wp-config.php` file. When license keys are set via constants, they become read-only in the Hub dashboard and are automatically considered valid without API validation.

## Constant Naming Convention

### Global License Key

To set a license key that applies to all plugins:

```php
define('PUBLISHPRESS_HUB_LICENSE_KEY', 'your-license-key-here');
```

### Per-Plugin License Keys

To set a license key for a specific plugin, use the plugin family slug:

```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_{PLUGIN_SLUG}', 'your-license-key-here');
```

**Precedence**: Per-plugin constants take precedence over the global constant. If a plugin has its own constant defined, it will use that instead of the global constant.

## Available Plugin Constants

Based on the available plugin families, you can use the following constants:

### PublishPress Checklists
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_CHECKLISTS', 'your-license-key-here');
```

### PublishPress Permissions
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_PERMISSIONS', 'your-license-key-here');
```

### PublishPress Authors
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_AUTHORS', 'your-license-key-here');
```

### PublishPress Blocks
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_BLOCKS', 'your-license-key-here');
```

### PublishPress Capabilities
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_CAPABILITIES', 'your-license-key-here');
```

### PublishPress Future
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_FUTURE', 'your-license-key-here');
```

### PublishPress Planner
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_PLANNER', 'your-license-key-here');
```

### PublishPress Revisions
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_REVISIONS', 'your-license-key-here');
```

### PublishPress Series
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_SERIES', 'your-license-key-here');
```

### PublishPress Statuses
```php
define('PUBLISHPRESS_HUB_LICENSE_KEY_STATUSES', 'your-license-key-here');
```

## Example Configuration

### Example 1: Global License for All Plugins

```php
// In wp-config.php
define('PUBLISHPRESS_HUB_LICENSE_KEY', 'abc123xyz789');
```

This will apply the same license key to all PublishPress Hub plugins.

### Example 2: Mixed Configuration

```php
// In wp-config.php
// Global license for most plugins
define('PUBLISHPRESS_HUB_LICENSE_KEY', 'abc123xyz789');

// Specific license for Checklists plugin (takes precedence)
define('PUBLISHPRESS_HUB_LICENSE_KEY_CHECKLISTS', 'checklists-specific-key');
```

In this example:
- The Checklists plugin will use `checklists-specific-key`
- All other plugins will use `abc123xyz789`

## Behavior

### When Constants Are Set

- License keys are automatically synced to the database when the Hub admin area loads
- Licenses are marked as valid/active without API validation (constants are trusted)
- License keys cannot be changed via the Hub dashboard
- License keys cannot be deactivated via the Hub dashboard
- The Hub dashboard will display a message indicating the license is managed via wp-config.php

### When Constants Are Removed

- If a constant was previously set but is now removed from `wp-config.php`, the license will be automatically deactivated
- This allows you to disable licenses by simply removing the constant

## Security Considerations

- **Never commit `wp-config.php` with license keys to version control**
- License keys defined in constants are considered valid without API validation
- Ensure your `wp-config.php` file has proper file permissions (typically 600 or 644)
- Consider using environment variables or secure configuration management tools for production environments

## Troubleshooting

### License Not Appearing as Active

1. Verify the constant name is correct (case-sensitive, uppercase)
2. Ensure the constant is defined before WordPress loads
3. Check that the plugin family slug matches exactly (see list above)
4. Clear any caching that might affect constant reading

### License Key Not Syncing

1. Ensure you're accessing the WordPress admin area (sync happens on admin load)
2. Check that the constant value is a non-empty string
3. Verify the plugin family is registered in the Hub

### Need to Change a License Key

To change a license key that's set via constant:

1. Update the constant value in `wp-config.php`
2. Reload the WordPress admin area
3. The new license key will be automatically synced

## Notes

- Constants must be defined before WordPress loads (typically in `wp-config.php`)
- The sync process runs automatically when accessing the WordPress admin area
- License keys from constants always override database-stored values
- Per-plugin constants always take precedence over the global constant

