# PublishPress Hub - Project Documentation

## Overview

PublishPress Hub is a centralized management hub for all PublishPress plugins. It provides a unified dashboard to install, update, and manage licenses from one location.

**Version:** Look at the file `publishpress-hub.php` in the file header.
**License:** GPL-3.0-or-later
**PHP Requirement:** >= 7.4
**WordPress Requirement:** >= 6.7

## Project Structure

```
publishpress-hub/
├── src/                          # Main source code (PSR-4: PublishPress\Hub)
│   ├── Admin/                    # Admin interface controllers and templates
│   │   ├── Page/                 # Page controllers (Dashboard, Settings, Welcome)
│   │   └── Template/             # PHP templates for admin pages
│   ├── Application/              # Application layer
│   │   ├── Contract/             # Interfaces
│   │   ├── DTO/                  # Data Transfer Objects
│   │   ├── Service/              # Business logic services
│   │   └── Traits/               # Reusable traits
│   ├── Infrastructure/           # Infrastructure layer (DI, Container)
│   ├── autoload.php              # Autoloader
│   ├── include.php               # Entry point (auto-generated)
│   ├── activation.php            # Plugin activation hooks
│   └── Versions.php              # Version management
├── lib/                          # Bundled libraries with own composer.json
├── resources/                    # Frontend assets (JS, CSS, images)
├── languages/                    # Internationalization files
├── tests/                        # Codeception test suites
├── dev-workspace/                # Development environment (Docker, scripts)
├── docs/                         # Documentation
├── publishpress-hub.php          # Main plugin file
└── composer.json                 # Dependency management
```

## Key Technologies

- **PHP**: 7.4+ with strict typing
- **WordPress**: 6.7+ (WordPress plugin architecture)
- **Dependency Injection**: Custom DI container
- **Version Management**: Custom version loader system
- **Build System**: Webpack for JS/CSS bundling
- **Testing**: Codeception with wp-browser
- **Code Quality**: PHP_CodeSniffer, PHPStan, PHPMD, PHPUnit
- **Standards**: WordPress Coding Standards, PHP Compatibility

## Architecture

### Version Management System

The plugin uses a sophisticated version management system to handle multiple versions:
- `src/include.php` - Auto-generated entry point that registers versions
- `src/Versions.php` - Manages version registration and initialization
- Only the latest version is loaded to prevent conflicts

### Dependency Injection

Uses a custom DI container:
- `Infrastructure/Container/DependencyContainer`
- Services are registered and resolved through the container
- Supports constructor injection and service providers

### Admin Interface

- Controllers in `src/Admin/Page/` handle routing and logic
- Templates in `src/Admin/Template/` render views
- React/JS components for dynamic interactions

## Development Workflow

### Setup

```bash
# Install PHP dependencies
composer install

# Install JS dependencies
npm install  # or yarn install

# Configure PHP CodeSniffer
composer config:phpcs
```

### Building

```bash
# Full build (loader + distribution)
composer build

# Build JavaScript assets
composer build:js          # Both prod and dev
composer build:js-prod     # Production only
composer build:js-dev      # Development only

# Watch mode for development
composer watch

# Build translations
composer build:lang
```

### Code Quality

```bash
# Run all checks
composer check

# PHP Compatibility checks (7.4 through 8.4)
composer check:php

# Coding standards
composer check:cs
composer fix:cs            # Auto-fix issues

# Static analysis
composer check:stan

# Linting
composer check:lint

# PHP Mess Detector
composer check:phpmd

# Code metrics
composer metrics
```

### Testing

```bash
# Run Codeception tests
composer test

# Docker test environment
composer test:up           # Start test environment
composer test:down         # Stop test environment
composer test:restart      # Restart test environment
composer test:clean        # Clean test environment
```

### Local Development Sync

```bash
# Sync to local WordPress installation
composer sync:local

# Watch and sync on changes
composer sync:local:watch
```

## Important Files

- **publishpress-hub.php** - Main plugin file with WordPress headers
- **src/include.php** - Auto-generated, DO NOT EDIT MANUALLY
- **src/autoload.php** - PSR-4 autoloader
- **composer.json** - Project metadata and scripts
- **.phpcs.xml** - Coding standards configuration
- **phpstan.neon** - Static analysis configuration
- **webpack.config.js** - Asset bundling configuration

## Git Workflow

**Current Branch:** strange-einstein
**Base Branch:** development
**Main Repository:** /Users/andersonmartins/Projects/git/publishpress/publishpress-hub

This is a git worktree for isolated feature development.

### Recent Changes

- Updated composer.json to use vendor/bin for PHP CodeSniffer commands
- Style and color adjustments for better accessibility
- Merged release-1.0.1 and master branches

## Composer Scripts Reference

### Build Scripts
- `build` - Full build process
- `build:loader` - Generate version loader
- `build:dir` - Build distribution directory
- `build:lang` - Build all language files (POT, MO, JSON, PHP)

### Quality Scripts
- `check` - Run PHP compatibility, coding standards, and linting
- `check:php` - PHP compatibility for versions 7.4-8.4
- `check:cs` - Coding standards check
- `check:stan` - PHPStan static analysis
- `check:phpmd` - PHP Mess Detector
- `fix:cs` - Auto-fix coding standards
- `fix:php` - Fix PHP issues with php-cs-fixer

### Test Scripts
- `test` - Run Codeception tests
- `test:up/down/restart` - Manage test environment

### Development Scripts
- `watch` - Watch and rebuild JS assets
- `sync:local` - Sync to local WordPress
- `metrics` - Generate code metrics report

## Notes for AI Assistants

### Code Modification Guidelines

1. **DO NOT edit generated files**:
   - `src/include.php` is auto-generated by version-loader-generator
   - Run `composer build:loader` to regenerate

2. **Follow WordPress Coding Standards**:
   - Use `composer check:cs` before committing
   - Use `composer fix:cs` to auto-fix issues
   - Refer to .phpcs.xml for project-specific rules

3. **Maintain PHP compatibility**:
   - Support PHP 7.4 through 8.4
   - Run `composer check:php` to verify

4. **Use strict typing**:
   - All PHP files should use `declare(strict_types=1);`
   - Type hint all parameters and return types

5. **Testing**:
   - Write Codeception tests for new features
   - Run `composer test` before committing

6. **Internationalization**:
   - Use text domain: `publishpress-hub`
   - Wrap strings with `__()`, `_e()`, etc.
   - Run `composer build:lang` to update translations

7. **Architecture patterns**:
   - Use dependency injection via DI container
   - Implement interfaces from `Application/Contract/`
   - Follow PSR-4 autoloading in `PublishPress\Hub` namespace

8. **Asset building**:
   - Modify source files in `resources/`
   - Run `composer watch` during development
   - Build production assets with `composer build:js-prod`

### Common Tasks

**Adding a new admin page:**
1. Create controller in `src/Admin/Page/`
2. Create template in `src/Admin/Template/`
3. Register in service provider
4. Add routing logic

**Adding a new service:**
1. Create service class in `src/Application/Service/`
2. Create interface in `src/Application/Contract/` if needed
3. Register in DI container
4. Inject via constructor where needed

**Updating dependencies:**
1. Modify `composer.json`
2. Run `composer update`
3. Run `@pre-update-cmd` updates lib/ directory automatically

## External Resources

- **GitHub Repository**: publishpress/publishpress-hub
- **Documentation**: /docs directory
- **Support**: help@publishpress.com
- **Website**: https://publishpress.com
