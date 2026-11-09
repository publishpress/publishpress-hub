<?php

/**
 * Read WordPress identities and content through permission-checked lookups.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Mcp;

defined('ABSPATH') || exit;

class WordPressLookupService
{
    /**
     * List site users without exposing emails or authentication data.
     *
     * @since 1.2.0
     */
    public function listUsers(array $input)
    {
        if (!current_user_can('list_users')) {
            return new \WP_Error('forbidden', __('You cannot list users.', 'publishpress-hub'));
        }
        $query = new \WP_User_Query([
            'blog_id' => get_current_blog_id(),
            'number' => $input['per_page'] ?? 20,
            'paged' => $input['page'] ?? 1,
            'search' => empty($input['search']) ? '' : '*' . $input['search'] . '*',
            'search_columns' => ['user_login', 'display_name'],
            'role' => $input['role'] ?? '',
            'orderby' => 'ID',
            'order' => 'ASC',
        ]);
        $users = [];
        foreach ($query->get_results() as $user) {
            if (isset($input['capability']) && !user_can($user, $input['capability'])) {
                continue;
            }
            $users[] = $this->userIdentity($user);
        }
        return [
            'users' => $users,
            'page' => $input['page'] ?? 1,
            'total_candidates' => (int) $query->get_total(),
            'total_pages' => (int) ceil($query->get_total() / ($input['per_page'] ?? 20)),
        ];
    }

    /**
     * Resolve an exact username or ID before describing effective capabilities.
     *
     * @since 1.2.0
     */
    public function getUser(array $input)
    {
        if (!current_user_can('list_users')) {
            return new \WP_Error('forbidden', __('You cannot list users.', 'publishpress-hub'));
        }
        if (isset($input['user_id']) === isset($input['username'])) {
            return new \WP_Error('invalid_user', __('Provide either a user ID or an exact username.', 'publishpress-hub'));
        }
        $user = isset($input['username'])
            ? get_user_by('login', $input['username']) : get_user_by('id', $input['user_id']);
        if (!$user || !is_user_member_of_blog($user->ID, get_current_blog_id())) {
            return new \WP_Error('unknown_user', __('No matching user belongs to this site.', 'publishpress-hub'));
        }
        if (!current_user_can('edit_user', $user->ID)) {
            return new \WP_Error('forbidden', __('You cannot inspect this user.', 'publishpress-hub'));
        }
        $capabilities = [];
        foreach (array_keys($user->allcaps) as $capability) {
            $capabilities[$capability] = user_can($user, $capability);
        }
        return $this->userIdentity($user) + ['capabilities' => (object) $capabilities];
    }

    /**
     * Find readable content using the post type's REST controller permissions.
     *
     * @since 1.2.0
     */
    public function findContent(array $input)
    {
        $type = get_post_type_object($input['post_type'] ?? 'post');
        if (!$type || !$type->show_in_rest) {
            return new \WP_Error('unknown_post_type', __('Choose a REST-enabled post type.', 'publishpress-hub'));
        }
        $controller = $type->get_rest_controller();
        if (!$controller instanceof \WP_REST_Posts_Controller) {
            return new \WP_Error('unsupported_post_type', __('This post type does not support content lookup.', 'publishpress-hub'));
        }
        $request = new \WP_REST_Request('GET');
        foreach (['search', 'page', 'per_page', 'status', 'include'] as $key) {
            if (isset($input[$key])) {
                $request->set_param($key, $input[$key]);
            }
        }
        $request->set_param('context', 'view');
        $request->set_param('_fields', 'id,title,link,status,type,slug');
        // Match REST defaults and validation even when called outside a REST route.
        $request->set_attributes(['args' => $controller->get_collection_params()]);
        $defaults = [];
        foreach ($controller->get_collection_params() as $key => $schema) {
            if (isset($schema['default'])) {
                $defaults[$key] = $schema['default'];
            }
        }
        $request->set_default_params($defaults);
        $valid = $request->has_valid_params();
        if (is_wp_error($valid)) {
            return $valid;
        }
        $valid = $request->sanitize_params();
        if (is_wp_error($valid)) {
            return $valid;
        }
        $allowed = $controller->get_items_permissions_check($request);
        if (is_wp_error($allowed) || !$allowed) {
            return is_wp_error($allowed) ? $allowed : new \WP_Error('forbidden', 'Content lookup denied.');
        }
        $response = $controller->get_items($request);
        if (is_wp_error($response)) {
            return $response;
        }
        $headers = $response->get_headers();
        return [
            'items' => $response->get_data(),
            'total' => (int) ($headers['X-WP-Total'] ?? 0),
            'total_pages' => (int) ($headers['X-WP-TotalPages'] ?? 0),
        ];
    }

    /**
     * Describe readable REST post types and their capability mappings.
     *
     * @since 1.2.0
     */
    public function listPostTypes(array $input): array
    {
        $types = [];
        foreach (get_post_types(['show_in_rest' => true], 'objects') as $type) {
            if (!$type->public && !current_user_can($type->cap->edit_posts)) {
                continue;
            }
            $types[] = [
                'name' => $type->name,
                'label' => $type->label,
                'capabilities' => (object) $type->cap,
            ];
        }
        return ['post_types' => $types];
    }

    /**
     * Return the identity needed to distinguish users safely.
     *
     * @since 1.2.0
     */
    private function userIdentity(\WP_User $user): array
    {
        return [
            'id' => $user->ID,
            'username' => $user->user_login,
            'display_name' => $user->display_name,
            'roles' => array_values($user->roles),
        ];
    }
}
