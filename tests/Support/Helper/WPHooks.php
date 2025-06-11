<?php

declare(strict_types=1);

namespace Tests\Support\Helper;

use Codeception\Module;
use PHPUnit\Framework\ExpectationFailedException;
use PublishPress\Hub\Application\Hooks as ApplicationHooks;
use PublishPress\Hub\Domain\Hooks as DomainHooks;

/**
 * WordPress Hooks helper for Codeception integration tests.
 *
 * This helper provides utilities for testing WordPress hooks within the
 * PublishPress Hub library, including checking registered hooks and
 * tracking hook calls during tests.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */
class WPHooks extends Module
{
    /**
     * Initialize the helper.
     *
     * @since 1.0.0
     */
    public function _initialize(): void
    {
        parent::_initialize();
    }

    /**
     * Assert that a hook action is registered.
     *
     * @since 1.0.0
     * @param string $hookName The hook name to check
     * @param string|null $message Optional assertion message
     */
    public function seeHookAction(string $hookName, ?string $message = null): void
    {
        $message = $message ?: "Hook action '{$hookName}' is not registered";
        \PHPUnit\Framework\Assert::assertTrue(has_action($hookName) !== false, $message);
    }

    /**
     * Assert that a hook action is not registered.
     *
     * @since 1.0.0
     * @param string $hookName The hook name to check
     * @param string|null $message Optional assertion message
     */
    public function dontSeeHookAction(string $hookName, ?string $message = null): void
    {
        $message = $message ?: "Hook action '{$hookName}' should not be registered";
        \PHPUnit\Framework\Assert::assertFalse(has_action($hookName), $message);
    }

    /**
     * Assert that a hook filter is registered.
     *
     * @param string $hookName The hook name to check
     * @param string|null $message Optional assertion message
     */
    public function seeHookFilter(string $hookName, ?string $message = null): void
    {
        $message = $message ?: "Hook filter '{$hookName}' is not registered";
        \PHPUnit\Framework\Assert::assertTrue(has_filter($hookName), $message);
    }

    /**
     * Assert that a hook filter is not registered.
     *
     * @param string $hookName The hook name to check
     * @param string|null $message Optional assertion message
     */
    public function dontSeeHookFilter(string $hookName, ?string $message = null): void
    {
        $message = $message ?: "Hook filter '{$hookName}' should not be registered";
        \PHPUnit\Framework\Assert::assertFalse(has_filter($hookName), $message);
    }

    /**
     * Assert that a hook has been called a specific number of times.
     *
     * @param string $hookName
     * @param int $expectedCount
     * @param null|string $message
     * @return void
     * @throws ExpectationFailedException
     */
    public function seeHookCalledTimes(string $hookName, int $expectedCount, ?string $message = null): void
    {
        $message = $message ?: "Hook {$hookName} was not called {$expectedCount} times";
        \PHPUnit\Framework\Assert::assertEquals($expectedCount, did_action($hookName), $message);
    }

    /**
     * Assert that a hook has been called.
     *
     * @param string $hookName
     * @param null|string $message
     * @return void
     * @throws ExpectationFailedException
     */
    public function seeHookCalled(string $hookName, ?string $message = null): void
    {
        $message = $message ?: "Hook {$hookName} was not called";
        \PHPUnit\Framework\Assert::assertGreaterThan(0, did_action($hookName), $message);
    }
}
