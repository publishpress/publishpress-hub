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
<div class="wrap mcp-page">
    <div class="mcp-notices"></div>
    <h1><?php esc_html_e('AI Connections', 'publishpress-hub'); ?></h1>
    <p class="mcp-intro"><?php esc_html_e('Connect your AI app once, then choose which PublishPress actions it can use.', 'publishpress-hub'); ?></p>
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
    <?php if (isset($_GET['updated']) && '1' === $_GET['updated']) : ?>
        <div class="notice notice-success"><p><?php esc_html_e('Connection settings saved. Reconnect your AI app to refresh its actions.', 'publishpress-hub'); ?></p></div>
    <?php endif; ?>
    <div class="mcp-overview-grid">
        <section class="mcp-panel" aria-labelledby="mcp-overview-heading">
            <h2 id="mcp-overview-heading"><?php esc_html_e('Your PublishPress connection', 'publishpress-hub'); ?></h2>
            <form id="mcp-connection-settings" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="publishpress_hub_mcp_save">
                <input type="hidden" name="return_url" value="<?php echo esc_url($context['actionView']['url']); ?>">
                <?php wp_nonce_field('publishpress_hub_mcp_save'); ?>
                <p><label><input type="checkbox" name="mcp_enabled" value="1" <?php checked($context['connectionEnabled']); ?>>
                    <?php esc_html_e('Enable the PublishPress MCP connection', 'publishpress-hub'); ?></label></p>
                <p><label><input type="checkbox" name="mcp_writes_enabled" value="1" <?php checked($context['writesEnabled']); ?>>
                    <?php esc_html_e('Allow actions that change site data', 'publishpress-hub'); ?></label></p>
                <p class="description"><?php esc_html_e('Read-only actions are exposed by default. Write actions also require this switch. Every action checks permissions for the connected user.', 'publishpress-hub'); ?></p>
            </form>
            <p class="mcp-exposure-count"><?php
                printf(
                    // translators: %d is the number of actions exposed through the connection settings.
                    esc_html__('%d actions selected for exposure', 'publishpress-hub'),
                    count($context['abilityNames'])
                );
                ?></p>
            <details class="mcp-checklist" open>
                <summary><?php esc_html_e('Connection setup checklist', 'publishpress-hub'); ?></summary>
                <ul>
                    <?php foreach ($context['setupSteps'] as $step) : ?>
                        <li>
                            <span class="dashicons <?php echo $step['complete'] === null ? 'dashicons-external' : ($step['complete'] ? 'dashicons-yes-alt mcp-ready' : 'dashicons-dismiss mcp-needed'); ?>" aria-hidden="true"></span>
                            <div><strong><?php echo esc_html($step['label']); ?></strong>
                                <span class="mcp-step-state"><?php echo $step['complete'] === null
                                    ? esc_html__('Complete in your AI app', 'publishpress-hub')
                                    : ($step['complete'] ? esc_html__('Ready', 'publishpress-hub') : esc_html__('Action needed', 'publishpress-hub')); ?></span>
                                <p><?php echo esc_html($step['description']); ?>
                                    <a href="<?php echo esc_url($step['url']); ?>"><?php echo esc_html($step['action']); ?></a></p>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </details>
    <?php if (!$context['connectionAvailable']) : ?>
        <h2 id="mcp-adapter-setup"><?php esc_html_e('Install or update MCP Adapter', 'publishpress-hub'); ?></h2>
        <p><?php esc_html_e('The connection requires the separate WordPress MCP Adapter plugin, version 0.7.1 or newer.', 'publishpress-hub'); ?></p>
        <?php if (!$context['adapterInstalled'] && current_user_can('install_plugins') && current_user_can('activate_plugins') && wp_is_file_mod_allowed('plugins')) : ?>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="publishpress_hub_mcp_install">
                <?php wp_nonce_field('publishpress_hub_mcp_install'); ?>
                <?php submit_button(__('Install and activate MCP Adapter', 'publishpress-hub'), 'secondary'); ?>
            </form>
        <?php elseif ($context['adapterInstalled'] && !$context['adapterActive'] && current_user_can('activate_plugins')) : ?>
            <a class="button" href="<?php echo esc_url(wp_nonce_url(self_admin_url('plugins.php?action=activate&plugin=' . rawurlencode($context['adapterFile'])), 'activate-plugin_' . $context['adapterFile'])); ?>">
                <?php esc_html_e('Activate MCP Adapter', 'publishpress-hub'); ?>
            </a>
        <?php endif; ?>
        <p><a href="https://wordpress.org/plugins/mcp-adapter/" target="_blank" rel="noopener noreferrer">
            <?php esc_html_e('MCP Adapter plugin page', 'publishpress-hub'); ?>
        </a></p>
    <?php endif; ?>
        </section>
        <section class="mcp-panel" aria-labelledby="mcp-client-setup">
    <h2 id="mcp-client-setup"><?php esc_html_e('Connect your AI app', 'publishpress-hub'); ?></h2>
    <p><a href="https://publishpress.com/knowledge-base/hub-mcp/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('View the PublishPress AI connection guide (opens in a new tab)', 'publishpress-hub'); ?></a></p>
    <p><?php esc_html_e('After the site setup steps are ready, add the PublishPress connection in your AI app. Use these connection details:', 'publishpress-hub'); ?></p>
    <label for="mcp-endpoint"><?php esc_html_e('Server URL', 'publishpress-hub'); ?></label>
    <div class="mcp-copy-field"><input id="mcp-endpoint" class="large-text code" readonly value="<?php echo esc_attr($context['connectionUrl']); ?>">
        <button type="button" class="button" data-mcp-copy="mcp-endpoint"><?php esc_html_e('Copy URL', 'publishpress-hub'); ?></button></div>
    <p><strong><?php esc_html_e('Username:', 'publishpress-hub'); ?></strong>
        <code><?php echo esc_html($context['username']); ?></code></p>
    <div class="mcp-access-note">
        <strong><?php esc_html_e('You control what your AI can do', 'publishpress-hub'); ?></strong>
        <p><?php esc_html_e('Your AI connects using the WordPress account that created the application password. It can only use actions allowed for that account. To let it change site data, enable write access above.', 'publishpress-hub'); ?></p>
        <p><?php esc_html_e('Turn off the connection to stop PublishPress access, or revoke its application password in your WordPress profile.', 'publishpress-hub'); ?>
            <a href="<?php echo esc_url(admin_url('profile.php#application-passwords-section')); ?>"><?php esc_html_e('Manage application passwords', 'publishpress-hub'); ?></a></p>
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
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" class="mcp-installer-form">
                    <input type="hidden" name="action" value="publishpress_hub_mcp_installer">
                    <?php wp_nonce_field('publishpress_hub_mcp_installer'); ?>
                    <button type="submit" class="button button-primary" <?php disabled(!$context['installerAvailable']); ?>><?php esc_html_e('Download installer', 'publishpress-hub'); ?></button>
                    <?php if (!$context['installerAvailable']) : ?>
                        <p class="description"><?php esc_html_e('Save and enable the connection, complete the WordPress and adapter prerequisites, and allow application passwords for your account. The installer also requires the PHP ZIP extension on your host. Manual configuration is available below.', 'publishpress-hub'); ?></p>
                    <?php endif; ?>
                </form>
                <div class="mcp-instruction-box">
                <h4><?php esc_html_e('After you download', 'publishpress-hub'); ?></h4>
                <p><a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Get Claude Desktop if it is not installed.', 'publishpress-hub'); ?></a></p>
                <ol>
                    <li><?php esc_html_e('In Claude Desktop, go to Settings > Extensions > Advanced settings > Install Extension. Select the downloaded .mcpb file and confirm installation.', 'publishpress-hub'); ?></li>
                    <li><strong><?php esc_html_e('Turn on the PublishPress extension. If it says Disabled, click its toggle to enable it.', 'publishpress-hub'); ?></strong></li>
                    <li><?php esc_html_e('Start a new chat and ask: "List the available PublishPress actions."', 'publishpress-hub'); ?></li>
                </ol>
                </div>
                <div class="mcp-instruction-box mcp-password-note"><p><?php esc_html_e('Each download creates a new application password for your account and includes it in the installer file.', 'publishpress-hub'); ?></p>
                <p><?php esc_html_e('Delete the downloaded file after setup because it contains an application password. You can revoke access in your WordPress profile by removing its PublishPress - Claude Desktop application password.', 'publishpress-hub'); ?></p></div>
            <?php endif; ?>
            <details <?php echo $key === 'assistant' ? 'open' : ''; ?>>
                <summary>
                    <?php if ($key === 'assistant') : ?>
                        <?php esc_html_e('Your setup prompt', 'publishpress-hub'); ?>
                    <?php elseif ($key === 'desktop') : ?>
                        <?php esc_html_e('Alternative: configure manually without the installer', 'publishpress-hub'); ?>
                    <?php else : ?>
                        <?php echo esc_html(sprintf(
                            // translators: %s: selected AI app name.
                            __('%s configuration', 'publishpress-hub'),
                            $client['label']
                        )); ?>
                    <?php endif; ?>
                </summary>
            <?php if ($key === 'desktop') : ?>
                <ol>
                    <li><?php esc_html_e('Install Node.js LTS on the computer running your AI app.', 'publishpress-hub'); ?>
                        <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Download Node.js', 'publishpress-hub'); ?></a></li>
                    <li><a href="<?php echo esc_url(admin_url('profile.php#application-passwords-section')); ?>"><?php esc_html_e('Open your WordPress application passwords', 'publishpress-hub'); ?></a>. <?php esc_html_e('Name it PublishPress AI and click Add New Application Password. Copy the password when it appears, then paste it in place of the password placeholder in your configuration. Use this application password, not your WordPress login password.', 'publishpress-hub'); ?></li>
                    <li><?php esc_html_e('Merge the configuration into your existing MCP settings, then restart or reconnect your app and approve its tools.', 'publishpress-hub'); ?></li>
                </ol>
            <?php endif; ?>
                <label for="<?php echo esc_attr('mcp-config-' . $key); ?>" class="screen-reader-text"><?php echo esc_html($client['label']); ?></label>
                <textarea id="<?php echo esc_attr('mcp-config-' . $key); ?>" class="large-text code" rows="12" readonly spellcheck="false"><?php echo esc_textarea($client['content']); ?></textarea>
                <div class="mcp-artifact-actions">
                    <button type="button" class="button" data-mcp-copy="<?php echo esc_attr('mcp-config-' . $key); ?>"><?php echo $key === 'assistant' ? esc_html__('Copy setup prompt', 'publishpress-hub') : esc_html__('Copy configuration', 'publishpress-hub'); ?></button>
                    <button type="button" class="button" data-mcp-download="<?php echo esc_attr('mcp-config-' . $key); ?>" data-filename="<?php echo esc_attr($client['filename']); ?>"><?php echo $key === 'assistant' ? esc_html__('Download prompt', 'publishpress-hub') : esc_html__('Download configuration', 'publishpress-hub'); ?></button>
                </div>
            </details>

        </section>
    <?php endforeach; ?>

    <p class="description"><?php esc_html_e('Available actions depend on your active plugins and account permissions.', 'publishpress-hub'); ?></p>
        </section>
    </div>
    <section class="mcp-panel mcp-actions" aria-labelledby="mcp-actions-heading">
        <h2 id="mcp-actions-heading"><?php esc_html_e('Plugin actions', 'publishpress-hub'); ?></h2>
        <p><?php esc_html_e('Choose actions for each plugin. Your selections are kept while you browse. Save changes to apply them, then reconnect your AI app.', 'publishpress-hub'); ?></p>
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
    <div class="mcp-save-bar"><span class="mcp-save-status" role="status" aria-live="polite"></span><button type="submit" class="button button-primary" form="mcp-connection-settings"><?php esc_html_e('Save Changes', 'publishpress-hub'); ?></button></div>
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
