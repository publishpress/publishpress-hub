<?php

declare(strict_types=1);

namespace Tests\Unit\Bootstrap;

use Codeception\Test\Unit;
use Symfony\Component\Process\Process;

class ComposerBootstrapTest extends Unit
{
    public function testComposerBootstrapReturnsWithoutWordPress(): void
    {
        $result = $this->runBootstrap('src/include.php', '', 'echo "continued";');

        $this->assertSame(0, $result->getExitCode(), $result->getErrorOutput());
        $this->assertSame('continued', $result->getOutput());
    }

    public function testComposerBootstrapReturnsBeforeHooksAreAvailable(): void
    {
        $result = $this->runBootstrap(
            'src/include.php',
            'define("ABSPATH", __DIR__);',
            'echo "continued";'
        );

        $this->assertSame(0, $result->getExitCode(), $result->getErrorOutput());
        $this->assertSame('continued', $result->getOutput());
    }

    public function testComposerBootstrapRegistersHooksWhenWordPressIsReady(): void
    {
        $result = $this->runBootstrap(
            'src/include.php',
            'define("ABSPATH", __DIR__); $hooks = []; '
                . 'function add_action($hook, $callback, $priority, $acceptedArgs = 1) { '
                . 'global $hooks; $hooks[] = [$hook, $priority]; }',
            'echo json_encode($hooks);'
        );

        $this->assertSame(0, $result->getExitCode(), $result->getErrorOutput());
        $this->assertSame(
            [['plugins_loaded', -240], ['plugins_loaded', -250]],
            json_decode($result->getOutput(), true)
        );
    }

    public function testDirectClassAccessStopsBeforeDependenciesLoad(): void
    {
        $result = $this->runBootstrap(
            'src/Application/UseCase/Settings/GetSiteHealthReportUseCase.php',
            '',
            'echo "should-not-run";'
        );

        $this->assertSame(0, $result->getExitCode(), $result->getErrorOutput());
        $this->assertSame('', $result->getOutput());
    }

    private function runBootstrap(string $file, string $before, string $after): Process
    {
        $root = dirname(__DIR__, 3);
        $process = new Process([
            PHP_BINARY,
            '-r',
            $before . ' require ' . var_export($root . '/' . $file, true) . '; ' . $after,
        ]);
        $process->run();

        return $process;
    }
}
