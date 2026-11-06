<?php

/**
 * Regression tests for explicit expired license responses.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */

declare(strict_types=1);

namespace Tests\Unit\Infrastructure\Edd\Subscription;

use Codeception\Test\Unit;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseExpiredException;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseActivationServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseDeactivationServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseInfoServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\VersionCheckServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\EddSubscriptionAdapter;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseStatusValidator;

class ExpiredActivationResponseTest extends Unit
{
    /** @since 1.1.0 */
    public function testExpiredErrorIsNotReportedAsGenericInvalidLicense(): void
    {
        $activation = $this->createMock(LicenseActivationServiceInterface::class);
        $activation->expects($this->once())->method('activateLicense')
            ->willReturn(['license' => 'invalid', 'error' => 'expired', 'success' => false]);
        $adapter = new EddSubscriptionAdapter(
            $activation,
            $this->createMock(LicenseDeactivationServiceInterface::class),
            $this->createMock(LicenseInfoServiceInterface::class),
            $this->createMock(VersionCheckServiceInterface::class),
            new LicenseStatusValidator()
        );

        $this->expectException(LicenseExpiredException::class);
        $adapter->activateLicense('expired-key', 123);
    }
}
