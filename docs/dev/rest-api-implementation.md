# REST API Implementation

This document describes the REST API implementation for PublishPress Hub, following the Clean Architecture pattern and feature-based organization.

## Overview

The REST API is implemented across all layers of the Clean Architecture:

- **Infrastructure Layer**: WordPress REST API adapters and services
- **Application Layer**: Use cases and DTOs for API operations
- **Presentation Layer**: Controllers that handle HTTP requests
- **Domain Layer**: Business logic and entities

## Architecture Components

### Infrastructure Layer

#### REST API Service (`src/Infrastructure/RestApi/RestApiService.php`)
- Manages route registration and provides clean abstractions
- Implements `RestApiServiceInterface`
- Coordinates with WordPress REST API adapter

#### WordPress REST API Adapter (`src/Infrastructure/WordPress/RestApi/WordPressRestApiAdapter.php`)
- Provides clean abstractions over WordPress REST API functions
- Handles route registration, response creation, and request validation
- Implements `RestApiServiceInterface`

#### WordPress Plugin Adapter (`src/Infrastructure/WordPress/Plugin/WordPressPluginAdapter.php`)
- Handles plugin installation, activation, and management
- Provides clean abstractions over WordPress plugin functions
- Includes security checks for allowed plugins

#### REST API Entities
- `RestRoute`: Represents a WordPress REST API route configuration
- `RestRequest`: Wraps WordPress REST API request objects
- `RestResponse`: Wraps WordPress REST API response objects

### Application Layer

#### Use Cases
- `ListPluginsUseCase`: Handles plugin listing with filtering and pagination
- `InstallPluginUseCase`: Handles plugin installation with validation

#### DTOs (Data Transfer Objects)
- `PluginListRequest`: Input data for plugin listing
- `PluginListResponse`: Output data for plugin listing with pagination
- `PluginInstallRequest`: Input data for plugin installation
- `PluginInstallResponse`: Output data for plugin installation results

### Presentation Layer

#### Plugin API Controller (`src/Presentation/Controller/PluginApiController.php`)
- Handles HTTP requests for plugin operations
- Implements `BootableInterface` for lifecycle management
- Registers REST API routes
- Coordinates with use cases and handles responses

## API Endpoints

### GET /wp-json/publishpress-hub/v1/plugins
Lists available plugins with filtering and pagination.

**Query Parameters:**
- `family` (optional): Filter by plugin family
- `status` (optional): Filter by plugin status (active, installed, available)
- `page` (optional): Page number for pagination (default: 1)
- `per_page` (optional): Items per page (default: 20)

**Response:**
```json
{
  "plugins": [
    {
      "id": "publishpress-authors",
      "name": "PublishPress Authors",
      "slug": "publishpress-authors",
      "version": "1.0.0",
      "status": "available",
      "family": "Authors",
      "is_installed": false,
      "is_active": false,
      "is_licensed": false,
      "details_url": "https://wordpress.org/plugins/publishpress-authors/",
      "type": "free"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "per_page": 20,
    "total_pages": 1
  }
}
```

### POST /wp-json/publishpress-hub/v1/plugins/{slug}/install/{type}
Installs a plugin by slug and type.

**URL Parameters:**
- `slug`: Plugin slug (e.g., "publishpress-authors")
- `type`: Plugin type ("free" or "pro")

**Response:**
```json
{
  "success": true,
  "message": "Plugin installed successfully",
  "plugin_id": "publishpress-authors",
  "status": "installed"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Plugin not found"
}
```

## Security

- All endpoints require `manage_options` capability
- Plugin installation is restricted to allowed plugins
- Nonce verification for WordPress REST API
- Input validation and sanitization

## Container Configuration

The REST API components are registered in the dependency injection container:

```php
// Infrastructure Services
AbstractDependencies::REST_API_ADAPTER => WordPressRestApiAdapter
AbstractDependencies::REST_API_SERVICE => RestApiService

// Application Services
AbstractDependencies::PLUGIN_FAMILY_REPOSITORY => PluginFamilyRepository
AbstractDependencies::WORDPRESS_PLUGIN_ADAPTER => WordPressPluginAdapter
AbstractDependencies::LIST_PLUGINS_USE_CASE => ListPluginsUseCase
AbstractDependencies::INSTALL_PLUGIN_USE_CASE => InstallPluginUseCase

// Presentation Services
AbstractDependencies::PLUGIN_API_CONTROLLER => PluginApiController
```

## Testing

The REST API can be tested using:

1. **WordPress REST API testing tools** (Postman, Insomnia)
2. **HTTP client libraries** in your preferred language
3. **WordPress REST API test suite** for automated testing

### Example Test Request

```bash
# List plugins
curl -X GET "http://localhost/wp-json/publishpress-hub/v1/plugins" \
  -H "Authorization: Basic YWRtaW46YXBwLXBhc3N3b3Jk" \
  -H "Content-Type: application/json"

# Install plugin
curl -X POST "http://localhost/wp-json/publishpress-hub/v1/plugins/publishpress-authors/install/free" \
  -H "Authorization: Basic YWRtaW46YXBwLXBhc3N3b3Jk" \
  -H "Content-Type: application/json"
```

## Benefits of This Implementation

1. **Clean Architecture**: Clear separation of concerns across layers
2. **Feature-Based Organization**: Plugin-related functionality grouped together
3. **Testability**: Each component can be unit tested independently
4. **Maintainability**: Clear interfaces and contracts
5. **WordPress Integration**: Clean abstractions over WordPress functions
6. **Security**: Proper validation and permission checks
7. **Scalability**: Easy to add new endpoints and features

## Future Enhancements

1. **Additional Endpoints**: Plugin activation, deactivation, deletion
2. **Component Showcase API**: REST API for component showcase feature
3. **Module Management API**: REST API for module management
4. **Rate Limiting**: API rate limiting for security
5. **Caching**: Response caching for performance
6. **Documentation**: OpenAPI/Swagger documentation
7. **Versioning**: API versioning strategy

## Usage in Frontend

The REST API is designed to work with the React frontend:

```javascript
// Example frontend usage
const response = await apiFetch({
  path: '/publishpress-hub/v1/plugins',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

const plugins = response.plugins;
```

This implementation provides a solid foundation for the PublishPress Hub REST API, following best practices and the established architecture patterns.
