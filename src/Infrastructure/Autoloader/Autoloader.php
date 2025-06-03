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
class Autoloader
{
    /**
     * The namespace prefix for the classes.
     *
     * @since 1.0.0
     * @var string
     */
    private static string $namespacePrefix;

    /**
     * The base directory for the classes.
     *
     * @since 1.0.0
     * @var string
     */
    private static string $baseDir;

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
        self::$namespacePrefix = $namespacePrefix;
        self::$baseDir = rtrim($baseDir, '/') . '/';

        spl_autoload_register([self::class, 'autoload']);
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
        $len = strlen(self::$namespacePrefix);

        if (strncmp(self::$namespacePrefix, $class, $len) !== 0) {
            return;
        }

        $relativeClass = substr($class, $len);

        $file = self::$baseDir . str_replace('\\', '/', $relativeClass) . '.php';

        // If the file exists, require it
        if (file_exists($file)) {
            require $file;
        }
    }
}
