<?php

/**
 * Plugin Name: PublishPress Hub
 * Description: Centralized management hub for all PublishPress plugins - install, update, and manage licenses from one dashboard.
 * Version: 1.0.0-beta.5
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL2
 * Text Domain: publishpress-hub
 * Domain Path: /languages
 * Requires at least: 6.7
 * Requires PHP: 7.4
 */

declare(strict_types=1);

use function PublishPress\Hub\registerActivationHook;

require_once __DIR__ . '/src/include.php';
require_once __DIR__ . '/src/activation.php';

registerActivationHook(__FILE__);
