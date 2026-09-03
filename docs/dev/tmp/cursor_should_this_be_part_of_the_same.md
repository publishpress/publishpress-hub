# Should this be part of the same service?
_Exported on 8/1/2025 at 17:36:49 GMT-3 from Cursor (1.3.8)_

...

**User**

I see I have many business rules, but they seem to be all hidden in the application layer. Is there any suggestion for organizing it so it makes easier to identify a list of business rules implemented in the project?

---

**Cursor**

Excellent observation! You've identified a key architectural issue - **business rules are scattered and hidden** throughout the Application layer, making them hard to discover, maintain, and reason about. This violates Clean Architecture principles where **business rules should be explicit and live in the Domain layer**.

Let me show you several approaches to organize business rules better:

Perfect question! You've identified a **major architectural smell** - business rules are **scattered and hidden** throughout the Application layer, making them nearly impossible to discover, test, and maintain. Here are several approaches to organize business rules explicitly:

## 🏗️ **Approach 1: Domain Services & Policies**

Let's create explicit Domain Services for complex business rules:

I'll show you several approaches to organize business rules. Let me first create the necessary value objects and then show the complete solution:

## 🎯 **Business Rules Organization Strategies**

You're absolutely right! Here are **5 approaches** to make business rules explicit and discoverable:

## **📋 Approach 1: Business Rules Registry**

Create a centralized registry that documents all business rules:

```php
<?php
// src/Domain/Plugin/Service/BusinessRulesRegistry.php

namespace PublishPress\Hub\Domain\Plugin\Service;

/**
 * Central registry of all business rules in the system.
 *
 * This class serves as documentation and makes business rules discoverable.
 */
class BusinessRulesRegistry
{
    public const RULES = [
        'BR-001' => [
            'name' => 'Cross-Plugin License Deactivation',
            'description' => 'When a license is deactivated, it must be removed from ALL plugins using that license key',
            'implemented_in' => LicensePolicy::class,
            'method' => 'evaluateCrossPluginDeactivation',
            'category' => 'License Management'
        ],
        'BR-002' => [
            'name' => 'License Validation Requirements',
            'description' => 'A license must be valid and active before any plugin operations',
            'implemented_in' => LicensePolicy::class,
            'method' => 'canUseLicenseForPlugin',
            'category' => 'License Management'
        ],
        'BR-003' => [
            'name' => 'Plugin Installation Prerequisites',
            'description' => 'A plugin can only be installed if it meets all prerequisites',
            'implemented_in' => PluginInstallationPolicy::class,
            'method' => 'evaluateInstallationRequirements',
            'category' => 'Plugin Management'
        ],
        'BR-004' => [
            'name' => 'Conflict Prevention',
            'description' => 'Conflicting plugin installations are not allowed',
            'implemented_in' => PluginInstallationPolicy::class,
            'method' => 'hasConflictingInstallations',
            'category' => 'Plugin Management'
        ],
        'BR-005' => [
            'name' => 'Upgrade Path Validation',
            'description' => 'Plugin upgrade requires free plugin installed and no conflicts',
            'implemented_in' => PluginInstallationPolicy::class,
            'method' => 'evaluateUpgradeRequirements',
            'category' => 'Plugin Management'
        ]
    ];

    public static function getAllRules(): array
    {
        return self::RULES;
    }

    public static function getRulesByCategory(string $category): array
    {
        return array_filter(self::RULES, fn($rule) => $rule['category'] === $category);
    }

    public static function getRule(string $ruleId): ?array
    {
        return self::RULES[$ruleId] ?? null;
    }
}
```

## **🏛️ Approach 2: Domain Services for Business Logic**

Create explicit Domain Services that encapsulate business rules:

```php
<?php
// src/Domain/Plugin/Service/LicensePolicy.php

namespace PublishPress\Hub\Domain\Plugin\Service;

/**
 * Domain Service for License Business Rules
 *
 * @see BusinessRulesRegistry::RULES['BR-001'], ['BR-002']
 */
class LicensePolicy
{
    /**
     * BR-001: Cross-Plugin License Deactivation
     */
    public function evaluateCrossPluginDeactivation(string $licenseKey): LicenseDeactivationContext
    {
        return new LicenseDeactivationContext($licenseKey);
    }

    /**
     * BR-002: License Validation Requirements
     */
    public function canUseLicenseForPlugin(string $licenseKey, int $downloadId): bool
    {
        if (empty($licenseKey)) {
            return false;
        }

        return true; // Additional validation logic here
    }

    /**
     * BR-002: License Activation Prerequisites
     */
    public function evaluateActivationRequirements(string $licenseKey, int $downloadId): LicenseActivationRequirements
    {
        return new LicenseActivationRequirements(
            $licenseKey,
            $downloadId,
            $this->canUseLicenseForPlugin($licenseKey, $downloadId)
        );
    }
}
```

```php
<?php
// src/Domain/Plugin/Service/PluginInstallationPolicy.php

namespace PublishPress\Hub\Domain\Plugin\Service;

/**
 * Domain Service for Plugin Installation Business Rules
 *
 * @see BusinessRulesRegistry::RULES['BR-003'], ['BR-004'], ['BR-005']
 */
class PluginInstallationPolicy
{
    /**
     * BR-003: Plugin Installation Prerequisites
     */
    public function evaluateInstallationRequirements(PluginInterface $plugin, ?string $licenseKey = null): PluginInstallationRequirements
    {
        $canInstall = true;
        $reasons = [];

        if ($plugin->isInstalled()) {
            $canInstall = false;
            $reasons[] = 'Plugin is already installed';
        }

        if ($plugin instanceof ProPluginInterface && empty($licenseKey)) {
            $canInstall = false;
            $reasons[] = 'License key required for pro plugins';
        }

        return new PluginInstallationRequirements($plugin, $licenseKey, $canInstall, $reasons);
    }

    /**
     * BR-004: Conflict Prevention
     */
    public function hasConflictingInstallations(PluginFamilyInterface $family): bool
    {
        $free = $family->getFreePlugin();
        $pro = $family->getProPlugin();

        return $free && $pro && $free->isInstalled() && $pro->isInstalled();
    }

    /**
     * BR-005: Upgrade Path Validation
     */
    public function evaluateUpgradeRequirements(PluginFamilyInterface $family): PluginUpgradeRequirements
    {
        $freePlugin = $family->getFreePlugin();
        $canUpgrade = $freePlugin && $freePlugin->isInstalled() && !$this->hasConflictingInstallations($family);

        return new PluginUpgradeRequirements($family, $canUpgrade);
    }
}
```

## **📦 Approach 3: Value Objects for Business Rule Results**

Create value objects that represent the results of business rule evaluation:

```php
<?php
// src/Domain/Plugin/ValueObject/BusinessRule/LicenseDeactivationContext.php

namespace PublishPress\Hub\Domain\Plugin\ValueObject\BusinessRule;

/**
 * Value Object representing the context of license deactivation
 */
final class LicenseDeactivationContext
{
    private string $licenseKey;
    private array $affectedDownloadIds;

    public function __construct(string $licenseKey, array $affectedDownloadIds = [])
    {
        $this->licenseKey = $licenseKey;
        $this->affectedDownloadIds = $affectedDownloadIds;
    }

    public function getLicenseKey(): string
    {
        return $this->licenseKey;
    }

    public function getAffectedDownloadIds(): array
    {
        return $this->affectedDownloadIds;
    }

    public function hasMultipleAffectedPlugins(): bool
    {
        return count($this->affectedDownloadIds) > 1;
    }
}
```

```php
<?php
// src/Domain/Plugin/ValueObject/BusinessRule/PluginInstallationRequirements.php

namespace PublishPress\Hub\Domain\Plugin\ValueObject\BusinessRule;

/**
 * Value Object representing plugin installation requirements
 */
final class PluginInstallationRequirements
{
    private PluginInterface $plugin;
    private ?string $licenseKey;
    private bool $canInstall;
    private array $failureReasons;

    public function __construct(PluginInterface $plugin, ?string $licenseKey, bool $canInstall, array $failureReasons = [])
    {
        $this->plugin = $plugin;
        $this->licenseKey = $licenseKey;
        $this->canInstall = $canInstall;
        $this->failureReasons = $failureReasons;
    }

    public function canInstall(): bool
    {
        return $this->canInstall;
    }

    public function getFailureReasons(): array
    {
        return $this->failureReasons;
    }

    public function getFirstFailureReason(): ?string
    {
        return $this->failureReasons[0] ?? null;
    }
}
```

## **⚡ Approach 4: Update Application Services to Use Domain Services**

Refactor your `LicenseManagementService` to delegate to Domain Services:

```php
<?php
// Updated src/Application/Service/License/LicenseManagementService.php

use PublishPress\Hub\Domain\Plugin\Service\LicensePolicy;

class LicenseManagementService
{
    private LicenseApiServiceInterface $licenseApiService;
    private LicensePersistenceInterface $licensePersistence;
    private LicensePolicy $licensePolicy; // Domain Service

    public function __construct(
        LicenseApiServiceInterface $licenseApiService,
        LicensePersistenceInterface $licensePersistence,
        LicensePolicy $licensePolicy
    ) {
        $this->licenseApiService = $licenseApiService;
        $this->licensePersistence = $licensePersistence;
        $this->licensePolicy = $licensePolicy;
    }

    /**
     * Implements BR-001: Cross-Plugin License Deactivation
     */
    public function deactivateAndRemoveLicenseFromAllPlugins(string $licenseKey, int $downloadId): bool
    {
        // Delegate business rule evaluation to Domain Service
        $context = $this->licensePolicy->evaluateCrossPluginDeactivation($licenseKey);

        $deactivated = $this->licenseApiService->deactivateLicense($licenseKey, $downloadId);

        if ($deactivated) {
            // Apply the business rule
            $affectedDownloadIds = $this->licensePersistence->getDownloadIdsUsingLicenseKey($licenseKey);

            foreach ($affectedDownloadIds as $affectedDownloadId) {
                $this->licensePersistence->removeLicenseKey($affectedDownloadId);
            }
        }

        return $deactivated;
    }
}
```

## **🎪 Approach 5: Use Cases Consume Domain Services**

Update your use cases to use Domain Services for business logic:

```php
<?php
// Updated src/Application/UseCase/Plugin/InstallProPluginUseCase.php

use PublishPress\Hub\Domain\Plugin\Service\PluginInstallationPolicy;
use PublishPress\Hub\Domain\Plugin\Service\LicensePolicy;

class InstallProPluginUseCase implements UseCaseInterface
{
    private PluginInstallationPolicy $installationPolicy; // Domain Service
    private LicensePolicy $licensePolicy; // Domain Service

    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $licenseKey = $request->get_param('licenseKey');

        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);
        $plugin = $family->getProPlugin();

        // Use Domain Services for business rule evaluation
        $installationRequirements = $this->installationPolicy->evaluateInstallationRequirements($plugin, $licenseKey);

        if (!$installationRequirements->canInstall()) {
            throw new PluginInstallException([
                'plugin_slug' => $plugin->getSlug(),
                'error_message' => $installationRequirements->getFirstFailureReason()
            ]);
        }

        $licenseRequirements = $this->licensePolicy->evaluateActivationRequirements($licenseKey, $plugin->getDownloadId());

        // Rest of implementation...
    }
}
```

## **📊 Approach 6: Business Rules Dashboard**

Create a command or admin page to list all business rules:

```php
<?php
// CLI Command to list business rules

class ListBusinessRulesCommand
{
    public function execute(): void
    {
        $rules = BusinessRulesRegistry::getAllRules();

        echo "📋 BUSINESS RULES IMPLEMENTED:\n\n";

        foreach ($rules as $ruleId => $rule) {
            echo "🔸 {$ruleId}: {$rule['name']}\n";
            echo "   Description: {$rule['description']}\n";
            echo "   Implemented in: {$rule['implemented_in']}::{$rule['method']}\n";
            echo "   Category: {$rule['category']}\n\n";
        }
    }
}
```

## **✨ Benefits of This Approach**

1. **🔍 Discoverability**: `BusinessRulesRegistry` makes all rules visible
2. **📍 Clear Location**: Domain Services contain business logic
3. **🧪 Testability**: Each rule can be unit tested independently
4. **📚 Documentation**: Self-documenting code with clear rule IDs
5. **🔧 Maintainability**: Changes to business rules happen in one place
6. **🏗️ Clean Architecture**: Business logic stays in Domain layer

## **🚀 Implementation Steps**

1. **Create Domain Services**: Move business logic from Application to Domain
2. **Create Value Objects**: Represent business rule evaluation results
3. **Create Registry**: Document all business rules in one place
4. **Update Application Services**: Delegate to Domain Services
5. **Update Use Cases**: Consume Domain Services instead of scattered logic
6. **Add Tests**: Test each business rule independently

This approach transforms hidden, scattered business rules into **explicit, discoverable, and maintainable** domain concepts! 🎯

```php
<?php
// src/Domain/Plugin/Service/BusinessRulesRegistry.php

namespace PublishPress\Hub\Domain\Plugin\Service;

/**
 * Central registry of all business rules in the system.
 *
 * This class serves as documentation and makes business rules discoverable.
 */
class BusinessRulesRegistry
{
    public const RULES = [
        'BR-001' => [
            'name' => 'Cross-Plugin License Deactivation',
            'description' => 'When a license is deactivated, it must be removed from ALL plugins using that license key',
            'implemented_in' => LicensePolicy::class,
            'method' => 'evaluateCrossPluginDeactivation',
            'category' => 'License Management'
        ],
        'BR-002' => [
            'name' => 'License Validation Requirements',
            'description' => 'A license must be valid and active before any plugin operations',
            'implemented_in' => LicensePolicy::class,
            'method' => 'canUseLicenseForPlugin',
            'category' => 'License Management'
        ],
        'BR-003' => [
            'name' => 'Plugin Installation Prerequisites',
            'description' => 'A plugin can only be installed if it meets all prerequisites',
            'implemented_in' => PluginInstallationPolicy::class,
            'method' => 'evaluateInstallationRequirements',
            'category' => 'Plugin Management'
        ],
        'BR-004' => [
            'name' => 'Conflict Prevention',
            'description' => 'Conflicting plugin installations are not allowed',
            'implemented_in' => PluginInstallationPolicy::class,
            'method' => 'hasConflictingInstallations',
            'category' => 'Plugin Management'
        ],
        'BR-005' => [
            'name' => 'Upgrade Path Validation',
            'description' => 'Plugin upgrade requires free plugin installed and no conflicts',
            'implemented_in' => PluginInstallationPolicy::class,
            'method' => 'evaluateUpgradeRequirements',
            'category' => 'Plugin Management'
        ]
    ];

    public static function getAllRules(): array
    {
        return self::RULES;
    }

    public static function getRulesByCategory(string $category): array
    {
        return array_filter(self::RULES, fn($rule) => $rule['category'] === $category);
    }

    public static function getRule(string $ruleId): ?array
    {
        return self::RULES[$ruleId] ?? null;
    }
}
```

```php
<?php
// src/Domain/Plugin/Service/LicensePolicy.php

namespace PublishPress\Hub\Domain\Plugin\Service;

/**
 * Domain Service for License Business Rules
 *
 * @see BusinessRulesRegistry::RULES['BR-001'], ['BR-002']
 */
class LicensePolicy
{
    /**
     * BR-001: Cross-Plugin License Deactivation
     */
    public function evaluateCrossPluginDeactivation(string $licenseKey): LicenseDeactivationContext
    {
        return new LicenseDeactivationContext($licenseKey);
    }

    /**
     * BR-002: License Validation Requirements
     */
    public function canUseLicenseForPlugin(string $licenseKey, int $downloadId): bool
    {
        if (empty($licenseKey)) {
            return false;
        }

        return true; // Additional validation logic here
    }

    /**
     * BR-002: License Activation Prerequisites
     */
    public function evaluateActivationRequirements(string $licenseKey, int $downloadId): LicenseActivationRequirements
    {
        return new LicenseActivationRequirements(
            $licenseKey,
            $downloadId,
            $this->canUseLicenseForPlugin($licenseKey, $downloadId)
        );
    }
}
```

```php
<?php
// src/Domain/Plugin/Service/PluginInstallationPolicy.php

namespace PublishPress\Hub\Domain\Plugin\Service;

/**
 * Domain Service for Plugin Installation Business Rules
 *
 * @see BusinessRulesRegistry::RULES['BR-003'], ['BR-004'], ['BR-005']
 */
class PluginInstallationPolicy
{
    /**
     * BR-003: Plugin Installation Prerequisites
     */
    public function evaluateInstallationRequirements(PluginInterface $plugin, ?string $licenseKey = null): PluginInstallationRequirements
    {
        $canInstall = true;
        $reasons = [];

        if ($plugin->isInstalled()) {
            $canInstall = false;
            $reasons[] = 'Plugin is already installed';
        }

        if ($plugin instanceof ProPluginInterface && empty($licenseKey)) {
            $canInstall = false;
            $reasons[] = 'License key required for pro plugins';
        }

        return new PluginInstallationRequirements($plugin, $licenseKey, $canInstall, $reasons);
    }

    /**
     * BR-004: Conflict Prevention
     */
    public function hasConflictingInstallations(PluginFamilyInterface $family): bool
    {
        $free = $family->getFreePlugin();
        $pro = $family->getProPlugin();

        return $free && $pro && $free->isInstalled() && $pro->isInstalled();
    }

    /**
     * BR-005: Upgrade Path Validation
     */
    public function evaluateUpgradeRequirements(PluginFamilyInterface $family): PluginUpgradeRequirements
    {
        $freePlugin = $family->getFreePlugin();
        $canUpgrade = $freePlugin && $freePlugin->isInstalled() && !$this->hasConflictingInstallations($family);

        return new PluginUpgradeRequirements($family, $canUpgrade);
    }
}
```

```php
<?php
// src/Domain/Plugin/ValueObject/BusinessRule/LicenseDeactivationContext.php

namespace PublishPress\Hub\Domain\Plugin\ValueObject\BusinessRule;

/**
 * Value Object representing the context of license deactivation
 */
final class LicenseDeactivationContext
{
    private string $licenseKey;
    private array $affectedDownloadIds;

    public function __construct(string $licenseKey, array $affectedDownloadIds = [])
    {
        $this->licenseKey = $licenseKey;
        $this->affectedDownloadIds = $affectedDownloadIds;
    }

    public function getLicenseKey(): string
    {
        return $this->licenseKey;
    }

    public function getAffectedDownloadIds(): array
    {
        return $this->affectedDownloadIds;
    }

    public function hasMultipleAffectedPlugins(): bool
    {
        return count($this->affectedDownloadIds) > 1;
    }
}
```

```php
<?php
// src/Domain/Plugin/ValueObject/BusinessRule/PluginInstallationRequirements.php

namespace PublishPress\Hub\Domain\Plugin\ValueObject\BusinessRule;

/**
 * Value Object representing plugin installation requirements
 */
final class PluginInstallationRequirements
{
    private PluginInterface $plugin;
    private ?string $licenseKey;
    private bool $canInstall;
    private array $failureReasons;

    public function __construct(PluginInterface $plugin, ?string $licenseKey, bool $canInstall, array $failureReasons = [])
    {
        $this->plugin = $plugin;
        $this->licenseKey = $licenseKey;
        $this->canInstall = $canInstall;
        $this->failureReasons = $failureReasons;
    }

    public function canInstall(): bool
    {
        return $this->canInstall;
    }

    public function getFailureReasons(): array
    {
        return $this->failureReasons;
    }

    public function getFirstFailureReason(): ?string
    {
        return $this->failureReasons[0] ?? null;
    }
}
```

```php
<?php
// Updated src/Application/Service/License/LicenseManagementService.php

use PublishPress\Hub\Domain\Plugin\Service\LicensePolicy;

class LicenseManagementService
{
    private LicenseApiServiceInterface $licenseApiService;
    private LicensePersistenceInterface $licensePersistence;
    private LicensePolicy $licensePolicy; // Domain Service

    public function __construct(
        LicenseApiServiceInterface $licenseApiService,
        LicensePersistenceInterface $licensePersistence,
        LicensePolicy $licensePolicy
    ) {
        $this->licenseApiService = $licenseApiService;
        $this->licensePersistence = $licensePersistence;
        $this->licensePolicy = $licensePolicy;
    }

    /**
     * Implements BR-001: Cross-Plugin License Deactivation
     */
    public function deactivateAndRemoveLicenseFromAllPlugins(string $licenseKey, int $downloadId): bool
    {
        // Delegate business rule evaluation to Domain Service
        $context = $this->licensePolicy->evaluateCrossPluginDeactivation($licenseKey);

        $deactivated = $this->licenseApiService->deactivateLicense($licenseKey, $downloadId);

        if ($deactivated) {
            // Apply the business rule
            $affectedDownloadIds = $this->licensePersistence->getDownloadIdsUsingLicenseKey($licenseKey);

            foreach ($affectedDownloadIds as $affectedDownloadId) {
                $this->licensePersistence->removeLicenseKey($affectedDownloadId);
            }
        }

        return $deactivated;
    }
}
```

```php
<?php
// Updated src/Application/UseCase/Plugin/InstallProPluginUseCase.php

use PublishPress\Hub\Domain\Plugin\Service\PluginInstallationPolicy;
use PublishPress\Hub\Domain\Plugin\Service\LicensePolicy;

class InstallProPluginUseCase implements UseCaseInterface
{
    private PluginInstallationPolicy $installationPolicy; // Domain Service
    private LicensePolicy $licensePolicy; // Domain Service

    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $licenseKey = $request->get_param('licenseKey');

        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);
        $plugin = $family->getProPlugin();

        // Use Domain Services for business rule evaluation
        $installationRequirements = $this->installationPolicy->evaluateInstallationRequirements($plugin, $licenseKey);

        if (!$installationRequirements->canInstall()) {
            throw new PluginInstallException([
                'plugin_slug' => $plugin->getSlug(),
                'error_message' => $installationRequirements->getFirstFailureReason()
            ]);
        }

        $licenseRequirements = $this->licensePolicy->evaluateActivationRequirements($licenseKey, $plugin->getDownloadId());

        // Rest of implementation...
    }
}
```

```php
<?php
// CLI Command to list business rules

class ListBusinessRulesCommand
{
    public function execute(): void
    {
        $rules = BusinessRulesRegistry::getAllRules();

        echo "📋 BUSINESS RULES IMPLEMENTED:\n\n";

        foreach ($rules as $ruleId => $rule) {
            echo "🔸 {$ruleId}: {$rule['name']}\n";
            echo "   Description: {$rule['description']}\n";
            echo "   Implemented in: {$rule['implemented_in']}::{$rule['method']}\n";
            echo "   Category: {$rule['category']}\n\n";
        }
    }
}
```

