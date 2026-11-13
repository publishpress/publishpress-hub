<?php

/**
 * Use case for clearing the debug log file.
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

\defined('ABSPATH') || exit;

class ClearDebugLogUseCase implements UseCaseInterface
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
     * Clears the debug log file.
     *
     * @param WP_REST_Request $request
     * @return array<string, mixed>
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $this->debugLogService->clear();

        return [
            'success' => true,
        ];
    }
}
