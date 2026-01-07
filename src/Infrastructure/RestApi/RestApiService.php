<?php

/**
 * Rest API service.
 *
 * @package PublishPress\Hub\Infrastructure\RestApi
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi;

use Exception;
use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Exception\ExceptionCode;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiAdapterInterface;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

class RestApiService implements RestApiServiceInterface, BootableInterface
{
    use BootableTrait;

    /**
     * Maximum number of requests allowed per window for a user.
     */
    private const RATE_LIMIT_MAX_REQUESTS = 60;

    /**
     * Time window in seconds for per-user rate limiting.
     */
    private const RATE_LIMIT_WINDOW_SECONDS = 60;

    private RestApiAdapterInterface $restApiAdapter;

    /**
     * @var array<RestRoute>
     */
    private array $routes = [];

    /**
     * @param RestApiAdapterInterface $restApiAdapter The rest API adapter.
     * @since 1.0.0
     */
    public function __construct(
        RestApiAdapterInterface $restApiAdapter
    ) {
        $this->restApiAdapter = $restApiAdapter;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        add_action(AbstractHooks::ACTION_REST_API_INIT, [$this, 'registerRoutes']);
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Add a route.
     *
     * @param RestRoute $route The route.
     * @since 1.0.0
     */
    public function addRoute(RestRoute $route): void
    {
        $this->routes[] = $route;
    }

    /**
     * Register routes.
     *
     * @since 1.0.0
     */
    public function registerRoutes(): void
    {
        foreach ($this->routes as $route) {
            $this->restApiAdapter->registerRoute($route, [$this, 'executeUseCase']);
        }

        // Fire action after all routes are registered
        do_action(AbstractHooks::ACTION_REST_ROUTES_REGISTERED);
    }

    /**
     * Create a response.
     *
     * @param array<string, mixed> $data The data.
     * @param int $status The status.
     * @param array<string, mixed> $headers The headers.
     * @return WP_REST_Response The response.
     * @since 1.0.0
     */
    public function createResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response
    {
        return $this->restApiAdapter->createResponse($data, $status, $headers);
    }

    /**
     * Create a success response.
     *
     * @param array<string, mixed> $data The data.
     * @param int $status The status.
     * @param array<string, mixed> $headers The headers.
     * @return WP_REST_Response The response.
     * @since 1.0.0
     */
    public function createSuccessResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response
    {
        $data['success'] = true;

        return $this->createResponse($data, $status, $headers);
    }

    /**
     * Create an error response.
     *
     * @param string $message The message.
     * @param int $status The status.
     * @param string|int $code The code.
     * @param array<string, mixed> $context The context.
     * @return WP_REST_Response|WP_Error The response.
     * @since 1.0.0
     */
    public function createErrorResponse(
        string $message,
        int $status = 400,
        $code = 'error',
        array $context = []
    ) {
        return $this->restApiAdapter->createErrorResponse(
            $message,
            $status,
            $code,
            $context
        );
    }

    /**
     * Get the request data.
     *
     * @param WP_REST_Request $request The request.
     * @return array<string, mixed> The request data.
     * @since 1.0.0
     */
    public function getRequestData(WP_REST_Request $request): array
    {
        return $this->restApiAdapter->getRequestData($request);
    }

    /**
     * Get a request parameter.
     *
     * @param WP_REST_Request $request The request.
     * @param string $param The parameter.
     * @param mixed $default The default value.
     * @return mixed The request parameter.
     * @since 1.0.0
     */
    public function getRequestParam(WP_REST_Request $request, string $param, $default = null)
    {
        return $this->restApiAdapter->getRequestParam($request, $param, $default);
    }

    /**
     * Check permissions.
     *
     * @param string $capability The capability.
     * @return bool True if the user has the capability, false otherwise.
     * @since 1.0.0
     */
    public function checkPermissions(string $capability = 'manage_options'): bool
    {
        return current_user_can($capability);
    }

    /**
     * Verify a nonce.
     *
     * @param string $nonce The nonce.
     * @param string $action The action.
     * @return bool True if the nonce is valid, false otherwise.
     * @since 1.0.0
     */
    public function verifyNonce(string $nonce, string $action = 'wp_rest'): bool
    {
        return (bool) wp_verify_nonce($nonce, $action);
    }

    /**
     * Execute a callback (use case or callable).
     *
     * @param WP_REST_Request $request The request.
     * @param UseCaseInterface|callable $callback The use case or callable.
     * @return WP_REST_Response|WP_Error The response.
     * @since 1.0.0
     */
    public function executeUseCase(WP_REST_Request $request, $callback)
    {
        // Check rate limit before executing use case
        $rateLimitCheck = $this->checkRateLimit($request);
        if (is_wp_error($rateLimitCheck)) {
            return $rateLimitCheck;
        }

        try {
            if ($callback instanceof UseCaseInterface) {
                $response = $callback->execute($request);
            } else {
                $response = call_user_func($callback, $request);
            }

            return $this->createSuccessResponse($response);
        } catch (WithContextInterface $e) {
            // Sanitize the message for client consumption
            $safeMessage = $this->sanitizeErrorMessage($e->getMessage());

            // Filter context to remove sensitive information
            $safeContext = $this->sanitizeContext($e->getContext());

            // Log full details server-side for debugging
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log( // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                    esc_html(sprintf(
                        'REST API Error: %s | Code: %s | Context: %s',
                        $e->getMessage(),
                        $this->getErrorCodeFromException($e),
                        wp_json_encode($e->getContext())
                    ))
                );
            }

            return $this->createErrorResponse(
                $safeMessage,
                400,
                $this->getErrorCodeFromException($e),
                $safeContext
            );
        } catch (Exception $e) {
            // Sanitize generic exceptions
            $safeMessage = $this->sanitizeErrorMessage($e->getMessage());

            // Log full details server-side
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log( // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                    esc_html(sprintf(
                        'REST API Unknown Error: %s | Trace: %s',
                        $e->getMessage(),
                        $e->getTraceAsString()
                    ))
                );
            }

            return $this->createErrorResponse(
                $safeMessage,
                400,
                ExceptionCode::UNKNOWN_ERROR
            );
        }
    }

    /**
     * Check rate limit for a request using sliding window algorithm.
     *
     * @param WP_REST_Request $request The request.
     * @return bool|WP_Error True if within rate limit, WP_Error if rate limit exceeded.
     * @since 1.0.0
     */
    private function checkRateLimit(WP_REST_Request $request)
    {
        $user_id = get_current_user_id();
        $endpoint = $request->get_route();
        $key = 'rate_limit_' . md5($user_id . $endpoint);
        $now = time();

        // Get existing timestamps
        $timestamps = get_transient($key);
        if ($timestamps === false || !is_array($timestamps)) {
            $timestamps = [];
        }

        // Filter out timestamps outside the current window
        $timestamps = array_filter(
            $timestamps,
            function ($timestamp) use ($now) {
                return ($now - $timestamp) < self::RATE_LIMIT_WINDOW_SECONDS;
            }
        );

        // Check if limit exceeded
        if (count($timestamps) >= self::RATE_LIMIT_MAX_REQUESTS) {
            return new WP_Error(
                'rate_limit_exceeded',
                esc_html__('Too many requests. Please try again later.', 'publishpress-hub'),
                ['status' => 429]
            );
        }

        // Add current request timestamp
        $timestamps[] = $now;

        // Store updated timestamps with extended expiration to prevent premature cleanup
        set_transient($key, $timestamps, self::RATE_LIMIT_WINDOW_SECONDS * 2);

        return true;
    }

    /**
     * Get a meaningful error code from an exception.
     *
     * @param WithContextInterface $e The exception.
     * @return string The error code.
     * @since 1.0.0
     */
    private function getErrorCodeFromException(WithContextInterface $e): string
    {
        // Use the exception's code directly (now standardized)
        // Cast to string since we always set string codes
        return (string) $e->getCode();
    }

    /**
     * Get a meaningful error message from an exception.
     *
     * @param WithContextInterface $e The exception.
     * @return string The error message.
     * @since 1.0.0
     */
    private function getErrorMessageFromException(WithContextInterface $e): string
    {
        $context = $e->getContext();

        if (isset($context['error_message'])) {
            return $context['error_message'];
        }

        return $e->getMessage();
    }

    /**
     * Sanitize error messages for client consumption.
     *
     * @param string $message The original error message.
     * @return string The sanitized error message.
     * @since 1.0.0
     */
    private function sanitizeErrorMessage(string $message): string
    {
        // Remove file paths
        $message = preg_replace('/\/[^\s]+\.php:\d+/', '[file]', $message);

        // Remove absolute paths
        if (defined('ABSPATH')) {
            $message = preg_replace('/' . preg_quote(ABSPATH, '/') . '[^\s]+/', '[path]', $message);
        }

        // Remove database connection strings
        $message = preg_replace('/mysql:\/\/[^\s]+/', '[database]', $message);

        // Remove stack traces
        $message = preg_replace('/Stack trace:.*/s', '', $message);

        // If message is empty or too technical, return generic message
        if (empty($message) || strlen($message) > 500) {
            return esc_html__('An error occurred while processing your request.', 'publishpress-hub');
        }

        return esc_html($message);
    }

    /**
     * Sanitize context to remove sensitive information.
     *
     * @param array<string, mixed> $context The original context.
     * @return array<string, mixed> The sanitized context.
     * @since 1.0.0
     */
    private function sanitizeContext(array $context): array
    {
        $safeContext = [];
        $sensitiveKeys = ['password', 'secret', 'key', 'token', 'api_key', 'file_path', 'database'];

        foreach ($context as $key => $value) {
            $lowerKey = strtolower($key);

            // Skip sensitive keys
            foreach ($sensitiveKeys as $sensitive) {
                if (strpos($lowerKey, $sensitive) !== false) {
                    continue 2; // Skip this key
                }
            }

            // Sanitize values
            if (is_string($value)) {
                $safeContext[$key] = esc_html($value);
            } elseif (is_array($value)) {
                $safeContext[$key] = $this->sanitizeContext($value);
            } else {
                $safeContext[$key] = $value;
            }
        }

        return $safeContext;
    }
}
