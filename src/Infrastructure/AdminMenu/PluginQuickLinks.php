<?php

/**
 * Discover accessible plugin shortcuts from registered WordPress menus.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu;

defined('ABSPATH') || exit;

class PluginQuickLinks
{
    private const MENU_PREFIXES = [
        'planner' => ['pp-calendar', 'pp-content-overview', 'pp-content-board', 'pp-settings'],
        'checklists' => ['publishpress-checklists', 'pp-checklists'],
        'statuses' => ['publishpress-statuses'],
        'revisions' => ['revisionary', 'rvy-'],
        'future' => ['publishpress-future', 'post-expirator'],
        'permissions' => ['presspermit-'],
        'capabilities' => ['pp-capabilities', 'capsman'],
        'authors' => ['ppma-', 'publishpress-authors', 'edit-tags.php?taxonomy=author'],
        'blocks' => ['advgb_', 'advanced-gutenberg'],
        'series' => ['orgseries', 'edit-tags.php?taxonomy=series'],
        'shortlinks' => ['publishpress-shortlinks', 'pp-shortlinks', 'edit.php?post_type=tinypress_link'],
    ];

    /**
     * Return only registered links that the current user can access.
     *
     * @return array<string, array<string, mixed>>
     * @since 1.1.0
     */
    public function getLinks(): array
    {
        global $menu, $submenu;

        $prefixes = apply_filters('publishpress_hub_plugin_menu_prefixes', self::MENU_PREFIXES);
        $prefixes = is_array($prefixes) ? $prefixes : self::MENU_PREFIXES;
        $links = [];
        foreach ((array) $menu as $item) {
            $family = $this->getFamily((string) ($item[2] ?? ''), $prefixes);
            if ($family === '' || !current_user_can($item[1])) {
                continue;
            }

            $items = $submenu[$item[2]] ?? [$item];
            foreach ($items as $child) {
                $link = $this->getLink($child);
                if ($link !== []) {
                    $links[$family][$link['url']] = $links[$family][$link['url']] ?? $link;
                }
            }
        }

        $navigation = [];
        foreach (array_keys($prefixes) as $family) {
            $items = array_values($links[$family] ?? []);
            $primary = array_shift($items);
            if ($primary !== null) {
                // Translators: %s is the plugin's registered menu label.
                $primary['label'] = sprintf(__('Open %s', 'publishpress-hub'), $primary['label']);
            }

            $filtered = apply_filters(
                'publishpress_hub_plugin_navigation_' . $family,
                ['primary' => $primary, 'secondary' => $items],
                $family
            );
            $filtered = is_array($filtered) ? $filtered : [];
            $primary = $this->sanitizeLink($filtered['primary'] ?? null);
            $secondary = $this->sanitizeSecondaryLinks($filtered['secondary'] ?? [], $primary);
            if ($primary !== null || $secondary !== []) {
                $navigation[$family] = ['primary' => $primary, 'secondary' => $secondary];
            }
        }

        return $navigation;
    }

    /**
     * Match stable menu slugs independently of translated titles.
     *
     * @since 1.1.0
     */
    private function getFamily(string $slug, array $menuPrefixes): string
    {
        foreach ($menuPrefixes as $family => $prefixes) {
            foreach ((array) $prefixes as $prefix) {
                if (is_string($prefix) && $prefix !== '' && strpos($slug, $prefix) === 0) {
                    return $family;
                }
            }
        }

        return '';
    }

    /**
     * Build a shortcut without exposing external or inaccessible menu entries.
     *
     * @param array<int, mixed> $item The registered menu entry.
     * @return array<string, string>
     * @since 1.1.0
     */
    private function getLink(array $item): array
    {
        if (empty($item[2]) || !current_user_can($item[1])) {
            return [];
        }

        $slug = html_entity_decode((string) $item[2], ENT_QUOTES, 'UTF-8');
        if (preg_match('/[:\\\\]|^\/|\.\./', $slug)) {
            return [];
        }

        $url = menu_page_url($slug, false);
        if ($url === '' && preg_match('/^[a-z-]+\.php(?:\?|$)/', $slug)) {
            $url = admin_url($slug);
        }
        if ($url === '') {
            return [];
        }

        return [
            'label' => wp_strip_all_tags((string) $item[0]),
            'url' => esc_url_raw(html_entity_decode($url, ENT_QUOTES, 'UTF-8')),
            'capability' => (string) $item[1],
        ];
    }

    /**
     * Validate filtered links before exposing them to either dashboard layout.
     *
     * @param mixed $link The filtered navigation entry, or null to remove it.
     * @return array<string, string>|null
     * @since 1.1.0
     */
    private function sanitizeLink($link): ?array
    {
        if (!is_array($link) || !is_string($link['label'] ?? null) || !is_string($link['url'] ?? null)) {
            return null;
        }
        if (isset($link['capability']) && !current_user_can($link['capability'])) {
            return null;
        }

        $url = esc_url_raw(html_entity_decode($link['url'], ENT_QUOTES, 'UTF-8'));
        $label = trim(wp_strip_all_tags($link['label']));
        if ($label === '' || strpos($url, admin_url()) !== 0 || strpos(rawurldecode($url), '..') !== false) {
            return null;
        }

        return ['label' => $label, 'url' => $url];
    }

    /**
     * Remove invalid or duplicate submenu links, including the primary URL.
     *
     * @param mixed $items The filtered secondary links.
     * @param array<string, string>|null $primary The primary link.
     * @return array<int, array<string, string>>
     * @since 1.1.0
     */
    private function sanitizeSecondaryLinks($items, ?array $primary): array
    {
        $links = [];
        foreach (is_array($items) ? $items : [] as $item) {
            $link = $this->sanitizeLink($item);
            if ($link !== null && $link['url'] !== ($primary['url'] ?? null)) {
                $links[$link['url']] = $link;
            }
        }

        return array_values($links);
    }
}
