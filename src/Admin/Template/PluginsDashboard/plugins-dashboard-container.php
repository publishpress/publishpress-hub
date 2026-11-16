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
 *     @type array<string, mixed> $language_pack_status Download status for the current pack.
 * }
 */

declare(strict_types=1);

defined('ABSPATH') || exit;

$status = $context['language_pack_status'] ?? [];
$message = is_array($status) && isset($status['message']) && is_string($status['message'])
    ? $status['message']
    : __('Language pack has not been checked yet.', 'publishpress-hub');

?>
<p class="publishpress-hub-language-pack-status">
    <?php echo esc_html($message); ?>
</p>
<div id="publishpress-hub-plugins-dashboard-container">
    <div class="publishpress-hub-admin-page-loading">
        <p>
            <?php echo esc_html($context['loading_message']); ?>
        </p>
    </div>
</div>
