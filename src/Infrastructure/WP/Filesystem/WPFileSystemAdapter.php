<?php

/**
 * WordPress file system adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\Filesystem
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Filesystem;

use InvalidArgumentException;
use WP_Filesystem_Base;
use WP_Error;

class WPFileSystemAdapter
{
    private ?WP_Filesystem_Base $wpFilesystem = null;

    /**
     * Allowed base directories for file operations.
     *
     * @var array<string>
     */
    private array $allowedBasePaths;

    /**
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->wpFilesystem = $this->getWpFilesystem();
        $this->allowedBasePaths = $this->getAllowedBasePaths();
    }

    /**
     * Check if a file exists.
     *
     * Security: Only paths within allowed directories are permitted.
     * See getAllowedBasePaths() for directory whitelist.
     *
     * @param string $path The path.
     * @return bool True if the file exists, false otherwise.
     * @throws InvalidArgumentException When path validation fails.
     * @since 1.0.0
     */
    public function exists(string $path): bool
    {
        $this->validatePath($path);
        return $this->getWpFilesystem()->exists($path);
    }

    /**
     * Read a file's contents.
     *
     * @param string $path The path.
     * @return string|false The file contents, or false on failure.
     * @since 1.0.0
     */
    public function getContents(string $path)
    {
        $this->validatePath($path);
        return $this->getWpFilesystem()->get_contents($path);
    }

    /**
     * Write contents to a file.
     *
     * @param string $path The path.
     * @param string $contents The contents.
     * @return bool True on success, false on failure.
     * @since 1.0.0
     */
    public function putContents(string $path, string $contents): bool
    {
        $this->validatePath($path);
        return $this->getWpFilesystem()->put_contents($path, $contents);
    }

    /**
     * Append contents to a file.
     *
     * @param string $path The path.
     * @param string $contents The contents.
     * @return bool True on success, false on failure.
     * @since 1.0.0
     */
    public function appendContents(string $path, string $contents): bool
    {
        $existingContents = $this->getContents($path);

        if (false === $existingContents) {
            $existingContents = '';
        }

        return $this->putContents($path, $existingContents . $contents);
    }

    /**
     * Create a directory.
     *
     * @param string $path The path.
     * @param int $chmod The directory permissions.
     * @return bool True on success, false on failure.
     * @since 1.0.0
     */
    public function makeDirectory(string $path, int $chmod = 0755): bool
    {
        $this->validatePath($path);
        return $this->getWpFilesystem()->mkdir($path, $chmod, true);
    }

    /**
     * Delete a file.
     *
     * Security: Only paths within allowed directories are permitted.
     * See getAllowedBasePaths() for directory whitelist.
     *
     * @param string $path The path.
     * @param bool $recursive The recursive flag.
     * @return bool True if the file was deleted, false otherwise.
     * @throws InvalidArgumentException When path validation fails.
     * @since 1.0.0
     */
    public function delete(string $path, bool $recursive = false): bool
    {
        $this->validatePath($path);
        return $this->getWpFilesystem()->delete($path, $recursive);
    }

    /**
     * Move a file.
     *
     * Security: Both source and destination paths must be within allowed directories.
     * See getAllowedBasePaths() for directory whitelist.
     *
     * @param string $source The source path.
     * @param string $destination The destination path.
     * @param bool $overwrite The overwrite flag.
     * @return bool True if the file was moved, false otherwise.
     * @throws InvalidArgumentException When path validation fails.
     * @since 1.0.0
     */
    public function move(string $source, string $destination, bool $overwrite = false): bool
    {
        $this->validatePath($source);
        $this->validatePath($destination);
        return $this->getWpFilesystem()->move($source, $destination, $overwrite);
    }

    /**
     * Unzip a file.
     *
     * Security: Both source and destination paths must be within allowed directories.
     * See getAllowedBasePaths() for directory whitelist.
     *
     * @param string $source The source path.
     * @param string $destination The destination path.
     * @return bool|WP_Error True if the file was unzipped, WP_Error on failure.
     * @throws InvalidArgumentException When path validation fails.
     * @since 1.0.0
     */
    public function unzip(string $source, string $destination)
    {
        $this->validatePath($source);
        $this->validatePath($destination);
        return unzip_file($source, $destination);
    }

    /**
     * Get the WordPress file system.
     *
     * @return WP_Filesystem_Base The WordPress file system.
     * @since 1.0.0
     */
    private function getWpFilesystem(): WP_Filesystem_Base
    {
        global $wp_filesystem;

        if (empty($wp_filesystem)) {
            require_once ABSPATH . 'wp-admin/includes/file.php';

            WP_Filesystem();
        }

        $this->wpFilesystem = $wp_filesystem;

        return $this->wpFilesystem;
    }

    /**
     * Get the list of allowed base paths for file operations.
     *
     * Only operations within these directories are permitted to prevent
     * unauthorized access to sensitive system files.
     *
     * @return array<string> Array of absolute paths (normalized with realpath).
     * @since 1.0.0
     */
    private function getAllowedBasePaths(): array
    {
        $paths = [
            WP_PLUGIN_DIR,                      // /wp-content/plugins
            WP_CONTENT_DIR . '/upgrade',        // /wp-content/upgrade (temp updates)
            WP_CONTENT_DIR . '/uploads',        // /wp-content/uploads (debug logs)
            get_temp_dir(),                     // System temp directory
        ];

        // Normalize paths using realpath to resolve symlinks and get canonical paths
        $normalizedPaths = [];
        foreach ($paths as $path) {
            $realPath = realpath($path);
            if ($realPath !== false) {
                $normalizedPaths[] = trailingslashit($realPath);
            }
        }

        return $normalizedPaths;
    }

    /**
     * Validate that a file path is safe and within allowed directories.
     *
     * This method prevents path traversal attacks by:
     * - Detecting directory traversal sequences (../, ..\)
     * - Checking for null bytes
     * - Verifying the resolved path is within allowed base directories
     * - Ensuring the path doesn't contain suspicious patterns
     *
     * @param string $path The path to validate.
     * @throws InvalidArgumentException When path validation fails.
     * @since 1.0.0
     */
    private function validatePath(string $path): void
    {
        // Check for null bytes (directory traversal technique)
        if (strpos($path, "\0") !== false) {
            throw new InvalidArgumentException(
                esc_html__('Invalid file path: null byte detected', 'publishpress-hub')
            );
        }

        // Check for obvious traversal patterns before resolving
        $dangerousPatterns = ['../', '..\\'];
        foreach ($dangerousPatterns as $pattern) {
            if (strpos($path, $pattern) !== false) {
                throw new InvalidArgumentException(
                    esc_html__('Invalid file path: directory traversal detected', 'publishpress-hub')
                );
            }
        }

        // Get the absolute path by resolving any relative components
        // If the file doesn't exist yet, validate the directory portion
        $absolutePath = $path;
        if (!file_exists($path)) {
            // For non-existent files, validate the parent directory
            $dirname = dirname($path);
            $basename = basename($path);

            $resolvedDir = realpath($dirname);
            if ($resolvedDir === false) {
                throw new InvalidArgumentException(
                    sprintf(
                        // translators: %s is the directory path
                        esc_html__('Invalid file path: parent directory does not exist: %s', 'publishpress-hub'),
                        esc_html($dirname)
                    )
                );
            }
            $absolutePath = trailingslashit($resolvedDir) . $basename;
        } else {
            $absolutePath = realpath($path);
            if ($absolutePath === false) {
                throw new InvalidArgumentException(
                    esc_html__('Invalid file path: unable to resolve path', 'publishpress-hub')
                );
            }
        }

        // Ensure the resolved path is within one of the allowed base directories
        $isAllowed = false;
        foreach ($this->allowedBasePaths as $basePath) {
            if (
                strpos(trailingslashit($absolutePath), $basePath) === 0 ||
                strpos($absolutePath, rtrim($basePath, '/\\')) === 0
            ) {
                $isAllowed = true;
                break;
            }
        }

        if (!$isAllowed) {
            throw new InvalidArgumentException(
                esc_html__('Invalid file path: operation not allowed outside permitted directories', 'publishpress-hub')
            );
        }
    }
}
