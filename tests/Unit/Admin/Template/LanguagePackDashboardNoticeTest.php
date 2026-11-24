<?php

declare(strict_types=1);

namespace Tests\Unit\Admin\Template;

use Codeception\Test\Unit;

class LanguagePackDashboardNoticeTest extends Unit
{
    public function testBackgroundAndMalformedStatusesDoNotDisplayNotices(): void
    {
        foreach ([
            null,
            false,
            '',
            [],
            ['message' => 'Language pack has not been checked yet.'],
            ['state' => 'idle', 'message' => 'Site locale is English. No language pack is downloaded.'],
            ['state' => 'idle', 'message' => 'No language packs are registered.'],
            ['state' => 'installed', 'message' => 'Language pack installed.'],
            ['state' => 'current', 'message' => 'Language pack is current.'],
            ['state' => 'error'],
            ['state' => 'error', 'message' => null],
            ['state' => 'error', 'message' => []],
            ['state' => 'error', 'message' => '   '],
        ] as $status) {
            $html = $this->renderDashboard($status);

            $this->assertStringNotContainsString('publishpress-hub-language-pack-', $html);
            $this->assertStringNotContainsString('notice-error', $html);
            $this->assertStringNotContainsString('No language pack', $html);
            $this->assertStringNotContainsString('not been checked yet', $html);
            $this->assertStringContainsString('id="publishpress-hub-plugins-dashboard-container"', $html);
            $this->assertStringContainsString('Loading plugins...', $html);
        }
    }

    public function testDownloadErrorsUseAnEscapedWordPressNotice(): void
    {
        $html = $this->renderDashboard([
            'state' => 'error',
            'message' => 'Language pack unavailable. <script>alert("unsafe")</script>',
        ]);

        $this->assertStringContainsString('class="notice notice-error publishpress-hub-language-pack-notice"', $html);
        $this->assertStringContainsString('role="alert"', $html);
        $this->assertStringContainsString('Language pack unavailable. &lt;script&gt;', $html);
        $this->assertStringNotContainsString('<script>', $html);
        $this->assertStringNotContainsString('publishpress-hub-language-pack-status', $html);
    }

    private function renderDashboard($status): string
    {
        $context = [
            'loading_message' => 'Loading plugins...',
            'language_pack_status' => $status,
        ];

        ob_start();
        try {
            require __DIR__ . '/../../../../src/Admin/Template/PluginsDashboard/plugins-dashboard-container.php';
            return (string) ob_get_contents();
        } finally {
            ob_end_clean();
        }
    }
}
