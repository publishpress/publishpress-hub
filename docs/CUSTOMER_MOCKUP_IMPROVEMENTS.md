# Customer mockup improvements (#211)

The welcome page uses a two-column introduction, with the illustration beside
the dashboard button and styled documentation, support, and account links.
The existing feature cards remain below the introduction.

The plugin dashboard adds:

- A compact two-column card layout by default, with a list view switch.
  Cards have a top-right favorite and activation control
  and a persistent footer with documentation and plugin/license actions.
  Extra maintenance actions are available under More; updates stay visible.
- Default grouping into editorial process and additional publishing tools,
  with an option to disable grouping. Unknown families appear under Other plugins.
- Favorite stars and a favorites-only filter. Favorites, layout, and grouping
  are stored in the current browser, separately for each site and user. They
  are preferences, not plugin activation settings.
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
```

On a WordPress testing site, check both layouts at desktop and mobile widths,
keyboard access to the stars and action buttons, grouping combined with the
existing status filters, and persistence after reloading. Test a shared key that covers multiple
products, a product it does not cover, and a constant-managed key. Successful
license activation against the real license server is not covered by the
mocked JavaScript checks.
