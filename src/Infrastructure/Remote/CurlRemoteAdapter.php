<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote;

use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

/**
 * Direct curl adapter that bypasses WordPress HTTP API
 * This should work exactly like command line curl
 */
class CurlRemoteAdapter implements RemoteServiceInterface
{
    /**
     * @return array|WP_Error
     */
    public function request(string $url, array $args = [])
    {
        $method = strtoupper($args['method'] ?? 'GET');

        if ($method === 'GET') {
            return $this->get($url, $args);
        } elseif ($method === 'POST') {
            return $this->post($url, $args);
        } elseif ($method === 'HEAD') {
            return $this->head($url, $args);
        }

        return new WP_Error('unsupported_method', "Method $method not supported");
    }

    /**
     * @return array|WP_Error
     */
    public function get(string $url, array $args = [])
    {
        return $this->executeCurl($url, array_merge($args, ['method' => 'GET']));
    }

    /**
     * @return array|WP_Error
     */
    public function post(string $url, array $args = [])
    {
        return $this->executeCurl($url, array_merge($args, ['method' => 'POST']));
    }

    /**
     * @return array|WP_Error
     */
    public function head(string $url, array $args = [])
    {
        return $this->executeCurl($url, array_merge($args, ['method' => 'HEAD']));
    }

    /**
     * @return array|WP_Error
     */
    public function safeRequest(string $url, array $args = [])
    {
        return $this->request($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeGet(string $url, array $args = [])
    {
        return $this->get($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safePost(string $url, array $args = [])
    {
        return $this->post($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeHead(string $url, array $args = [])
    {
        return $this->head($url, $args);
    }

    public function getResponseBody(array $response): string
    {
        return $response['body'] ?? '';
    }

    /**
     * @return mixed
     */
    public function getDecodedBodyFromResponse(array $response)
    {
        $body = $this->getResponseBody($response);
        return json_decode($body, true);
    }

    public function getResponseStatusCode(array $response): int
    {
        return (int) ($response['response']['code'] ?? 0);
    }

    /**
     * @return array
     */
    public function getResponseHeaders(array $response): array
    {
        return $response['headers'] ?? [];
    }

    /**
     * Execute curl request
     */
    private function executeCurl(string $url, array $args)
    {
        $ch = curl_init();

        // Basic curl options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, $args['sslverify'] ?? true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $args['timeout'] ?? 30);
        curl_setopt($ch, CURLOPT_HEADER, true);

        // Set method
        $method = strtoupper($args['method'] ?? 'GET');
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
        } elseif ($method === 'HEAD') {
            curl_setopt($ch, CURLOPT_NOBODY, true);
        }

        // Set body for POST requests
        if ($method === 'POST' && isset($args['body'])) {
            if (is_array($args['body'])) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($args['body']));
            } else {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $args['body']);
            }
        }

        // Set headers
        if (isset($args['headers']) && is_array($args['headers'])) {
            $headers = [];
            foreach ($args['headers'] as $name => $value) {
                $headers[] = "$name: $value";
            }
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        // Execute request
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);

        curl_close($ch);

        if ($error) {
            return new \WP_Error('curl_error', $error);
        }

        // Parse response
        $headers = substr($response, 0, $headerSize);
        $body = substr($response, $headerSize);

        // Parse headers into array
        $parsedHeaders = [];
        $headerLines = explode("\n", $headers);
        foreach ($headerLines as $line) {
            $line = trim($line);
            if (empty($line) || strpos($line, 'HTTP/') === 0) {
                continue;
            }

            $parts = explode(':', $line, 2);
            if (count($parts) === 2) {
                $name = trim($parts[0]);
                $value = trim($parts[1]);
                $parsedHeaders[$name] = $value;
            }
        }

        return [
            'headers' => $parsedHeaders,
            'body' => $body,
            'response' => [
                'code' => $httpCode,
                'message' => 'OK'
            ],
            'cookies' => [],
            'filename' => null,
            'http_response' => null
        ];
    }
}
