<?php

declare(strict_types=1);

namespace Tests\Unit\Infrastructure\License;

use Codeception\Test\Unit;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Infrastructure\License\PerPluginLicensePersistenceService;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class NewPluginLicensePersistenceTest extends Unit
{
    public function testNativeLicensesCanBeReadSavedAndRemoved(): void
    {
        $plugins = [
            ['cart', 406422, '_sc_pro_license_key', '_sc_pro_license_status'],
            ['taxonomies', 408189, 'taxopress_license_key', 'taxopress_license_status'],
            ['tag-groups', 408655, 'tag_groups_license_key', 'tag_groups_license_status'],
        ];

        foreach ($plugins as [$slug, $id, $keyOption, $statusOption]) {
            $stored = [$keyOption => 'existing-key', $statusOption => 'valid'];
            $options = $this->createMock(WPOptionsAdapterInterface::class);
            $options->method('getOption')->willReturnCallback(
                static function ($name, $default = false) use (&$stored) {
                    return $stored[$name] ?? $default;
                }
            );
            $options->method('updateOption')->willReturnCallback(
                static function ($name, $value) use (&$stored): bool {
                    $stored[$name] = $value;
                    return true;
                }
            );
            $options->method('deleteOption')->willReturnCallback(
                static function ($name) use (&$stored): bool {
                    unset($stored[$name]);
                    return true;
                }
            );
            $family = $this->createMock(PluginFamilyInterface::class);
            $family->method('getSlug')->willReturn($slug);
            $repository = $this->createMock(PluginFamilyRepositoryInterface::class);
            $repository->method('findFamilyByDownloadId')->with($id)->willReturn($family);
            $service = new PerPluginLicensePersistenceService($options, $repository);

            $this->assertSame('existing-key', $service->getLicenseKey($id));
            $this->assertTrue($service->getLicenseStatus($id));
            $service->storeLicenseKey($id, 'hub-key');
            $service->storeLicenseStatus($id, false);
            $this->assertSame('hub-key', $stored[$keyOption]);
            $this->assertSame('invalid', $stored[$statusOption]);
            $service->storeLicenseStatus($id, true);
            $this->assertSame('valid', $stored[$statusOption]);
            $service->removeLicense($id);
            $this->assertNull($service->getLicenseKey($id));
            $this->assertFalse($service->getLicenseStatus($id));
        }
    }
}
