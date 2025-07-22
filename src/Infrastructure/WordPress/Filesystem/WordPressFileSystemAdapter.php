<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Filesystem;

use WP_Filesystem_Base;

class WordPressFileSystemAdapter
{
    private ?WP_Filesystem_Base $wpFilesystem = null;

    public function __construct()
    {
        $this->wpFilesystem = $this->getWpFilesystem();
    }

    public function exists(string $path): bool
    {
        return $this->getWpFilesystem()->exists($path);
    }

    public function delete(string $path, bool $recursive = false): bool
    {
        return $this->getWpFilesystem()->delete($path, $recursive);
    }

    public function move(string $source, string $destination, bool $overwrite = false): bool
    {
        return $this->getWpFilesystem()->move($source, $destination, $overwrite);
    }

    public function unzip(string $source, string $destination): bool
    {
        return unzip_file($source, $destination);
    }

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
