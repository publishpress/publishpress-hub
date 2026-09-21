<?php

/**
 * Template for the plugins dashboard container.
 *
 * @package PublishPress\Hub\Presentation\Template\Admin\PluginsDashboard
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 *
 * @var array<string, mixed> $context {
 *     Template context data.
 *     @type string $loading_message The loading message to display.
 * }
 */

declare(strict_types=1);
defined( 'ABSPATH' ) || exit;

?>
<div id="publishpress-hub-plugins-dashboard-container">
    <div class="publishpress-hub-admin-page-loading">
        <p>
            <?php echo esc_html($context['loading_message']); ?>
        </p>
    </div>
</div>
