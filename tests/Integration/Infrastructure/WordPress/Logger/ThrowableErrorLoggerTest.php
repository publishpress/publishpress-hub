<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\WordPress\Logger;

use Tests\NoTransactionWPTestCase;
use Tests\Support\IntegrationTester;

class WorkflowScheduledStepsSchemaTest extends \lucatume\WPBrowser\TestCase\WPTestCase
{
    /**
     * @var \IntegrationTester
     */
    protected $tester;

    protected function setUp(): void
    {
        parent::setUp();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }
}
