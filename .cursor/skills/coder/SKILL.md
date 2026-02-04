# Coder Skill

## Purpose
Launch a specialized coding agent to implement changes in the PublishPress Hub Statistics codebase following project conventions and best practices.

## When to Use
Use this skill when you need to:
- Implement new features
- Fix bugs
- Refactor existing code
- Add or modify functionality
- Update code to follow standards

## How to Use

### Basic Usage
```
@coding-agent implement [your instructions here]
```

### Example Commands
```
@coding-agent implement a new REST endpoint for exporting statistics data as CSV

@coding-agent fix the issue where demo mode badge doesn't update without page refresh

@coding-agent refactor the DemoDataService to use dependency injection for the repository

@coding-agent add validation to ensure dates in filters are in correct format
```

## Instructions for the Agent

When this skill is invoked, launch an agent with these guidelines:

### Project Context
- **Language:** PHP 7.4+, JavaScript (React/JSX)
- **Framework:** WordPress plugin architecture
- **Standards:** WordPress Coding Standards, PSR-12
- **Architecture:** Domain-Driven Design, Clean Code principles
- **Frontend:** JSX syntax for React components

### Coding Standards

#### PHP
- Use strict types: `declare(strict_types=1);`
- Follow WordPress naming conventions
- Use dependency injection via container
- Type hint all parameters and return types
- **Document all code with proper PHPDoc** (see "PHPDoc requirements" below)
- Escape output: `esc_html()`, `esc_attr()`, `esc_url()`
- Sanitize input: `sanitize_text_field()`, `absint()`, etc.
- Verify nonces for actions
- Check capabilities: `current_user_can()`

#### PHPDoc requirements (mandatory for all new code)

- **File-level:** Every PHP file must have a docblock at the top with:
  - Short description (file purpose)
  - `@package` (namespace-consistent, e.g. `PublishPress\Hub\Infrastructure\Service`)
  - `@author PublishPress`
  - `@copyright Copyright (c) 2026, PublishPress`
  - `@license GPL v2 or later`
  - `@since 1.0.0` (or the version the code is introduced in)

- **Classes:** Use a brief class description where it adds clarity (file-level often covers it).

- **Methods and functions:** Every method and function must have a docblock with:
  - Short description (what it does)
  - `@param` for each parameter (with type and description)
  - `@return` when the return type is not void (with type and description when useful)
  - `@throws` when the method throws exceptions
  - `@since 1.0.0` (or the version the method was introduced)

- Generated or "do not edit" files (e.g. some `Versions.php`): add at least `@since` on methods; full docblocks when editing is allowed.

#### JavaScript/React
- Use functional components only
- Use JSX syntax
- Translations: `__('text', 'publishpress-hub-statistics')`
- Format numbers: `formatNumber()` or `number_format_i18n()`
- No emojis unless explicitly requested

#### File Organization
```
src/
├── Admin/                  # Admin pages, controllers
├── Application/           # Business logic, services
├── Domain/               # Domain models, exceptions
├── Infrastructure/       # Framework integration
│   ├── Repository/       # Data access
│   ├── Service/          # Infrastructure services
│   ├── Command/          # WP-CLI commands
│   └── Database/         # Database schemas
```

### Development Workflow

1. **Read existing code** to understand patterns
2. **Check coding standards** with `composer check:cs`
3. **Verify syntax** with `php -l filename.php`
4. **Test changes** manually or with tests
5. **Build assets** with `composer build:js-prod` and `build:js-dev` if JS changed
6. **Update documentation** if needed

### Container Registration

When adding new services:
1. Add constant to `AbstractDependencies.php`
2. Register in `definitions.php`
3. Add to `SERVICES_TO_INIT` if it needs initialization

### Common Patterns

#### Creating a Service
```php
<?php

/**
 * Short description of the service.
 *
 * @package PublishPress\Hub\Infrastructure\Service
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;

class MyService implements BootableInterface
{
    use BootableTrait;

    /**
     * Registers hooks during plugins_loaded.
     *
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        // Register hooks during plugins_loaded
    }

    /**
     * Initializes during init.
     *
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        // Initialize during init
    }
}
```

#### Adding a REST Endpoint
- Extend or modify `StatisticsController`
- Use `register_rest_route()` in `registerRoutes()`
- Verify nonces and capabilities
- Return `WP_REST_Response`

#### Adding Admin Page
- Extend `AdminMenuService` via `addSubmenuPage()`
- Create service implementing `BootableInterface`
- Handle actions in `handleActions()`
- Render with WordPress admin styles

### Testing Commands
```bash
# Check PHP syntax
php -l path/to/file.php

# Check coding standards
composer check:cs -- path/to/file.php

# Fix coding standards
composer fix:cs -- path/to/file.php

# Check PHP compatibility
composer check:php

# Lint PHP files
composer check:lint

# Build JavaScript
composer build:js-prod
composer build:js-dev
```

### Security Checklist
- [ ] Nonce verification on form submissions
- [ ] Capability checks for admin actions
- [ ] Input sanitization
- [ ] Output escaping
- [ ] SQL prepared statements
- [ ] No direct file access (ABSPATH check)

### Quality Checklist
- [ ] Type hints on all functions
- [ ] **File-level PHPDoc** on every new PHP file (@package, @author, @copyright, @license, @since)
- [ ] **Method/function PHPDoc** on every method and function (description, @param, @return, @since)
- [ ] Error handling for edge cases
- [ ] Follows DRY principle
- [ ] Single responsibility per class
- [ ] Dependency injection used
- [ ] No hardcoded values (use constants)

## Output Format

The agent should:
1. Understand the requirements
2. Read relevant existing code
3. Implement changes following patterns
4. Test implementation
5. Report what was changed and why
6. Provide testing steps

## Examples

### Example 1: Add a Feature
**User:** `@coding-agent implement a feature to export statistics as JSON`

**Agent should:**
- Read existing REST controller
- Add new endpoint `/statistics/export`
- Implement JSON generation
- Add capability checks
- Test the endpoint
- Document the changes

### Example 2: Fix a Bug
**User:** `@coding-agent fix the date range filter not working correctly`

**Agent should:**
- Investigate the issue
- Read filter implementation
- Fix the bug
- Test with various date ranges
- Ensure no regressions
- Document the fix

### Example 3: Refactor Code
**User:** `@coding-agent refactor the demo data generation to be more efficient`

**Agent should:**
- Analyze current implementation
- Identify performance bottlenecks
- Refactor with better approach
- Maintain same functionality
- Test performance improvement

## Notes

- **Always add proper PHPDoc** to every new class, method, and function (file header + method docblocks with @since).
- Always read existing code first to understand patterns
- Follow established conventions in the codebase
- Test changes thoroughly before reporting completion
- Run code quality checks before finishing
- Write the changelog on CHANGELOG.md following strictly the current pattern of that file.

## Related Files

- Project rules: `.cursor/rules/`
- Coding standards: `.phpcs.xml`
- Tests: `tests/`
- Documentation: `docs/`
