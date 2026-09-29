<?php

declare(strict_types=1);

namespace Tests\Unit\Infrastructure\Debug;

use Codeception\Test\Unit;
use PublishPress\Hub\Infrastructure\Debug\DebugLogService;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

/**
 * Unit tests for secure debug log storage.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\Debug\DebugLogService
 */
class DebugLogServiceTest extends Unit
{
    private const MIGRATION_OPTION = 'publishpress_hub_legacy_debug_log_migrated';

    private WPOptionsAdapterInterface $optionsAdapter;

    protected function setUp(): void
    {
        parent::setUp();

        $this->optionsAdapter = $this->createMock(WPOptionsAdapterInterface::class);
    }

    /**
     * Tests that the default log path is outside the public uploads directory.
     *
     * @covers ::getLogFilePath
     * @covers ::getDefaultLogFilePath
     */
    public function testDefaultLogPathUsesSiteSpecificSystemTemporaryDirectory(): void
    {
        $service = new DebugLogService($this->optionsAdapter);
        $logFilePath = str_replace('\\', '/', $service->getLogFilePath());
        $temporaryDirectory = str_replace('\\', '/', rtrim(sys_get_temp_dir(), '/\\'));
        $expectedSiteIdentifier = substr(hash('sha256', rtrim(ABSPATH, '/\\')), 0, 12);

        $this->assertStringStartsWith($temporaryDirectory . '/', $logFilePath);
        $this->assertStringContainsString(
            '/publishpress-hub-logs-' . $expectedSiteIdentifier . '/debug.log',
            $logFilePath
        );
        $this->assertStringNotContainsString('/uploads/', $logFilePath);
    }

    /**
     * Tests that the legacy publicly accessible log is deleted during upgrade.
     *
     * @covers ::migrateLegacyPublicLog
     * @covers ::getLegacyLogFilePath
     */
    public function testMigrateLegacyPublicLogRemovesUploadsLogAndStoresMarker(): void
    {
        if (!defined('WP_CONTENT_DIR')) {
            define(
                'WP_CONTENT_DIR',
                rtrim(sys_get_temp_dir(), '/\\') . DIRECTORY_SEPARATOR . 'publishpress-hub-unit-' . getmypid()
            );
        }

        $legacyLogDirectory = WP_CONTENT_DIR . '/uploads/publishpress-hub';
        $legacyLogFilePath = $legacyLogDirectory . '/debug.log';

        if (!is_dir($legacyLogDirectory)) {
            // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.directory_mkdir -- Temporary test fixture.
            mkdir($legacyLogDirectory, 0700, true);
        }

        // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents -- Temporary test fixture.
        file_put_contents($legacyLogFilePath, 'sensitive log data');

        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::MIGRATION_OPTION, false)
            ->willReturn(false);
        $this->optionsAdapter
            ->expects($this->once())
            ->method('updateOption')
            ->with(self::MIGRATION_OPTION, true, true)
            ->willReturn(true);

        $service = new DebugLogService($this->optionsAdapter);
        $result = $service->migrateLegacyPublicLog();

        $this->assertTrue($result);
        $this->assertFileDoesNotExist($legacyLogFilePath);

        // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.directory_rmdir -- Temporary test fixture.
        rmdir($legacyLogDirectory);
        // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.directory_rmdir -- Temporary test fixture.
        rmdir(dirname($legacyLogDirectory));
        // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.directory_rmdir -- Temporary test fixture.
        rmdir(WP_CONTENT_DIR);
    }

    /**
     * Tests that completed migration does not access the filesystem again.
     *
     * @covers ::migrateLegacyPublicLog
     */
    public function testMigrateLegacyPublicLogSkipsCompletedMigration(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::MIGRATION_OPTION, false)
            ->willReturn(true);
        $this->optionsAdapter
            ->expects($this->never())
            ->method('updateOption');

        $service = new DebugLogService($this->optionsAdapter);

        $this->assertTrue($service->migrateLegacyPublicLog());
    }
}
