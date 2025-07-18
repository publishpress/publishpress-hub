<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\DTO\Plugin;

class PluginListRequest
{
    private ?string $family;
    private ?string $status;
    private int $page;
    private int $perPage;

    public function __construct(
        ?string $family = null,
        ?string $status = null,
        int $page = 1,
        int $perPage = 20
    ) {
        $this->family = $family;
        $this->status = $status;
        $this->page = $page;
        $this->perPage = $perPage;
    }

    public function getFamily(): ?string
    {
        return $this->family;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['family'] ?? null,
            $data['status'] ?? null,
            (int) ($data['page'] ?? 1),
            (int) ($data['per_page'] ?? 20)
        );
    }
}
