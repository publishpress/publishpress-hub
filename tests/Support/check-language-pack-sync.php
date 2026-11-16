<?php

// Run with wp eval-file tests/Support/check-language-pack-sync.php --skip-plugins --skip-themes.
if (PHP_SAPI !== 'cli' || ! defined('ABSPATH') || ! class_exists('WP_CLI')) {
    exit;
}

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . WPINC . '/pomo/mo.php';
require_once __DIR__ . '/../../src/Infrastructure/Autoloader/Autoloader.php';
PublishPress\Hub\Infrastructure\Autoloader\Autoloader::register('PublishPress\\Hub\\', __DIR__ . '/../../src/');

use PublishPress\Hub\Application\Service\LanguagePack\LanguagePackSyncService;

$directory = get_temp_dir() . 'hub-language-test-' . wp_generate_uuid4();
$previous = get_option(LanguagePackSyncService::STATUS_OPTION, null);
$locale = 'en_US';
$version = '1.2.0';
$mode = 'valid';
$requests = 0;
$archives = [];
$downloaded = [];
$check = static function ($condition, $message) {
    if (! $condition) {
        throw new RuntimeException($message);
    }
    WP_CLI::log('PASS: ' . $message);
};
$uploads = static function ($paths) use ($directory) {
    $paths['basedir'] = $directory;
    $paths['error'] = false;
    return $paths;
};
$localeFilter = static function () use (&$locale) { return $locale; };
$domains = static function () use (&$version) {
    return [['domain' => 'hub-fixture', 'repository' => 'hub-fixture', 'version' => $version]];
};
$urlFilter = static function ($url) { return str_replace('pkg.publishpress.com', 'pkg-staging.publishpress.com', $url); };
$http = static function ($response, $args, $url) use (&$requests, &$mode, &$archives, &$downloaded, &$version) {
    if (strpos($url, 'https://pkg-staging.publishpress.com/v1/translations/hub-fixture/') !== 0) {
        return $response;
    }
    $requests++;
    if ($mode === 'unavailable') {
        return new WP_Error('fixture_missing', 'Pack unavailable');
    }
    if (strpos($url, '/' . $version . '/') === false) {
        throw new RuntimeException('Download did not use the installed version');
    }
    $downloaded[] = $args['filename'];
    copy($archives[$mode], $args['filename']);
    return ['headers' => [], 'body' => '', 'response' => ['code' => 200, 'message' => 'OK'], 'cookies' => []];
};

try {
    wp_mkdir_p($directory);
    foreach (['valid', 'missing-po', 'invalid-mo', 'invalid-json'] as $kind) {
        $mo = new MO();
        $mo->set_headers(['Language' => 'pt_BR', 'Plural-Forms' => 'nplurals=2; plural=(n != 1);']);
        $mo->add_entry(new Translation_Entry(['singular' => 'Buy now', 'translations' => ['Comprar agora']]));
        $archives[$kind] = $directory . '/' . $kind . '.zip';
        $zip = new ZipArchive();
        $zip->open($archives[$kind], ZipArchive::CREATE);
        if ($kind !== 'missing-po') {
            $zip->addFromString('hub-fixture-pt_BR.po', 'msgid "Buy now"' . "\n" . 'msgstr "Comprar agora"');
        }
        $zip->addFromString('hub-fixture-pt_BR.mo', $kind === 'invalid-mo' ? 'not an MO file' : $mo->export());
        $zip->addFromString('hub-fixture-pt_BR.json', $kind === 'invalid-json' ? 'not JSON' : '{"locale_data":{"messages":{}}}');
        $zip->addFromString('hub-fixture-pt_BR.l10n.php', '<?php throw new RuntimeException("REMOTE PHP EXECUTED");');
        $zip->close();
    }
    add_filter('upload_dir', $uploads);
    add_filter('locale', $localeFilter);
    add_filter('publishpress_hub_language_pack_domains', $domains);
    add_filter('publishpress_hub_language_pack_download_url', $urlFilter);
    add_filter('pre_http_request', $http, 10, 3);
    $service = new LanguagePackSyncService();
    $service->sync();
    $check($requests === 0, 'English does not download a pack');
    $locale = 'pt_BR';
    $service->sync();
    $check(get_option(LanguagePackSyncService::STATUS_OPTION)['state'] === 'installed', 'Staging pack installs for the site locale');
    $path = $directory . '/publishpress/language-packs/hub-fixture-pt_BR';
    foreach (['po', 'mo', 'json', 'l10n.php', 'release'] as $extension) {
        $check(is_file($path . '.' . $extension), $extension . ' is stored');
    }
    $check(strpos(file_get_contents($path . '.l10n.php'), 'REMOTE PHP EXECUTED') === false, 'PHP catalog is generated locally, not taken from the archive');
    $service->sync();
    $check($requests === 1, 'Repeated checks do not download the same installed pack');
    unlink($path . '.json');
    $service->sync();
    $check($requests === 2 && is_file($path . '.json'), 'Missing JSON is repaired');
    $old = file_get_contents($path . '.mo');
    $version = '1.2.1';
    foreach (['unavailable', 'missing-po', 'invalid-mo', 'invalid-json'] as $failure) {
        $mode = $failure;
        $service->sync();
        $check(get_option(LanguagePackSyncService::STATUS_OPTION)['state'] === 'error', $failure . ' reports an error');
        $check(file_get_contents($path . '.mo') === $old && file_get_contents($path . '.release') === '1.2.0', $failure . ' preserves the installed pack and version');
    }
    $mode = 'valid';
    $service->sync();
    $check(file_get_contents($path . '.release') === '1.2.1', 'Changing plugin version installs its matching pack');
    foreach ($downloaded as $temporary) {
        $check(! file_exists($temporary), 'Downloaded temporary ZIP is removed');
    }
} finally {
    remove_filter('upload_dir', $uploads);
    remove_filter('locale', $localeFilter);
    remove_filter('publishpress_hub_language_pack_domains', $domains);
    remove_filter('publishpress_hub_language_pack_download_url', $urlFilter);
    remove_filter('pre_http_request', $http, 10);
    if ($previous === null) {
        delete_option(LanguagePackSyncService::STATUS_OPTION);
    } else {
        update_option(LanguagePackSyncService::STATUS_OPTION, $previous, false);
    }
    global $wp_filesystem;
    if ($wp_filesystem && strpos(wp_normalize_path($directory), wp_normalize_path(get_temp_dir())) === 0) {
        $wp_filesystem->delete($directory, true);
    }
}
