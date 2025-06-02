<?php
/**
 * Plugin Name: Dummy Hub 2
 * Plugin URI: https://publishpress.com
 * Description: A dummy plugin for testing purposes
 * Version: 1.0.0
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL2
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DUMMY_HUB_2_VERSION', '1.0.0');
define('DUMMY_HUB_2_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DUMMY_HUB_2_PLUGIN_URL', plugin_dir_url(__FILE__));

// Main plugin class
class DummyHub2 {
    /**
     * Instance of this class
     */
    private static $instance = null;

    /**
     * Get the singleton instance
     */
    public static function getInstance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->initHooks();
    }

    /**
     * Initialize hooks
     */
    private function initHooks() {
        add_action('init', [$this, 'init']);
    }

    /**
     * Initialize plugin
     */
    public function init() {
        // Plugin initialization code here
    }
}

DummyHub2::getInstance();
