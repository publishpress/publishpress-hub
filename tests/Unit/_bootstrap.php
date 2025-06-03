<?php

use PublishPress\Hub\Infrastructure\Autoloader\Autoloader;

define('ABSPATH', '/tmp');

require_once __DIR__ . '/../../src/Infrastructure/Autoloader/Autoloader.php';

require_once __DIR__ . '/../../lib/vendor/autoload.php';
require_once __DIR__ . '/../../lib/vendor/publishpress/psr-container/lib/autoload.php';

Autoloader::register('PublishPress\\Hub\\', __DIR__ . '/../../src/');

class CustomException extends Exception {}
