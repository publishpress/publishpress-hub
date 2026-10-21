<?php

/**
 * AI connection setup and dependency installation links.
 *
 * @package PublishPress\Hub\Admin\Template\Mcp
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 *
 * @var array<string, mixed> $context {
 *     Template context data.
 *     @type array $catalog Registered action metadata.
 *     @type array $diagnostics Connection diagnostics.
 *     @type array $abilityNames Exposed action names.
 *     @type bool $connectionEnabled Whether the connection is enabled.
 *     @type bool $connectionAvailable Whether its dependencies are available.
 * }
 */

declare(strict_types=1);

defined('ABSPATH') || exit;

?>
<div id="mcp-page-header"></div>
<div class="wrap mcp-page">
    <div class="mcp-notices"></div>
    <?php // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display-only fixed status; no state changes. ?>
    <?php if (isset($_GET['mcp_status']) && 'install-failed' === $_GET['mcp_status']) : ?>
        <div class="notice notice-error"><p>
            <?php esc_html_e('MCP Adapter could not be installed or activated. Use your usual plugin installation process or contact your host.', 'publishpress-hub'); ?>
            <a href="https://wordpress.org/plugins/mcp-adapter/" target="_blank" rel="noopener noreferrer">
                <?php esc_html_e('MCP Adapter plugin page', 'publishpress-hub'); ?>
            </a>
        </p></div>
    <?php endif; ?>

    <?php // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display-only save confirmation; no state changes. ?>
    <?php if (isset($_GET['updated']) && in_array($_GET['updated'], ['1', 'refresh'], true)) : ?>
        <div class="notice notice-success"><p>
            <?php // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display-only save confirmation. ?>
            <?php if ($_GET['updated'] === 'refresh') : ?>
                <?php esc_html_e('Changes saved. Restart your AI app or refresh its PublishPress connection to update the available actions.', 'publishpress-hub'); ?>
            <?php else : ?>
                <?php esc_html_e('Changes saved.', 'publishpress-hub'); ?>
            <?php endif; ?>
        </p></div>
    <?php endif; ?>
    <section class="mcp-panel mcp-welcome" aria-labelledby="mcp-overview-heading">
        <div class="mcp-welcome-copy">
            <span class="mcp-eyebrow"><?php esc_html_e('AI Connections', 'publishpress-hub'); ?></span>
            <h1 id="mcp-overview-heading"><?php esc_html_e('Allow PublishPress to connect with your favorite AI', 'publishpress-hub'); ?></h1>
            <p><?php esc_html_e('Use your AI app to work with PublishPress on this site. You choose which actions it can use.', 'publishpress-hub'); ?></p>
            <form id="mcp-connection-settings" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="publishpress_hub_mcp_save">
                <input type="hidden" name="return_url" value="<?php echo esc_url($context['actionView']['url']); ?>">
                <input type="hidden" name="mcp_setup_complete" value="<?php echo $context['setupComplete'] ? '1' : '0'; ?>">
                <?php wp_nonce_field('publishpress_hub_mcp_save'); ?>
                <label class="mcp-main-toggle">
                    <input type="checkbox" name="mcp_enabled" value="1" role="switch" <?php checked($context['connectionEnabled']); ?>>
                    <span class="mcp-toggle-track" aria-hidden="true"></span>
                    <strong><?php esc_html_e('Enable AI connections', 'publishpress-hub'); ?></strong>
                </label>
                <noscript><?php submit_button(__('Save Changes', 'publishpress-hub')); ?></noscript>
            </form>
        </div>
        <div class="mcp-welcome-art" aria-hidden="true">
            <img src="<?php echo esc_url($context['welcomeImageUrl']); ?>" alt="">
        </div>
    </section>
    <div class="mcp-panel mcp-step-loading" role="status" aria-live="polite" hidden>
        <span class="screen-reader-text"><?php esc_html_e('Loading the next step...', 'publishpress-hub'); ?></span>
        <div class="mcp-skeleton mcp-skeleton-heading" aria-hidden="true"></div>
        <div class="mcp-skeleton" aria-hidden="true"></div>
        <div class="mcp-skeleton mcp-skeleton-short" aria-hidden="true"></div>
        <div class="mcp-skeleton-choices" aria-hidden="true"><span></span><span></span><span></span></div>
    </div>
    <div class="mcp-journey" data-mcp-stage="<?php echo esc_attr($context['setupStage']); ?>">
        <section class="mcp-panel mcp-next-step" <?php echo $context['setupStage'] !== 'prerequisite' ? 'hidden' : ''; ?>>
            <?php if ($context['nextStep']) : ?>
                <h2><?php echo esc_html($context['nextStep']['key'] === 'adapter' ? __('Install or update MCP Adapter', 'publishpress-hub') : $context['nextStep']['label']); ?></h2>
                <p><?php echo esc_html($context['nextStep']['description']); ?></p>
                <?php if ($context['nextStep']['key'] === 'adapter') : ?>
                    <?php if (!$context['adapterInstalled'] && current_user_can('install_plugins') && current_user_can('activate_plugins') && wp_is_file_mod_allowed('plugins')) : ?>
                        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                            <input type="hidden" name="action" value="publishpress_hub_mcp_install">
                            <?php wp_nonce_field('publishpress_hub_mcp_install'); ?>
                            <?php submit_button(__('Install and activate MCP Adapter', 'publishpress-hub'), 'primary'); ?>
                        </form>
                    <?php elseif ($context['adapterInstalled'] && !$context['adapterActive'] && current_user_can('activate_plugins')) : ?>
                        <a class="button" href="<?php echo esc_url(wp_nonce_url(self_admin_url('plugins.php?action=activate&plugin=' . rawurlencode($context['adapterFile'])), 'activate-plugin_' . $context['adapterFile'])); ?>">
                            <?php esc_html_e('Activate MCP Adapter', 'publishpress-hub'); ?>
                        </a>
                    <?php endif; ?>
                    <p><a href="https://wordpress.org/plugins/mcp-adapter/" target="_blank" rel="noopener noreferrer">
                        <?php esc_html_e('MCP Adapter plugin page', 'publishpress-hub'); ?>
                    </a></p>
                <?php else : ?>
                    <p><a class="button button-primary" href="<?php echo esc_url($context['nextStep']['url']); ?>"><?php echo esc_html($context['nextStep']['action']); ?></a></p>
                <?php endif; ?>
                <p><a href="<?php echo esc_url(admin_url('admin.php?page=publishpress-hub-mcp')); ?>"><?php esc_html_e('Check again', 'publishpress-hub'); ?></a></p>
            <?php endif; ?>
        </section>
        <section class="mcp-panel mcp-connect-step" aria-labelledby="mcp-client-setup" <?php echo $context['setupStage'] !== 'connect' ? 'hidden' : ''; ?>>
    <div class="mcp-section-heading">
    <h2 id="mcp-client-setup"><?php esc_html_e('Connect your AI app', 'publishpress-hub'); ?></h2>
    <p><a href="https://publishpress.com/knowledge-base/hub-mcp/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('View the PublishPress AI connection guide', 'publishpress-hub'); ?></a></p>
    </div>
    <fieldset class="mcp-client-picker">
        <legend><strong><?php esc_html_e('How would you like to connect?', 'publishpress-hub'); ?></strong></legend>
        <div class="mcp-client-choices">
            <?php foreach ($context['clientSetups'] as $key => $client) : ?>
                <label class="mcp-client-choice">
                    <input type="radio" name="mcp_client" form="mcp-connection-settings" value="<?php echo esc_attr($key); ?>" aria-controls="<?php echo esc_attr('mcp-client-' . $key); ?>" <?php checked($key, $context['selectedClient']); ?>>
                    <span><strong><?php echo esc_html($client['label']); ?></strong><span><?php echo esc_html($client['description']); ?></span></span>
                </label>
            <?php endforeach; ?>
        </div>
    </fieldset>
    <noscript><p><?php esc_html_e('Enable JavaScript to switch setup guides. The desktop bridge configuration below can also be adapted for other local MCP clients.', 'publishpress-hub'); ?></p></noscript>
    <?php foreach ($context['clientSetups'] as $key => $client) : ?>
        <section id="<?php echo esc_attr('mcp-client-' . $key); ?>" class="mcp-client-panel" data-mcp-client-panel="<?php echo esc_attr($key); ?>" <?php echo $key !== $context['selectedClient'] ? 'hidden' : ''; ?>>
            <h3><?php echo esc_html($client['label']); ?></h3>
            <?php if ($key === 'assistant') : ?>
                <div class="mcp-instruction-box">
                    <ol>
                        <li><a href="<?php echo esc_url(admin_url('profile.php#application-passwords-section')); ?>"><?php esc_html_e('Create an application password', 'publishpress-hub'); ?></a>. <?php esc_html_e('Name it PublishPress AI and copy the password.', 'publishpress-hub'); ?></li>
                        <li><?php esc_html_e('Copy the prompt below and paste it into your AI agent.', 'publishpress-hub'); ?></li>
                    </ol>
                    <p class="description"><?php esc_html_e('Enter the password in your app or configuration file, not in the chat.', 'publishpress-hub'); ?></p>
                </div>
            <?php endif; ?>
            <?php if ($key === 'desktop') : ?>
                <div class="mcp-instruction-box">
                    <p><a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Get Claude Desktop if it is not installed.', 'publishpress-hub'); ?></a></p>
                    <ol>
                        <li>
                            <p><?php esc_html_e('Download the installer for this site.', 'publishpress-hub'); ?></p>
                            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" class="mcp-installer-form">
                                <input type="hidden" name="action" value="publishpress_hub_mcp_installer">
                                <?php wp_nonce_field('publishpress_hub_mcp_installer'); ?>
                                <button type="submit" class="button button-secondary" <?php disabled(!$context['installerAvailable']); ?>><?php esc_html_e('Download installer', 'publishpress-hub'); ?></button>
                                <?php if (!$context['installerAvailable']) : ?>
                                    <p class="description"><?php esc_html_e('The installer requires an enabled connection, application passwords and the PHP ZIP extension. Choose another setup option if it is unavailable.', 'publishpress-hub'); ?></p>
                                <?php endif; ?>
                            </form>
                        </li>
                        <li><?php esc_html_e('In Claude Desktop, go to Settings > Extensions > Advanced settings > Install Extension. Select the downloaded .mcpb file and confirm installation.', 'publishpress-hub'); ?></li>
                        <li><?php esc_html_e('Turn on the PublishPress extension. If it says Disabled, click its toggle to enable it.', 'publishpress-hub'); ?></li>
                        <li><?php esc_html_e('Start a new chat and ask: "List the available PublishPress actions."', 'publishpress-hub'); ?></li>
                    </ol>
                </div>
                <div class="mcp-instruction-box mcp-password-note"><p><?php esc_html_e('Each download creates a new application password for your account and includes it in the installer file.', 'publishpress-hub'); ?></p>
                <p><?php esc_html_e('Delete the downloaded file after setup because it contains an application password. You can revoke access in your WordPress profile by removing its PublishPress - Claude Desktop application password.', 'publishpress-hub'); ?></p></div>
            <?php endif; ?>
            <?php if ($key !== 'desktop') : ?>
                <div class="mcp-instruction-box mcp-configuration">
                <?php if ($key === 'manual') : ?>
                    <ol>
                        <li><?php esc_html_e('Install Node.js LTS if it is not already available.', 'publishpress-hub'); ?> <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Download Node.js', 'publishpress-hub'); ?></a></li>
                        <li><a href="<?php echo esc_url(admin_url('profile.php#application-passwords-section')); ?>"><?php esc_html_e('Create an application password', 'publishpress-hub'); ?></a>. <?php esc_html_e('Name it PublishPress AI. Replace the password placeholder below in your local configuration with the new password.', 'publishpress-hub'); ?></li>
                        <li><?php esc_html_e('Merge this server into the MCP configuration for your app. Keep any existing servers. Restart your app and approve the connection.', 'publishpress-hub'); ?></li>
                    </ol>
                <?php else : ?>
                    <h4><?php esc_html_e('Your setup prompt', 'publishpress-hub'); ?></h4>
                <?php endif; ?>
                <label for="<?php echo esc_attr('mcp-config-' . $key); ?>" class="screen-reader-text"><?php echo esc_html($client['label']); ?></label>
                <textarea id="<?php echo esc_attr('mcp-config-' . $key); ?>" class="large-text code" rows="12" readonly spellcheck="false"><?php echo esc_textarea($client['content']); ?></textarea>
                <div class="mcp-artifact-actions">
                    <button type="button" class="button" data-mcp-copy="<?php echo esc_attr('mcp-config-' . $key); ?>"><?php echo $key === 'assistant' ? esc_html__('Copy setup prompt', 'publishpress-hub') : esc_html__('Copy configuration', 'publishpress-hub'); ?></button>
                    <button type="button" class="button" data-mcp-download="<?php echo esc_attr('mcp-config-' . $key); ?>" data-filename="<?php echo esc_attr($client['filename']); ?>"><?php echo $key === 'assistant' ? esc_html__('Download prompt', 'publishpress-hub') : esc_html__('Download configuration', 'publishpress-hub'); ?></button>
                </div>
                </div>
            <?php endif; ?>

        </section>
    <?php endforeach; ?>

    <div class="mcp-instruction-box mcp-connect-complete">
    <p><button type="button" class="button button-primary" data-mcp-finish-setup><?php esc_html_e('I have connected my AI app', 'publishpress-hub'); ?></button></p>
    <p class="description"><?php esc_html_e('Confirm after your AI app can list the available PublishPress actions. Hub cannot check the app connection for you.', 'publishpress-hub'); ?></p>
    </div>
        </section>
        <section class="mcp-panel mcp-access-step" <?php echo $context['setupStage'] !== 'access' ? 'hidden' : ''; ?>>
            <h2><?php esc_html_e('Choose actions for your AI', 'publishpress-hub'); ?></h2>
            <p><?php esc_html_e('Choose whether your AI can change site data and select the actions it can use. Save your choices, then connect your AI app.', 'publishpress-hub'); ?></p>
        </section>
        <section class="mcp-panel mcp-manage-summary" <?php echo $context['setupStage'] !== 'manage' ? 'hidden' : ''; ?>>
            <div class="mcp-section-heading">
            <h2><?php esc_html_e('Your AI connection is enabled', 'publishpress-hub'); ?></h2>
            <button type="button" class="button button-secondary" data-mcp-reconnect><?php esc_html_e('Connect another AI app', 'publishpress-hub'); ?></button>
            </div>
            <p><?php esc_html_e('Manage the actions your AI can use below. To set up another app or computer, open the connection steps again.', 'publishpress-hub'); ?></p>
        </section>
        <div class="mcp-manage-controls" <?php echo !in_array($context['setupStage'], ['manage', 'access'], true) ? 'hidden' : ''; ?>>
            <input type="hidden" form="mcp-connection-settings" name="mcp_review_actions" value="1" <?php disabled($context['setupStage'] !== 'access'); ?>>
            <section class="mcp-panel">
                <h2><?php esc_html_e('Control what your AI can do', 'publishpress-hub'); ?></h2>
                <p><label><input form="mcp-connection-settings" type="checkbox" name="mcp_writes_enabled" value="1" <?php checked($context['writesEnabled']); ?>> <?php esc_html_e('Allow actions that change site data', 'publishpress-hub'); ?></label></p>
                <p><?php esc_html_e('Read-only actions are available by default. Every action also checks the connected WordPress account permissions.', 'publishpress-hub'); ?></p>
    <div class="mcp-access-note">
        <p><?php esc_html_e('Turn off the connection to stop PublishPress access, or revoke its application password in your WordPress profile.', 'publishpress-hub'); ?>
            <a href="<?php echo esc_url(admin_url('profile.php#application-passwords-section')); ?>"><?php esc_html_e('Manage application passwords', 'publishpress-hub'); ?></a></p>
    </div>
            </section>
    <section class="mcp-panel mcp-actions" aria-labelledby="mcp-actions-heading">
        <h2 id="mcp-actions-heading"><?php esc_html_e('Plugin actions', 'publishpress-hub'); ?></h2>
        <p><?php esc_html_e('Choose actions for each plugin. Your selections are kept while you browse. Save changes to apply them.', 'publishpress-hub'); ?></p>
        <nav class="nav-tab-wrapper mcp-tabs" aria-label="<?php esc_attr_e('Plugin action settings', 'publishpress-hub'); ?>">
            <?php foreach ($context['actionView']['groups'] as $key => $group) : ?>
                <a class="nav-tab <?php echo $key === $context['actionView']['plugin'] ? 'nav-tab-active' : ''; ?>"
                    aria-current="<?php echo $key === $context['actionView']['plugin'] ? 'page' : 'false'; ?>"
                    href="<?php echo esc_url(add_query_arg(['page' => 'publishpress-hub-mcp', 'plugin' => $key], admin_url('admin.php'))); ?>">
                    <?php echo esc_html($group['label']); ?>
                    <span class="mcp-tab-count"><?php echo esc_html($group['selected'] . '/' . $group['total']); ?></span>
                </a>
            <?php endforeach; ?>
        </nav>
        <form method="get" action="<?php echo esc_url(admin_url('admin.php')); ?>" class="mcp-filters">
            <input type="hidden" name="page" value="publishpress-hub-mcp">
            <input type="hidden" name="plugin" value="<?php echo esc_attr($context['actionView']['plugin']); ?>">
            <label for="mcp-search" class="screen-reader-text"><?php esc_html_e('Search actions', 'publishpress-hub'); ?></label>
            <input id="mcp-search" type="search" name="search" placeholder="<?php esc_attr_e('Search actions', 'publishpress-hub'); ?>" value="<?php echo esc_attr($context['actionView']['search']); ?>">
            <label for="mcp-behavior" class="screen-reader-text"><?php esc_html_e('Filter by behavior', 'publishpress-hub'); ?></label>
            <select id="mcp-behavior" name="behavior">
                <option value=""><?php esc_html_e('All actions', 'publishpress-hub'); ?></option>
                <option value="read" <?php selected($context['actionView']['behavior'], 'read'); ?>><?php esc_html_e('Read only', 'publishpress-hub'); ?></option>
                <option value="write" <?php selected($context['actionView']['behavior'], 'write'); ?>><?php esc_html_e('Changes site data', 'publishpress-hub'); ?></option>
                <option value="destructive" <?php selected($context['actionView']['behavior'], 'destructive'); ?>><?php esc_html_e('Potentially destructive', 'publishpress-hub'); ?></option>
            </select>
            <button class="button" type="submit"><?php esc_html_e('Filter', 'publishpress-hub'); ?></button>
        </form>
        <table class="widefat striped mcp-action-table">
            <thead><tr><th scope="col"><?php esc_html_e('Selected', 'publishpress-hub'); ?></th><th scope="col"><?php esc_html_e('Action', 'publishpress-hub'); ?></th><th scope="col"><?php esc_html_e('Behavior', 'publishpress-hub'); ?></th></tr></thead>
            <tbody>
                <?php foreach ($context['actionView']['actions'] as $action) : ?>
                    <tr>
                        <td><input form="mcp-connection-settings" type="hidden" name="displayed_actions[]" value="<?php echo esc_attr($action['name']); ?>">
                            <input form="mcp-connection-settings" type="checkbox" name="enabled_actions[]" value="<?php echo esc_attr($action['name']); ?>" aria-label="<?php echo esc_attr($action['label']); ?>" <?php checked(!in_array($action['name'], $context['disabledActions'], true)); ?>></td>
                        <td><strong><?php echo esc_html($action['label']); ?></strong>
                            <details><summary><?php esc_html_e('Details', 'publishpress-hub'); ?></summary><p><?php echo esc_html($action['description']); ?></p><code><?php echo esc_html($action['name']); ?></code></details></td>
                        <td><span class="mcp-badge"><?php echo $action['readonly'] ? esc_html__('Read only', 'publishpress-hub') : esc_html__('Changes site data', 'publishpress-hub'); ?></span>
                            <?php if (!$action['readonly'] && $action['destructive']) : ?>
                                <p class="mcp-needed"><?php esc_html_e('Potentially destructive', 'publishpress-hub'); ?></p>
                            <?php endif; ?>
                            <?php if (!$action['readonly'] && !$context['writesEnabled']) : ?>
                                <p class="description"><?php esc_html_e('Write access is off', 'publishpress-hub'); ?></p>
                            <?php endif; ?></td>
                    </tr>
                <?php endforeach; ?>
                <?php if (!$context['actionView']['actions']) : ?>
                    <tr><td colspan="3"><?php esc_html_e('No actions match. Change the filters or activate a PublishPress plugin that provides actions.', 'publishpress-hub'); ?></td></tr>
                <?php endif; ?>
            </tbody>
        </table>
        <div class="mcp-pagination">
            <span><?php printf(
                // translators: 1: current page, 2: total pages, 3: number of matching actions.
                esc_html__('Page %1$d of %2$d - %3$d actions', 'publishpress-hub'),
                (int) $context['actionView']['page'],
                (int) $context['actionView']['pages'],
                (int) $context['actionView']['total']
            ); ?></span>
            <?php if ($context['actionView']['page'] > 1) : ?>
                <a class="button" href="<?php echo esc_url(add_query_arg('action_page', $context['actionView']['page'] - 1, $context['actionView']['url'])); ?>"><?php esc_html_e('Previous', 'publishpress-hub'); ?></a>
            <?php endif; ?>
            <?php if ($context['actionView']['page'] < $context['actionView']['pages']) : ?>
                <a class="button" href="<?php echo esc_url(add_query_arg('action_page', $context['actionView']['page'] + 1, $context['actionView']['url'])); ?>"><?php esc_html_e('Next', 'publishpress-hub'); ?></a>
            <?php endif; ?>
        </div>
    </section>
    <details class="mcp-panel mcp-diagnostics"><summary><?php esc_html_e('Connection diagnostics', 'publishpress-hub'); ?></summary>
        <table class="widefat striped">
            <tbody>
                <?php foreach ($context['diagnostics'] as $label => $value) : ?>
                    <tr><th scope="row"><?php echo esc_html($label); ?></th><td><?php echo esc_html($value); ?></td></tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </details>
        </div>
    </div>
    <div class="mcp-save-bar" <?php echo in_array($context['setupStage'], ['disabled', 'prerequisite'], true) ? 'hidden' : ''; ?>><span class="mcp-save-status" role="status" aria-live="polite"></span><button type="submit" class="button button-primary" form="mcp-connection-settings"><?php echo $context['setupStage'] === 'access' ? esc_html__('Save and continue', 'publishpress-hub') : esc_html__('Save Changes', 'publishpress-hub'); ?></button></div>
</div>
