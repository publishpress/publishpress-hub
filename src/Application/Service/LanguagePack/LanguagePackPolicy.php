<?php

/**
 * Rules for the current language pack of one text domain and locale.
 *
 * @package PublishPress\Hub\Application\Service\LanguagePack
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\LanguagePack;

defined('ABSPATH') || exit;

class LanguagePackPolicy
{
    public const DIRECTORY = 'publishpress/language-packs';

    public const PACKAGE_SERVER_HOST = 'pkg.publishpress.com';

    /**
     * A site locale that should receive a pack.
     *
     * English locales stay on the strings shipped in the plugin.
     */
    public static function isEligibleLocale(string $locale): bool
    {
        if ($locale === '' || $locale === 'en' || strpos($locale, 'en_') === 0) {
            return false;
        }

        return self::isSafeToken($locale);
    }

    /**
     * Release tag for the one current pack of a locale.
     *
     * The tag is not the plugin version. Older installs of the text domain use this same pack.
     */
    public static function releaseTag(string $locale): string
    {
        $suffix = strtolower(str_replace('_', '-', $locale));

        return 'v0.0.0-' . $suffix;
    }

    public static function packFileName(string $domain, string $locale, string $extension): string
    {
        return $domain . '-' . $locale . '.' . $extension;
    }

    /**
     * True when the zip entry is one of the two pack files and nothing else.
     */
    public static function isAllowedEntry(string $entry, string $domain, string $locale): bool
    {
        $entry = str_replace('\\', '/', $entry);
        if ($entry === '' || strpos($entry, '/') !== false || strpos($entry, "\0") !== false) {
            return false;
        }

        if (!self::isSafeToken($domain) || !self::isSafeToken($locale)) {
            return false;
        }

        $allowed = [
            self::packFileName($domain, $locale, 'mo'),
            self::packFileName($domain, $locale, 'json'),
        ];

        return in_array($entry, $allowed, true);
    }

    /**
     * Read a PO-Revision-Date value from gettext header text or an .mo file.
     *
     * The value uses the same format as the pack's `updated` string.
     */
    public static function revisionDateFromContents(string $contents): string
    {
        if (preg_match('/PO-Revision-Date:\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2}[+-]\d{4})/', $contents, $matches) !== 1) {
            return '';
        }

        return self::isRevisionDate($matches[1]) ? $matches[1] : '';
    }

    public static function isRevisionDate(string $value): bool
    {
        return preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}[+-]\d{4}$/', $value) === 1;
    }

    /**
     * Install when the locale file is missing, or when `updated` is newer than the installed header.
     */
    public static function needsInstall(string $installedRevision, string $remoteUpdated): bool
    {
        if (!self::isRevisionDate($remoteUpdated)) {
            return false;
        }

        if ($installedRevision === '') {
            return true;
        }

        if (!self::isRevisionDate($installedRevision)) {
            return true;
        }

        return strcmp($remoteUpdated, $installedRevision) > 0;
    }

    private static function isSafeToken(string $value): bool
    {
        return preg_match('/^[A-Za-z0-9_-]+$/', $value) === 1;
    }
}
