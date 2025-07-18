# Container Organization Strategy

## Overview

PublishPress Hub uses a **centralized container organization** approach with a single dependency injection container that manages all application services across all layers.

## Architecture Decision

### Container as Infrastructure Layer

The **Container belongs to the Infrastructure layer** because:

1. **Technical Concern**: Dependency injection is a technical mechanism, not a business concern
2. **Framework Tool**: Container is a framework/tool for wiring components together
3. **External Dependency**: Container implementation is specific to the chosen DI framework
4. **Infrastructure Responsibility**: Service registration and resolution are infrastructure concerns

### Why Centralized Container?

1. **Single Source of Truth**: All dependencies are registered in one place
2. **Easier Management**: No conflicts between multiple container definitions
3. **Clear Dependency Resolution**: All dependencies are visible in one location
4. **Simplified Testing**: Easier to mock and test dependencies
5. **Better Performance**: No need to merge multiple definition files

### Alternative Approaches Considered

1. **Per-Layer Containers**: Each layer has its own container
   - ❌ **Cons**: Complex dependency resolution, potential conflicts
   - ❌ **Cons**: Harder to manage cross-layer dependencies
   - ❌ **Cons**: More complex testing setup

2. **Feature-Based Containers**: Each feature has its own container
   - ❌ **Cons**: Overhead for small features
   - ❌ **Cons**: Complex when features need to share services

3. **Centralized Container**: Single container for all services
   - ✅ **Pros**: Simple and clear
   - ✅ **Pros**: Easy to understand and maintain
   - ✅ **Pros**: Perfect for single developer and small teams

## Current Structure

The container is part of the **Infrastructure layer** because dependency injection is a technical concern, not a business concern.

```
src/
├── Infrastructure/
│   ├── Container/                       # Dependency injection (Infrastructure)
│   │   ├── definitions.php              # MAIN container definitions
│   │   ├── ServiceContainer.php         # Container implementation
│   │   ├── ContainerDependencies.php    # Container service identifiers
│   │   ├── NotFoundException.php        # Container exceptions
│   │   └── Contracts/
│   │       └── ServiceContainerInterface.php
│   ├── WordPress/                       # WordPress adapters (Infrastructure)
│   │   ├── AbstractDependencies.php     # Legacy compatibility
│   │   ├── container-definitions.php    # WordPress-specific services
│   │   ├── WordPressHooksAdapter.php
│   │   └── Contract/
│   │       └── WordPressHooksAdapterInterface.php
│   ├── Database/                        # Database adapters (Infrastructure)
│   ├── External/                        # External API adapters (Infrastructure)
│   ├── Logger/                          # Logging service (Infrastructure)
│   ├── Language/                        # Language service (Infrastructure)
│   └── Asset/                           # Asset management (Infrastructure)
├── Application/                         # Use cases and application services
├── Domain/                              # Business logic and entities
└── Presentation/                        # User interface and API
```

## Service Organization

### Container Dependencies

All container service identifiers are defined in `ContainerDependencies.php`:

```php
class ContainerDependencies
{
    // Core Application Services
    public const CORE_HUB_SERVICE = 'publishpress-hub.core.service';
    public const APPLICATION_BOOTSTRAP_SERVICE = 'publishpress-hub.application.bootstrap.service';

    // WordPress Infrastructure Adapters
    public const WORDPRESS_HOOKS_ADAPTER = 'publishpress-hub.infrastructure.wordpress.wordpress-hooks-adapter';
    public const WORDPRESS_PLUGIN_API_ADAPTER = 'publishpress-hub.infrastructure.wordpress.wordpress-plugin-api-adapter';
    public const WORDPRESS_ADMIN_MENU_ADAPTER = 'publishpress-hub.infrastructure.wordpress.wordpress-admin-menu-adapter';

    // Domain Repositories
    public const PLUGIN_REPOSITORY = 'publishpress-hub.domain.plugin.repository';
    public const COMPONENT_REPOSITORY = 'publishpress-hub.domain.component.repository';
    public const MODULE_REPOSITORY = 'publishpress-hub.domain.module.repository';

    // Infrastructure Services
    public const LOGGER = 'publishpress-hub.infrastructure.logger';
    public const ASSET_SERVICE = 'publishpress-hub.infrastructure.asset.service';
    public const LANGUAGE_SERVICE = 'publishpress-hub.infrastructure.language.service';

    // Application Use Cases
    public const INSTALL_PLUGIN_USE_CASE = 'publishpress-hub.application.usecase.install-plugin';
    public const LIST_PLUGINS_USE_CASE = 'publishpress-hub.application.usecase.list-plugins';
    public const UPDATE_PLUGIN_USE_CASE = 'publishpress-hub.application.usecase.update-plugin';

    // Application Services
    public const PLUGIN_MANAGEMENT_SERVICE = 'publishpress-hub.application.service.plugin-management';
    public const COMPONENT_SHOWCASE_SERVICE = 'publishpress-hub.application.service.component-showcase';
}
```

### Main Container Definitions

The main container definitions file (`src/Infrastructure/Container/definitions.php`) imports and combines all service definitions:

```php
<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Psr\Container\ContainerInterface;
use PublishPress\Hub\Infrastructure\Container\ContainerDependencies;
use PublishPress\Hub\Infrastructure\WordPress\WordPressHooksAdapter;
use PublishPress\Hub\Application\Service\ApplicationBootstrapService;

// Import layer-specific definitions
$wordPressDefinitions = require_once __DIR__ . '/../WordPress/container-definitions.php';

// Main container definitions
$definitions = [
    // Core Services
    ContainerDependencies::CORE_HUB_SERVICE => function (ContainerInterface $container): ApplicationBootstrapService {
        return new ApplicationBootstrapService();
    },

    // WordPress Infrastructure Services
    ContainerDependencies::WORDPRESS_HOOKS_ADAPTER => function (ContainerInterface $container): WordPressHooksAdapter {
        return new WordPressHooksAdapter();
    },

    // Application Services
    ContainerDependencies::APPLICATION_BOOTSTRAP_SERVICE => function (ContainerInterface $container): ApplicationBootstrapService {
        return new ApplicationBootstrapService();
    },

    // Domain Services
    // TODO: Add domain service definitions here

    // Infrastructure Services
    // TODO: Add other infrastructure service definitions here
];

// Merge with layer-specific definitions
return array_merge($definitions, $wordPressDefinitions);
```

## Layer-Specific Definitions

### WordPress Infrastructure

Layer-specific definitions are kept for organizational purposes but are imported into the main container:

```php
<?php
// src/Infrastructure/WordPress/container-definitions.php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress;

use PublishPress\Psr\Container\ContainerInterface;
use PublishPress\Hub\Infrastructure\Container\ContainerDependencies;
use PublishPress\Hub\Infrastructure\WordPress\WordPressHooksAdapter;

return [
    ContainerDependencies::WORDPRESS_HOOKS_ADAPTER => function (ContainerInterface $container): WordPressHooksAdapter {
        return new WordPressHooksAdapter();
    },
];
```

## Best Practices

### 1. Service Registration

- **Use Container Dependencies**: Always use constants from `ContainerDependencies.php` for service identifiers
- **Type Hints**: Always provide return type hints in service definitions
- **Dependency Injection**: Use the container parameter to resolve dependencies

```php
// ✅ Good
ContainerDependencies::PLUGIN_REPOSITORY => function (ContainerInterface $container): PluginRepositoryInterface {
    $logger = $container->get(ContainerDependencies::LOGGER);
    return new WordPressPluginRepository($logger);
},

// ❌ Bad
'plugin.repository' => function ($container) {
    return new WordPressPluginRepository();
},
```

### 2. Service Organization

- **Group by Layer**: Organize services by architectural layer
- **Clear Comments**: Add comments to separate different service groups
- **Consistent Naming**: Use consistent naming patterns for service identifiers

### 3. Dependency Management

- **Avoid Circular Dependencies**: Design services to avoid circular dependencies
- **Lazy Loading**: Services are resolved only when needed
- **Singleton Pattern**: Use the container's singleton pattern for shared services

### 4. Testing

- **Mock Services**: Use the container to inject mock services in tests
- **Service Isolation**: Each service should be testable in isolation
- **Container Reset**: Reset the container between tests

## Migration Path

### From Per-Layer Containers

If you were using per-layer containers, migrate to the centralized approach:

1. **Consolidate Definitions**: Move all service definitions to the main container
2. **Update Service Identifiers**: Use centralized service constants
3. **Remove Layer Containers**: Remove individual layer container files
4. **Update Tests**: Update tests to use the centralized container

### Future Considerations

When the team grows or complexity increases:

1. **Module Extraction**: Extract modules with their own containers
2. **Service Providers**: Implement service providers for complex modules
3. **Configuration**: Add configuration-based service registration

## Example Usage

### Service Definition

```php
// In src/Infrastructure/Container/definitions.php
ContainerDependencies::PLUGIN_MANAGEMENT_SERVICE => function (ContainerInterface $container): PluginManagementService {
    $pluginRepository = $container->get(ContainerDependencies::PLUGIN_REPOSITORY);
    $wordPressAdapter = $container->get(ContainerDependencies::WORDPRESS_HOOKS_ADAPTER);
    $logger = $container->get(ContainerDependencies::LOGGER);

    return new PluginManagementService($pluginRepository, $wordPressAdapter, $logger);
},
```

### Service Usage

```php
// In a use case or service
class InstallPluginUseCase
{
    private PluginManagementService $pluginService;

    public function __construct(ContainerInterface $container)
    {
        $this->pluginService = $container->get(ContainerDependencies::PLUGIN_MANAGEMENT_SERVICE);
    }

    public function execute(InstallPluginRequest $request): InstallPluginResponse
    {
        return $this->pluginService->installPlugin($request->getSlug());
    }
}
```

## Conclusion

The centralized container approach provides:

- **Simplicity**: Easy to understand and maintain
- **Flexibility**: Easy to add new services and dependencies
- **Testability**: Services can be easily mocked and tested
- **Scalability**: Can evolve to support modules when needed

This approach is perfect for the current single-developer scenario and can scale as the team grows.
