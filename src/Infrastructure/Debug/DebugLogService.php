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

defined('ABSPATH') || exit;

use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class DebugLogService
{
    private const LEGACY_LOG_DIR_NAME = 'publishpress-hub';

    private const LOG_DIR_PREFIX = 'publishpress-hub-logs-';

    private const LOG_FILE_NAME = 'debug.log';

    private const LEGACY_LOG_MIGRATION_OPTION = 'publishpress_hub_legacy_debug_log_migrated';

    private const MAX_LOG_SIZE_BYTES = 2097152; // 2 MB

    private const CONSTANT_LOG_FILE = 'PUBLISHPRESS_HUB_LOG_FILE';

    private WPOptionsAdapterInterface $optionsAdapter;

    /**
     * @param WPOptionsAdapterInterface $optionsAdapter WordPress options adapter.
     * @since 1.0.6
     */
    public function __construct(WPOptionsAdapterInterface $optionsAdapter)
    {
        $this->optionsAdapter = $optionsAdapter;
    }

    /**
     * Returns the absolute path to the debug log file.
     *
     * If the constant PUBLISHPRESS_HUB_LOG_FILE is defined, its value is used.
     * Otherwise defaults to a site-specific directory outside the web root.
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
     * Migrates away from the legacy public debug log once.
     *
     * Failed deletion is not marked complete, allowing the next request to retry.
     *
     * @return bool True when migration is complete, false when deletion failed.
     * @since 1.0.6
     */
    public function migrateLegacyPublicLog(): bool
    {
        if ((bool) $this->optionsAdapter->getOption(self::LEGACY_LOG_MIGRATION_OPTION, false)) {
            return true;
        }

        $legacyLogFilePath = $this->getLegacyLogFilePath();

        if ($legacyLogFilePath !== $this->getLogFilePath() && file_exists($legacyLogFilePath)) {
            wp_delete_file($legacyLogFilePath);

            if (file_exists($legacyLogFilePath)) {
                return false;
            }
        }

        if ($this->optionsAdapter->updateOption(self::LEGACY_LOG_MIGRATION_OPTION, true, true)) {
            return true;
        }

        return (bool) $this->optionsAdapter->getOption(self::LEGACY_LOG_MIGRATION_OPTION, false);
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

        if (!$this->ensureLogDirectoryExists($logFilePath)) {
            return;
        }

        $entry = sprintf(
            "[%s] %s\n",
            $type,
            wp_json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
        $bytesWritten = file_put_contents($logFilePath, $entry, FILE_APPEND | LOCK_EX);

        if ($bytesWritten === false) {
            return;
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.chmod_chmod
        chmod($logFilePath, 0600);

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
     * Returns the default log file path outside the web root.
     *
     * @return string
     * @since 1.0.0
     */
    private function getDefaultLogFilePath(): string
    {
        $siteIdentifier = substr(hash('sha256', rtrim(ABSPATH, '/\\')), 0, 12);
        $logDirectory = self::LOG_DIR_PREFIX . $siteIdentifier;

        return rtrim(sys_get_temp_dir(), '/\\')
            . DIRECTORY_SEPARATOR
            . $logDirectory
            . DIRECTORY_SEPARATOR
            . self::LOG_FILE_NAME;
    }

    /**
     * Returns the legacy public debug log path.
     *
     * @return string
     * @since 1.0.6
     */
    private function getLegacyLogFilePath(): string
    {
        return WP_CONTENT_DIR
            . '/uploads/'
            . self::LEGACY_LOG_DIR_NAME
            . '/'
            . self::LOG_FILE_NAME;
    }

    /**
     * Creates the log file's parent directory when it does not exist yet.
     *
     * @param string $logFilePath Absolute path to the log file.
     * @return bool True when the directory is ready for secure log writes.
     * @since 1.0.0
     */
    private function ensureLogDirectoryExists(string $logFilePath): bool
    {
        $logDir = dirname($logFilePath);

        if (is_dir($logDir)) {
            return true;
        }

        if (!wp_mkdir_p($logDir)) {
            return false;
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.chmod_chmod
        return chmod($logDir, 0700);
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
