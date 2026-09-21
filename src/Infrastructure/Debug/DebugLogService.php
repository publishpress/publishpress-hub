<?php

/**
 * Service for managing the debug log file.
 *
 * @package PublishPress\Hub\Infrastructure\Debug
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Debug;
defined( 'ABSPATH' ) || exit;

class DebugLogService
{
    private const LOG_DIR_NAME = 'publishpress-hub';

    private const LOG_FILE_NAME = 'debug.log';

    private const MAX_LOG_SIZE_BYTES = 2097152; // 2 MB

    private const CONSTANT_LOG_FILE = 'PUBLISHPRESS_HUB_LOG_FILE';

    /**
     * Returns the absolute path to the debug log file.
     *
     * If the constant PUBLISHPRESS_HUB_LOG_FILE is defined, its value is used.
     * Otherwise defaults to wp-content/uploads/publishpress-hub/debug.log.
     *
     * @return string
     * @since 1.0.0
     */
    public function getLogFilePath(): string
    {
        if (defined(self::CONSTANT_LOG_FILE) && constant(self::CONSTANT_LOG_FILE)) {
            return (string) constant(self::CONSTANT_LOG_FILE);
        }

        return $this->getDefaultLogFilePath();
    }

    /**
     * Writes a log entry to the debug log file.
     *
     * Appends a JSON-encoded entry tagged with the given type. When the file
     * exceeds MAX_LOG_SIZE_BYTES the oldest half of the content is discarded
     * to keep the file manageable.
     *
     * @param string $type  Entry type label (e.g. "REQUEST", "RESPONSE").
     * @param array<string, mixed> $data  Data to log.
     * @return void
     * @since 1.0.0
     */
    public function write(string $type, array $data): void
    {
        $logFilePath = $this->getLogFilePath();

        $this->ensureLogDirectoryExists($logFilePath);

        $entry = sprintf(
            "[%s] %s\n",
            $type,
            wp_json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
        file_put_contents($logFilePath, $entry, FILE_APPEND | LOCK_EX);

        $this->enforceMaxLogSize($logFilePath);
    }

    /**
     * Reads and returns the full content of the debug log file.
     *
     * Returns an empty string when the file does not exist yet.
     *
     * @return string
     * @since 1.0.0
     */
    public function read(): string
    {
        $logFilePath = $this->getLogFilePath();

        if (!file_exists($logFilePath)) {
            return '';
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents, WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
        $content = file_get_contents($logFilePath);

        return $content !== false ? $content : '';
    }

    /**
     * Clears (truncates) the debug log file.
     *
     * @return void
     * @since 1.0.0
     */
    public function clear(): void
    {
        $logFilePath = $this->getLogFilePath();

        if (!file_exists($logFilePath)) {
            return;
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
        file_put_contents($logFilePath, '', LOCK_EX);
    }

    /**
     * Returns the default log file path within the WP uploads directory.
     *
     * @return string
     * @since 1.0.0
     */
    private function getDefaultLogFilePath(): string
    {
        return WP_CONTENT_DIR . '/uploads/' . self::LOG_DIR_NAME . '/' . self::LOG_FILE_NAME;
    }

    /**
     * Creates the log file's parent directory when it does not exist yet.
     *
     * @param string $logFilePath Absolute path to the log file.
     * @return void
     * @since 1.0.0
     */
    private function ensureLogDirectoryExists(string $logFilePath): void
    {
        $logDir = dirname($logFilePath);

        if (is_dir($logDir)) {
            return;
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_mkdir, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_mkdir, WordPressVIPMinimum.Functions.RestrictedFunctions.directory_mkdir
        mkdir($logDir, 0755, true);

        $this->writeHtaccessProtection($logDir);
    }

    /**
     * Writes an .htaccess file to prevent direct browser access to the log directory.
     *
     * @param string $logDir Absolute path to the log directory.
     * @return void
     * @since 1.0.0
     */
    private function writeHtaccessProtection(string $logDir): void
    {
        $htaccess = $logDir . '/.htaccess';

        if (file_exists($htaccess)) {
            return;
        }

        $rules = "Order deny,allow\nDeny from all\n";

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
        file_put_contents($htaccess, $rules, LOCK_EX);
    }

    /**
     * Drops the oldest half of the log file when it exceeds the maximum size.
     *
     * @param string $logFilePath Absolute path to the log file.
     * @return void
     * @since 1.0.0
     */
    private function enforceMaxLogSize(string $logFilePath): void
    {
        $fileSize = filesize($logFilePath);

        if ($fileSize === false || $fileSize <= self::MAX_LOG_SIZE_BYTES) {
            return;
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents, WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
        $content = file_get_contents($logFilePath);

        if ($content === false) {
            return;
        }

        $truncated = substr($content, (int) ($fileSize / 2));
        $firstNewline = strpos($truncated, "\n");

        if ($firstNewline !== false) {
            $truncated = substr($truncated, $firstNewline + 1);
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
        file_put_contents($logFilePath, $truncated, LOCK_EX);
    }
}
