<?php

/**
 * License status validator unit tests.
 *
 * @package Tests\Unit\Infrastructure\Edd\Subscription
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Unit\Infrastructure\Edd\Subscription;

use Codeception\Test\Unit;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseDisabledException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseExpiredException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidItemIdException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidItemNameException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseKeyMismatchException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseMissingException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseMissingUrlException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseNoActivationsLeftException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseNotActivableException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseSiteInactiveException;
use PublishPress\Hub\Domain\Plugin\Exception\UnknownLicenseServerException;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseStatusValidator;

class LicenseStatusValidatorTest extends Unit
{
    private LicenseStatusValidator $validator;

    public function setUp(): void
    {
        parent::setUp();
        $this->validator = new LicenseStatusValidator();
    }

    public function testAssertLicenseStatusOrThrowDoesNotThrowWhenStatusIsAcceptable(): void
    {
        $this->validator->assertLicenseStatusOrThrow('valid', ['valid', 'inactive']);
        $this->validator->assertLicenseStatusOrThrow('inactive', ['valid', 'inactive']);

        $this->assertTrue(true); // If we get here, no exception was thrown
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseMissingException(): void
    {
        $this->expectException(LicenseMissingException::class);
        $this->validator->assertLicenseStatusOrThrow('missing', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseMissingUrlException(): void
    {
        $this->expectException(LicenseMissingUrlException::class);
        $this->validator->assertLicenseStatusOrThrow('missing_url', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseNotActivableException(): void
    {
        $this->expectException(LicenseNotActivableException::class);
        $this->validator->assertLicenseStatusOrThrow('license_not_activable', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseDisabledException(): void
    {
        $this->expectException(LicenseDisabledException::class);
        $this->validator->assertLicenseStatusOrThrow('disabled', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseNoActivationsLeftException(): void
    {
        $this->expectException(LicenseNoActivationsLeftException::class);
        $this->validator->assertLicenseStatusOrThrow('no_activations_left', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseExpiredException(): void
    {
        $this->expectException(LicenseExpiredException::class);
        $this->validator->assertLicenseStatusOrThrow('expired', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseKeyMismatchException(): void
    {
        $this->expectException(LicenseKeyMismatchException::class);
        $this->validator->assertLicenseStatusOrThrow('key_mismatch', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseInvalidItemIdException(): void
    {
        $this->expectException(LicenseInvalidItemIdException::class);
        $this->validator->assertLicenseStatusOrThrow('invalid_item_id', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseInvalidItemNameException(): void
    {
        $this->expectException(LicenseInvalidItemNameException::class);
        $this->validator->assertLicenseStatusOrThrow('item_name_mismatch', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseSiteInactiveException(): void
    {
        $this->expectException(LicenseSiteInactiveException::class);
        $this->validator->assertLicenseStatusOrThrow('site_inactive', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsLicenseInvalidException(): void
    {
        $this->expectException(LicenseInvalidException::class);
        $this->validator->assertLicenseStatusOrThrow('invalid', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowThrowsUnknownLicenseServerException(): void
    {
        $this->expectException(UnknownLicenseServerException::class);
        $this->validator->assertLicenseStatusOrThrow('unknown_status', ['valid']);
    }

    public function testAssertLicenseStatusOrThrowIncludesOperationInContext(): void
    {
        try {
            $this->validator->assertLicenseStatusOrThrow('expired', ['valid'], 'test_operation');
            $this->fail('Expected LicenseExpiredException to be thrown');
        } catch (LicenseExpiredException $e) {
            $context = $e->getContext();
            $this->assertArrayHasKey('operation', $context);
            $this->assertEquals('test_operation', $context['operation']);
        }
    }

    public function testAssertLicenseStatusOrThrowWorksWithEmptyOperation(): void
    {
        $this->expectException(LicenseDisabledException::class);
        $this->validator->assertLicenseStatusOrThrow('disabled', ['valid'], '');
    }

    public function testAssertLicenseStatusOrThrowHandlesMultipleAcceptableStatuses(): void
    {
        $acceptableStatuses = ['valid', 'inactive', 'site_inactive'];

        // All these should not throw
        $this->validator->assertLicenseStatusOrThrow('valid', $acceptableStatuses);
        $this->validator->assertLicenseStatusOrThrow('inactive', $acceptableStatuses);
        $this->validator->assertLicenseStatusOrThrow('site_inactive', $acceptableStatuses);

        $this->assertTrue(true);
    }

    public function testAssertLicenseStatusOrThrowIsCaseSensitive(): void
    {
        $this->expectException(UnknownLicenseServerException::class);
        $this->validator->assertLicenseStatusOrThrow('VALID', ['valid']);
    }
}

