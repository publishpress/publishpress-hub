<?php

/**
 * Autoloader for the PublishPress Hub library.
 *
 * @package PublishPress\Hub\Infrastructure\Autoloader
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Autoloader;

defined('ABSPATH') || exit;

/**
 * Autoloader for the PublishPress Hub library.
 *
 * @package PublishPress\Hub\Infrastructure\Autoloader
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */
abstract class Autoloader
{
    /**
     * @since 1.0.0
     * @var array<string, string>
     */
    private static array $namespaceBaseDirs = [];

    private static bool $registered = false;

    /**
     * Register a namespace prefix with a base directory.
     *
     * @param string $namespacePrefix The namespace prefix to register.
     * @param string $baseDir The base directory to register.
     * @since 1.0.0
     */
    public static function register(string $namespacePrefix, string $baseDir): void
    {
        self::$namespaceBaseDirs[$namespacePrefix] = rtrim($baseDir, '/') . '/';

        if (!self::$registered) {
            spl_autoload_register([self::class, 'autoload']);
            self::$registered = true;
        }
    }

    /**
     * Unregister a namespace prefix.
     *
     * @since 1.0.0
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
     * Autoload a class.
     *
     * @param string $fullyQualifiedClassName The fully qualified class name to autoload.
     * @since 1.0.0
     */
    public static function autoload(string $fullyQualifiedClassName): void
    {
        foreach (self::$namespaceBaseDirs as $namespacePrefix => $baseDir) {
            $len = strlen($namespacePrefix);

            if (strncmp($namespacePrefix, $fullyQualifiedClassName, $len) !== 0) {
                continue;
            }

            $relativeClass = substr($fullyQualifiedClassName, $len);

            $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

            if (file_exists($file)) {
                require $file;

                return;
            }
        }
    }
}
