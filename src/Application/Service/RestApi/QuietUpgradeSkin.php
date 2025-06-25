<?php

namespace PublishPress\Hub\Application\Service\RestApi;

/**
 * Quiet upgrader skin for REST API plugin installations.
 *
 * This class suppresses all HTML output that WordPress normally
 * generates during plugin installation to ensure clean JSON responses.
 */
class QuietUpgradeSkin extends \WP_Upgrader_Skin
{
    /**
     * Suppress feedback messages.
     *
     * @param string $string Message to suppress
     * @param mixed ...$args Additional arguments to suppress
     */
    public function feedback($string, ...$args) {}

    /**
     * Suppress header output.
     */
    public function header() {}

    /**
     * Suppress footer output.
     */
    public function footer() {}

    /**
     * Suppress error output.
     *
     * @param string|WP_Error $errors Errors to suppress
     */
    public function error($errors) {}

    /**
     * Suppress before output.
     */
    public function before() {}

    /**
     * Suppress after output.
     */
    public function after() {}

    /**
     * Suppress bulk header output.
     */
    public function bulk_header() {}

    /**
     * Suppress bulk footer output.
     */
    public function bulk_footer() {}

    /**
     * Suppress decrement upgrade count.
     *
     * @param string $type The type of update being decremented.
     */
    public function decrement_update_count($type) {}
}
