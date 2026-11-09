<?php

use PublishPress\Hub\Infrastructure\Autoloader\Autoloader;

define('ABSPATH', '/tmp');

define('TESTS_PATH', realpath(__DIR__ . '/../') . '/');

require_once __DIR__ . '/../../src/Infrastructure/Autoloader/Autoloader.php';

require_once __DIR__ . '/../../lib/vendor/autoload.php';
require_once __DIR__ . '/../../lib/vendor/publishpress/psr-container/lib/autoload.php';

Autoloader::register('PublishPress\\Hub\\', __DIR__ . '/../../src/');

class CustomException extends Exception {}

if (! function_exists('__')) {
    function __($text, $domain = 'publishpress-hub') {
        return $text;
    }
}

if (! function_exists('esc_html__')) {
    function esc_html__($text, $domain = 'publishpress-hub') {
        return htmlspecialchars(__($text, $domain), ENT_QUOTES, 'UTF-8');
    }
}

if (! function_exists('esc_html')) {
    function esc_html($text) {
        return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    }
}

if (! function_exists('wp_delete_file')) {
    function wp_delete_file($file) {
        return unlink($file);
    }
}

if (! function_exists('absint')) {
    function absint($value) {
        return abs((int) $value);
    }
}
