<?php
/**
 * Plugin Name: Dummy Hub 1
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
define('DUMMY_HUB_1_VERSION', '1.0.0');
define('DUMMY_HUB_1_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DUMMY_HUB_1_PLUGIN_URL', plugin_dir_url(__FILE__));

// Main plugin class
class DummyHub1 {
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
        add_action('admin_menu', [$this, 'addMenuPage']);
        add_action('init', [$this, 'init']);
    }

    /**
     * Initialize plugin
     */
    public function init() {
        // Plugin initialization code here
    }

    /**
     * Add menu page
     */
    public function addMenuPage() {
        add_menu_page('Dummy Hub 1', 'Dummy Hub 1', 'manage_options', 'dummy-hub-1', [$this, 'renderMenuPage']);
    }

    /**
     * Render menu page
     */
    public function renderMenuPage() {
        echo '<div>Dummy Hub 1</div>';
    }
}

DummyHub1::getInstance();
