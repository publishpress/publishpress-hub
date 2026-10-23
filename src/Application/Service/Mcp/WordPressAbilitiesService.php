<?php

/**
 * Register Hub's read-only WordPress lookup abilities.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Mcp;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;

class WordPressAbilitiesService implements BootableInterface
{
    use BootableTrait;

    private WordPressLookupService $lookups;

    /**
     * @since 1.2.0
     */
    public function __construct(WordPressLookupService $lookups)
    {
        $this->lookups = $lookups;
    }

    /**
     * Register hooks independently of the current request's authentication.
     *
     * @since 1.2.0
     */
    protected function onLoad(): void
    {
        add_action('wp_abilities_api_categories_init', [$this, 'registerCategory']);
        add_action('wp_abilities_api_init', [$this, 'registerAbilities']);
    }

    /**
     * @since 1.2.0
     */
    protected function onInit(): void
    {
    }

    /**
     * @since 1.2.0
     */
    public function registerCategory(): void
    {
        if (function_exists('wp_has_ability_category') && !wp_has_ability_category('publishpress')) {
            wp_register_ability_category('publishpress', [
                'label' => __('PublishPress', 'publishpress-hub'),
                'description' => __('Actions available through PublishPress Hub.', 'publishpress-hub'),
            ]);
        }
    }

    /**
     * Register only explicitly described, bounded lookup operations.
     *
     * @since 1.2.0
     */
    public function registerAbilities(): void
    {
        if (!function_exists('wp_register_ability')) {
            return;
        }
        $page = ['type' => 'integer', 'minimum' => 1];
        $limit = ['type' => 'integer', 'minimum' => 1, 'maximum' => 100];
        $text = ['type' => 'string', 'minLength' => 1, 'maxLength' => 200];
        $definitions = [
            'list-users' => [
                __('List WordPress users', 'publishpress-hub'),
                __('Find users by name or role. The optional primitive capability filter checks effective access within each candidate page. Visit all total_pages even when a filtered page is empty. No email addresses or secrets are returned.', 'publishpress-hub'),
                'listUsers',
                ['search' => $text, 'role' => $text, 'capability' => $text, 'page' => $page, 'per_page' => $limit],
                'list_users',
            ],
            'get-user' => [
                __('Get WordPress user capabilities', 'publishpress-hub'),
                __('Resolve exactly one user_id or username and return their identity, roles and effective primitive capabilities. Never guess a user ID. Object-specific permissions require a separate check for that object.', 'publishpress-hub'),
                'getUser', ['user_id' => $page, 'username' => $text], 'list_users',
            ],
            'find-content' => [
                __('Find WordPress content', 'publishpress-hub'),
                __('Search readable posts, pages or a REST-enabled custom post type. Returns actual IDs, titles and permalinks. Use post_type=page for pages. Resolve ambiguous titles before using a URL. Default status is publish. Private and draft requests enforce WordPress permissions.', 'publishpress-hub'),
                'findContent', [
                    'post_type' => $text, 'search' => $text, 'page' => $page, 'per_page' => $limit,
                    'status' => $text,
                    'include' => ['type' => 'array', 'items' => $page, 'maxItems' => 100],
                ], 'read',
            ],
            'list-post-types' => [
                __('List WordPress post types', 'publishpress-hub'),
                __('List readable REST-enabled post types and the capability names used for each type. Use these names for content lookups and permission questions.', 'publishpress-hub'),
                'listPostTypes', [], 'read',
            ],
        ];
        foreach ($definitions as $name => [$label, $description, $method, $properties, $capability]) {
            wp_register_ability('wordpress/' . $name, [
                'label' => $label,
                'description' => $description,
                'category' => 'publishpress',
                'input_schema' => [
                    'type' => 'object', 'properties' => $properties ?: new \stdClass(),
                    'additionalProperties' => false,
                ],
                'output_schema' => $this->outputSchema($method),
                'permission_callback' => static function () use ($capability): bool {
                    return HubAccessService::canManageMcp() && current_user_can($capability);
                },
                'execute_callback' => [$this->lookups, $method],
                'meta' => [
                    'public' => false, 'show_in_rest' => false, 'mcp' => ['public' => false],
                    'publishpress' => ['plugin_name' => __('WordPress', 'publishpress-hub')],
                    'annotations' => ['readonly' => true, 'destructive' => false, 'idempotent' => true],
                ],
            ]);
        }
    }

    /**
     * Describe lookup results for clients without exposing arbitrary user fields.
     *
     * @since 1.2.0
     */
    private function outputSchema(string $method): array
    {
        $string = ['type' => 'string'];
        $integer = ['type' => 'integer'];
        $identity = [
            'id' => $integer, 'username' => $string, 'display_name' => $string,
            'roles' => ['type' => 'array', 'items' => $string],
        ];
        $properties = [
            'listUsers' => [
                'users' => ['type' => 'array', 'items' => ['type' => 'object', 'properties' => $identity]],
                'page' => $integer, 'total_candidates' => $integer, 'total_pages' => $integer,
            ],
            'getUser' => $identity + [
                'capabilities' => ['type' => 'object', 'additionalProperties' => ['type' => 'boolean']],
            ],
            'findContent' => [
                'items' => ['type' => 'array', 'items' => ['type' => 'object', 'properties' => [
                    'id' => $integer, 'link' => $string, 'slug' => $string, 'status' => $string, 'type' => $string,
                    'title' => ['type' => 'object', 'properties' => ['rendered' => $string]],
                ]]],
                'total' => $integer, 'total_pages' => $integer,
            ],
            'listPostTypes' => [
                'post_types' => ['type' => 'array', 'items' => ['type' => 'object', 'properties' => [
                    'name' => $string, 'label' => $string,
                    'capabilities' => ['type' => 'object', 'additionalProperties' => $string],
                ]]],
            ],
        ];
        return [
            'type' => 'object', 'properties' => $properties[$method],
            'required' => array_keys($properties[$method]), 'additionalProperties' => false,
        ];
    }
}
