<?php declare(strict_types=1);

namespace Tests\Unit\Domain\Plugin;

use Codeception\Test\Unit;
use InvalidArgumentException;
use PublishPress\Hub\Domain\Plugin\Plugin;
use Tests\Support\UnitTester;

/**
 * Unit tests for the Plugin domain entity.
 */
class PluginTest extends Unit
{
    protected UnitTester $tester;

    /**
     * Test plugin constructor with valid parameters.
     */
    public function testConstructorWithValidParameters(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            '1.0.0',
            '/path/to/plugin'
        );

        $this->assertEquals('Test Plugin', $plugin->getName());
        $this->assertEquals('test-plugin', $plugin->getSlug());
        $this->assertEquals('1.0.0', $plugin->getVersion());
        $this->assertEquals('/path/to/plugin', $plugin->getPath());
    }

    /**
     * Test plugin constructor with complex slug.
     */
    public function testConstructorWithComplexSlug(): void
    {
        $plugin = new Plugin(
            'Complex Plugin Name',
            'complex-plugin-123',
            '2.1.5',
            '/some/complex/path'
        );

        $this->assertEquals('complex-plugin-123', $plugin->getSlug());
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
            '1.0.0',
            '/path/to/plugin'
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
            '1.0.0',
            '/path/to/plugin'
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
            '1.0.0',
            '/path/to/plugin'
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
            '1.0.0',
            '/path/to/plugin'
        );
    }

    /**
     * Test plugin constructor throws exception for empty version.
     */
    public function testConstructorThrowsExceptionForEmptyVersion(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Version cannot be empty');

        new Plugin(
            'Test Plugin',
            'test-plugin',
            '',
            '/path/to/plugin'
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
            '1.0.0',
            '/path/to/plugin'
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
            '1.0.0',
            '/path/to/plugin'
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
            '1.0.0',
            '/path/to/plugin'
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
            '1.0.0',
            '/path/to/plugin'
        );

        $this->assertEquals('My Awesome Plugin', $plugin->getName());
    }

    /**
     * Test getSlug method.
     */
    public function testGetSlug(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin-123',
            '1.0.0',
            '/path/to/plugin'
        );

        $this->assertEquals('test-plugin-123', $plugin->getSlug());
    }

    /**
     * Test getVersion method.
     */
    public function testGetVersion(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            '2.5.1-beta',
            '/path/to/plugin'
        );

        $this->assertEquals('2.5.1-beta', $plugin->getVersion());
    }

    /**
     * Test getPath method.
     */
    public function testGetPath(): void
    {
        $plugin = new Plugin(
            'Test Plugin',
            'test-plugin',
            '1.0.0',
            '/custom/plugin/path'
        );

        $this->assertEquals('/custom/plugin/path', $plugin->getPath());
    }

    /**
     * Test isNewerThan method returns true when version is higher.
     */
    public function testIsNewerThanReturnsTrue(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '2.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '1.0.0', '/path/b');

        $this->assertTrue($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method returns false when version is lower.
     */
    public function testIsNewerThanReturnsFalse(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '1.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '2.0.0', '/path/b');

        $this->assertFalse($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method returns false when versions are equal.
     */
    public function testIsNewerThanReturnsFalseForEqualVersions(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '1.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '1.0.0', '/path/b');

        $this->assertFalse($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method with complex version comparison.
     */
    public function testIsNewerThanWithComplexVersions(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '1.2.1', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '1.2.0', '/path/b');

        $this->assertTrue($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isNewerThan method with pre-release versions.
     */
    public function testIsNewerThanWithPreReleaseVersions(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '1.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '1.0.0-beta', '/path/b');

        $this->assertTrue($plugin1->isNewerThan($plugin2));
    }

    /**
     * Test isSamePlugin method returns true for same slug.
     */
    public function testIsSamePluginReturnsTrue(): void
    {
        $plugin1 = new Plugin('Plugin A', 'same-plugin', '1.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'same-plugin', '2.0.0', '/path/b');

        $this->assertTrue($plugin1->isSamePlugin($plugin2));
    }

    /**
     * Test isSamePlugin method returns false for different slugs.
     */
    public function testIsSamePluginReturnsFalse(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '1.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '1.0.0', '/path/b');

        $this->assertFalse($plugin1->isSamePlugin($plugin2));
    }

    /**
     * Test isSamePlugin method with identical plugins.
     */
    public function testIsSamePluginWithIdenticalPlugins(): void
    {
        $plugin1 = new Plugin('Same Plugin', 'same-plugin', '1.0.0', '/path/plugin');
        $plugin2 = new Plugin('Same Plugin', 'same-plugin', '1.0.0', '/path/plugin');

        $this->assertTrue($plugin1->isSamePlugin($plugin2));
    }

    /**
     * Test plugin with minimum valid slug (single character).
     */
    public function testPluginWithMinimumValidSlug(): void
    {
        $plugin = new Plugin('Plugin', 'a', '1.0.0', '/path/plugin');

        $this->assertEquals('a', $plugin->getSlug());
    }

    /**
     * Test plugin with mixed numeric and alphabetic slug.
     */
    public function testPluginWithMixedSlug(): void
    {
        $plugin = new Plugin('Plugin', 'plugin-123-test', '1.0.0', '/path/plugin');

        $this->assertEquals('plugin-123-test', $plugin->getSlug());
    }

    /**
     * Test version comparison edge cases.
     */
    public function testVersionComparisonEdgeCases(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '10.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '2.0.0', '/path/b');

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
            '1.0.0+build.1',
            '1.0.0-b1',
            'v1.0.0',
            '1.0',
            '1',
        ];

        foreach ($validVersions as $version) {
            $plugin = new Plugin(
                'Test Plugin',
                'test-plugin',
                $version,
                '/path/to/plugin'
            );

            $this->assertEquals($version, $plugin->getVersion());
        }
    }
}
