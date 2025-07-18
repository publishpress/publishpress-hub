<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\DTO\Plugin;

class PluginInstallResponse
{
    private bool $success;
    private string $message;
    private ?string $pluginId;
    private ?string $status;

    public function __construct(
        bool $success,
        string $message,
        ?string $pluginId = null,
        ?string $status = null
    ) {
        $this->success = $success;
        $this->message = $message;
        $this->pluginId = $pluginId;
        $this->status = $status;
    }

    public function isSuccess(): bool
    {
        return $this->success;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getPluginId(): ?string
    {
        return $this->pluginId;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function toArray(): array
    {
        $response = [
            'success' => $this->success,
            'message' => $this->message,
        ];

        if ($this->pluginId !== null) {
            $response['plugin_id'] = $this->pluginId;
        }

        if ($this->status !== null) {
            $response['status'] = $this->status;
        }

        return $response;
    }

    public static function success(string $message, string $pluginId, string $status): self
    {
        return new self(true, $message, $pluginId, $status);
    }

    public static function error(string $message): self
    {
        return new self(false, $message);
    }
}
