<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\DTO\Plugin;

class PluginListResponse
{
    private array $plugins;
    private int $total;
    private int $page;
    private int $perPage;
    private int $totalPages;

    public function __construct(
        array $plugins,
        int $total,
        int $page,
        int $perPage
    ) {
        $this->plugins = $plugins;
        $this->total = $total;
        $this->page = $page;
        $this->perPage = $perPage;
        $this->totalPages = (int) ceil($total / $perPage);
    }

    public function getPlugins(): array
    {
        return $this->plugins;
    }

    public function getTotal(): int
    {
        return $this->total;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }

    public function getTotalPages(): int
    {
        return $this->totalPages;
    }

    public function toArray(): array
    {
        return [
            'plugins' => $this->plugins,
            'pagination' => [
                'total' => $this->total,
                'page' => $this->page,
                'per_page' => $this->perPage,
                'total_pages' => $this->totalPages,
            ],
        ];
    }
}
