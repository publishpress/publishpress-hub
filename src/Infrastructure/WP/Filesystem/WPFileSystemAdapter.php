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

use WP_Filesystem_Base;

class WPFileSystemAdapter
{
    private ?WP_Filesystem_Base $wpFilesystem = null;

    /**
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->wpFilesystem = $this->getWpFilesystem();
    }

    /**
     * Check if a file exists.
     *
     * @param string $path The path.
     * @return bool True if the file exists, false otherwise.
     * @since 1.0.0
     */
    public function exists(string $path): bool
    {
        return $this->getWpFilesystem()->exists($path);
    }

    /**
     * Delete a file.
     *
     * @param string $path The path.
     * @param bool $recursive The recursive flag.
     * @return bool True if the file was deleted, false otherwise.
     * @since 1.0.0
     */
    public function delete(string $path, bool $recursive = false): bool
    {
        return $this->getWpFilesystem()->delete($path, $recursive);
    }

    /**
     * Move a file.
     *
     * @param string $source The source path.
     * @param string $destination The destination path.
     * @param bool $overwrite The overwrite flag.
     * @return bool True if the file was moved, false otherwise.
     * @since 1.0.0
     */
    public function move(string $source, string $destination, bool $overwrite = false): bool
    {
        return $this->getWpFilesystem()->move($source, $destination, $overwrite);
    }

    /**
     * Unzip a file.
     *
     * @param string $source The source path.
     * @param string $destination The destination path.
     * @return bool True if the file was unzipped, false otherwise.
     * @since 1.0.0
     */
    public function unzip(string $source, string $destination): bool
    {
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
}
