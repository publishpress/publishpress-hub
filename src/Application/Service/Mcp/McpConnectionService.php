<?php

/**
 * Configure the optional PublishPress MCP connection.
 *
 * @package PublishPress\Hub\Application\Service\Mcp
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Mcp;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

\defined('ABSPATH') || exit;

class McpConnectionService implements BootableInterface
{
    use BootableTrait;

    public const ENABLED_OPTION = 'publishpress_hub_mcp_enabled';

    public const CATEGORY = 'publishpress';

    public const READ_ENABLED_OPTION = 'publishpress_hub_mcp_reads_enabled';

    public const WRITE_ENABLED_OPTION = 'publishpress_hub_mcp_writes_enabled';

    public const DISABLED_ABILITIES_OPTION = 'publishpress_hub_mcp_disabled_abilities';

    private WPOptionsAdapterInterface $optionsAdapter;

    /**
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @since 1.2.0
     */
    public function __construct(WPOptionsAdapterInterface $optionsAdapter)
    {
        $this->optionsAdapter = $optionsAdapter;
    }

    /**
     * Register the adapter initialization callback.
     *
     * @return void
     * @since 1.2.0
     */
    protected function onLoad(): void
    {
        add_action(AbstractHooks::ACTION_MCP_ADAPTER_INIT, [$this, 'registerServer']);
    }

    /**
     * Initialize the service.
     *
     * @return void
     * @since 1.2.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Check the WordPress and adapter requirements.
     *
     * @return bool
     * @since 1.2.0
     */
    public function isAvailable(): bool
    {
        global $wp_version;

        return function_exists('wp_get_abilities')
            && version_compare((string) $wp_version, '6.9', '>=')
            && defined('WP_MCP_VERSION')
            && version_compare((string) constant('WP_MCP_VERSION'), '0.7.1', '>=')
            && class_exists('WP\MCP\Core\McpAdapter');
    }

    /**
     * Check whether the connection is enabled.
     *
     * @return bool
     * @since 1.2.0
     */
    public function isEnabled(): bool
    {
        return (bool) $this->optionsAdapter->getOption(self::ENABLED_OPTION, false);
    }

    /**
     * Check whether read actions may be exposed.
     *
     * @return bool
     * @since 1.2.0
     */
    public function areReadsEnabled(): bool
    {
        return (bool) $this->optionsAdapter->getOption(self::READ_ENABLED_OPTION, true);
    }

    /**
     * Check whether write actions may be exposed.
     *
     * @return bool
     * @since 1.2.0
     */
    public function areWritesEnabled(): bool
    {
        return (bool) $this->optionsAdapter->getOption(self::WRITE_ENABLED_OPTION, false);
    }

    /**
     * Retrieve individually disabled actions.
     *
     * @return string[]
     * @since 1.2.0
     */
    public function getDisabledActions(): array
    {
        return (array) $this->optionsAdapter->getOption(self::DISABLED_ABILITIES_OPTION, []);
    }

    /**
     * Identify this site's connection in external MCP clients.
     *
     * @return string
     * @since 1.2.0
     */
    public function getClientIdentifier(): string
    {
        $endpoint = untrailingslashit(rest_url('mcp/publishpress'));
        $host = (string) wp_parse_url($endpoint, PHP_URL_HOST);
        $label = substr(sanitize_key(str_replace('.', '-', $host)), 0, 32);

        return 'publishpress-' . ($label ?: 'site') . '-' . substr(hash('sha256', $endpoint), 0, 12);
    }

    /**
     * The adapter invokes this after WordPress has established the request user.
     *
     * @return bool
     * @since 1.2.0
     */
    public function canConnect(): bool
    {
        return $this->isEnabled() && HubAccessService::canManageMcp();
    }

    /**
     * Preserve exposure choices for temporarily inactive plugins.
     *
     * @param string[] $enabledActions Selected action names.
     * @param string[]|null $displayedActions Limit changes to these actions, or null for the full catalog.
     * @param bool|null $readsEnabled Read exposure, or null to preserve the current choice.
     * @return void
     * @since 1.2.0
     */
    public function saveExposureSettings(
        bool $enabled,
        bool $writesEnabled,
        array $enabledActions,
        ?array $displayedActions = null,
        ?bool $readsEnabled = null
    ): void {
        $registered = array_column($this->getActionCatalog(), 'name');
        $disabled = $this->getDisabledActions();
        if ($displayedActions !== null) {
            $scope = array_intersect($registered, $displayedActions);
            $enabledActions = array_merge(
                array_diff($registered, $disabled, $scope),
                array_intersect($scope, $enabledActions)
            );
        }
        $disabled = array_merge(array_diff($disabled, $registered), array_diff($registered, $enabledActions));
        $this->optionsAdapter->updateOption(self::ENABLED_OPTION, $enabled);
        $this->optionsAdapter->updateOption(self::WRITE_ENABLED_OPTION, $writesEnabled);
        if ($readsEnabled !== null) {
            $this->optionsAdapter->updateOption(self::READ_ENABLED_OPTION, (int) $readsEnabled);
        }
        $this->optionsAdapter->updateOption(self::DISABLED_ABILITIES_OPTION, array_values(array_unique($disabled)));
    }

    /**
     * Show a site-specific label that is safe for client-generated file paths.
     *
     * @return string
     * @since 1.2.0
     */
    public function getClientDisplayName(): string
    {
        return 'PublishPress - ' . substr($this->getClientIdentifier(), strlen('publishpress-'));
    }

    /**
     * Identify the target site and explain how to handle ambiguous requests.
     *
     * @return string
     * @since 1.2.0
     */
    public function getClientDescription(): string
    {
        return sprintf(
            // translators: %s: full WordPress site address.
            __('PublishPress actions for %s. These tools apply only to this site. If several sites are connected and the requested site is unclear, ask which site to use before calling a tool. Confirm the target site before changing site data.', 'publishpress-hub'),
            untrailingslashit(home_url())
        );
    }

    /**
     * Abilities remain owned and executed by their registering plugins.
     *
     * @param \WP\MCP\Core\McpAdapter $adapter Adapter registry.
     * @return void
     * @since 1.2.0
     */
    public function registerServer($adapter): void
    {
        if (!$this->isEnabled() || !$this->isAvailable() || !wp_is_using_https()) {
            return;
        }

        $result = $adapter->create_server(
            'publishpress',
            'mcp',
            'publishpress',
            $this->getClientDisplayName(),
            $this->getClientDescription(),
            '1.0.0',
            [\WP\MCP\Transport\HttpTransport::class],
            null,
            null,
            $this->getAbilityNames(),
            [],
            [],
            [$this, 'canConnect']
        );

        if (is_wp_error($result)) {
            do_action(AbstractHooks::ACTION_MCP_REGISTRATION_ERROR, $result);
        }
    }

    /**
     * Apply the same exposure choices to WordPress and plugin abilities.
     *
     * @return string[]
     * @since 1.2.0
     */
    public function getAbilityNames(): array
    {
        $disabled = $this->getDisabledActions();
        $writesEnabled = $this->areWritesEnabled();
        $readsEnabled = $this->areReadsEnabled();
        $names = [];

        foreach ($this->getActionCatalog() as $action) {
            if (
                in_array($action['name'], $disabled, true)
                || (!$writesEnabled && !$action['readonly'])
                || (!$readsEnabled && $action['readonly'])
            ) {
                continue;
            }
            $names[] = $action['name'];
        }

        sort($names);

        return $names;
    }

    /**
     * Return registration metadata without evaluating user permissions prematurely.
     *
     * @return array<int, array<string, mixed>>
     * @since 1.2.0
     */
    public function getActionCatalog(): array
    {
        if (!function_exists('wp_get_abilities')) {
            return [];
        }
        $actions = [];

        foreach (wp_get_abilities() as $ability) {
            if (self::CATEGORY !== $ability->get_category()) {
                continue;
            }
            $meta = $ability->get_meta();
            $actions[] = [
                'name' => $ability->get_name(),
                'plugin' => explode('/', $ability->get_name(), 2)[0],
                'pluginLabel' => isset($meta['publishpress']['plugin_name']) && is_string($meta['publishpress']['plugin_name'])
                    ? $meta['publishpress']['plugin_name'] : ucwords(str_replace(
                        ['publishpress-', '-'],
                        ['', ' '],
                        explode('/', $ability->get_name(), 2)[0]
                    )),
                'label' => $ability->get_label(),
                'description' => $ability->get_description(),
                'readonly' => ($meta['annotations']['readonly'] ?? false) === true,
                'destructive' => ($meta['annotations']['destructive'] ?? true) === true,
            ];
        }
        usort($actions, static fn(array $first, array $second): int => strcmp($first['name'], $second['name']));

        return $actions;
    }

    /**
     * Retrieve connection diagnostics for the admin page.
     *
     * @return array<string, string>
     * @since 1.2.0
     */
    public function getDiagnostics(): array
    {
        global $wp_version;

        return [
            __('WordPress version', 'publishpress-hub') => (string) $wp_version,
            __('MCP Adapter version', 'publishpress-hub') => defined('WP_MCP_VERSION')
                ? (string) constant('WP_MCP_VERSION') : __('Not active', 'publishpress-hub'),
            __('HTTPS', 'publishpress-hub') => wp_is_using_https()
                ? __('Available', 'publishpress-hub') : __('Required', 'publishpress-hub'),
            __('Application passwords', 'publishpress-hub') => function_exists('wp_is_application_passwords_available')
                && wp_is_application_passwords_available()
                ? __('Available', 'publishpress-hub') : __('Unavailable; check WordPress or security plugin settings', 'publishpress-hub'),
            __('Registered actions', 'publishpress-hub') => (string) count($this->getActionCatalog()),
            __('Selected actions exposed', 'publishpress-hub') => (string) count($this->getAbilityNames()),
        ];
    }
}
