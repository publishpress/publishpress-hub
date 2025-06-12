<?php

/**
 * Autoload file for the PublishPress Hub library.
 *
 * @package PublishPress\Hub
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub;

use PublishPress\Hub\Infrastructure\Autoloader\Autoloader;

if (! class_exists('PublishPress\Hub\Infrastructure\Autoloader\Autoloader')) {
    require_once __DIR__ . '/Infrastructure/Autoloader/Autoloader.php';
}

Autoloader::register('PublishPress\Hub', __DIR__);
