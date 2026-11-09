<?php

/**
 * Perform bounded WordPress writes through the native REST controllers.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Mcp;

defined('ABSPATH') || exit;

class WordPressWriteService
{
    /**
     * Create a user without accepting or returning authentication secrets.
     *
     * @since 1.2.0
     */
    public function createUser(array $input)
    {
        if (GrantPolicy::restrictedRole($input['role'])) {
            return new \WP_Error('mcp_privileged_role', __('MCP tools cannot create users with administrator-level access. Use the WordPress Users screen for this change.', 'publishpress-hub'), ['status' => 403]);
        }
        $controller = new \WP_REST_Users_Controller();
        $data = [
            'username' => $input['username'], 'email' => $input['email'],
            'roles' => [$input['role']], 'password' => wp_generate_password(32, true, true),
            'name' => $input['display_name'] ?? $input['username'],
        ];
        $result = $this->write($controller, $data, true, '/wp/v2/users');
        if (is_wp_error($result)) {
            return $result;
        }
        $user = get_user_by('id', $result['id']);
        $notify = $input['send_notification'] ?? true;
        if ($notify) {
            wp_new_user_notification($user->ID, null, 'user');
        }
        return [
            'id' => $user->ID, 'username' => $user->user_login,
            'display_name' => $user->display_name, 'roles' => array_values($user->roles),
            'notification_requested' => $notify,
        ];
    }

    /**
     * Create content as a draft unless another status is explicitly requested.
     *
     * @since 1.2.0
     */
    public function createContent(array $input)
    {
        $input['status'] = $input['status'] ?? 'draft';
        return $this->content($input, true);
    }

    /**
     * Update only the supplied fields on a known content ID.
     *
     * @since 1.2.0
     */
    public function updateContent(array $input)
    {
        if (!array_intersect(['title', 'content', 'excerpt', 'status', 'slug', 'author', 'date'], array_keys($input))) {
            return new \WP_Error('empty_update', __('Provide at least one content field to update.', 'publishpress-hub'));
        }
        return $this->content($input, false);
    }

    /**
     * Use each post type's controller and object permission checks.
     *
     * @since 1.2.0
     */
    private function content(array $input, bool $create)
    {
        $postType = $input['post_type'] ?? ($create ? 'post' : get_post_type($input['id']));
        $type = $postType ? get_post_type_object($postType) : null;
        if (!$type || !$type->show_in_rest) {
            return new \WP_Error('unknown_post_type', __('Choose an existing REST-enabled post type.', 'publishpress-hub'));
        }
        $controller = $type->get_rest_controller();
        if (!$controller instanceof \WP_REST_Posts_Controller) {
            return new \WP_Error('unsupported_post_type', __('This post type does not support content writes.', 'publishpress-hub'));
        }
        $data = array_intersect_key($input, array_flip(['id', 'title', 'content', 'excerpt', 'status', 'slug', 'author', 'date']));
        $result = $this->write($controller, $data, $create, '/' . $type->rest_namespace . '/' . ($type->rest_base ?: $type->name));
        if (is_wp_error($result)) {
            return $result;
        }
        return array_intersect_key($result, array_flip(['id', 'title', 'link', 'status', 'type', 'slug']));
    }

    /**
     * Apply REST validation, permission callbacks and native execution hooks.
     *
     * @since 1.2.0
     */
    private function write(\WP_REST_Controller $controller, array $data, bool $create, string $route)
    {
        $request = new \WP_REST_Request('POST', $route . ($create ? '' : '/' . $data['id']));
        foreach ($data as $key => $value) {
            $request->set_param($key, $value);
        }
        $request->set_param('_fields', 'id,title,link,status,type,slug');
        $method = $create ? \WP_REST_Server::CREATABLE : \WP_REST_Server::EDITABLE;
        $args = $controller->get_endpoint_args_for_item_schema($method);
        $request->set_attributes(['args' => $args]);
        $valid = $request->has_valid_params();
        if (is_wp_error($valid)) {
            return $valid;
        }
        $valid = $request->sanitize_params();
        if (is_wp_error($valid)) {
            return $valid;
        }
        $permission = $create ? 'create_item_permissions_check' : 'update_item_permissions_check';
        $allowed = $controller->$permission($request);
        if (is_wp_error($allowed) || !$allowed) {
            return is_wp_error($allowed) ? $allowed : new \WP_Error('forbidden', __('You cannot perform this operation.', 'publishpress-hub'));
        }
        $operation = $create ? 'create_item' : 'update_item';
        $response = $controller->$operation($request);
        return is_wp_error($response) ? $response : $response->get_data();
    }
}
