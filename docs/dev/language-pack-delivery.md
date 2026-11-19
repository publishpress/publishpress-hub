# Language Pack Delivery

Plugins register `domain`, `repository` and their installed `version` using the `publishpress_hub_language_pack_domains` filter. Hub downloads only the site's non-English locale. Free and Pro domains are independent, even when Pro bundles Free.

Catalogs live in `wp-content/uploads/publishpress/language-packs/`. Each installed pack contains PO, MO, JSON and a PHP catalog generated locally from the MO file. Hub never installs PHP files supplied in a downloaded archive. Its `.release` marker records the installed plugin version.

Hub skips complete packs for the same version, repairs missing catalogs, and restores previous files if replacement fails. Deactivating Hub clears its scheduled check without removing catalogs. Plugin translation loaders retain responsibility for preferring these files while preserving Loco overrides.

## Staging

On a test consumer site, configure this filter in a local-only or staging-only plugin:

```php
add_filter('publishpress_hub_language_pack_download_url', static function ($url) {
    return str_replace('https://pkg.publishpress.com/', 'https://pkg-staging.publishpress.com/', $url);
});
```

The downloader accepts only HTTPS on the PublishPress production or staging Package Server hosts, without URL credentials or nonstandard ports. No production deployment is needed to test translations.

## Automated Checks

```bash
vendor/bin/codecept run Unit Application/LanguagePack
wp eval-file tests/Support/check-language-pack-sync.php --skip-plugins --skip-themes
```

Run the WordPress smoke fixture on a disposable local site. HTTP is mocked, catalogs are temporary, and the previous status option is restored. The fixture checks fresh installs, repeat checks, repair, version changes, missing and malformed packs, local PHP generation and ZIP cleanup. Also verify Cart's PHP/JavaScript screens, Loco overrides and Hub deactivation against staging before rollout.
