<?php

/**
 * Use case for retrieving the debug log contents.
 *
 * @package PublishPress\Hub\Application\UseCase\Settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Settings;

use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Infrastructure\Debug\DebugLogService;
use WP_REST_Request;

class GetDebugLogUseCase implements UseCaseInterface
{
    private DebugLogService $debugLogService;

    /**
     * @param DebugLogService $debugLogService
     * @since 1.0.0
     */
    public function __construct(DebugLogService $debugLogService)
    {
        $this->debugLogService = $debugLogService;
    }

    /**
     * Returns the current contents of the debug log file.
     *
     * @param WP_REST_Request $request
     * @return array<string, mixed>
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        return [
            'log' => $this->debugLogService->read(),
        ];
    }
}
