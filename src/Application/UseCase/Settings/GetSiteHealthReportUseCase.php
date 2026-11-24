<?php

/**
 * Use case for generating a site health report.
 *
 * @package PublishPress\Hub\Application\UseCase\Settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Settings;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Infrastructure\Debug\DebugLogService;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;
use WP_REST_Request;

\defined('ABSPATH') || exit;

class GetSiteHealthReportUseCase implements UseCaseInterface
{
    private const DEBUG_MODE_OPTION = 'publishpress_hub_debug_mode';

    private PluginStatusService $pluginStatusService;

    private DebugLogService $debugLogService;

    private WPOptionsAdapterInterface $optionsAdapter;

    private string $pluginVersion;

    /**
     * @param PluginStatusService $pluginStatusService
     * @param DebugLogService $debugLogService
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @param string $pluginVersion
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        DebugLogService $debugLogService,
        WPOptionsAdapterInterface $optionsAdapter,
        string $pluginVersion
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->debugLogService = $debugLogService;
        $this->optionsAdapter = $optionsAdapter;
        $this->pluginVersion = $pluginVersion;
    }

    /**
     * Returns a site health report.
     *
     * @param WP_REST_Request $request
     * @return array<string, mixed>
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $report = $this->buildReport();

        return [
            'report' => $report,
            'filename' => 'publishpress-hub-site-health-report-' . gmdate('Y-m-d-His') . '.txt',
        ];
    }

    /**
     * Builds the report body.
     *
     * @return string
     * @since 1.0.0
     */
    private function buildReport(): string
    {
        $sections = [
            'publishpress-hub' => $this->getHubDetails(),
        ];

        $sections = array_merge($sections, $this->getWordPressSiteHealthSections());

        $sections['publishpress-database-tables'] = [
            'label' => esc_html__('Database Tables', 'publishpress-hub'),
            'fields' => $this->getDatabaseTableFields(),
        ];

        $sections['publishpress-plugins'] = [
            'label' => esc_html__('PublishPress Plugins', 'publishpress-hub'),
            'fields' => $this->getPublishPressPluginFields(),
        ];

        if ($this->isDebugModeEnabled()) {
            $sections['publishpress-hub-debug-log'] = [
                'label' => esc_html__('PublishPress Hub Debug Log', 'publishpress-hub'),
                'fields' => [
                    'log' => [
                        'label' => esc_html__('Debug Log', 'publishpress-hub'),
                        'value' => $this->debugLogService->read() ?: esc_html__('The debug log is empty.', 'publishpress-hub'),
                    ],
                ],
            ];
        }

        return $this->formatSections($sections);
    }

    /**
     * Gets Hub-specific report details.
     *
     * @return array<string, mixed>
     * @since 1.0.0
     */
    private function getHubDetails(): array
    {
        return [
            'label' => esc_html__('PublishPress Hub', 'publishpress-hub'),
            'fields' => [
                'version' => [
                    'label' => esc_html__('Version', 'publishpress-hub'),
                    'value' => $this->pluginVersion,
                ],
                'debug_mode' => [
                    'label' => esc_html__('Debug Mode', 'publishpress-hub'),
                    'value' => $this->isDebugModeEnabled()
                        ? esc_html__('Enabled', 'publishpress-hub')
                        : esc_html__('Disabled', 'publishpress-hub'),
                ],
                'generated_at' => [
                    'label' => esc_html__('Generated At', 'publishpress-hub'),
                    'value' => current_time('mysql'),
                ],
            ],
        ];
    }

    /**
     * Gets WordPress core Site Health debug data.
     *
     * @return array<string, mixed>
     * @since 1.0.0
     */
    private function getWordPressSiteHealthSections(): array
    {
        if (!function_exists('get_core_updates')) {
            require_once ABSPATH . 'wp-admin/includes/update.php';
        }

        if (!function_exists('got_url_rewrite')) {
            require_once ABSPATH . 'wp-admin/includes/misc.php';
        }

        if (!class_exists('WP_Debug_Data')) {
            require_once ABSPATH . 'wp-admin/includes/class-wp-debug-data.php';
        }

        if (!class_exists('WP_Debug_Data')) {
            return [];
        }

        return \WP_Debug_Data::debug_data();
    }

    /**
     * Gets PublishPress plugin fields for the report.
     *
     * @return array<string, array<string, string>>
     * @since 1.0.0
     */
    private function getPublishPressPluginFields(): array
    {
        $families = $this->pluginStatusService->getAllPluginFamiliesWithUpdatedStatus();
        $fields = [];

        foreach ($families as $family) {
            foreach ($this->formatPluginFamily($family) as $key => $field) {
                $fields[$key] = $field;
            }
        }

        if (empty($fields)) {
            return [
                'none' => [
                    'label' => esc_html__('Plugins', 'publishpress-hub'),
                    'value' => esc_html__('No PublishPress plugins found.', 'publishpress-hub'),
                ],
            ];
        }

        return $fields;
    }

    /**
     * Gets database table fields for the report.
     *
     * @return array<string, array<string, string>>
     * @since 1.0.0
     */
    private function getDatabaseTableFields(): array
    {
        global $wpdb;

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        $tables = $wpdb->get_results('SHOW TABLE STATUS', ARRAY_A);

        if (empty($tables)) {
            return [
                'database_tables' => [
                    'label' => esc_html__('Tables', 'publishpress-hub'),
                    'value' => esc_html__('No database table information was available.', 'publishpress-hub'),
                ],
            ];
        }

        $fields = [];
        $totalSize = 0;

        foreach ($tables as $table) {
            $tableName = (string) ($table['Name'] ?? '');

            if ($tableName === '') {
                continue;
            }

            $dataLength = (int) ($table['Data_length'] ?? 0);
            $indexLength = (int) ($table['Index_length'] ?? 0);
            $tableSize = $dataLength + $indexLength;
            $totalSize += $tableSize;

            $fields[sanitize_key($tableName)] = [
                'label' => $tableName,
                'value' => sprintf(
                    '%s: %s, %s: %s, %s: %s, %s: %s, %s: %s',
                    esc_html__('Size', 'publishpress-hub'),
                    size_format($tableSize, 2),
                    esc_html__('Engine', 'publishpress-hub'),
                    (string) ($table['Engine'] ?? '-'),
                    esc_html__('Rows', 'publishpress-hub'),
                    (string) ($table['Rows'] ?? '-'),
                    esc_html__('Collation', 'publishpress-hub'),
                    (string) ($table['Collation'] ?? '-'),
                    esc_html__('Charset', 'publishpress-hub'),
                    $this->getCharsetFromCollation((string) ($table['Collation'] ?? ''))
                ),
            ];
        }

        $fields['database_total_size'] = [
            'label' => esc_html__('Total Database Size', 'publishpress-hub'),
            'value' => size_format($totalSize, 2),
        ];

        return $fields;
    }

    /**
     * Gets the charset from a collation value.
     *
     * @param string $collation
     * @return string
     * @since 1.0.0
     */
    private function getCharsetFromCollation(string $collation): string
    {
        if ($collation === '' || strpos($collation, '_') === false) {
            return '-';
        }

        return substr($collation, 0, strpos($collation, '_'));
    }

    /**
     * Formats a plugin family as report fields.
     *
     * @param PluginFamilyInterface $family
     * @return array<string, array<string, string>>
     * @since 1.0.0
     */
    private function formatPluginFamily(PluginFamilyInterface $family): array
    {
        return [
            $family->getSlug() . '_free' => [
                'label' => $family->getName() . ' Free',
                'value' => $this->formatPlugin($family->getFreePlugin(), false),
            ],
            $family->getSlug() . '_pro' => [
                'label' => $family->getName() . ' Pro',
                'value' => $this->formatPlugin($family->getProPlugin(), true),
            ],
        ];
    }

    /**
     * Formats plugin details for the report.
     *
     * @param PluginInterface $plugin
     * @param bool $includeLicense
     * @return string
     * @since 1.0.0
     */
    private function formatPlugin(PluginInterface $plugin, bool $includeLicense): string
    {
        if (!$plugin->isInstalled()) {
            return esc_html__('Not installed', 'publishpress-hub');
        }

        $details = sprintf(
            '%s, %s: %s',
            $plugin->isActive() ? esc_html__('Active', 'publishpress-hub') : esc_html__('Inactive', 'publishpress-hub'),
            esc_html__('Version', 'publishpress-hub'),
            $plugin->getVersion() ?: esc_html__('unknown', 'publishpress-hub')
        );

        if ($includeLicense) {
            $details .= sprintf(
                ', %s: %s',
                esc_html__('License', 'publishpress-hub'),
                $plugin->isLicensed() ? esc_html__('Active', 'publishpress-hub') : esc_html__('Inactive', 'publishpress-hub')
            );
        }

        return $details;
    }

    /**
     * Formats Site Health sections into readable plain text.
     *
     * @param array<string, mixed> $sections
     * @return string
     * @since 1.0.0
     */
    private function formatSections(array $sections): string
    {
        $report = [];

        foreach ($sections as $section) {
            $title = $section['label'] ?? '';
            $fields = $section['fields'] ?? [];

            if (empty($title) || empty($fields) || !is_array($fields)) {
                continue;
            }

            $report[] = '### ' . $title . ' ###';

            foreach ($fields as $field) {
                if (!is_array($field) || !array_key_exists('value', $field)) {
                    continue;
                }

                $label = (string) ($field['label'] ?? '');
                $value = $field['value'];

                $report[] = $label . ': ' . $this->formatValue($value);
            }

            $report[] = '';
        }

        return trim(implode(PHP_EOL, $report));
    }

    /**
     * Formats a report value.
     *
     * @param mixed $value
     * @return string
     * @since 1.0.0
     */
    private function formatValue($value): string
    {
        if (is_array($value)) {
            return wp_json_encode($value);
        }

        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        if ($value === null || $value === '') {
            return '-';
        }

        return wp_strip_all_tags((string) $value);
    }

    /**
     * Checks if debug mode is enabled.
     *
     * @return bool
     * @since 1.0.0
     */
    private function isDebugModeEnabled(): bool
    {
        return (bool) $this->optionsAdapter->getOption(self::DEBUG_MODE_OPTION, false);
    }
}
