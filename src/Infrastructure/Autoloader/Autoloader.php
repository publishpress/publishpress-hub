<?php declare(strict_types=1);
/**
 * Autoloader for the PublishPress Hub library.
 *
 * This file defines the autoloader for the PublishPress Hub library.
 *
 * @package PublishPress\Hub
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Infrastructure\Autoloader;

/**
 * Autoloader for the PublishPress Hub library.
 *
 * This class is responsible for autoloading the classes in the PublishPress Hub library.
 *
 * @since 1.0.0
 */
abstract class Autoloader
{
    /**
     * The namespace prefix and base directory map for the classes.
     *
     * @since 1.0.0
     * @var array
     */
    private static array $namespaceBaseDirs = [];

    /**
     * Flag to track if autoloader is already registered
     *
     * @since 1.0.0
     * @var bool
     */
    private static bool $registered = false;

    /**
     * Register the autoloader with spl_autoload_register
     *
     * @since 1.0.0
     * @param string $namespacePrefix The namespace prefix for the classes.
     * @param string $baseDir The base directory for the classes.
     * @return void
     */
    public static function register(string $namespacePrefix, string $baseDir): void
    {
        self::$namespaceBaseDirs[$namespacePrefix] = rtrim($baseDir, '/') . '/';

        // Only register the autoloader once
        if (!self::$registered) {
            spl_autoload_register([self::class, 'autoload']);
            self::$registered = true;
        }
    }

    /**
     * Unregister the autoloader and clear all namespace mappings
     *
     * @since 1.0.0
     * @return void
     */
    public static function unregister(): void
    {
        if (self::$registered) {
            spl_autoload_unregister([self::class, 'autoload']);
            self::$registered = false;
        }

        self::$namespaceBaseDirs = [];
    }

    /**
     * Autoload function that loads classes based on the namespace and class name
     *
     * @since 1.0.0
     * @param string $class The fully qualified class name.
     * @return void
     */
    public static function autoload(string $class): void
    {
        foreach (self::$namespaceBaseDirs as $namespacePrefix => $baseDir) {
            $len = strlen($namespacePrefix);

            if (strncmp($namespacePrefix, $class, $len) !== 0) {
                continue;
            }

            $relativeClass = substr($class, $len);

            $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

            // If the file exists, require it
            if (file_exists($file)) {
                require $file;

                return;
            }
        }
    }
}
