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
 *     @type string $welcome_image_url The URL to the welcome image.
 * }
 */

declare(strict_types=1);

?>
<div class="wrap">
    <div class="pp-hub-welcome-page">
        <div class="pp-hub-welcome-page__header">
            <div class="pp-hub-welcome-page__header-content">
                <div class="pp-hub-welcome-page__header-text">
                    <h1 class="pp-hub-welcome-page__title">
                        <?php esc_html_e('Welcome to PublishPress Hub!', 'publishpress-hub'); ?>
                    </h1>
                </div>
                <div class="pp-hub-welcome-page__header-image">
                    <img src="<?php echo esc_url($context['welcome_image_url']); ?>" alt="<?php esc_attr_e('Welcome to PublishPress Hub', 'publishpress-hub'); ?>" />
                </div>
            </div>
        </div>

        <div class="pp-hub-welcome-page__tabs">
            <nav class="pp-hub-welcome-page__tabs-nav">
                <a href="#overview" class="pp-hub-welcome-page__tab-link active" data-tab="overview">
                    <?php esc_html_e('Overview', 'publishpress-hub'); ?>
                </a>
                <a href="#features" class="pp-hub-welcome-page__tab-link" data-tab="features">
                    <?php esc_html_e('Features', 'publishpress-hub'); ?>
                </a>
                <a href="#documentation" class="pp-hub-welcome-page__tab-link" data-tab="documentation">
                    <?php esc_html_e('Documentation', 'publishpress-hub'); ?>
                </a>
            </nav>

            <div class="pp-hub-welcome-page__tabs-content">
                <div id="overview" class="pp-hub-welcome-page__tab-panel active">
                    <div class="pp-hub-welcome-page__content">
                        <h2 class="pp-hub-welcome-page__subtitle">
                            <?php esc_html_e('Thank you for giving PublishPress Hub a try!', 'publishpress-hub'); ?>
                        </h2>
                        <p class="pp-hub-welcome-page__message">
                            <?php esc_html_e('Our plugins are designed to make managing your publishing workflow as simple as possible, and PublishPress Hub is the key to facilitate that.', 'publishpress-hub'); ?>
                        </p>
                        <p class="pp-hub-welcome-page__message">
                            <?php esc_html_e('Whether you\'re just getting started or looking to streamline your existing setup, you\'ll find everything you need to install, update, and manage your PublishPress plugins from one central location. We\'re here to help you build a publishing system that works perfectly for your team.', 'publishpress-hub'); ?>
                        </p>
                    </div>
                </div>

                <div id="features" class="pp-hub-welcome-page__tab-panel">
                    <div class="pp-hub-welcome-page__content">
                        <h2 class="pp-hub-welcome-page__tab-content-title">
                            <?php esc_html_e('What you can do with PublishPress Hub', 'publishpress-hub'); ?>
                        </h2>

                        <div class="pp-hub-welcome-page__tab-content-grid">
                                <div class="pp-hub-welcome-page__tab-content-item">
                                    <div class="pp-hub-welcome-page__tab-content-icon">📊</div>
                                    <h3 class="pp-hub-welcome-page__tab-content-item-title">
                                        <?php esc_html_e('Centralized Dashboard', 'publishpress-hub'); ?>
                                    </h3>
                                    <p class="pp-hub-welcome-page__tab-content-item-description">
                                        <?php esc_html_e('View all your PublishPress plugins with their license information, versions, and status in one convenient place.', 'publishpress-hub'); ?>
                                    </p>
                                </div>

                                <div class="pp-hub-welcome-page__tab-content-item">
                                    <div class="pp-hub-welcome-page__tab-content-icon">⚡</div>
                                    <h3 class="pp-hub-welcome-page__tab-content-item-title">
                                        <?php esc_html_e('One-Click Installation', 'publishpress-hub'); ?>
                                    </h3>
                                    <p class="pp-hub-welcome-page__tab-content-item-description">
                                        <?php esc_html_e('Install free PublishPress plugins directly from the Hub without visiting the WordPress.org repository.', 'publishpress-hub'); ?>
                                    </p>
                                </div>

                                <div class="pp-hub-welcome-page__tab-content-item">
                                    <div class="pp-hub-welcome-page__tab-content-icon">🔑</div>
                                    <h3 class="pp-hub-welcome-page__tab-content-item-title">
                                        <?php esc_html_e('License Management', 'publishpress-hub'); ?>
                                    </h3>
                                    <p class="pp-hub-welcome-page__tab-content-item-description">
                                        <?php esc_html_e('Connect your PublishPress license to install and activate Pro versions seamlessly, all from one place.', 'publishpress-hub'); ?>
                                    </p>
                                </div>

                                <div class="pp-hub-welcome-page__tab-content-item">
                                    <div class="pp-hub-welcome-page__tab-content-icon">🔄</div>
                                    <h3 class="pp-hub-welcome-page__tab-content-item-title">
                                        <?php esc_html_e('Easy Updates', 'publishpress-hub'); ?>
                                    </h3>
                                    <p class="pp-hub-welcome-page__tab-content-item-description">
                                        <?php esc_html_e('Keep all your PublishPress plugins up to date with real-time monitoring and one-click updates.', 'publishpress-hub'); ?>
                                    </p>
                                </div>

                                <div class="pp-hub-welcome-page__tab-content-item">
                                    <div class="pp-hub-welcome-page__tab-content-icon">✅</div>
                                    <h3 class="pp-hub-welcome-page__tab-content-item-title">
                                        <?php esc_html_e('Status Monitoring', 'publishpress-hub'); ?>
                                    </h3>
                                    <p class="pp-hub-welcome-page__tab-content-item-description">
                                        <?php esc_html_e('Monitor plugin activation status, detect conflicts, and ensure compatibility across your publishing tools.', 'publishpress-hub'); ?>
                                    </p>
                                </div>

                                <div class="pp-hub-welcome-page__tab-content-item">
                                    <div class="pp-hub-welcome-page__tab-content-icon">🚀</div>
                                    <h3 class="pp-hub-welcome-page__tab-content-item-title">
                                        <?php esc_html_e('Get Started', 'publishpress-hub'); ?>
                                    </h3>
                                    <p class="pp-hub-welcome-page__tab-content-item-description">
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
                    </div>
                </div>

                <div id="documentation" class="pp-hub-welcome-page__tab-panel">
                    <div class="pp-hub-welcome-page__content">
                        <h2 class="pp-hub-welcome-page__tab-content-title">
                            <?php esc_html_e('Documentation', 'publishpress-hub'); ?>
                        </h2>
                        <p class="pp-hub-welcome-page__message">
                            <?php esc_html_e('Documentation content will be added here.', 'publishpress-hub'); ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <footer class="pp-hub-welcome-page__footer">
            <div class="pp-hub-welcome-page__footer-rating">
                <a href="//wordpress.org/support/plugin/<?php echo esc_attr($context['plugin_slug']); ?>/reviews/#new-post" target="_blank" rel="noopener noreferrer">
                    <?php
                    printf(
                        /* translators: %1$s: Plugin name, %2$s: Star icons */
                        esc_html__('If you like %1$s, please leave us a %2$s rating. Thank you!', 'publishpress-hub'),
                        '<strong>' . esc_html($context['plugin_name']) . '</strong>',
                        '<span class="pp-hub-welcome-page__footer-stars">' . str_repeat('<span class="dashicons dashicons-star-filled"></span>', 5) . '</span>'
                    );
                    ?>
                </a>
            </div>
            <hr class="pp-hub-welcome-page__footer-separator" />
            <nav class="pp-hub-welcome-page__footer-nav">
                <ul>
                    <li>
                        <a href="<?php echo esc_url($context['plugin_about_url']); ?>" target="_blank" rel="noopener noreferrer" title="<?php echo esc_attr(sprintf(/* translators: %s: Plugin name */ __('About %s', 'publishpress-hub'), $context['plugin_name'])); ?>">
                            <?php esc_html_e('About', 'publishpress-hub'); ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url($context['plugin_documentation_url']); ?>" target="_blank" rel="noopener noreferrer" title="<?php echo esc_attr(sprintf(/* translators: %s: Plugin name */ __('Documentation for %s', 'publishpress-hub'), $context['plugin_name'])); ?>">
                            <?php esc_html_e('Documentation', 'publishpress-hub'); ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url($context['plugin_support_url']); ?>" target="_blank" rel="noopener noreferrer" title="<?php echo esc_attr(sprintf(/* translators: %s: Plugin name */ __('Contact the %s team', 'publishpress-hub'), $context['plugin_name'])); ?>">
                            <?php esc_html_e('Contact', 'publishpress-hub'); ?>
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="pp-hub-welcome-page__footer-logo">
                <a href="https://publishpress.com" target="_blank" rel="noopener noreferrer">
                    <img src="<?php echo esc_url($context['logo_url']); ?>" alt="PublishPress" />
                </a>
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
        </footer>
    </div>
</div>

<script>
(function() {
    const tabLinks = document.querySelectorAll('.pp-hub-welcome-page__tab-link');
    const tabPanels = document.querySelectorAll('.pp-hub-welcome-page__tab-panel');

    tabLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all links and panels
            tabLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            tabPanels.forEach(function(p) {
                p.classList.remove('active');
            });

            // Add active class to clicked link and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
})();
</script>

<style>
#wpbody-content {
    background: #ffffff;
}

.pp-hub-welcome-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
}

.pp-hub-welcome-page__header {
    padding: 40px 20px;
    margin: 0 0 0;
}

.pp-hub-welcome-page__header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.pp-hub-welcome-page__header-image {
    width: 100%;
    max-width: 600px;
    text-align: center;
}

.pp-hub-welcome-page__header-text {
    width: 100%;
    text-align: center;
}

.pp-hub-welcome-page__header-image img {
    width: 100%;
    height: auto;
    display: block;
}

.pp-hub-welcome-page__title {
    font-size: 48px !important;
    font-weight: 600 !important;
    line-height: 1.2 !important;
    margin: 0 !important;
    color: #1d2327 !important;
}

.pp-hub-welcome-page__tabs {
    background: #ffffff;
    margin: 0;
}

.pp-hub-welcome-page__tabs-nav {
    display: flex;
    gap: 0;
    border-bottom: 1px solid #dcdcde;
    padding: 0 20px;
    margin: 0;
    justify-content: center;
}

.pp-hub-welcome-page__tab-link {
    display: inline-block;
    padding: 15px 20px;
    text-decoration: none;
    color: #646970;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 3px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s ease;
}

.pp-hub-welcome-page__tab-link:hover {
    color: #2271b1;
}

.pp-hub-welcome-page__tab-link.active {
    color: #2271b1;
    border-bottom-color: #2271b1;
}

.pp-hub-welcome-page__tabs-content {
    position: relative;
}

.pp-hub-welcome-page__tab-panel {
    display: none;
}

.pp-hub-welcome-page__tab-panel.active {
    display: block;
}

.pp-hub-welcome-page__content {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

.pp-hub-welcome-page__subtitle {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 20px;
    color: #1d2327;
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
    text-align: center;
}

.pp-hub-welcome-page__dismiss a {
    color: #2271b1;
    text-decoration: none;
}

.pp-hub-welcome-page__dismiss a:hover {
    color: #135e96;
    text-decoration: underline;
}

.pp-hub-welcome-page__tab-content-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 30px;
    color: #1d2327;
}

.pp-hub-welcome-page__tab-content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 20px;
}

.pp-hub-welcome-page__tab-content-item {
    padding: 20px;
    background: #f6f7f7;
    border-radius: 8px;
    border: 1px solid #dcdcde;
}

.pp-hub-welcome-page__tab-content-icon {
    font-size: 32px;
    margin-bottom: 12px;
    line-height: 1;
}

.pp-hub-welcome-page__tab-content-item-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 10px;
    color: #1d2327;
}

.pp-hub-welcome-page__tab-content-item-description {
    font-size: 14px;
    line-height: 1.6;
    color: #50575e;
    margin: 0;
}

.pp-hub-welcome-page__tab-content-item-description a {
    color: #2271b1;
    text-decoration: none;
}

.pp-hub-welcome-page__tab-content-item-description a:hover {
    color: #135e96;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .pp-hub-welcome-page__header {
        padding: 30px 20px;
    }

    .pp-hub-welcome-page__header-content {
        gap: 20px;
    }

    .pp-hub-welcome-page__header-image {
        max-width: 100%;
    }

    .pp-hub-welcome-page__title {
        font-size: 32px !important;
    }

    .pp-hub-welcome-page__content {
        padding: 30px 20px;
    }

    .pp-hub-welcome-page__tab-content-grid {
        grid-template-columns: 1fr;
    }
}

.pp-hub-welcome-page__footer {
    background: #ffffff;
    padding: 40px 20px;
    text-align: center;
    margin-top: 40px;
    padding-top: 40px;
}

.pp-hub-welcome-page__footer-rating {
    margin-bottom: 20px;
}

.pp-hub-welcome-page__footer-rating a {
    color: #646970;
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
}

.pp-hub-welcome-page__footer-rating a:hover {
    color: #2271b1;
}

.pp-hub-welcome-page__footer-rating strong {
    color: #646970;
    font-weight: 600;
}

.pp-hub-welcome-page__footer-stars {
    color: #f0b849;
    margin: 0 4px;
}

.pp-hub-welcome-page__footer-stars .dashicons {
    width: 16px;
    height: 16px;
    font-size: 16px;
    line-height: 1;
}

.pp-hub-welcome-page__footer-separator {
    border: none;
    border-top: 1px solid #dcdcde;
    margin: 20px auto;
    max-width: 600px;
}

.pp-hub-welcome-page__footer-nav {
    margin: 20px 0;
}

.pp-hub-welcome-page__footer-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.pp-hub-welcome-page__footer-nav li {
    margin: 0;
    padding: 0;
}

.pp-hub-welcome-page__footer-nav a {
    color: #646970;
    text-decoration: none;
    font-size: 14px;
}

.pp-hub-welcome-page__footer-nav a:hover {
    color: #2271b1;
    text-decoration: underline;
}

.pp-hub-welcome-page__footer-logo {
    margin-top: 30px;
}

.pp-hub-welcome-page__footer-logo a {
    display: inline-block;
    text-decoration: none;
}

.pp-hub-welcome-page__footer-logo img {
    height: 40px;
    width: auto;
    display: block;
}

@media (max-width: 768px) {
    .pp-hub-welcome-page__footer-nav ul {
        flex-direction: column;
        gap: 10px;
    }
}
</style>

