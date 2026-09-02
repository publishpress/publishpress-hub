The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

[1.0.6] - [Unreleased]

- Fixed: Prevented license keys from overflowing the license management modal (#192).
- Fixed: Updated the license activation button text for already installed Pro plugins (#193).
- Fixed: Sorted the plugins dashboard by licensed status first, then alphabetically (#197).
- Fixed: Restored WordPress admin access for the PublishPress Hub Manager role by adding and repairing its required `read` capability (#151).

[1.0.5] - 02 Jun, 2026

- Fixed: Addressed issues with PublishPress Shortlinks Pro plugin references (#163).
- Fixed: Enhanced and updated translations.
- Security: Require WordPress plugin management capabilities for Hub install, uninstall, activate, deactivate, upgrade, and update REST endpoints.

[1.0.4] - 16 Apr, 2026

- Added: New settings menu page for improved configuration.
- Added: Debug log feature to assist with troubleshooting and support.
- Added: Display plugin version number in the actions row when installed.
- Added: Integrated the new Shortlinks plugin.
- Added: Translations for Arabic, Czech, Danish, Dutch, Filipino, Finnish, French, German, Greek, Hebrew, Hungarian, Indonesian, Italian, Japanese, Korean, Persian, Polish, Romanian, Russian, Spanish, Swedish, Thai, Turkish, Vietnamese, and Yoruba.
- Added: Hide admin notices on the Plugins screen, Dashboard, and Hub Welcome and Plugins pages.
- Changed: Updated alledia/edd-sl-plugin-updater to version 1.6.25.
- Changed: Updated publishpress/wordpress-edd-license to version 3.0.5.
- Changed: Improved and expanded existing language translations.
- Fixed: Resolved inconsistency in "Update Available" badges on the plugins dashboard.

[1.0.3] - 03 Feb, 2026

- Added: Italian language translation.
- Added: Statistics service to send the Hub plugin version on API requests.
- Changed: Updated EDD subscription API URL handling with dynamic configuration support.
- Changed: Added validation for allowed download domains during plugins installation.
- Changed: Updated publishpress/wordpress-edd-license to version 3.0.4.
- Fixed: Resolved fatal error caused by EDD_SL_Plugin_Updater class conflict when multiple PublishPress plugins are active.
- Fixed: Corrected missing WordPress script dependencies preventing Welcome page from loading properly.
- Fixed: Enhanced plugin installation with ZIP file validation and improved error handling.

[1.0.2] - 19 Jan, 2026

- Fixed: Updated the library that handles EDD update check.

[1.0.1] - 09 Jan, 2026

- Fixed: Resolved issue where license-related notices could not be dismissed (#76).
- Fixed: Fixed issue preventing Hub plugin updates from working correctly (#74).
- Fixed: Fixed fatal error on fresh installations caused by missing EDD updater autoload.

[1.0.0] - 08 Jan, 2026

- Added: First release with basic PublishPress plugins management features and license control.
