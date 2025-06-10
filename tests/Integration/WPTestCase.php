<?php

namespace Tests;

use Tests\Support\_generated\IntegrationTesterActions;

class WPTestCase extends \lucatume\WPBrowser\TestCase\WPTestCase
{
    use IntegrationTesterActions;

    /**
     * @var \IntegrationTester
     */
    protected $tester;
}
