<?php

declare(strict_types=1);

namespace PublishPress\Hub\DummyPlugin2;

// Main plugin class
class DummyPlugin2 {
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
        add_menu_page('Dummy Plugin 2', 'Dummy Plugin 2', 'manage_options', 'dummy-plugin-2', [$this, 'renderMenuPage']);
    }

    /**
     * Render menu page
     */
    public function renderMenuPage() {
        echo '<h1>Dummy Plugin 2</h1>';
        echo '<p>This is a dummy plugin used for testing the PublishPress Hub functionality.</p>';

        if (class_exists('PublishPress\Hub\Infrastructure\Hooks')) {
            echo '<p>PublishPress Hub is loaded.</p>';
        } else {
            echo '<p style="color: red;">PublishPress Hub is not loaded.</p>';
        }
    }
}
