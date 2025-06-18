<?php

declare(strict_types=1);

/**
 * Plugins dashboard template.
 *
 * @since 1.0.0
 */
?>
<div id="publishpress-hub-plugins-dashboard-container">
    <style type="text/css">
        .publishpress-hub-plugins-dashboard-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: medium;
        }
    </style>
    <div class="publishpress-hub-plugins-dashboard-loading">
        <?php esc_html_e('Please wait while we load the plugins dashboard...', 'publishpress-hub'); ?>
    </div>
</div>
