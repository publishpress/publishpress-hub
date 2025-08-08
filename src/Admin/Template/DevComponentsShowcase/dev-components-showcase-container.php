<?php

/**
 * Template for the dev components showcase container.
 *
 * @package PublishPress\Hub\Presentation\Template\Admin\DevComponentsShowcase
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

?>
<div id="publishpress-hub-components-showcase-container">
    <div class="publishpress-hub-admin-page-loading">
        <p>
            <?php echo esc_html($context['loading_message']); ?>
        </p>
    </div>
</div>
