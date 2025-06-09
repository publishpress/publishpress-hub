<?php

/**
 * Plugin Name: Dummy Hub 1
 * Description: A dummy hub for testing.
 * Version: 1.0.0
 * Author: PublishPress
 */

define('DUMMY_HUB_1_VERSION', '1.0.0');
define('DUMMY_HUB_1_NAME', 'Dummy Hub 1');
define('DUMMY_HUB_1_SLUG', 'dummy-hub-1');

if (has_action('publishpress_hub_register_plugin')) {
    do_action(
        'publishpress_hub_register_plugin',
        DUMMY_HUB_1_NAME,
        DUMMY_HUB_1_SLUG,
        DUMMY_HUB_1_VERSION,
        __DIR__,
    );
}
