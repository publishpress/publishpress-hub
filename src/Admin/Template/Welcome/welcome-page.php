<?php

/**
 * Template for the welcome page.
 *
 * @package PublishPress\Hub\Presentation\Template\Admin\Welcome
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 *
 * @var array<string, mixed> $context {
 *     Template context data.
 *     @type string $dismiss_url The URL to dismiss the welcome page.
 * }
 */

declare(strict_types=1);

?>
<div class="wrap">
    <div class="pp-hub-welcome-page">
        <div class="pp-hub-welcome-page__header">
            <h1 class="pp-hub-welcome-page__title">
                <?php esc_html_e('Thank you for giving PublishPress Hub a try!', 'publishpress-hub'); ?>
            </h1>
        </div>

    <div class="pp-hub-welcome-page__content">
        <p class="pp-hub-welcome-page__message">
            <?php esc_html_e('Our plugins are designed to make managing your publishing workflow as simple as possible, and PublishPress Hub is the key to facilitate that. Whether you\'re just getting started or looking to streamline your existing setup, you\'ll find everything you need to install, update, and manage your PublishPress plugins from one central location. We\'re here to help you build a publishing system that works perfectly for your team.', 'publishpress-hub'); ?>
        </p>

        <div class="pp-hub-welcome-page__features">
            <h2 class="pp-hub-welcome-page__features-title">
                <?php esc_html_e('What you can do with PublishPress Hub', 'publishpress-hub'); ?>
            </h2>

            <div class="pp-hub-welcome-page__features-grid">
                <div class="pp-hub-welcome-page__feature">
                    <div class="pp-hub-welcome-page__feature-icon">📊</div>
                    <h3 class="pp-hub-welcome-page__feature-title">
                        <?php esc_html_e('Centralized Dashboard', 'publishpress-hub'); ?>
                    </h3>
                    <p class="pp-hub-welcome-page__feature-description">
                        <?php esc_html_e('View all your PublishPress plugins with their license information, versions, and status in one convenient place.', 'publishpress-hub'); ?>
                    </p>
                </div>

                <div class="pp-hub-welcome-page__feature">
                    <div class="pp-hub-welcome-page__feature-icon">⚡</div>
                    <h3 class="pp-hub-welcome-page__feature-title">
                        <?php esc_html_e('One-Click Installation', 'publishpress-hub'); ?>
                    </h3>
                    <p class="pp-hub-welcome-page__feature-description">
                        <?php esc_html_e('Install free PublishPress plugins directly from the Hub without visiting the WordPress.org repository.', 'publishpress-hub'); ?>
                    </p>
                </div>

                <div class="pp-hub-welcome-page__feature">
                    <div class="pp-hub-welcome-page__feature-icon">🔑</div>
                    <h3 class="pp-hub-welcome-page__feature-title">
                        <?php esc_html_e('License Management', 'publishpress-hub'); ?>
                    </h3>
                    <p class="pp-hub-welcome-page__feature-description">
                        <?php esc_html_e('Connect your PublishPress license to install and activate Pro versions seamlessly, all from one place.', 'publishpress-hub'); ?>
                    </p>
                </div>

                <div class="pp-hub-welcome-page__feature">
                    <div class="pp-hub-welcome-page__feature-icon">🔄</div>
                    <h3 class="pp-hub-welcome-page__feature-title">
                        <?php esc_html_e('Easy Updates', 'publishpress-hub'); ?>
                    </h3>
                    <p class="pp-hub-welcome-page__feature-description">
                        <?php esc_html_e('Keep all your PublishPress plugins up to date with real-time monitoring and one-click updates.', 'publishpress-hub'); ?>
                    </p>
                </div>

                <div class="pp-hub-welcome-page__feature">
                    <div class="pp-hub-welcome-page__feature-icon">✅</div>
                    <h3 class="pp-hub-welcome-page__feature-title">
                        <?php esc_html_e('Status Monitoring', 'publishpress-hub'); ?>
                    </h3>
                    <p class="pp-hub-welcome-page__feature-description">
                        <?php esc_html_e('Monitor plugin activation status, detect conflicts, and ensure compatibility across your publishing tools.', 'publishpress-hub'); ?>
                    </p>
                </div>

                <div class="pp-hub-welcome-page__feature">
                    <div class="pp-hub-welcome-page__feature-icon">🚀</div>
                    <h3 class="pp-hub-welcome-page__feature-title">
                        <?php esc_html_e('Get Started', 'publishpress-hub'); ?>
                    </h3>
                    <p class="pp-hub-welcome-page__feature-description">
                        <?php
                        printf(
                            /* translators: %s: Link to plugins dashboard */
                            esc_html__('Ready to explore? Visit the %s to see all available PublishPress plugins.', 'publishpress-hub'),
                            '<a href="' . esc_url(admin_url('admin.php?page=publishpress-hub-plugins-dashboard')) . '">' . esc_html__('Plugins Dashboard', 'publishpress-hub') . '</a>'
                        );
                        ?>
                    </p>
                </div>
            </div>
        </div>

        <p class="pp-hub-welcome-page__dismiss">
            <?php
            printf(
                /* translators: %s: Dismiss link */
                esc_html__('Already know what you\'re doing? Great! You can %s.', 'publishpress-hub'),
                '<a href="' . esc_url($context['dismiss_url']) . '">' . esc_html__('dismiss this page', 'publishpress-hub') . '</a>'
            );
            ?>
        </p>
    </div>
    </div>
</div>

<style>
.pp-hub-welcome-page {
    max-width: 800px;
    margin: 40px auto 0;
    padding: 0 20px;
}

.pp-hub-welcome-page__header {
    margin-bottom: 30px;
}

.pp-hub-welcome-page__title {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 20px;
    color: #1d2327;
}

.pp-hub-welcome-page__content {
    margin-top: 30px;
}

.pp-hub-welcome-page__message {
    font-size: 16px;
    line-height: 1.6;
    color: #50575e;
    margin: 0 0 30px;
}

.pp-hub-welcome-page__dismiss {
    font-size: 14px;
    line-height: 1.6;
    color: #646970;
    margin: 30px 0 0;
}

.pp-hub-welcome-page__dismiss a {
    color: #2271b1;
    text-decoration: none;
}

.pp-hub-welcome-page__dismiss a:hover {
    color: #135e96;
    text-decoration: underline;
}

.pp-hub-welcome-page__features {
    margin: 40px 0;
    padding: 30px 0;
    border-top: 1px solid #dcdcde;
}

.pp-hub-welcome-page__features-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 30px;
    color: #1d2327;
}

.pp-hub-welcome-page__features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 20px;
}

.pp-hub-welcome-page__feature {
    padding: 20px;
    background: #f6f7f7;
    border-radius: 8px;
    border: 1px solid #dcdcde;
}

.pp-hub-welcome-page__feature-icon {
    font-size: 32px;
    margin-bottom: 12px;
    line-height: 1;
}

.pp-hub-welcome-page__feature-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 10px;
    color: #1d2327;
}

.pp-hub-welcome-page__feature-description {
    font-size: 14px;
    line-height: 1.6;
    color: #50575e;
    margin: 0;
}

.pp-hub-welcome-page__feature-description a {
    color: #2271b1;
    text-decoration: none;
}

.pp-hub-welcome-page__feature-description a:hover {
    color: #135e96;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .pp-hub-welcome-page__features-grid {
        grid-template-columns: 1fr;
    }
}
</style>

