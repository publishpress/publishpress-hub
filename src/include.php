<?php

/*****************************************************************
 * This file is generated on composer update command by
 * a custom script.
 *
 * Do not edit it manually!
 ****************************************************************/

namespace PublishPress\Hub;

use function add_action;
use function do_action;

if (! function_exists('add_action')) {
    return;
}

if (! function_exists(__NAMESPACE__ . '\register1Dot0Dot0DashAlphaDot6')) {
    if (! defined('PUBLISHPRESS_HUB_INCLUDED')) {
        define('PUBLISHPRESS_HUB_INCLUDED', __DIR__);
    }

    if (! class_exists('PublishPress\Hub\Versions')) {
        require_once __DIR__ . '/Versions.php';

        add_action('plugins_loaded', [Versions::class, 'initializeLatestVersion'], -240, 0);
    }

    add_action('plugins_loaded', __NAMESPACE__ . '\register1Dot0Dot0DashAlphaDot6', -250, 0);

    function register1Dot0Dot0DashAlphaDot6()
    {
        if (! class_exists('PublishPress\Hub\Infrastructure\Container\ServiceContainer')) {
            $versions = Versions::getInstance();
            $versions->register('1.0.0-alpha.6', __NAMESPACE__ . '\initialize1Dot0Dot0DashAlphaDot6');
        }
    }

    function initialize1Dot0Dot0DashAlphaDot6()
    {
        require_once __DIR__ . '/autoload.php';

        if (! defined('PUBLISHPRESS_HUB_VERSION')) {
            define('PUBLISHPRESS_HUB_VERSION', '1.0.0-alpha.6');
        }

        do_action('publishpress_hub_1Dot0Dot0DashAlphaDot6_initialized');
    }
}
