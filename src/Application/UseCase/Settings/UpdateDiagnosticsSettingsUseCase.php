<?php

/**
 * Use case for updating diagnostics settings.
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

class UpdateDiagnosticsSettingsUseCase implements UseCaseInterface
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
     * Updates the debug mode setting and returns the new value.
     *
     * @param WP_REST_Request $request Request containing a boolean debug_mode parameter.
     * @return array<string, mixed>
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $debugMode = (bool) $request->get_param('debug_mode');

        $this->optionsAdapter->updateOption(self::DEBUG_MODE_OPTION, $debugMode);

        return [
            'debug_mode' => $debugMode,
        ];
    }
}
