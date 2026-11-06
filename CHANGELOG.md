The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

[1.1.0] - 15 October, 2026

- Added: Support for PublishPress Cart, PublishPress Taxonomies, and PublishPress Tag Groups (#269).
- Added: List and card layouts for the plugins dashboard (#211, #262).
- Added: Plugin favorites and a favorites only filter, with saved layout preferences (#211).
- Added: Bundle license form to validate and apply one license key to multiple selected plugins (#211, #261).
- Added: Warnings before plugin deactivation and conflict resolution to explain potential effects on site content (#107).
- Changed: Refreshed the welcome page layout and its documentation, support, and account links (#211).
- Changed: Standardized license key links to direct users to their dashboard (#242).
- Changed: Shortened the upgrade button text to "Upgrade to Pro" (#241).
- Changed: Used the WordPress filesystem API for debug logs, translation files, and downloaded ZIP signature checks (#249).
- Changed: Used a URL encoded SVG for the admin menu icon instead of Base64 encoding (#248).
- Changed: Documented the wildcard EDD transient cleanup queries and added targeted coding-standard exceptions (#250).
- Fixed: Updated expiration notices from local dates and current installations, clarified expired activation errors, improved renewal links, and added an Expired filter (#275).
- Fixed: Activated shared license keys individually for other plugins when using the all plugins option, and reported activation failures (#274).
- Fixed: Sorted the plugins dashboard and bundle license selector alphabetically, regardless of license status (#273).
- Fixed: Improved recovery when plugin conflict resolution fails to reactivate the selected plugin (#108).
- Fixed: Prevented loading spinners from overlapping button text (#240).
- Fixed: Improved interface styles and color contrast for accessibility (#21).
- Fixed: Kept secondary plugin actions visible when navigating with the keyboard (#215).
- Fixed: Improved screen reader feedback for loading, empty and busy states, activation controls, and modal errors (#214).
- Fixed: Reduced redundant screen reader output from decorative plugin artwork, icons, and rating stars (#216).
- Fixed: Excluded vendor development configuration files from release packages (#247).
- Security: Added direct access guards to plugin owned PHP files in the src and languages directories (#251).

[1.0.7] - 17 September, 2026

- Added: Support for a single `PUBLISHPRESS_HUB_LICENSE_KEY` constant in wp-config.php to provide licenses for all PublishPress plugin families (#65).
- Added: Identified wp-config.php-managed license keys in the Hub and prevented editing them from the license management modal (#65).
- Added: Option to reuse an entered license key for all PublishPress plugins from the Hub license UI (#65).
- Added: Option to reuse license keys for all PublishPress plugins during Pro install and upgrade flows (#65).
- Added: Option to reuse an existing saved license key for all PublishPress plugins from the license management modal (#65).
- Added: Option to use an existing saved license key when installing or upgrading Pro plugins (#65).
- Fixed: Allowed Hub-detected Pro plugin updates to run when WordPress has not cached the update yet (#227).
- Fixed: Reactivated plugins after Hub-managed updates when they were active before the update (#227).
- Fixed: Made expired license notices non-dismissible so administrators keep seeing renewal warnings (#196).
- Fixed: Improved the visual style of update failure messages so they are easier to notice (#226).
- Fixed: Improved blocked and unauthorized license error messages (#124).
- Added: Site health report copy and download actions with WordPress environment details and PublishPress plugin versions (#103).

[1.0.6] - 03 September, 2026

- Security: Moved HTTP debug logs outside the public uploads directory (#175).
- Security: Redacted sensitive EDD response data from HTTP debug logs (#174).
- Security: Removed the public filter that allowed third-party code to expand trusted plugin download domains (#176).
- Security: Scoped HTTP debug logging to Hub-owned requests and redacted sensitive headers and cookies (#177).
- Removed: Removed the redundant "More Info" plugin action and dialog (#162).
- Fixed: Made installed plugin version numbers visible beside inline plugin actions (#94).
- Fixed: Improved the refresh tooltip copy for Mac and Windows keyboard shortcuts (#190).
- Fixed: Show available updates for installed Pro plugins when WordPress has not populated the update cache (#191).
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
