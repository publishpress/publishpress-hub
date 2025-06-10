<?php

declare(strict_types=1);

namespace Tests\Support;

/**
 * Inherited Methods
 * @method void wantTo($text)
 * @method void wantToTest($text)
 * @method void execute($callable)
 * @method void expectTo($prediction)
 * @method void expect($prediction)
 * @method void amGoingTo($argumentation)
 * @method void am($role)
 * @method void lookForwardTo($achieveValue)
 * @method void comment($description)
 * @method void pause($vars = [])
 *
 * @SuppressWarnings(PHPMD)
*/
class UnitTester extends \Codeception\Actor
{
    use _generated\UnitTesterActions;

    public function seeHookAction(string $hookName, ?string $message = null): void
    {
        $this->assertTrue(
            has_action($hookName),
            $message ?? "Hook {$hookName} not called"
        );
    }

    public function seeHookCalledTimes(string $hookName, int $expectedCount, ?string $message = null): void
    {
        $this->assertAction(
            $expectedCount,
            did_action($hookName),
            $message
        );
    }
}
