# PublishPress Hub Architecture

## Overview

PublishPress Hub implements a simplified **Clean Architecture** pattern, designed for a WordPress plugin hub that serves as a central management system for multiple PublishPress plugins. This architecture combines:

- **Clean Architecture**: Clear separation of concerns with dependency inversion
- **Domain-Driven Design**: Business logic centered around domain models
- **Feature-Based Organization**: Use cases and services organized by business features
- **WordPress Integration**: Clean abstractions over WordPress functions

## Why This Architecture?

**For a WordPress Plugin Hub:**
- **Single Developer**: Optimized for one developer working on multiple features
- **5 Core Features**: Manageable scope with clear feature boundaries
- **Future Growth**: Easy to extract modules when team grows
- **WordPress Integration**: Clean abstractions over WordPress functions
- **Testability**: Business logic can be tested independently of WordPress
- **Maintainability**: Clear separation of concerns for long-term maintenance

## Key Principles

1. **Dependency Inversion**: High-level modules don't depend on low-level modules
2. **Single Responsibility**: Each layer has a single, well-defined responsibility
3. **Feature Organization**: Business features are organized through use cases
4. **Separation of Concerns**: Clear boundaries between business logic and external concerns
5. **Testability**: Each component can be unit tested in isolation

## How It's Organized

### Complete Architecture Structure

```
src/
├── Application/                    # Use cases and application services
│   ├── UseCase/                   # Business operations by feature
│   │   ├── InstallPluginUseCase.php
│   │   ├── ListPluginsUseCase.php
│   │   ├── UpdatePluginUseCase.php
│   │   ├── ShowcaseComponentUseCase.php
│   │   ├── ListComponentsUseCase.php
│   │   └── BootstrapApplicationUseCase.php
│   ├── Service/                   # Application services
│   │   ├── PluginManagementService.php
│   │   ├── ComponentShowcaseService.php
│   │   └── ApplicationBootstrapService.php
│   ├── DTO/                       # Data transfer objects
│   │   ├── PluginInstallationDTO.php
│   │   ├── PluginListDTO.php
│   │   ├── ComponentDTO.php
│   │   └── ApplicationConfigDTO.php
│   ├── Contract/                  # Application ports/interfaces
│   │   ├── PluginRepositoryInterface.php
│   │   ├── ComponentRepositoryInterface.php
│   │   └── WordPressAdapterInterface.php
│   ├── Bootstrap/                 # Application startup
│   │   ├── ApplicationBootstrap.php
│   │   └── ModulesCoordinator.php
│   ├── Container/                 # Dependency injection
│   │   ├── DependencyContainer.php
│   │   ├── Contract/
│   │   │   └── DependencyContainerInterface.php
│   │   └── Exception/
│   │       ├── ContainerException.php
│   │       └── DependencyNotFoundException.php
│   ├── Exception/                 # Application exceptions
│   │   ├── BaseException.php
│   │   ├── ErrorCodes.php
│   │   ├── NotLoadedException.php
│   │   ├── ApplicationException.php
│   │   └── UseCaseException.php
│   ├── AbstractDependencies.php
│   └── container-definitions.php
├── Domain/                        # Business logic and entities
│   ├── Entity/
│   │   ├── Plugin.php
│   │   ├── PluginFamily.php
│   │   ├── Component.php
│   │   └── Module.php
│   ├── ValueObject/
│   │   ├── PluginVersion.php
│   │   ├── PluginSlug.php
│   │   ├── PluginStatus.php
│   │   ├── ComponentType.php
│   │   └── ModuleStatus.php
│   ├── Service/
│   │   ├── PluginValidationService.php
│   │   └── ComponentValidationService.php
│   ├── Repository/
│   │   ├── PluginRepositoryInterface.php
│   │   └── ComponentRepositoryInterface.php
│   └── Exception/
│       ├── DomainException.php
│       ├── PluginNotFoundException.php
│       ├── PluginInstallationException.php
│       ├── ComponentNotFoundException.php
│       └── ValidationException.php
├── Infrastructure/                # External concerns and adapters
│   ├── WordPress/
│   │   ├── Adapter/
│   │   │   ├── WordPressPluginApiAdapter.php
│   │   │   ├── WordPressHooksAdapter.php
│   │   │   ├── WordPressAdminMenuAdapter.php
│   │   │   ├── WordPressLanguageAdapter.php
│   │   │   ├── WordPressAssetAdapter.php
│   │   │   ├── WordPressDatabaseAdapter.php
│   │   │   └── WordPressRestApiAdapter.php
│   │   ├── Contract/
│   │   │   └── WordPressAdapterInterface.php
│   │   └── Exception/
│   │       ├── WordPressException.php
│   │       └── WordPressAPIException.php
│   ├── Database/
│   │   ├── Adapter/
│   │   │   └── DatabasePluginRepository.php
│   │   ├── Contract/
│   │   │   └── DatabaseAdapterInterface.php
│   │   └── Exception/
│   │       ├── DatabaseException.php
│   │       └── ConnectionException.php
│   ├── External/
│   │   ├── Adapter/
│   │   │   ├── WordPressOrgApiAdapter.php
│   │   │   └── EddApiAdapter.php
│   │   ├── Contract/
│   │   │   └── ExternalAPIInterface.php
│   │   └── Exception/
│   │       ├── ExternalAPIException.php
│   │       └── NetworkException.php
│   ├── Logger/
│   │   ├── Logger.php
│   │   ├── Contract/
│   │   │   └── LoggerInterface.php
│   │   └── Exception/
│   │       ├── LoggerException.php
│   │       └── LoggingException.php
│   ├── Language/
│   │   ├── LanguageService.php
│   │   ├── Contract/
│   │   │   └── LanguageServiceInterface.php
│   │   ├── Exception/
│   │   │   └── LanguageException.php
│   │   └── container-definitions.php
│   └── Asset/
│       ├── AssetService.php
│       ├── Contract/
│       │   └── AssetServiceInterface.php
│       ├── Exception/
│       │   └── AssetException.php
│       └── container-definitions.php
├── Presentation/                  # User interface and API
│   ├── Controller/
│   │   ├── PluginController.php
│   │   ├── ComponentController.php
│   │   └── AdminController.php
│   ├── View/
│   │   ├── PluginListView.php
│   │   ├── ComponentShowcaseView.php
│   │   └── AdminView.php
│   ├── Api/
│   │   ├── PluginApiController.php
│   │   └── ComponentApiController.php
│   ├── Exception/
│   │   ├── PresentationException.php
│   │   ├── ControllerException.php
│   │   └── ViewException.php
│   └── Asset/
│       ├── css/
│       │   ├── admin-page.css
│       │   └── components.css
│       ├── jsx/
│       │   ├── components/
│       │   ├── plugins-dashboard.jsx
│       │   └── components-showcase.jsx
│       └── dist/                  # Compiled production assets
│           ├── css/
│           │   ├── admin-page.min.css
│           │   └── components.min.css
│           └── js/
│               ├── plugins-dashboard.js
│               ├── components-showcase.js
│               ├── plugins-dashboard.min.js
│               └── components-showcase.min.js
```

### Architecture Overview

The application follows **Clean Architecture** with feature-based organization:

```mermaid
graph TB
    subgraph "PublishPress Hub Architecture"
        subgraph "Presentation Layer"
            React[React Frontend]
            WPAdmin[WordPress Admin]
            RESTAPI[REST API]
        end

        subgraph "Application Layer"
            UseCases[Use Cases]
            Services[Services]
            DTOs[DTOs]
        end

        subgraph "Domain Layer"
            Entities[Entities]
            ValueObjects[Value Objects]
            DomainServices[Domain Services]
        end

        subgraph "Infrastructure Layer"
            WPAdapters[WordPress Adapters]
            DBAdapters[Database Adapters]
            ExternalServices[External Services]
        end

        subgraph "Shared Layer"
            Container[Container]
            Logger[Logger]
            Utils[Utils]
        end
    end

    React --> UseCases
    WPAdmin --> UseCases
    RESTAPI --> UseCases
    UseCases --> Services
    Services --> DTOs
    DTOs --> Entities
    Entities --> ValueObjects
    ValueObjects --> DomainServices
    DomainServices --> WPAdapters
    DomainServices --> DBAdapters
    DomainServices --> ExternalServices

    Container -.-> UseCases
    Logger -.-> UseCases
    Utils -.-> UseCases
```

### Feature Organization

Features are organized through **use cases** in the Application layer:

```mermaid
graph LR
    subgraph "Feature Organization"
        subgraph "Plugin Management Feature"
            InstallUC[Install Plugin Use Case]
            ListUC[List Plugins Use Case]
            UpdateUC[Update Plugin Use Case]
        end

        subgraph "Component Showcase Feature"
            ShowcaseUC[Showcase Component Use Case]
            ListCompUC[List Components Use Case]
        end

        subgraph "Application Management"
            BootstrapUC[Bootstrap Application Use Case]
        end
    end

    InstallUC --> PluginEntity[Plugin Entity]
    ListUC --> PluginEntity
    UpdateUC --> PluginEntity
    ShowcaseUC --> ComponentEntity[Component Entity]
    ListCompUC --> ComponentEntity
    BootstrapUC --> ModuleEntity[Module Entity]
```

### Dependency Flow

```mermaid
graph TD
    subgraph "Dependency Direction"
        subgraph "High Level"
            Presentation[Presentation Layer]
            Application[Application Layer]
            Domain[Domain Layer]
        end

        subgraph "Low Level"
            Infrastructure[Infrastructure Layer]
            Shared[Shared Layer]
        end

        subgraph "External"
            WordPress[WordPress]
            Database[Database]
            ExternalAPI[External APIs]
        end
    end

    Presentation --> Application
    Application --> Domain
    Domain --> Infrastructure
    Infrastructure --> WordPress
    Infrastructure --> Database
    Infrastructure --> ExternalAPI

    Shared -.-> Presentation
    Shared -.-> Application
    Shared -.-> Domain
    Shared -.-> Infrastructure
```

## Layer Responsibilities

### Application Layer - Use Case Orchestration
**Purpose:** Coordinates domain operations and implements business features
- **Use Cases**: Business operations organized by feature (InstallPluginUseCase, ShowcaseComponentUseCase)
- **Services**: Orchestrate domain operations and coordinate between entities
- **DTOs**: Data structures for transferring data between layers
- **Contracts**: Interfaces defining service behavior and contracts

**Example:** A `InstallPluginUseCase` orchestrates the plugin installation process using domain entities.

### Domain Layer - Core Business Logic
**Purpose:** Contains the core business rules and entities
- **Entities**: Business objects with identity and lifecycle (Plugin, Component, Module)
- **Value Objects**: Immutable objects representing concepts (PluginVersion, PluginSlug, PluginStatus)
- **Repository Interfaces**: Contracts for data persistence operations
- **Domain Services**: Business logic that doesn't belong to specific entities
- **Domain Exceptions**: Business rule violations and domain-specific errors

**Example:** A `Plugin` entity encapsulates plugin state, validation rules, and business operations.

### Infrastructure Layer - External Concerns
**Purpose:** Implements interfaces defined in higher layers
- **Repository Implementations**: Concrete database operations and data persistence
- **External Service Clients**: Integration with WordPress.org API, license servers, etc.
- **WordPress Adapters**: Clean abstractions over WordPress functions
- **Infrastructure Exceptions**: Technical errors and external service failures

**Example:** A `WordPressPluginRepository` implements the `PluginRepositoryInterface` using WordPress functions.

### Presentation Layer - User Interface
**Purpose:** Handles user interactions and data presentation
- **Controllers**: Handle HTTP requests, validate input, and coordinate responses
- **Views**: Transform domain data for presentation
- **Templates**: HTML/PHP templates for rendering user interfaces
- **Asset Management**: CSS, JavaScript, and other frontend resources

**Example:** A `PluginController` handles "Install Plugin" requests and coordinates with application use cases.

### Shared Layer - Cross-Cutting Concerns
**Purpose:** Provides common functionality across all layers
- **Container**: Dependency injection container for service management
- **Logger**: Centralized logging and error tracking
- **Utils**: Common utility functions and helpers
- **Exceptions**: Base exception classes and common error types

## Feature-Based Organization

### Plugin Management Feature
```php
// src/Application/UseCase/InstallPluginUseCase.php
class InstallPluginUseCase
{
    public function execute(InstallPluginRequest $request): InstallPluginResponse
    {
        $plugin = $this->pluginRepository->findBySlug($request->getSlug());

        if (!$plugin) {
            throw new PluginNotFoundException('Plugin not found');
        }

        $plugin->install();
        $this->pluginRepository->save($plugin);

        $this->wordPressAdapter->installPlugin($plugin->getSlug());

        return new InstallPluginResponse($plugin->getId(), $plugin->getStatus());
    }
}

// src/Domain/Entity/Plugin.php
class Plugin extends Entity
{
    private PluginSlug $slug;
    private PluginVersion $version;
    private PluginStatus $status;

    public function install(): void
    {
        if (!$this->canBeInstalled()) {
            throw new PluginInstallationException('Plugin cannot be installed');
        }
        $this->status = PluginStatus::INSTALLING();
    }

    private function canBeInstalled(): bool
    {
        return $this->status->equals(PluginStatus::AVAILABLE());
    }
}
```

### Component Showcase Feature
```php
// src/Application/UseCase/ShowcaseComponentUseCase.php
class ShowcaseComponentUseCase
{
    public function execute(ShowcaseComponentRequest $request): ShowcaseComponentResponse
    {
        $component = $this->componentRepository->findByType($request->getType());

        if (!$component) {
            throw new ComponentNotFoundException('Component not found');
        }

        return new ShowcaseComponentResponse($component->toArray());
    }
}
```

## WordPress Integration

### WordPress Abstractions
The architecture provides clean abstractions over WordPress functions:
- **API Client**: WordPress.org API integration with error handling
- **Plugin Management**: Safe plugin installation, activation, and management
- **Storage**: WordPress options and transients with type safety
- **Hooks**: Organized WordPress hooks and filters
- **User Management**: WordPress user functions with proper abstractions

### Performance Considerations
- **Lazy Loading**: Services loaded on demand
- **Caching**: Efficient data caching strategies using WordPress transients
- **Asset Optimization**: Optimized CSS/JS delivery and loading
- **Database Optimization**: Efficient database queries and connection management

## Development Guidelines

### Feature Development
1. **Start with Use Case**: Define the business operation first
2. **Define DTOs**: Create data structures for input/output
3. **Implement Domain Logic**: Add business rules to entities
4. **Create Infrastructure**: Implement repository and adapter classes
5. **Add Presentation**: Create controllers and views

### Code Organization
1. **Feature-First**: Organize code by business features
2. **Consistent Naming**: Use descriptive, consistent naming for classes and methods
3. **Error Handling**: Implement proper exception handling at each layer
4. **Logging**: Comprehensive logging for debugging and monitoring
5. **Security**: Input validation, sanitization, and security best practices

### Testing Strategy
1. **Unit Tests**: Test each layer independently with mocked dependencies
2. **Integration Tests**: Test feature workflows and external integrations
3. **End-to-End Tests**: Test complete user workflows and scenarios
4. **Performance Tests**: Monitor and optimize performance impact
5. **Security Tests**: Validate security measures and vulnerability prevention

## Benefits

### For Single Developer
- **Clear Structure**: Easy to understand and navigate
- **Fast Development**: Less time on architecture, more on features
- **Easy Maintenance**: Simple dependency management
- **Testable Code**: Business logic can be tested independently

### For Future Growth
- **Easy Module Extraction**: Clear boundaries make modularization simple
- **Team Onboarding**: New developers can understand the structure quickly
- **Feature Isolation**: Each feature is self-contained through use cases
- **Scalable Architecture**: Can evolve to modular architecture when needed

### For WordPress Integration
- **Clean Abstractions**: WordPress functions are properly abstracted and testable
- **Testable Code**: Business logic can be tested without WordPress dependencies
- **Flexible Deployment**: Features can be enabled/disabled independently
- **Plugin Ecosystem**: Clear APIs for other plugins to integrate with

## Future Considerations

### Module Extraction Path
When the team grows or complexity increases, the architecture can easily evolve:

1. **Identify Feature Boundaries**: Group related use cases and entities
2. **Extract Module Structure**: Create module directories with Clean Architecture
3. **Move Code**: Relocate files to module-specific locations
4. **Update Namespaces**: Change namespaces to reflect module structure
5. **Create Module Bootstraps**: Add module lifecycle management

### Example Extraction
```bash
# Current structure
src/Application/UseCase/InstallPluginUseCase.php
src/Domain/Entity/Plugin.php
src/Infrastructure/WordPress/WordPressPluginRepository.php

# After extraction to PluginsDashboard module
src/Module/PluginsDashboard/Application/UseCase/InstallPluginUseCase.php
src/Module/PluginsDashboard/Domain/Entity/Plugin.php
src/Module/PluginsDashboard/Infrastructure/Repository/WordPressPluginRepository.php
```

## Getting Started

### For New Developers
1. **Understand the Layers**: Learn the responsibility of each layer
2. **Follow Use Case Pattern**: Start with business operations
3. **Use Domain Models**: Leverage entities and value objects
4. **Write Tests**: Test your code as you write it
5. **Document**: Document your changes and architectural decisions

### For Feature Development
1. **Define the Use Case**: Identify the business operation
2. **Create DTOs**: Define input and output data structures
3. **Implement Domain Logic**: Add business rules to entities
4. **Build Infrastructure**: Create repository and adapter implementations
5. **Add Presentation**: Create controllers and views for user interaction

