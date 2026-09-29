<?php

/**
 * WordPress options adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\Options
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Options;

defined('ABSPATH') || exit;

use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class WPOptionsAdapter implements WPOptionsAdapterInterface
{
    /**
     * Store a value in WordPress options.
     *
     * @param string $optionName The option name
     * @param mixed $value The value to store
     * @param bool $autoload Whether to autoload the option
     * @return bool True on success, false on failure
     * @since 1.0.0
     */
    public function addOption(string $optionName, $value, bool $autoload = true): bool
    {
        return add_option($optionName, $value, '', $autoload);
    }

    /**
     * Update a value in WordPress options.
     *
     * @param string $optionName The option name
     * @param mixed $value The value to store
     * @param bool $autoload Whether to autoload the option
     * @return bool True on success, false on failure
     * @since 1.0.0
     */
    public function updateOption(string $optionName, $value, bool $autoload = true): bool
    {
        return update_option($optionName, $value, $autoload);
    }

    /**
     * Retrieve a value from WordPress options.
     *
     * @param string $optionName The option name
     * @param mixed $default The default value if option doesn't exist
     * @return mixed The option value or default
     * @since 1.0.0
     */
    public function getOption(string $optionName, $default = false)
    {
        return get_option($optionName, $default);
    }

    /**
     * Delete a value from WordPress options.
     *
     * @param string $optionName The option name
     * @return bool True on success, false on failure
     * @since 1.0.0
     */
    public function deleteOption(string $optionName): bool
    {
        return delete_option($optionName);
    }

    /**
     * Check if an option exists.
     *
     * @param string $optionName The option name
     * @return bool True if option exists, false otherwise
     * @since 1.0.0
     */
    public function optionExists(string $optionName): bool
    {
        return get_option($optionName) !== false;
    }

    /**
     * Get all options with a specific prefix.
     *
     * @param string $prefix The prefix to filter by
     * @return array<string, mixed> Associative array of option_name => option_value
     * @since 1.0.0
     */
    public function getAllOptionsWithPrefix(string $prefix): array
    {
        global $wpdb;

        $prefixEscaped = $wpdb->esc_like($prefix) . '%';

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT option_name, option_value FROM {$wpdb->options} WHERE option_name LIKE %s",
                $prefixEscaped
            ),
            ARRAY_A
        );

        $options = [];
        foreach ($results as $row) {
            $unserialized = maybe_unserialize($row['option_value']);
            // Validate the unserialized data structure - only allow arrays and scalar values
            // This prevents object injection if the database is compromised
            if (is_array($unserialized) || is_scalar($unserialized)) {
                $options[$row['option_name']] = $unserialized;
            } else {
                // If unserialized data is an object or other unexpected type, use original value
                // This prevents potential object injection while maintaining functionality
                $options[$row['option_name']] = $row['option_value'];
            }
        }

        return $options;
    }
}
