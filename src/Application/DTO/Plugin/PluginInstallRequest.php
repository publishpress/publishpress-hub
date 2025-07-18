<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\DTO\Plugin;

class PluginInstallRequest
{
    private string $slug;
    private string $type;

    public function __construct(string $slug, string $type = 'free')
    {
        $this->slug = $slug;
        $this->type = $type;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['slug'],
            $data['type'] ?? 'free'
        );
    }
}
