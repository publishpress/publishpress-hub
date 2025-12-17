<?php

declare(strict_types=1);

namespace Tests\Unit\Application\Service;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\VersionService;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

/**
 * Unit tests for VersionService.
 *
 * @coversDefaultClass \PublishPress\Hub\Application\Service\VersionService
 */
class VersionServiceTest extends Unit
{
    private const OPTION_NAME = 'publishpress_hub_version';
    private const CURRENT_VERSION = '1.0.0';

    /**
     * @var WPOptionsAdapterInterface
     */
    private $optionsAdapter;

    /**
     * @var VersionService
     */
    private $versionService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->optionsAdapter = $this->createMock(WPOptionsAdapterInterface::class);
        $this->versionService = new VersionService($this->optionsAdapter, self::CURRENT_VERSION);
    }

    /**
     * Test constructor properly sets dependencies.
     *
     * @covers ::__construct
     */
    public function testConstructorSetsDependencies(): void
    {
        $optionsAdapter = $this->createMock(WPOptionsAdapterInterface::class);
        $service = new VersionService($optionsAdapter, '1.5.0');

        $this->assertEquals('1.5.0', $service->getCurrentVersion());
    }

    /**
     * Test getCurrentVersion returns injected version.
     *
     * @covers ::getCurrentVersion
     */
    public function testGetCurrentVersionReturnsInjectedVersion(): void
    {
        $this->assertEquals(self::CURRENT_VERSION, $this->versionService->getCurrentVersion());
    }

    /**
     * Test getCurrentVersion with different version.
     *
     * @covers ::getCurrentVersion
     */
    public function testGetCurrentVersionWithDifferentVersion(): void
    {
        $service = new VersionService($this->optionsAdapter, '2.5.3');

        $this->assertEquals('2.5.3', $service->getCurrentVersion());
    }

    /**
     * Test getStoredVersion returns version from database.
     *
     * @covers ::getStoredVersion
     */
    public function testGetStoredVersionReturnsVersionFromDatabase(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.5');

        $result = $this->versionService->getStoredVersion();

        $this->assertEquals('0.9.5', $result);
    }

    /**
     * Test getStoredVersion returns false when no version stored.
     *
     * @covers ::getStoredVersion
     */
    public function testGetStoredVersionReturnsFalseWhenNotStored(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $result = $this->versionService->getStoredVersion();

        $this->assertFalse($result);
    }

    /**
     * Test isVersionStored returns true when version exists.
     *
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     */
    public function testIsVersionStoredReturnsTrueWhenVersionExists(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('1.0.0');

        $result = $this->versionService->isVersionStored();

        $this->assertTrue($result);
    }

    /**
     * Test isVersionStored returns false when version does not exist.
     *
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     */
    public function testIsVersionStoredReturnsFalseWhenVersionDoesNotExist(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $result = $this->versionService->isVersionStored();

        $this->assertFalse($result);
    }

    /**
     * Test isFreshInstall returns true when no version is stored.
     *
     * @covers ::isFreshInstall
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     */
    public function testIsFreshInstallReturnsTrueWhenNoVersionStored(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $result = $this->versionService->isFreshInstall();

        $this->assertTrue($result);
    }

    /**
     * Test isFreshInstall returns false when version is stored.
     *
     * @covers ::isFreshInstall
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     */
    public function testIsFreshInstallReturnsFalseWhenVersionStored(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('1.0.0');

        $result = $this->versionService->isFreshInstall();

        $this->assertFalse($result);
    }

    /**
     * Test isReactivation returns true when stored version matches current.
     *
     * @covers ::isReactivation
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testIsReactivationReturnsTrueWhenVersionsMatch(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(2))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(self::CURRENT_VERSION);

        $result = $this->versionService->isReactivation();

        $this->assertTrue($result);
    }

    /**
     * Test isReactivation returns false when no version is stored.
     *
     * @covers ::isReactivation
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     */
    public function testIsReactivationReturnsFalseWhenNoVersionStored(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $result = $this->versionService->isReactivation();

        $this->assertFalse($result);
    }

    /**
     * Test isReactivation returns false when versions differ.
     *
     * @covers ::isReactivation
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testIsReactivationReturnsFalseWhenVersionsDiffer(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(2))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.0');

        $result = $this->versionService->isReactivation();

        $this->assertFalse($result);
    }

    /**
     * Test isUpdate returns true when versions differ.
     *
     * @covers ::isUpdate
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testIsUpdateReturnsTrueWhenVersionsDiffer(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(2))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.0');

        $result = $this->versionService->isUpdate();

        $this->assertTrue($result);
    }

    /**
     * Test isUpdate returns false when no version is stored.
     *
     * @covers ::isUpdate
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     */
    public function testIsUpdateReturnsFalseWhenNoVersionStored(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $result = $this->versionService->isUpdate();

        $this->assertFalse($result);
    }

    /**
     * Test isUpdate returns false when versions match.
     *
     * @covers ::isUpdate
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testIsUpdateReturnsFalseWhenVersionsMatch(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(2))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(self::CURRENT_VERSION);

        $result = $this->versionService->isUpdate();

        $this->assertFalse($result);
    }

    /**
     * Test storeCurrentVersion adds option when not stored.
     *
     * @covers ::storeCurrentVersion
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testStoreCurrentVersionAddsOptionWhenNotStored(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $this->optionsAdapter
            ->expects($this->once())
            ->method('addOption')
            ->with(self::OPTION_NAME, self::CURRENT_VERSION, true)
            ->willReturn(true);

        $result = $this->versionService->storeCurrentVersion();

        $this->assertTrue($result);
    }

    /**
     * Test storeCurrentVersion updates option when already stored.
     *
     * @covers ::storeCurrentVersion
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testStoreCurrentVersionUpdatesOptionWhenAlreadyStored(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.0');

        $this->optionsAdapter
            ->expects($this->once())
            ->method('updateOption')
            ->with(self::OPTION_NAME, self::CURRENT_VERSION, true)
            ->willReturn(true);

        $result = $this->versionService->storeCurrentVersion();

        $this->assertTrue($result);
    }

    /**
     * Test storeCurrentVersion returns false when add fails.
     *
     * @covers ::storeCurrentVersion
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testStoreCurrentVersionReturnsFalseWhenAddFails(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $this->optionsAdapter
            ->expects($this->once())
            ->method('addOption')
            ->with(self::OPTION_NAME, self::CURRENT_VERSION, true)
            ->willReturn(false);

        $result = $this->versionService->storeCurrentVersion();

        $this->assertFalse($result);
    }

    /**
     * Test storeCurrentVersion returns false when update fails.
     *
     * @covers ::storeCurrentVersion
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testStoreCurrentVersionReturnsFalseWhenUpdateFails(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.0');

        $this->optionsAdapter
            ->expects($this->once())
            ->method('updateOption')
            ->with(self::OPTION_NAME, self::CURRENT_VERSION, true)
            ->willReturn(false);

        $result = $this->versionService->storeCurrentVersion();

        $this->assertFalse($result);
    }

    /**
     * Test needsMigration returns true when isUpdate is true.
     *
     * @covers ::needsMigration
     * @covers ::isUpdate
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     * @covers ::getCurrentVersion
     */
    public function testNeedsMigrationReturnsTrueWhenUpdateDetected(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(2))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.0');

        $result = $this->versionService->needsMigration();

        $this->assertTrue($result);
    }

    /**
     * Test needsMigration returns false when no update detected.
     *
     * @covers ::needsMigration
     * @covers ::isUpdate
     * @covers ::isVersionStored
     * @covers ::getStoredVersion
     */
    public function testNeedsMigrationReturnsFalseWhenNoUpdateDetected(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $result = $this->versionService->needsMigration();

        $this->assertFalse($result);
    }

    /**
     * Test getStoredVersionForMigration returns version string.
     *
     * @covers ::getStoredVersionForMigration
     * @covers ::getStoredVersion
     */
    public function testGetStoredVersionForMigrationReturnsVersionString(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.5');

        $result = $this->versionService->getStoredVersionForMigration();

        $this->assertEquals('0.9.5', $result);
    }

    /**
     * Test getStoredVersionForMigration returns empty string when no version.
     *
     * @covers ::getStoredVersionForMigration
     * @covers ::getStoredVersion
     */
    public function testGetStoredVersionForMigrationReturnsEmptyStringWhenNoVersion(): void
    {
        $this->optionsAdapter
            ->expects($this->once())
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $result = $this->versionService->getStoredVersionForMigration();

        $this->assertEquals('', $result);
    }

    /**
     * Test complete fresh installation workflow.
     *
     * @covers ::isFreshInstall
     * @covers ::isReactivation
     * @covers ::isUpdate
     */
    public function testFreshInstallationWorkflow(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(3))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(false);

        $this->assertTrue($this->versionService->isFreshInstall());
        $this->assertFalse($this->versionService->isReactivation());
        $this->assertFalse($this->versionService->isUpdate());
    }

    /**
     * Test complete reactivation workflow.
     *
     * @covers ::isFreshInstall
     * @covers ::isReactivation
     * @covers ::isUpdate
     */
    public function testReactivationWorkflow(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(5))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn(self::CURRENT_VERSION);

        $this->assertFalse($this->versionService->isFreshInstall());
        $this->assertTrue($this->versionService->isReactivation());
        $this->assertFalse($this->versionService->isUpdate());
    }

    /**
     * Test complete update workflow.
     *
     * @covers ::isFreshInstall
     * @covers ::isReactivation
     * @covers ::isUpdate
     * @covers ::needsMigration
     */
    public function testUpdateWorkflow(): void
    {
        $this->optionsAdapter
            ->expects($this->exactly(7))
            ->method('getOption')
            ->with(self::OPTION_NAME, false)
            ->willReturn('0.9.0');

        $this->assertFalse($this->versionService->isFreshInstall());
        $this->assertFalse($this->versionService->isReactivation());
        $this->assertTrue($this->versionService->isUpdate());
        $this->assertTrue($this->versionService->needsMigration());
    }

    /**
     * Test version comparison with semantic versions.
     *
     * @covers ::isUpdate
     */
    public function testVersionComparisonWithSemanticVersions(): void
    {
        $testCases = [
            ['0.9.0', true],
            ['1.0.0', false],
            ['1.0.1', true],
            ['1.1.0', true],
            ['2.0.0', true],
            ['0.1.0', true],
        ];

        foreach ($testCases as [$storedVersion, $expectedIsUpdate]) {
            $this->optionsAdapter = $this->createMock(WPOptionsAdapterInterface::class);
            $this->optionsAdapter
                ->expects($this->exactly(2))
                ->method('getOption')
                ->with(self::OPTION_NAME, false)
                ->willReturn($storedVersion);

            $service = new VersionService($this->optionsAdapter, self::CURRENT_VERSION);
            $result = $service->isUpdate();

            $this->assertEquals(
                $expectedIsUpdate,
                $result,
                "Version comparison failed for stored: {$storedVersion}, current: " . self::CURRENT_VERSION
            );
        }
    }
}

