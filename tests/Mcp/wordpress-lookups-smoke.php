<?php

/**
 * Exercise WordPress lookup abilities in the isolated mcp_smoke_ fixture.
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
$service = new \PublishPress\Hub\Application\Service\Mcp\WordPressLookupService();
$abilities = new \PublishPress\Hub\Application\Service\Mcp\WordPressAbilitiesService($service, new \PublishPress\Hub\Application\Service\Mcp\WordPressWriteService());
$abilities->load();
$users = [];
$posts = [];
$check = static function (bool $result, string $message): void {
    if (!$result) {
        throw new RuntimeException($message);
    }
    echo "PASS: $message\n";
};
$token = 'hub_lookup_' . wp_generate_password(8, false);
try {
    foreach (['administrator', 'subscriber'] as $role) {
        $id = wp_insert_user(['user_login' => $token . $role, 'user_pass' => wp_generate_password(), 'role' => $role]);
        if (is_wp_error($id)) {
            throw new RuntimeException($id->get_error_message());
        }
        $users[$role] = $id;
    }
    wp_set_current_user($users['administrator']);
    $user = $service->getUser(['username' => $token . 'subscriber']);
    $check($user['id'] === $users['subscriber'] && $user['username'] === $token . 'subscriber', 'Exact username resolves actual identity');
    $check(!($user['capabilities']->edit_posts ?? false) && !isset($user['user_email']), 'Effective capabilities omit private account fields');
    $check(is_wp_error($service->getUser(['username' => $token . 'missing'])), 'Unknown username is not guessed');
    $check(is_wp_error($service->getUser(['username' => $token, 'user_id' => 1])), 'Ambiguous lookup inputs are rejected');
    $listed = $service->listUsers(['search' => $token, 'per_page' => 1]);
    $check(count($listed['users']) === 1 && $listed['total_pages'] === 2, 'User searches are bounded and paginated');
    $filtered = $service->listUsers(['search' => $token, 'capability' => 'publish_posts']);
    $check(count($filtered['users']) === 1 && $filtered['users'][0]['id'] === $users['administrator'], 'Capability search uses effective user access');
    foreach (['publish', 'draft', 'private'] as $status) {
        $posts[] = wp_insert_post(['post_title' => $token, 'post_status' => $status, 'post_author' => $users['administrator']]);
    }
    $content = $service->findContent(['search' => $token]);
    $check(!is_wp_error($content) && count($content['items']) === 1, 'Content lookup defaults to published posts');
    $check($content['items'][0]['id'] === $posts[0] && !empty($content['items'][0]['link']), 'Content returns verified IDs and permalinks');
    $check(!isset($content['items'][0]['content']), 'Lookup excludes post bodies');
    $draft = $service->findContent(['search' => $token, 'status' => 'draft']);
    $check(!is_wp_error($draft) && count($draft['items']) === 1, 'Authorized draft lookup works');
    $check(is_wp_error($service->findContent(['post_type' => 'missing'])), 'Unknown post types are rejected');
    $registered = wp_get_ability('wordpress/list-users');
    $check($registered !== null, 'WordPress abilities register through the Abilities API');
    $check(is_wp_error($registered->execute(['per_page' => 101])), 'Ability schema rejects unbounded page sizes');
    $check(!is_wp_error($registered->execute(['per_page' => 1])), 'User listing passes its output schema');
    $meta = $registered->get_meta();
    $check(!$meta['public'] && !$meta['mcp']['public'] && $meta['annotations']['readonly'], 'Abilities are private and read-only');
    $connection = new \PublishPress\Hub\Application\Service\Mcp\McpConnectionService(
        new \PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter()
    );
    $catalog = array_filter($connection->getActionCatalog(), static fn(array $action): bool => $action['plugin'] === 'wordpress');
    $check(count($catalog) === 7 && reset($catalog)['pluginLabel'] === 'WordPress', 'Lookup and write actions appear in the WordPress action tab');
    add_filter('pre_option_publishpress_hub_mcp_disabled_abilities', static fn() => ['wordpress/list-users']);
    $check(!in_array('wordpress/list-users', $connection->getAbilityNames(), true), 'Action exposure can exclude a core lookup');
    $check(in_array('wordpress/find-content', $connection->getAbilityNames(), true), 'Read-only mode exposes selected core lookups');
    $types = $service->listPostTypes([]);
    $check(in_array('page', array_column($types['post_types'], 'name'), true), 'Post type discovery includes pages');
    $private = $service->findContent(['search' => $token, 'status' => 'private']);
    $check(!is_wp_error($private) && count($private['items']) === 1, 'Authorized private content lookup works');
    register_post_type('hub_lookup', ['public' => true, 'show_in_rest' => true]);
    $posts[] = wp_insert_post(['post_title' => $token, 'post_status' => 'publish', 'post_type' => 'hub_lookup']);
    $custom = wp_get_ability('wordpress/find-content')->execute(['post_type' => 'hub_lookup', 'search' => $token]);
    $check(!is_wp_error($custom) && count($custom['items']) === 1, 'Custom post type lookup passes its ability output schema');
    $check(!is_wp_error(wp_get_ability('wordpress/get-user')->execute(['user_id' => $users['subscriber']])), 'User detail passes its output schema');
    $check(!is_wp_error(wp_get_ability('wordpress/list-post-types')->execute([])), 'Post type discovery passes its output schema');
    wp_set_current_user($users['subscriber']);
    $check(is_wp_error($registered->execute([])), 'Subscriber cannot execute Hub user abilities');
    $check(is_wp_error($service->listUsers([])), 'User listing enforces list_users permission');
    $check(is_wp_error($service->getUser(['user_id' => $users['administrator']])), 'User detail enforces permission');
    $check(is_wp_error($service->findContent(['status' => 'draft'])), 'Subscriber cannot search drafts');
    $private = $service->findContent(['search' => $token]);
    $check(!is_wp_error($private) && count($private['items']) === 1, 'Default content lookup excludes unreadable posts');
} finally {
    wp_set_current_user(0);
    foreach ($posts as $id) {
        wp_delete_post($id, true);
    }
    foreach ($users as $id) {
        wp_delete_user($id);
    }
}
