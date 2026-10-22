<?php

/**
 * Mount container for the React AI Connections page.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 *
 * @var array<string, mixed> $context Template data including loading_message.
 */

declare(strict_types=1);

defined('ABSPATH') || exit;

?>
<div id="publishpress-hub-mcp-page-container">
    <div class="publishpress-hub-admin-page-loading">
        <p><?php echo esc_html($context['loading_message']); ?></p>
    </div>
</div>
