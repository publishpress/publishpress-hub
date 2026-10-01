# Customer mockup improvements (#211)

The welcome page uses a two-column introduction, with the illustration beside
the dashboard button and styled documentation, support, and account links.
The existing feature cards remain below the introduction.

The plugin dashboard adds:

- A compact two-column card layout by default, with a list view switch.
  Cards have a top-right favorite and activation control, submenu shortcuts,
  and a persistent footer with documentation and plugin/license actions.
  Extra maintenance actions are available under More; updates stay visible.
- Default grouping into editorial process and additional publishing tools,
  with an option to disable grouping. Unknown families appear under Other plugins.
- Favorite stars and a favorites-only filter. Favorites, layout, and grouping
  are stored in the current browser, separately for each site and user. They
  are preferences, not plugin activation settings.
- Shortcuts from registered WordPress plugin menus, filtered by the current
  user's capabilities. These are collected when the page loads; reload after
  activating a plugin to load its newly registered menus.
- A shared-license form that checks each selected product through the existing
  license activation API. It reports individual results, continues after a
  failure, and does not install or activate plugins. Successful checks replace
  the selected product's saved key; constant-managed keys remain protected by
  the existing API. The entered key is cleared after the operation.

The shared-license form does not discover the contents of a subscription;
users select the products covered by their key. Real entitlement validation
remains the responsibility of the license server.

## Verification

Run the focused checks:

```text
node tests/JavaScript/customer-mockup.test.cjs
php vendor/bin/codecept run Unit --filter PluginQuickLinksTest --no-colors
```

On a WordPress testing site, check both layouts at desktop and mobile widths,
keyboard access to the stars and action buttons, grouping combined with the
existing status filters, and persistence after reloading. Confirm shortcuts
match the current user's sidebar menus. Test a shared key that covers multiple
products, a product it does not cover, and a constant-managed key. Successful
license activation against the real license server is not covered by the
mocked JavaScript checks.

## Plugin navigation filters

Both layouts use the same registered WordPress menus. The first accessible
submenu becomes the primary button (labelled `Open <menu label>`); the rest
become secondary links. Links are shown only for active, non-conflicting
plugins. External menu entries and inaccessible capabilities are excluded.
Menu registration happens on page load, so reload after activating a plugin.

Use `publishpress_hub_plugin_navigation_{family}` to customize either area.
Family identifiers include `planner`, `statuses`, `checklists`, `authors`,
`blocks`, `capabilities`, `permissions`, `revisions`, `future`, `series`, and
`shortlinks`. The primary label is the complete button text, with no automatic
prefix added after filtering.

```php
add_filter('publishpress_hub_plugin_navigation_planner', function ($navigation) {
    $navigation['primary'] = [
        'label' => __('Open Content Calendar', 'publishpress'),
        'url' => admin_url('admin.php?page=pp-calendar'),
        'capability' => 'pp_view_calendar', // Use the plugin's actual capability.
    ];
    // Set primary to null to remove only the main button.
    // Set secondary to [] to remove only the submenu links.
    // Return [] to remove all navigation for this plugin.
    return $navigation;
});
```

Filtered entries must have a nonempty label and an internal admin URL. Include
`capability` on custom links to apply the current user's capability check.
The `publishpress_hub_plugin_menu_prefixes` filter can extend menu-to-family
associations; it does not grant access to the corresponding pages.

The installed Laragon sources were checked for menu roots including Planner's
`pp-calendar`, Statuses' `publishpress-statuses`, Authors' `ppma-authors`,
Blocks' `advgb_main`, Revisions' `revisionary-q`, Permissions' `presspermit-*`,
Capabilities' `pp-capabilities-*`, Series' `orgseries_options_page`, Future's
`publishpress-future`, and Shortlinks' `edit.php?post_type=tinypress_link`.
Actual labels, ordering, and accessible destinations come from WordPress at
runtime, including changes made by plugins. No standalone Checklists folder
was present in the installed plugin directory during this inspection.
