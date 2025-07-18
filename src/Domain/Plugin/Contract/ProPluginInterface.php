<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

interface ProPluginInterface extends PluginInterface
{
    public function getDownloadId(): int;

    public function setDownloadId(int $downloadId): self;
}
