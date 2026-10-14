<?php

declare(strict_types=1);

namespace Tests\Unit\Application\LanguagePack;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\LanguagePack\LanguagePackPolicy;

/**
 * @coversDefaultClass \PublishPress\Hub\Application\Service\LanguagePack\LanguagePackPolicy
 */
class LanguagePackPolicyTest extends Unit
{
    public function testEnglishLocalesAreNotEligible(): void
    {
        $this->assertFalse(LanguagePackPolicy::isEligibleLocale(''));
        $this->assertFalse(LanguagePackPolicy::isEligibleLocale('en'));
        $this->assertFalse(LanguagePackPolicy::isEligibleLocale('en_US'));
        $this->assertFalse(LanguagePackPolicy::isEligibleLocale('en_GB'));
    }

    public function testPortugueseBrazilIsEligible(): void
    {
        $this->assertTrue(LanguagePackPolicy::isEligibleLocale('pt_BR'));
    }

    public function testReleaseTagIsIndependentOfPluginVersion(): void
    {
        $this->assertSame('v0.0.0-pt-br', LanguagePackPolicy::releaseTag('pt_BR'));
        $this->assertSame('v0.0.0-de-de', LanguagePackPolicy::releaseTag('de_DE'));
        $this->assertSame('v0.0.0-ja', LanguagePackPolicy::releaseTag('ja'));
    }

    public function testMissingCatalogIsInstalledWhenRemoteDateIsPresent(): void
    {
        $this->assertTrue(LanguagePackPolicy::needsInstall('', '2026-07-30 18:52+0000'));
    }

    public function testSameRevisionIsNotInstalledAgain(): void
    {
        $this->assertFalse(
            LanguagePackPolicy::needsInstall('2026-07-30 18:52+0000', '2026-07-30 18:52+0000')
        );
    }

    public function testNewerRevisionReplacesTheInstalledPack(): void
    {
        $this->assertTrue(
            LanguagePackPolicy::needsInstall('2026-07-30 18:52+0000', '2026-08-01 00:00+0000')
        );
        $this->assertFalse(
            LanguagePackPolicy::needsInstall('2026-08-01 00:00+0000', '2026-07-30 18:52+0000')
        );
    }

    public function testUnparseableRemoteTimestampDoesNotReplaceThePack(): void
    {
        $this->assertFalse(LanguagePackPolicy::needsInstall('2026-07-30 18:52+0000', ''));
        $this->assertFalse(LanguagePackPolicy::needsInstall('2026-07-30 18:52+0000', 'yesterday'));
    }

    public function testRevisionDateIsReadFromGettextHeader(): void
    {
        $header = "Project-Id-Version: PublishPress Cart\nPO-Revision-Date: 2026-07-30 18:52+0000\n";

        $this->assertSame('2026-07-30 18:52+0000', LanguagePackPolicy::revisionDateFromContents($header));
    }

    public function testZipEntriesAreOnlyTheMoAndJsonFiles(): void
    {
        $this->assertTrue(LanguagePackPolicy::isAllowedEntry('example-plugin-pt_BR.mo', 'example-plugin', 'pt_BR'));
        $this->assertTrue(LanguagePackPolicy::isAllowedEntry('example-plugin-de_DE.json', 'example-plugin', 'de_DE'));
        $this->assertFalse(LanguagePackPolicy::isAllowedEntry('example-plugin-pt_BR.po', 'example-plugin', 'pt_BR'));
        $this->assertFalse(LanguagePackPolicy::isAllowedEntry('example-plugin-pt_BR.l10n.php', 'example-plugin', 'pt_BR'));
        $this->assertFalse(LanguagePackPolicy::isAllowedEntry('../example-plugin-pt_BR.mo', 'example-plugin', 'pt_BR'));
        $this->assertFalse(LanguagePackPolicy::isAllowedEntry('nested/example-plugin-pt_BR.mo', 'example-plugin', 'pt_BR'));
    }
}
