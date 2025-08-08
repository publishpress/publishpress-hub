<?php

/**
 * License handlers family map.
 *
 * @package PublishPress\Hub\Infrastructure\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License;

use PublishPress\Hub\Infrastructure\License\Handlers\ChecklistsHandler;

return [
    'checklists' => ChecklistsHandler::class,
];
