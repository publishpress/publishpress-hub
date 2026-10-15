<?php

/**
 * License handlers family map.
 *
 * @package PublishPress\Hub\Infrastructure\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License;

defined('ABSPATH') || exit;

use PublishPress\Hub\Infrastructure\License\Handlers\RawStringHandler;
use PublishPress\Hub\Infrastructure\License\Handlers\SerializedArrayHandler;
use PublishPress\Hub\Infrastructure\License\Handlers\SerializedObjectHandler;

return [
    'cart' => [
        RawStringHandler::class,
        '_sc_pro_license_key',
        '_sc_pro_license_status',
    ],
    'taxonomies' => [
        RawStringHandler::class,
        'taxopress_license_key',
        'taxopress_license_status',
    ],
    'tag-groups' => [
        RawStringHandler::class,
        'tag_groups_license_key',
        'tag_groups_license_status',
    ],
    'checklists' => [
        SerializedObjectHandler::class,
        'publishpress_checklists_settings_options',
    ],
    'permissions' => [
        SerializedArrayHandler::class,
        'presspermit_edd_key',
    ],
    'authors' => [
        SerializedObjectHandler::class,
        'multiple_authors_multiple_authors_options',
    ],
    'blocks' => [
        RawStringHandler::class,
        'advgb_pro_license_key',
        'advgb_pro_license_status'
    ],
    'capabilities' => [
        SerializedArrayHandler::class,
        'cme_edd_key',
        'license_key',
        'license_status',
        'valid',
        'invalid',
    ],
    'future' => [
        RawStringHandler::class,
        'ppfuturepro_license_key',
        'ppfuturepro_license_status'
    ],
    'planner' => [
        SerializedObjectHandler::class,
        'publishpress_prosettings_options'
    ],
    'revisions' => [
        SerializedArrayHandler::class,
        'rvy_edd_key',
    ],
    'series' => [
        RawStringHandler::class,
        'ppseries_license_key',
        'ppseries_license_status',
    ],
    'shortlinks' => [
        RawStringHandler::class,
        'publishpress_shortlinks_pro_license_key',
        'publishpress_shortlinks_pro_license_status',
    ],
    'statuses' => [
        SerializedArrayHandler::class,
        'publishpress_statuses_edd_key',
    ],
];
