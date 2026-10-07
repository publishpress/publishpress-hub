<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu {
    function apply_filters($name, $value, ...$args)
    {
        return isset($GLOBALS['hub_navigation_filters'][$name])
            ? $GLOBALS['hub_navigation_filters'][$name]($value, ...$args) : $value;
    }

    function __($text, $domain)
    {
        return $text;
    }

    function current_user_can($capability)
    {
        return $capability === 'allowed';
    }

    function menu_page_url($slug, $echo)
    {
        return strpos($slug, '.php') === false ? 'https://example.test/wp-admin/admin.php?page=' . $slug : '';
    }

    function admin_url($path = '')
    {
        return 'https://example.test/wp-admin/' . $path;
    }

    function wp_strip_all_tags($text)
    {
        return strip_tags($text);
    }

    function esc_url_raw($url)
    {
        return $url;
    }
}

namespace Tests\Unit\Infrastructure\AdminMenu {
    use Codeception\Test\Unit;
    use PublishPress\Hub\Infrastructure\AdminMenu\PluginQuickLinks;

    class PluginQuickLinksTest extends Unit
    {
        protected function _after(): void
        {
            unset($GLOBALS['menu'], $GLOBALS['submenu'], $GLOBALS['hub_navigation_filters']);
        }

        public function testNewPluginMenusExposeAccessibleDashboardActions(): void
        {
            foreach (['cart' => 'ppcart', 'taxonomies' => 'st_dashboard', 'tag-groups' => 'tag-groups-settings'] as $family => $slug) {
                $GLOBALS['menu'] = [['Plugin', 'allowed', $slug]];
                $GLOBALS['submenu'] = [$slug => [
                    ['Dashboard', 'allowed', $slug],
                    ['Settings', 'allowed', $slug . '-settings'],
                    ['Restricted', 'denied', $slug . '-restricted'],
                ]];
                $links = (new PluginQuickLinks())->getLinks();
                $this->assertSame('Open Dashboard', $links[$family]['primary']['label']);
                $this->assertSame('https://example.test/wp-admin/admin.php?page=' . $slug, $links[$family]['primary']['url']);
                $this->assertCount(1, $links[$family]['secondary']);
                $this->assertSame('Settings', $links[$family]['secondary'][0]['label']);
            }
        }

        public function testOnlyAccessibleRegisteredInternalLinksAreReturned(): void
        {
            $GLOBALS['menu'] = [['Statuts', 'allowed', 'publishpress-statuses']];
            $GLOBALS['submenu'] = ['publishpress-statuses' => [
                ['<b>Statuses</b>', 'allowed', 'publishpress-statuses'],
                ['Settings', 'denied', 'publishpress-statuses-settings'],
                ['Buy Pro', 'allowed', 'https://example.test/buy'],
                ['Traversal', 'allowed', '../outside.php'],
                ['Duplicate', 'allowed', 'publishpress-statuses'],
            ]];
            $links = (new PluginQuickLinks())->getLinks();
            $this->assertSame([], $links['statuses']['secondary']);
            $this->assertSame('Open Statuses', $links['statuses']['primary']['label']);
            $this->assertSame('https://example.test/wp-admin/admin.php?page=publishpress-statuses', $links['statuses']['primary']['url']);
        }

        public function testInaccessibleAndUnrelatedParentsAreExcluded(): void
        {
            $GLOBALS['menu'] = [
                ['Statuses', 'denied', 'publishpress-statuses'],
                ['Unrelated', 'allowed', 'another-plugin'],
            ];
            $GLOBALS['submenu'] = [];
            $this->assertSame([], (new PluginQuickLinks())->getLinks());
        }

        public function testNativeWordPressMenuUrlsArePreserved(): void
        {
            $GLOBALS['menu'] = [['Authors', 'allowed', 'ppma-authors']];
            $GLOBALS['submenu'] = ['ppma-authors' => [
                ['Authors', 'allowed', 'edit-tags.php?taxonomy=author'],
            ]];
            $links = (new PluginQuickLinks())->getLinks();
            $this->assertSame('https://example.test/wp-admin/edit-tags.php?taxonomy=author', $links['authors']['primary']['url']);
        }

        public function testPluginCanCustomizeOrRemoveNavigation(): void
        {
            $GLOBALS['menu'] = [['Planner', 'allowed', 'pp-calendar']];
            $GLOBALS['submenu'] = ['pp-calendar' => [
                ['Calendar', 'allowed', 'pp-calendar'],
                ['Content Board', 'allowed', 'pp-content-board'],
            ]];
            $GLOBALS['hub_navigation_filters']['publishpress_hub_plugin_navigation_planner'] = static function ($links) {
                $links['primary']['label'] = 'Open Content Calendar';
                return $links;
            };
            $links = (new PluginQuickLinks())->getLinks()['planner'];
            $this->assertSame('Open Content Calendar', $links['primary']['label']);
            $this->assertSame('Content Board', $links['secondary'][0]['label']);
            $GLOBALS['hub_navigation_filters']['publishpress_hub_plugin_navigation_planner'] = static function ($links) {
                $links['primary'] = null;
                return $links;
            };
            $links = (new PluginQuickLinks())->getLinks()['planner'];
            $this->assertNull($links['primary']);
            $this->assertCount(1, $links['secondary']);
            $GLOBALS['hub_navigation_filters']['publishpress_hub_plugin_navigation_planner'] = static function () {
                return [];
            };
            $this->assertSame([], (new PluginQuickLinks())->getLinks());
        }

        public function testFilteredLinksStillRequireInternalUrlsAndCapabilities(): void
        {
            $GLOBALS['menu'] = [];
            $GLOBALS['hub_navigation_filters']['publishpress_hub_plugin_navigation_shortlinks'] = static function () {
                return ['primary' => ['label' => 'External', 'url' => 'https://other.test/'], 'secondary' => [
                    ['label' => 'Denied', 'url' => 'https://example.test/wp-admin/admin.php', 'capability' => 'denied'],
                    ['label' => 'Links', 'url' => 'https://example.test/wp-admin/edit.php?post_type=tinypress_link&amp;mode=list'],
                ]];
            };
            $links = (new PluginQuickLinks())->getLinks()['shortlinks'];
            $this->assertNull($links['primary']);
            $this->assertCount(1, $links['secondary']);
            $this->assertSame('https://example.test/wp-admin/edit.php?post_type=tinypress_link&mode=list', $links['secondary'][0]['url']);
        }
    }
}
