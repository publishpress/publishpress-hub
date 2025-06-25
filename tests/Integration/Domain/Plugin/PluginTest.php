<?php

declare(strict_types=1);


namespace Tests\Unit\Domain\Plugin;

use InvalidArgumentException;
use PublishPress\Hub\Domain\Plugin\Plugin;
use Tests\NoTransactionWPTestCase;

/**
 * Unit tests for the Plugin domain entity.
 */
class PluginTest extends NoTransactionWPTestCase
{
    /**
     * Test plugin constructor with valid parameters.
     */
    public function testConstructorWithValidParameters(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->assertEquals('Test Plugin', $plugin->getName());
        $this->assertEquals('test-plugin', $plugin->getSlugFree());
        $this->assertEquals('test-plugin-pro', $plugin->getSlugPro());
        $this->assertFalse($plugin->isInstalled());
        $this->assertFalse($plugin->isActive());
        $this->assertFalse($plugin->isLicensed());
        $this->assertFalse($plugin->isPro());
        $this->assertNull($plugin->getVersion());
        $this->assertNull($plugin->getPath());
    }

    /**
     * Test plugin constructor with complex slug.
     */
    public function testConstructorWithComplexSlug(): void
    {
        $plugin = new Plugin(
            'Complex Plugin Name',
            'complex-plugin-123',
            'complex-plugin-123-pro',
            'complex-plugin-123.php',
            'complex-plugin-123-pro.php'
        );

        $this->assertEquals('complex-plugin-123', $plugin->getSlugFree());
        $this->assertEquals('complex-plugin-123-pro', $plugin->getSlugPro());
    }

    /**
     * Test plugin constructor throws exception for empty slug.
     */
    public function testConstructorThrowsExceptionForEmptySlug(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid plugin slug');

        new Plugin(
            'Test Plugin',
            '',
            '',
            '',
            ''
        );
    }

    /**
     * Test plugin constructor throws exception for invalid slug with uppercase.
     */
    public function testConstructorThrowsExceptionForInvalidSlugWithUppercase(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid plugin slug');

        new Plugin(
            'Test Plugin',
            'Test-Plugin',
            'Test-Plugin-Pro',
            'Test-Plugin.php',
            'Test-Plugin-Pro.php'
        );
    }

    /**
     * Test plugin constructor throws exception for invalid slug with special characters.
     */
    public function testConstructorThrowsExceptionForInvalidSlugWithSpecialCharacters(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid plugin slug');

        new Plugin(
            'Test Plugin',
            'test_plugin!',
            'test_plugin_pro!',
            'test_plugin!.php',
            'test_plugin_pro!.php'
        );
    }

    /**
     * Test plugin constructor throws exception for invalid slug with spaces.
     */
    public function testConstructorThrowsExceptionForInvalidSlugWithSpaces(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid plugin slug');

        new Plugin(
            'Test Plugin',
            'test plugin',
            'test_plugin_pro',
            'test_plugin.php',
            'test_plugin_pro.php'
        );
    }

    /**
     * Test plugin constructor throws exception for numeric slug.
     */
    public function testConstructorThrowsExceptionForNumericSlug(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid plugin slug');

        new Plugin(
            'Test Plugin',
            '123',
            '123-pro',
            '123.php',
            '123-pro.php'
        );
    }

    /**
     * Test plugin constructor throws exception for numeric slug with leading number.
     */
    public function testConstructorThrowsExceptionForNumericSlugWithLeadingNumber(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid plugin slug');

        new Plugin(
            'Test Plugin',
            '123-plugin',
            '123-plugin-pro',
            '123-plugin.php',
            '123-plugin-pro.php'
        );
    }

    /**
     * Test plugin constructor throws exception for slug starting with a dash.
     */
    public function testConstructorThrowsExceptionForSlugStartingWithDash(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid plugin slug');

        new Plugin(
            'Test Plugin',
            '-plugin',
            '-plugin-pro',
            '-plugin.php',
            '-plugin-pro.php'
        );
    }

    /**
     * Test getName method.
     */
    public function testGetName(): void
    {
        $plugin = new Plugin(
            'My Awesome Plugin',
            'awesome-plugin',
            'awesome-plugin-pro',
            'awesome-plugin.php',
            'awesome-plugin-pro.php'
        );

        $this->assertEquals('My Awesome Plugin', $plugin->getName());
    }

    /**
     * Test getSlug method.
     */
    public function testgetSlugFree(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin-123',
            'test-plugin-123-pro',
            'test-plugin-123.php',
            'test-plugin-123-pro.php'
        );

        $this->assertEquals('test-plugin-123', $plugin->getSlugFree());
    }

    /**
     * Test getSlugPro method.
     */
    public function testGetSlugPro(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->assertEquals('test-plugin-pro', $plugin->getSlugPro());
    }

    /**
     * Test getVersion method.
     */
    public function testGetVersionReturnsNullIfNotRegistered(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->assertNull($plugin->getVersion());
    }

    public function testGetPathReturnsNullIfNotRegistered(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->assertNull($plugin->getPath());
    }


    public function testRegisterWithIncompleteVersion(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid version format');

        $plugin->register('1.0', '/custom/plugin/path');
    }

    public function testRegisterWithInvalidVersion(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid version format');

        $plugin->register('q1.0.0', '/custom/plugin/path');
    }

    public function testRegisterWithInvalidUnstableVersion(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid version format');

        $plugin->register('1.0.0_beta', '/custom/plugin/path');
    }

    public function testRegisterWithEmptyPath(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Path cannot be empty');

        $plugin->register('1.0.0', '');
    }

    public function testRegisterWithNotExistingPath(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Path does not exist');

        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/not-existing-1.php');
    }

    public function testRegisterWithValidVersionAndPath(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $this->assertEquals('1.0.0', $plugin->getVersion());
        $this->assertEquals(TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php', $plugin->getPath());
    }

    public function testRegisterWithValidUnstableVersion(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $plugin->register('1.0.0-beta.1', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $this->assertEquals('1.0.0-beta.1', $plugin->getVersion());

        $plugin->register('1.0.0-rc.1', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $this->assertEquals('1.0.0-rc.1', $plugin->getVersion());
    }

    /**
     * Test getPath method.
     */
    public function testGetPath(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->assertNull($plugin->getPath());

        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $this->assertEquals(TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php', $plugin->getPath());
    }

    public function testRegisterValidateFileExtensionForInvalidFileExtension(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $this->expectException(InvalidArgumentException::class);

        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.html');
    }

    public function testRegisterValidateFileExtensionForValidFileExtension(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            'test-plugin-pro',
            'test-plugin.php',
            'test-plugin-pro.php'
        );

        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $this->assertEquals(TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php', $plugin->getPath());
    }

    /**
     * Test isNewerThan method returns true when version is higher.
     */
    public function testIsNewerThanReturnsTrue(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', 'plugin-a-pro', 'plugin-a.php', 'plugin-a-pro.php');
        $plugin1->register('2.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'plugin-b', 'plugin-b-pro', 'plugin-b.php', 'plugin-b-pro.php');
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->assertTrue($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method returns false when version is lower.
     */
    public function testIsNewerThanReturnsFalse(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', 'plugin-a-pro', 'plugin-a.php', 'plugin-a-pro.php');
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'plugin-b', 'plugin-b-pro', 'plugin-b.php', 'plugin-b-pro.php');
        $plugin2->register('2.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->assertFalse($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method returns false when versions are equal.
     */
    public function testIsNewerThanReturnsFalseForEqualVersions(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', 'plugin-a-pro', 'plugin-a.php', 'plugin-a-pro.php');
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'plugin-b', 'plugin-b-pro', 'plugin-b.php', 'plugin-b-pro.php');
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->assertFalse($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method with complex version comparison.
     */
    public function testIsNewerThanWithComplexVersions(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', 'plugin-a-pro', 'plugin-a.php', 'plugin-a-pro.php');
        $plugin1->register('1.2.1', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'plugin-b', 'plugin-b-pro', 'plugin-b.php', 'plugin-b-pro.php');
        $plugin2->register('1.2.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->assertTrue($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method with pre-release versions.
     */
    public function testIsNewerThanWithPreReleaseVersions(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', 'plugin-a-pro', 'plugin-a.php', 'plugin-a-pro.php');
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'plugin-b', 'plugin-b-pro', 'plugin-b.php', 'plugin-b-pro.php');
        $plugin2->register('1.0.0-beta', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $this->assertTrue($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isSamePlugin method returns true for same slug.
     */
    public function testIsSamePluginReturnsTrue(): void
    {
        $plugin1 = new Plugin('Plugin A', 'same-plugin', 'same-plugin-pro', 'same-plugin.php', 'same-plugin-pro.php');
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'same-plugin', 'same-plugin-pro', 'same-plugin.php', 'same-plugin-pro.php');
        $plugin2->register('2.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->assertTrue($plugin1->isSamePlugin($plugin2));
    }

    /**
     * Test isSamePlugin method returns false for different slugs.
     */
    public function testIsSamePluginReturnsFalse(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', 'plugin-a-pro', 'plugin-a.php', 'plugin-a-pro.php');
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'plugin-b', 'plugin-b-pro', 'plugin-b.php', 'plugin-b-pro.php');
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->assertFalse($plugin1->isSamePlugin($plugin2));
    }

    /**
     * Test isSamePlugin method with identical plugins.
     */
    public function testIsSamePluginWithIdenticalPlugins(): void
    {
        $plugin1 = new Plugin(
            'Same Plugin',
            'same-plugin',
            'same-plugin-pro',
            'same-plugin.php',
            'same-plugin-pro.php'
        );

        $plugin2 = new Plugin(
            'Same Plugin',
            'same-plugin',
            'same-plugin-pro',
            'same-plugin.php',
            'same-plugin-pro.php'
        );

        $this->assertTrue($plugin1->isSamePlugin($plugin2));
    }

    /**
     * Test plugin with minimum valid slug (single character).
     */
    public function testPluginWithMinimumValidSlug(): void
    {
        $plugin = new Plugin('Plugin', 'a', 'a-pro', 'a.php', 'a-pro.php');

        $this->assertEquals('a', $plugin->getSlugFree());
    }

    /**
     * Test plugin with mixed numeric and alphabetic slug.
     */
    public function testPluginWithMixedSlug(): void
    {
        $plugin = new Plugin(
            'Plugin',
            'plugin-123-test',
            'plugin-123-test-pro',
            'plugin-123-test.php',
            'plugin-123-test-pro.php'
        );

        $this->assertEquals('plugin-123-test', $plugin->getSlugFree());
    }

    /**
     * Test version comparison edge cases.
     */
    public function testVersionComparisonEdgeCases(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', 'plugin-a-pro', 'plugin-a.php', 'plugin-a-pro.php');
        $plugin1->register('10.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = new Plugin('Plugin B', 'plugin-b', 'plugin-b-pro', 'plugin-b.php', 'plugin-b-pro.php');
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->assertTrue($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test constructor with special version formats.
     */
    public function testConstructorWithSpecialVersionFormats(): void
    {
        $validVersions = [
            '1.0.0',
            '1.0.0-alpha',
            '1.0.0-beta.1',
            '1.0.0-rc.1',
            '1.0.0-b1',
        ];

        foreach ($validVersions as $version) {
            $plugin = new Plugin(
                'Test Plugin',
                'test-plugin',
                'test-plugin-pro',
                'test-plugin.php',
                'test-plugin-pro.php'
            );
            $plugin->register($version, TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

            $this->assertEquals($version, $plugin->getVersion());
        }
    }
}
