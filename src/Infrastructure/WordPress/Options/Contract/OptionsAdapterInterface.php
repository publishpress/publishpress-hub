<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Options\Contract;

interface OptionsAdapterInterface
{
    /**
     * Store a value in WordPress options.
     *
     * @param string $optionName The option name
     * @param mixed $value The value to store
     * @param bool $autoload Whether to autoload the option
     * @return bool True on success, false on failure
     */
    public function addOption(string $optionName, $value, bool $autoload = true): bool;

    /**
     * Update a value in WordPress options.
     *
     * @param string $optionName The option name
     * @param mixed $value The value to store
     * @param bool $autoload Whether to autoload the option
     * @return bool True on success, false on failure
     */
    public function updateOption(string $optionName, $value, bool $autoload = true): bool;

    /**
     * Retrieve a value from WordPress options.
     *
     * @param string $optionName The option name
     * @param mixed $default The default value if option doesn't exist
     * @return mixed The option value or default
     */
    public function getOption(string $optionName, $default = false);

    /**
     * Delete a value from WordPress options.
     *
     * @param string $optionName The option name
     * @return bool True on success, false on failure
     */
    public function deleteOption(string $optionName): bool;

    /**
     * Check if an option exists.
     *
     * @param string $optionName The option name
     * @return bool True if option exists, false otherwise
     */
    public function optionExists(string $optionName): bool;
}
