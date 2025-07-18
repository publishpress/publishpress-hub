<?php

declare(strict_types=1);


namespace Tests\Integration\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Entity\FreePlugin;
use PublishPress\Hub\Domain\Plugin\Entity\PluginFamily;
use PublishPress\Hub\Domain\Plugin\Repository\PluginFamilyRepository;
use PublishPress\Hub\Domain\Plugin\Entity\ProPlugin;
use Tests\NoTransactionWPTestCase;

/**
 * Unit tests for the PluginRepository domain class.
 */
class PluginFamilyRepositoryTest extends NoTransactionWPTestCase
{
    private PluginFamilyRepository $repository;

    protected function _before(): void
    {
        $this->repository = new PluginFamilyRepository();
    }

    /**
     * Test repository starts empty.
     */
    public function testRepositoryStartsEmpty(): void
    {
        $this->assertEmpty($this->repository->getAllFamilies());
        $this->assertNull($this->repository->findFamilyBySlug('any-plugin'));
    }

    /**
     * Test registering a single plugin.
     */
    public function testRegisterSinglePluginFamily(): void
    {
        $pluginFamily = $this->createPluginFamily('test-plugin');

        $this->repository->registerFamily($pluginFamily);

        $this->assertCount(1, $this->repository->getAllFamilies());
        $this->assertSame($pluginFamily, $this->repository->findFamilyBySlug('test-plugin'));
    }

    /**
     * Test registering multiple different plugins.
     */
    public function testRegisterMultipleDifferentPluginFamilies(): void
    {
        $pluginFamily1 = $this->createPluginFamily('plugin-one');
        $pluginFamily2 = $this->createPluginFamily('plugin-two');
        $pluginFamily3 = $this->createPluginFamily('plugin-three');

        $this->repository->registerFamily($pluginFamily1);
        $this->repository->registerFamily($pluginFamily2);
        $this->repository->registerFamily($pluginFamily3);

        $this->assertCount(3, $this->repository->getAllFamilies());
        $this->assertSame($pluginFamily1, $this->repository->findFamilyBySlug('plugin-one'));
        $this->assertSame($pluginFamily2, $this->repository->findFamilyBySlug('plugin-two'));
        $this->assertSame($pluginFamily3, $this->repository->findFamilyBySlug('plugin-three'));
    }

    /**
     * Test registering same plugin with newer version overwrites.
     */
    public function testRegisterSamePluginFamilyWithNewerVersionOverwrites(): void
    {
        $pluginFamily1 = $this->createPluginFamily('test-plugin');
        $pluginFamily1->getFreePlugin()->setInstalled(true, '1.0.0', 'dummy-plugin-1/dummy-plugin-1.php');

        $pluginFamily2 = $this->createPluginFamily('test-plugin');
        $pluginFamily2->getFreePlugin()->setInstalled(true, '2.0.0', 'dummy-plugin-2/dummy-plugin-1.php');

        $this->repository->registerFamily($pluginFamily1);
        $this->repository->registerFamily($pluginFamily2);

        $this->assertCount(1, $this->repository->getAllFamilies());

        $registeredFamily = $this->repository->findFamilyBySlug('test-plugin');

        $this->assertNotNull($registeredFamily);

        $this->assertSame($pluginFamily2, $registeredFamily);
        $this->assertEquals('2.0.0', $registeredFamily->getFreePlugin()->getVersion());
    }

    /**
     * Test findBySlug returns null for non-existent plugin.
     */
    public function testFindFamilyBySlugReturnsNullForNonExistentPlugin(): void
    {
        $pluginFamily = $this->createPluginFamily('test-plugin');
        $pluginFamily->getFreePlugin()->setInstalled(true, '1.0.0', 'dummy-plugin-1/dummy-plugin-1.php');

        $this->repository->registerFamily($pluginFamily);

        $this->assertCount(1, $this->repository->getAllFamilies());

        $registeredFamily = $this->repository->findFamilyBySlug('not-existing-plugin');

        $this->assertNull($registeredFamily);
    }

    /**
     * Test findBySlug is case sensitive.
     */
    public function testFindFamilyBySlugIsCaseSensitive(): void
    {
        $pluginFamily = $this->createPluginFamily('test-plugin');
        $pluginFamily->getFreePlugin()->setInstalled(true, '1.0.0', 'dummy-plugin-1/dummy-plugin-1.php');

        $this->repository->registerFamily($pluginFamily);

        $registeredFamily = $this->repository->findFamilyBySlug('test-plugin');

        $this->assertNotNull($registeredFamily);

        $this->assertSame($pluginFamily, $registeredFamily);
        $this->assertNull($this->repository->findFamilyBySlug('Test-Plugin'));
        $this->assertNull($this->repository->findFamilyBySlug('TEST-PLUGIN'));
    }

    /**
     * Test getAllPluginFamilies returns array values without keys.
     */
    public function testGetAllPluginFamiliesReturnsArrayValues(): void
    {
        $pluginFamily1 = $this->createPluginFamily('plugin-a');
        $pluginFamily2 = $this->createPluginFamily('plugin-b');

        $this->repository->registerFamily($pluginFamily1);
        $this->repository->registerFamily($pluginFamily2);

        $allPluginFamilies = $this->repository->getAllFamilies();

        $this->assertCount(2, $allPluginFamilies);
        $this->assertContains($pluginFamily1, $allPluginFamilies);
        $this->assertContains($pluginFamily2, $allPluginFamilies);
    }

    /**
     * Test getAllPluginFamilies returns empty array when no plugin families registered.
     */
    public function testGetAllPluginFamiliesReturnsEmptyArrayWhenEmpty(): void
    {
        $this->assertSame([], $this->repository->getAllFamilies());
        $this->assertIsArray($this->repository->getAllFamilies());
    }

    /**
     * Test edge case with empty slug handling.
     */
    public function testEdgeCaseWithEmptySlugHandling(): void
    {
        $this->assertNull($this->repository->findFamilyBySlug(''));
    }

    private function createPluginFamily(string $pluginSlug): PluginFamily
    {
        $pluginFamily = new PluginFamily(
            'Test Plugin Family ' . $pluginSlug,
            $pluginSlug,
            'icon-' . $pluginSlug,
            'A dummy plugin for testing purposes',
            'https://publishpress.com/knowledge-base/changelogs-' . $pluginSlug . '/'
        );

        $freePlugin = new FreePlugin(
            'Test Plugin ' . $pluginSlug,
            $pluginSlug,
            $pluginSlug . '.php',
            'https://publishpress.com/pricing/' . $pluginSlug . '/'
        );

        $proPlugin = new ProPlugin(
            'Test Plugin Pro ' . $pluginSlug,
            $pluginSlug . '-pro',
            $pluginSlug . '-pro.php',
            'https://publishpress.com/pricing/' . $pluginSlug . '-pro/',
            1000,
            $pluginSlug
        );

        $pluginFamily->setFreePlugin($freePlugin);
        $pluginFamily->setProPlugin($proPlugin);

        return $pluginFamily;
    }

}
