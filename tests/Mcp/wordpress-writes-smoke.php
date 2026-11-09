<?php

/**
 * Verify bounded WordPress write abilities in the isolated mcp_smoke_ fixture.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli' || count($argv) !== 2) {
    exit("Pass the isolated WordPress wp-load.php path.\n");
}
require $argv[1];
require __DIR__ . '/bootstrap-hub.php';
if ($GLOBALS['wpdb']->prefix !== 'mcp_smoke_') {
    exit("Use an isolated mcp_smoke_ database.\n");
}
require_once ABSPATH . 'wp-admin/includes/user.php';
$writes = new \PublishPress\Hub\Application\Service\Mcp\WordPressWriteService();
$abilities = new \PublishPress\Hub\Application\Service\Mcp\WordPressAbilitiesService(
    new \PublishPress\Hub\Application\Service\Mcp\WordPressLookupService(), $writes
);
$abilities->load();
$users = [];
$posts = [];
$roles = [];
$checks = 0;
$check = static function (bool $result, string $message) use (&$checks): void {
    if (!$result) {
        throw new RuntimeException($message);
    }
    ++$checks;
    echo "PASS: $message\n";
};
$call = static fn(string $name, array $input) => wp_get_ability('wordpress/' . $name)->execute($input);
$token = 'hub_write_' . wp_generate_password(8, false);
try {
    foreach (['administrator', 'contributor'] as $role) {
        $id = wp_insert_user(['user_login' => $token . $role, 'user_pass' => wp_generate_password(), 'role' => $role]);
        if (is_wp_error($id)) {
            throw new RuntimeException($id->get_error_message());
        }
        $users[$role] = $id;
    }
    wp_set_current_user($users['administrator']);
    $input = ['username' => $token . 'new', 'email' => $token . '@example.org', 'role' => 'subscriber', 'send_notification' => false];
    foreach (['false', 'true', '0', '1', 0, 1] as $notification) {
        $invalid = array_merge($input, ['send_notification' => $notification]);
        $check(is_wp_error($call('create-user', $invalid)), 'Notification preference requires a JSON boolean');
        $check(!username_exists($input['username']), 'Malformed notification preferences never create an account');
    }
    $created = $call('create-user', $input);
    $check(!is_wp_error($created), 'Create a user through the native REST controller');
    $users['created'] = $created['id'];
    $check($created['roles'] === ['subscriber'] && !$created['notification_requested'], 'Creation assigns only the requested role');
    $check(!isset($created['password'], $created['user_pass'], $created['email']), 'User output excludes authentication and contact secrets');
    $check(is_wp_error($call('create-user', $input)), 'Duplicate users are rejected');
    $check(is_wp_error($call('create-user', array_merge($input, ['username' => $token . 'bad', 'role' => 'missing-role']))), 'Unknown roles cannot create users');
    $removeRole = static function (array $roles): array {
        unset($roles['administrator']);
        return $roles;
    };
    add_filter('editable_roles', $removeRole);
    $check(is_wp_error($call('create-user', array_merge($input, ['username' => $token . 'restricted', 'email' => $token . 'restricted@example.org', 'role' => 'administrator']))), 'Role assignment honors editable_roles restrictions');
    remove_filter('editable_roles', $removeRole);
    $protected = ['manage_options', 'edit_users', 'promote_users', 'create_users', 'delete_users', 'remove_users',
        'activate_plugins', 'install_plugins', 'update_plugins', 'delete_plugins', 'edit_plugins', 'resume_plugins',
        'switch_themes', 'edit_themes', 'install_themes', 'update_themes', 'delete_themes', 'resume_themes', 'edit_files',
        'update_core', 'unfiltered_html', 'unfiltered_upload', 'manage_capabilities_future', 'manage_network_options'];
    $check(is_wp_error($call('create-user', array_merge($input, ['username' => $token . 'admin', 'role' => 'administrator']))), 'Administrator creation is rejected even for an authorized administrator');
    $protected = array_merge($protected, ['add_users', 'promote_user', 'edit_user', 'delete_user', 'deactivate_plugins', 'activate_plugin', 'deactivate_plugin', 'resume_plugin', 'resume_theme', 'upload_plugins', 'upload_themes', 'install_languages', 'update_languages', 'edit_css', 'customize', 'delete_site', 'update_php', 'update_https', 'manage_privacy_options', 'export_others_personal_data', 'erase_others_personal_data']);
    foreach ($protected as $index => $capability) {
        $role = 'hub_privileged_' . $index;
        add_role($role, 'Privileged fixture', ['read' => true, $capability => true]);
        $roles[] = $role;
        $request = array_merge($input, ['username' => $token . $index, 'email' => $token . $index . '@example.org', 'role' => $role]);
        $rejected = $call('create-user', $request);
        $check(is_wp_error($rejected) && $rejected->get_error_code() === 'mcp_privileged_role' && !username_exists($request['username']), 'Custom role cannot grant ' . $capability);
    }
    add_role('manage_capabilities_future', 'Privileged role name fixture', ['read' => true]);
    $roles[] = 'manage_capabilities_future';
    $check(is_wp_error($call('create-user', array_merge($input, ['username' => $token . 'implicit', 'role' => 'manage_capabilities_future']))), 'A protected role name cannot grant an implicit capability');
    add_role('hub_safe_flags', 'Safe fixture', ['read' => true, 'manage_options' => false, 'unfiltered_html' => false]);
    $roles[] = 'hub_safe_flags';
    $safe = $call('create-user', array_merge($input, ['username' => $token . 'safe', 'email' => $token . 'safe@example.org', 'role' => 'hub_safe_flags']));
    $check(!is_wp_error($safe), 'Explicitly denied protected capabilities do not make a role privileged');
    $users['safe'] = $safe['id'];
    $actor = wp_get_current_user();
    $actor->allcaps['create_users'] = false;
    $check(is_wp_error($call('create-user', $input)), 'Administrator role does not bypass denied create_users');
    $actor->allcaps['create_users'] = true;
    $check(is_wp_error($call('create-user', $input + ['password' => 'never-accepted'])), 'Tool schema rejects password input');

    $created = $call('create-content', ['title' => 'Write fixture', 'content' => 'Original body']);
    $check(!is_wp_error($created), 'Create a draft through the native post controller');
    $posts[] = $created['id'];
    $check($created['status'] === 'draft' && !isset($created['content']), 'Content defaults to draft and returns minimal identity');
    $updated = $call('update-content', ['id' => $created['id'], 'title' => 'Changed title']);
    $check(!is_wp_error($updated) && get_post($created['id'])->post_content === 'Original body', 'Updates preserve fields that were not supplied');
    $check(
        is_wp_error($call('update-content', ['id' => (string) $created['id'], 'title' => 'Malformed ID']))
            && get_post($created['id'])->post_title === 'Changed title',
        'String IDs cannot silently update content'
    );
    $check(is_wp_error($call('update-content', ['id' => $created['id']])), 'Empty updates are rejected');
    $check(is_wp_error($call('update-content', ['id' => $created['id'], 'meta' => ['unsafe' => 'value']])), 'Arbitrary metadata is excluded');
    $page = $call('create-content', ['title' => 'Page fixture', 'post_type' => 'page', 'status' => 'publish']);
    $check(!is_wp_error($page) && $page['type'] === 'page' && $page['status'] === 'publish', 'Authorized page publishing works');
    $posts[] = $page['id'];
    register_post_type('hub_write', ['public' => true, 'show_in_rest' => true]);
    $custom = $call('create-content', ['title' => 'Custom fixture', 'post_type' => 'hub_write']);
    $check(!is_wp_error($custom) && $custom['type'] === 'hub_write', 'REST-enabled custom content creation works');
    $posts[] = $custom['id'];
    $check(is_wp_error($call('create-content', ['title' => 'Invalid', 'post_type' => 'unknown-type'])), 'Unknown post types are rejected');

    $contributor = new WP_User($users['contributor']);
    $contributor->add_cap('manage_options');
    wp_set_current_user($users['contributor']);
    $draft = $call('create-content', ['title' => 'Contributor draft']);
    $check(!is_wp_error($draft), 'Hub access alone does not block otherwise authorized draft creation');
    $posts[] = $draft['id'];
    $check(is_wp_error($call('update-content', ['id' => $draft['id'], 'status' => 'publish'])), 'Publishing requires the post type publish capability');
    $check(get_post_status($draft['id']) === 'draft', 'Denied publishing leaves the draft unchanged');
    $check(is_wp_error($call('update-content', ['id' => $posts[0], 'title' => 'Forbidden'])), 'Updating another user content enforces object permission');
    $check(is_wp_error($call('create-content', ['title' => 'Forbidden author', 'author' => $users['administrator']])), 'Author assignment enforces native permissions');
    $check(is_wp_error($call('create-user', $input)), 'Hub administration does not grant user creation');
    wp_set_current_user(0);
    $check(is_wp_error($call('create-content', ['title' => 'Anonymous'])), 'Anonymous callers cannot write');

    $connection = new \PublishPress\Hub\Application\Service\Mcp\McpConnectionService(
        new \PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter()
    );
    add_filter('pre_option_publishpress_hub_mcp_writes_enabled', '__return_zero');
    $check(!in_array('wordpress/create-content', $connection->getAbilityNames(), true), 'Write actions remain hidden with write access disabled');
    echo "Completed $checks WordPress write checks with WordPress $wp_version.\n";
} finally {
    wp_set_current_user(0);
    foreach ($posts as $id) {
        wp_delete_post($id, true);
    }
    foreach ($users as $id) {
        wp_delete_user($id);
    }
    foreach ($roles as $role) {
        remove_role($role);
    }
}
