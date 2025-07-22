<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Contract;

use WP_REST_Request;

interface UseCaseInterface
{
    public function execute(WP_REST_Request $request): array;
}
