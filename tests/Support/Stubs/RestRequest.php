<?php

declare(strict_types=1);

// Unit tests do not bootstrap WordPress.
if (!class_exists('WP_REST_Request')) {
    class WP_REST_Request
    {
        public function get_param($name)
        {
            return null;
        }
    }
}
