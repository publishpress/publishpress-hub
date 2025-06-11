<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\Event;

use PublishPress\Hub\Infrastructure\Event\WordPressEventDispatcher;
use Tests\Support\IntegrationTester;
use Tests\WPTestCase;

class WordPressEventDispatcherTest extends WPTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testAddAction(): void
    {
        $dispatcher = new WordPressEventDispatcher();
        $dispatcher->addAction('test_action', function () {
            return 'test_result';
        });

        $this->seeHookAction('test_action');
    }

    public function testAddFilter(): void
    {
        $dispatcher = new WordPressEventDispatcher();
        $dispatcher->addFilter('test_filter', function () {
            return 'test_result';
        });

        $this->seeHookFilter('test_filter');
    }

    public function testDoAction(): void
    {
        $dispatcher = new WordPressEventDispatcher();
        $dispatcher->doAction('test_action', 'test_arg');

        $this->seeHookCalled('test_action');
    }
}
