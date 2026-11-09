<?php

/**
 * Synthetic abilities for testing Hub without installing a participating plugin.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

add_action('wp_abilities_api_categories_init', static function (): void {
    if (!wp_has_ability_category('publishpress')) {
        wp_register_ability_category('publishpress', [
            'label' => 'Test actions',
            'description' => 'Hub test fixtures.',
        ]);
    }
});
add_action('wp_abilities_api_init', static function (): void {
    foreach (['list-items', 'get-item', 'create-item'] as $action) {
        wp_register_ability('hub-fixture/' . $action, [
            'label' => $action,
            'description' => 'Synthetic Hub integration test action.',
            'category' => 'publishpress',
            'input_schema' => $action === 'get-item' ? [
                'type' => 'object',
                'properties' => ['item' => ['type' => 'string']],
                'required' => ['item'],
                'additionalProperties' => false,
            ] : ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
            'output_schema' => ['type' => 'object', 'additionalProperties' => true],
            'permission_callback' => static function (): bool {
                return current_user_can('use_fixture_actions');
            },
            'execute_callback' => static function (array $input) use ($action) {
                if ($action === 'get-item') {
                    return $input['item'] === 'example'
                        ? ['slug' => 'example'] : new WP_Error('unknown_item', 'Unknown fixture item.');
                }
                return ['items' => ['example']];
            },
            'meta' => [
                'public' => false,
                'show_in_rest' => false,
                'mcp' => ['public' => false],
                'annotations' => [
                    'readonly' => $action !== 'create-item',
                    'destructive' => false,
                    'idempotent' => $action !== 'create-item',
                ],
            ],
        ]);
    }
});
