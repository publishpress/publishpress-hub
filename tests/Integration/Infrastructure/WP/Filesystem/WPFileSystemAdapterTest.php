<?php

/**
 * WPFileSystemAdapter integration tests.
 *
 * @package Tests\Integration\Infrastructure\WP\Filesystem
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Integration\Infrastructure\WP\Filesystem;

use InvalidArgumentException;
use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;
use Tests\NoTransactionWPTestCase;

/**
 * Integration tests for WPFileSystemAdapter path validation.
 *
 * These tests verify that the filesystem adapter properly validates paths
 * to prevent directory traversal attacks and unauthorized file operations.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter
 */
class WPFileSystemAdapterTest extends NoTransactionWPTestCase
{
    private WPFileSystemAdapter $adapter;
    private string $testPluginDir;
    private string $testUpgradeDir;

    public function setUp(): void
    {
        parent::setUp();

        $this->adapter = new WPFileSystemAdapter();

        // Create test directories within allowed paths
        $this->testPluginDir = WP_PLUGIN_DIR . '/test-plugin-' . uniqid();
        $this->testUpgradeDir = WP_CONTENT_DIR . '/upgrade/test-' . uniqid();

        wp_mkdir_p($this->testPluginDir);
        wp_mkdir_p($this->testUpgradeDir);
    }

    public function tearDown(): void
    {
        // Clean up test directories
        if (is_dir($this->testPluginDir)) {
            $this->deleteDirectory($this->testPluginDir);
        }
        if (is_dir($this->testUpgradeDir)) {
            $this->deleteDirectory($this->testUpgradeDir);
        }

        parent::tearDown();
    }

    /**
     * Recursively delete a directory and its contents.
     */
    private function deleteDirectory(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }

        $files = array_diff(scandir($dir), ['.', '..']);
        foreach ($files as $file) {
            $path = $dir . '/' . $file;
            is_dir($path) ? $this->deleteDirectory($path) : unlink($path);
        }
        rmdir($dir);
    }

    /**
     * Test that valid paths within plugin directory are accepted.
     *
     * @covers ::exists
     * @covers ::validatePath
     * @covers ::getAllowedBasePaths
     */
    public function testValidPathInPluginDirectory(): void
    {
        $testFile = $this->testPluginDir . '/plugin.php';
        touch($testFile);

        // Should not throw an exception
        $result = $this->adapter->exists($testFile);
        $this->assertIsBool($result);
    }

    /**
     * Reads translation JSON through the WordPress filesystem.
     *
     * @covers ::getContents
     * @since 1.1.0
     */
    public function testGetContentsReadsTranslationJson(): void
    {
        global $wp_filesystem;

        $path = $this->testPluginDir . '/translations.json';
        $contents = '{"messages":{"Hello":"Bonjour"}}';
        $this->assertTrue($wp_filesystem->put_contents($path, $contents));

        $this->assertSame($contents, $this->adapter->getContents($path));
    }

    /**
     * Refuses traversal before reading a file.
     *
     * @covers ::getContents
     * @since 1.1.0
     */
    public function testGetContentsRejectsTraversal(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('directory traversal detected');

        $this->adapter->getContents($this->testPluginDir . '/../translations.json');
    }

    /**
     * Test that path traversal with ../ is rejected.
     *
     * @covers ::exists
     * @covers ::validatePath
     */
    public function testPathTraversalWithDoubleDotSlashIsRejected(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('directory traversal detected');

        $maliciousPath = $this->testPluginDir . '/../../../etc/passwd';
        $this->adapter->exists($maliciousPath);
    }

    /**
     * Test that path traversal with ..\ is rejected.
     *
     * @covers ::exists
     * @covers ::validatePath
     */
    public function testPathTraversalWithDoubleDotBackslashIsRejected(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('directory traversal detected');

        $maliciousPath = $this->testPluginDir . '\\..\\..\\..\\windows\\system32\\config\\sam';
        $this->adapter->exists($maliciousPath);
    }

    /**
     * Test that null byte injection is rejected.
     *
     * @covers ::exists
     * @covers ::validatePath
     */
    public function testNullByteInjectionIsRejected(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('null byte detected');

        $maliciousPath = $this->testPluginDir . "/test.php\0.jpg";
        $this->adapter->exists($maliciousPath);
    }

    /**
     * Test that paths outside allowed directories are rejected.
     *
     * @covers ::exists
     * @covers ::validatePath
     */
    public function testPathOutsideAllowedDirectoriesIsRejected(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('not allowed outside permitted directories');

        // Create a path outside allowed directories - use WP_CONTENT_DIR but not in plugins or upgrade
        $unauthorizedDir = WP_CONTENT_DIR . '/unauthorized-' . uniqid();
        wp_mkdir_p($unauthorizedDir);
        $unauthorizedPath = $unauthorizedDir . '/test.txt';
        touch($unauthorizedPath);

        try {
            $this->adapter->exists($unauthorizedPath);
        } finally {
            // Clean up
            if (file_exists($unauthorizedPath)) {
                unlink($unauthorizedPath);
            }
            if (is_dir($unauthorizedDir)) {
                rmdir($unauthorizedDir);
            }
        }
    }

    /**
     * Test that delete method validates paths.
     *
     * @covers ::delete
     * @covers ::validatePath
     */
    public function testDeleteValidatesPath(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('directory traversal detected');

        $maliciousPath = $this->testPluginDir . '/../../../etc/passwd';
        $this->adapter->delete($maliciousPath);
    }

    /**
     * Test that move method validates source path.
     *
     * @covers ::move
     * @covers ::validatePath
     */
    public function testMoveValidatesSourcePath(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('directory traversal detected');

        $maliciousSource = $this->testPluginDir . '/../../../etc/passwd';
        $validDest = $this->testPluginDir . '/dest.txt';

        $this->adapter->move($maliciousSource, $validDest);
    }

    /**
     * Test that move method validates destination path.
     *
     * @covers ::move
     * @covers ::validatePath
     */
    public function testMoveValidatesDestinationPath(): void
    {
        $testFile = $this->testPluginDir . '/source.txt';
        touch($testFile);

        $this->expectException(InvalidArgumentException::class);

        $maliciousDest = $this->testPluginDir . '/../../../tmp/malicious.txt';

        $this->adapter->move($testFile, $maliciousDest);
    }

    /**
     * Test that unzip method validates source path.
     *
     * @covers ::unzip
     * @covers ::validatePath
     */
    public function testUnzipValidatesSourcePath(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('directory traversal detected');

        $maliciousSource = $this->testPluginDir . '/../../../tmp/malicious.zip';
        $validDest = $this->testPluginDir . '/extracted';

        $this->adapter->unzip($maliciousSource, $validDest);
    }

    /**
     * Test that unzip method validates destination path.
     *
     * @covers ::unzip
     * @covers ::validatePath
     */
    public function testUnzipValidatesDestinationPath(): void
    {
        $testFile = $this->testPluginDir . '/test.zip';
        touch($testFile);

        $this->expectException(InvalidArgumentException::class);

        $maliciousDest = $this->testPluginDir . '/../../../tmp/extracted';

        $this->adapter->unzip($testFile, $maliciousDest);
    }

    /**
     * Test valid path in upgrade directory is accepted.
     *
     * @covers ::exists
     * @covers ::validatePath
     * @covers ::getAllowedBasePaths
     */
    public function testValidPathInUpgradeDirectory(): void
    {
        $testFile = $this->testUpgradeDir . '/test-download.zip';
        touch($testFile);

        // Should not throw an exception
        $result = $this->adapter->exists($testFile);
        $this->assertIsBool($result);
    }

    /**
     * Test that valid path in system temp directory is accepted.
     *
     * @covers ::exists
     * @covers ::validatePath
     * @covers ::getAllowedBasePaths
     */
    public function testValidPathInTempDirectory(): void
    {
        $actualTempDir = get_temp_dir();
        $testFile = $actualTempDir . 'test-download-' . uniqid() . '.zip';
        touch($testFile);

        try {
            // Should not throw an exception
            $result = $this->adapter->exists($testFile);
            $this->assertIsBool($result);
        } finally {
            // Clean up
            if (file_exists($testFile)) {
                unlink($testFile);
            }
        }
    }

    /**
     * Test that non-existent parent directory is rejected.
     *
     * @covers ::exists
     * @covers ::validatePath
     */
    public function testNonExistentParentDirectoryIsRejected(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('parent directory does not exist');

        // Path with non-existent parent
        $invalidPath = $this->testPluginDir . '/non-existent-dir/non-existent-subdir/file.txt';
        $this->adapter->exists($invalidPath);
    }

    /**
     * Test that valid non-existent file in existing directory is accepted.
     *
     * @covers ::exists
     * @covers ::validatePath
     */
    public function testValidNonExistentFileInExistingDirectory(): void
    {
        $testSubDir = $this->testPluginDir . '/test-subdir';
        wp_mkdir_p($testSubDir);

        $nonExistentFile = $testSubDir . '/future-file.txt';

        // Should not throw an exception for valid path even if file doesn't exist
        $result = $this->adapter->exists($nonExistentFile);
        $this->assertIsBool($result);
    }

    /**
     * Test successful file deletion within allowed directory.
     *
     * @covers ::delete
     * @covers ::validatePath
     */
    public function testSuccessfulFileDeletion(): void
    {
        $testFile = $this->testPluginDir . '/delete-me.txt';
        touch($testFile);

        $this->assertTrue(file_exists($testFile));

        $result = $this->adapter->delete($testFile);

        $this->assertTrue($result);
        $this->assertFalse(file_exists($testFile));
    }

    /**
     * Test successful file move within allowed directories.
     *
     * @covers ::move
     * @covers ::validatePath
     */
    public function testSuccessfulFileMove(): void
    {
        $sourceFile = $this->testPluginDir . '/source.txt';
        $destFile = $this->testPluginDir . '/destination.txt';

        file_put_contents($sourceFile, 'test content');

        $this->assertTrue(file_exists($sourceFile));
        $this->assertFalse(file_exists($destFile));

        $result = $this->adapter->move($sourceFile, $destFile);

        $this->assertTrue($result);
        $this->assertFalse(file_exists($sourceFile));
        $this->assertTrue(file_exists($destFile));
        $this->assertEquals('test content', file_get_contents($destFile));
    }
}

