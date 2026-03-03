The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

[UNRELEASED]

- Changed: Updated alledia/edd-sl-plugin-updater to version 1.6.25.
- Changed: Updated publishpress/wordpress-edd-license to version 3.0.5.

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
