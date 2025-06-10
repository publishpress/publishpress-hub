<?php

/*
 * Integration suite bootstrap file.
 *
 * This file is loaded AFTER the suite modules are initialized, WordPress, plugins and themes are loaded.
 *
 * If you need to load plugins or themes, add them to the Integration suite configuration file, in the
 * "modules.config.WPLoader.plugins" and "modules.config.WPLoader.theme" settings.
 *
 * If you need to load one or more database dump file(s) to set up the test database, add the path to the dump file to
 * the "modules.config.WPLoader.dump" setting.
 */

use PublishPress\Hub\Infrastructure\Autoloader\Autoloader;

if (! class_exists('Tests\WPTestCase')) {
    require_once __DIR__ . '/WPTestCase.php';
}

if (! class_exists('Tests\NoTransactionWPTestCase')) {
    require_once __DIR__ . '/NoTransactionWPTestCase.php';
}

require_once __DIR__ . '/../../src/Infrastructure/Autoloader/Autoloader.php';

Autoloader::register('PublishPress\Hub', __DIR__ . '/../../src');
