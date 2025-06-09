<?php

/**
 * Plugin Name: Dummy Hub 2
 * Description: A dummy hub for testing.
 * Version: 1.0.0
 * Author: PublishPress
 */

define('DUMMY_HUB_2_VERSION', '1.0.0');
define('DUMMY_HUB_2_NAME', 'Dummy Hub 2');
define('DUMMY_HUB_2_SLUG', 'dummy-hub-2');

if (has_action('publishpress_hub_register_plugin')) {
    do_action(
        'publishpress_hub_register_plugin',
        DUMMY_HUB_2_NAME,
        DUMMY_HUB_2_SLUG,
        DUMMY_HUB_2_VERSION,
        __DIR__,
    );
}
