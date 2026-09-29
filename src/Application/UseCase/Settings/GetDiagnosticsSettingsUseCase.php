<?php

/**
 * Use case for retrieving diagnostics settings.
 *
 * @package PublishPress\Hub\Application\UseCase\Settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Settings;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;
use WP_REST_Request;

class GetDiagnosticsSettingsUseCase implements UseCaseInterface
{
    private const DEBUG_MODE_OPTION = 'publishpress_hub_debug_mode';

    private WPOptionsAdapterInterface $optionsAdapter;

    /**
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @since 1.0.0
     */
    public function __construct(WPOptionsAdapterInterface $optionsAdapter)
    {
        $this->optionsAdapter = $optionsAdapter;
    }

    /**
     * Returns the current diagnostics settings.
     *
     * @param WP_REST_Request $request
     * @return array<string, mixed>
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $debugMode = (bool) $this->optionsAdapter->getOption(self::DEBUG_MODE_OPTION, false);

        return [
            'debug_mode' => $debugMode,
        ];
    }
}
