<?php

/**
 * Autoloader for the PublishPress Hub library.
 *
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Autoloader;

/**
 * @since 1.0.0
 */
abstract class Autoloader
{
    /**
     * @since 1.0.0
     * @var array<string, string>
     */
    private static array $namespaceBaseDirs = [];

    /**
     * @since 1.0.0
     */
    private static bool $registered = false;

    /**
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
