<?php

declare(strict_types=1);

namespace Tests\Unit\Application\LanguagePack;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\LanguagePack\LanguagePackFileReplacement;

class LanguagePackFileReplacementTest extends Unit
{
    public function testEveryCatalogIsReplacedAndBackupsAreRemoved(): void
    {
        $filesystem = $this->filesystem();
        $this->assertTrue((new LanguagePackFileReplacement())->replace($filesystem, ['mo.new' => 'mo', 'json.new' => 'json']));
        $this->assertSame(['mo' => 'new mo', 'json' => 'new json'], $filesystem->files);
    }

    public function testFailedReplacementRestoresBothOldCatalogs(): void
    {
        $filesystem = $this->filesystem('json');
        $this->assertFalse((new LanguagePackFileReplacement())->replace($filesystem, ['mo.new' => 'mo', 'json.new' => 'json']));
        $this->assertSame('old mo', $filesystem->files['mo']);
        $this->assertSame('old json', $filesystem->files['json']);
        $this->assertSame(['json.new', 'mo', 'json'], array_keys($filesystem->files));
    }

    public function testFailedFirstInstallDoesNotLeavePartialCatalogs(): void
    {
        $filesystem = $this->filesystem('json');
        unset($filesystem->files['mo'], $filesystem->files['json']);
        $this->assertFalse((new LanguagePackFileReplacement())->replace($filesystem, ['mo.new' => 'mo', 'json.new' => 'json']));
        $this->assertArrayNotHasKey('mo', $filesystem->files);
        $this->assertArrayNotHasKey('json', $filesystem->files);
    }

    private function filesystem(string $failMove = ''): object
    {
        return new class ($failMove) {
            public array $files = ['mo' => 'old mo', 'json' => 'old json', 'mo.new' => 'new mo', 'json.new' => 'new json'];

            public function __construct(private string $failMove)
            {
            }

            public function exists(string $path): bool
            {
                return isset($this->files[$path]);
            }

            public function copy(string $source, string $destination, bool $overwrite): bool
            {
                $this->files[$destination] = $this->files[$source];
                return true;
            }

            public function move(string $source, string $destination, bool $overwrite): bool
            {
                unset($this->files[$destination]);
                if ($destination === $this->failMove) {
                    return false;
                }
                $this->files[$destination] = $this->files[$source];
                unset($this->files[$source]);
                return true;
            }

            public function delete(string $path): bool
            {
                unset($this->files[$path]);
                return true;
            }
        };
    }
}
