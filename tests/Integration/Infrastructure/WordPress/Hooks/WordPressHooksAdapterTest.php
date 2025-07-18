<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\WordPress\Hooks;

use PublishPress\Hub\Infrastructure\Asset\AssetManager;
use PublishPress\Hub\Infrastructure\WordPress\WordPressHooksAdapter;
use Tests\WPTestCase;

/**
 * Unit tests for WordPressHooksAdapter class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\WordPress\WordPressHooksAdapter
 */
class WordPressHooksAdapterTest extends WPTestCase
{
    /**
     * @var WordPressHooksAdapter
     */
    private $hooksAdapter;

    protected function setUp(): void
    {
        parent::setUp();

        $this->hooksAdapter = new WordPressHooksAdapter();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testAddAction(): void
    {
        $callback = function () {
            echo 1;
        };

        $hookName = 'test_action_' . uniqid('', true);

        $this->hooksAdapter->addAction($hookName, $callback);

        $this->assertTrue(has_action($hookName));

        remove_action($hookName, $callback);

        $this->assertFalse(has_action($hookName));
    }

    public function testAddFilter(): void
    {
        $callback = function ($value) {
            return $value . 'AddFilter';
        };

        $hookName = 'test_filter_' . uniqid('', true);

        $this->hooksAdapter->addFilter($hookName, $callback);

        $this->assertEquals('testAddFilter', apply_filters($hookName, 'test'));

        remove_filter($hookName, $callback);

        $this->assertEquals('test', apply_filters($hookName, 'test'));
    }

    public function testRemoveAction(): void
    {
        $callback = function () {
            echo 1;
        };

        $hookName = 'test_action_' . uniqid('', true);

        add_action($hookName, $callback);

        $this->assertTrue(has_action($hookName));

        $this->hooksAdapter->removeAction($hookName, $callback);

        $this->assertFalse(has_action($hookName));
    }

    public function testRemoveFilter(): void
    {
        $callback = function ($value) {
            return $value . 'AddFilter';
        };

        $hookName = 'test_filter_' . uniqid('', true);

        add_filter($hookName, $callback);

        $this->assertTrue(has_filter($hookName));

        $this->hooksAdapter->removeFilter($hookName, $callback);

        $this->assertFalse(has_filter($hookName));
    }

    public function testDoAction(): void
    {
        $callback = function () {
            echo 'testDoAction';
        };

        $hookName = 'test_action_' . uniqid('', true);

        add_action($hookName, $callback);

        ob_start();

        do_action($hookName);

        $output = ob_get_clean();

        $this->assertEquals('testDoAction', $output);

        remove_action($hookName, $callback);

        $this->assertFalse(has_action($hookName));
    }

    public function testApplyFilters(): void
    {
        $callback = function ($value) {
            return $value . 'AddFilter';
        };

        $hookName = 'test_filter_' . uniqid('', true);

        add_filter($hookName, $callback);

        $this->assertEquals('testAddFilter', $this->hooksAdapter->applyFilters($hookName, 'test'));

        remove_filter($hookName, $callback);

        $this->assertFalse(has_filter($hookName));
    }
}
