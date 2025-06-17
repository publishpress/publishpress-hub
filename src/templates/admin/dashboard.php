<?php

declare(strict_types=1);

/**
 * Dashboard template.
 *
 * @since 1.0.0
 */
?>
<div id="publishpress-hub-dashboard-container">
    <style type="text/css">
        .publishpress-hub-dashboard-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: medium;
        }
    </style>
    <div class="publishpress-hub-dashboard-loading">
        <?php esc_html_e('Loading the dashboard...', 'publishpress-hub'); ?>
    </div>
</div>
