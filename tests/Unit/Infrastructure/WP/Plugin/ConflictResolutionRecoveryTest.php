<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Plugin {
    final class ConflictRecoveryTestState
    {
        public static array $active = [];
        public static array $network = [];
        public static array $shutdown = [];
        public static array $loaded = [];
    }

    function get_option($name, $default = false)
    {
        return ConflictRecoveryTestState::$active;
    }

    function update_option($name, $value)
    {
        ConflictRecoveryTestState::$active = $value;
        return true;
    }

    function is_plugin_active($path)
    {
        return in_array($path, ConflictRecoveryTestState::$active, true);
    }

    function is_plugin_active_for_network($path)
    {
        return in_array($path, ConflictRecoveryTestState::$network, true);
    }

    function register_shutdown_function($callback)
    {
        ConflictRecoveryTestState::$shutdown[] = $callback;
    }

    function realpath($path)
    {
        return $path;
    }

    function get_included_files()
    {
        return ConflictRecoveryTestState::$loaded;
    }
}

namespace Tests\Unit\Infrastructure\WP\Plugin {
    use Codeception\Test\Unit;
    use PublishPress\Hub\Infrastructure\WP\Plugin\ConflictRecoveryTestState as State;
    use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
    use RuntimeException;

    class ConflictResolutionRecoveryTest extends Unit
    {
        private WPPluginLifecycleAdapter $adapter;

        protected function setUp(): void
        {
            parent::setUp();
            if (!defined('WP_PLUGIN_DIR')) {
                define('WP_PLUGIN_DIR', '/plugins');
            }
            State::$active = ['free/plugin.php', 'unrelated/plugin.php'];
            State::$network = [];
            State::$shutdown = [];
            State::$loaded = [];
            $this->adapter = $this->getMockBuilder(WPPluginLifecycleAdapter::class)
                ->disableOriginalConstructor()
                ->onlyMethods(['activatePlugin', 'deactivatePlugin'])
                ->getMock();
            $this->adapter->method('deactivatePlugin')->willReturnCallback(static function ($path) {
                State::$active = array_values(array_diff(State::$active, [$path]));
                return true;
            });
        }

        public function testSuccessfulSwitchKeepsSelectedActiveAfterShutdown(): void
        {
            $this->adapter->method('activatePlugin')->willReturnCallback(static function ($path) {
                State::$active[] = $path;
                return true;
            });
            $this->adapter->switchActivePlugin('free/plugin.php', 'pro/plugin.php');
            State::$shutdown[0]();
            $this->assertContains('pro/plugin.php', State::$active);
            $this->assertNotContains('free/plugin.php', State::$active);
            $this->assertContains('unrelated/plugin.php', State::$active);
        }

        public function testActivationErrorRestoresPreviousEditionAndRetainsOtherChanges(): void
        {
            $this->adapter->method('activatePlugin')->willReturnCallback(static function ($path) {
                State::$active[] = $path;
                State::$active[] = 'another/plugin.php';
                throw new \Error('Missing required file');
            });
            try {
                $this->adapter->switchActivePlugin('free/plugin.php', 'pro/plugin.php');
                $this->fail('Activation failure must be reported');
            } catch (RuntimeException $error) {
                $this->assertStringContainsString('Neither copy was deleted', $error->getMessage());
            }
            $this->assertContains('free/plugin.php', State::$active);
            $this->assertNotContains('pro/plugin.php', State::$active);
            $this->assertContains('another/plugin.php', State::$active);
        }

        public function testSuccessReturnWithoutActivePluginIsRejected(): void
        {
            $this->adapter->method('activatePlugin')->willReturn(true);
            try {
                $this->adapter->switchActivePlugin('free/plugin.php', 'pro/plugin.php');
                $this->fail('An inactive selected plugin must not be accepted');
            } catch (RuntimeException $error) {
                $this->assertContains('free/plugin.php', State::$active);
            }
        }

        public function testShutdownRecoveryRestoresActivationSettings(): void
        {
            $this->adapter->method('activatePlugin')->willReturnCallback(static function ($path) {
                // Simulate shutdown during activation, before the switch completes.
                State::$shutdown[0]();
                throw new \Error('Activation terminated');
            });
            try {
                $this->adapter->switchActivePlugin('free/plugin.php', 'pro/plugin.php');
            } catch (RuntimeException $error) {
                $this->assertContains('free/plugin.php', State::$active);
                $this->assertNotContains('pro/plugin.php', State::$active);
            }
        }

        public function testNetworkActivationCannotBeChanged(): void
        {
            State::$network = ['free/plugin.php'];
            $this->adapter->expects($this->never())->method('activatePlugin');
            $this->expectException(RuntimeException::class);
            $this->adapter->switchActivePlugin('free/plugin.php', 'pro/plugin.php');
        }

        public function testCleanupRequiresFreshRequestAndActiveSelectedEdition(): void
        {
            $this->assertFalse($this->adapter->canRemoveConflictingPlugin('free/plugin.php', 'pro/plugin.php'));
            State::$active = ['pro/plugin.php'];
            State::$loaded = [WP_PLUGIN_DIR . '/free/plugin.php'];
            $this->assertFalse($this->adapter->canRemoveConflictingPlugin('free/plugin.php', 'pro/plugin.php'));
            State::$loaded = [];
            $this->assertTrue($this->adapter->canRemoveConflictingPlugin('free/plugin.php', 'pro/plugin.php'));
        }
    }
}
