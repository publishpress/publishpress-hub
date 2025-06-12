<?php
/**
 * Plugin Name: Dummy Plugin 1
 * Plugin URI: https://publishpress.com
 * Description: A dummy plugin for testing purposes
 * Version: 1.0.0
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL2
 */

declare(strict_types=1);

namespace PublishPress\Hub\DummyPlugin1;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DUMMY_PLUGIN_1_VERSION', '1.0.0');
define('DUMMY_PLUGIN_1_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DUMMY_PLUGIN_1_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once __DIR__ . '/Plugin.php';

DummyPlugin1::getInstance();
