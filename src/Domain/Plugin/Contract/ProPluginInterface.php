<?php

/**
 * Pro plugin interface.
 *
 * @package PublishPress\Hub\Domain\Plugin\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

\defined('ABSPATH') || exit;

interface ProPluginInterface extends PluginInterface
{
    /**
     * Gets the download ID of the pro plugin.
     *
     * @return int The download ID of the pro plugin.
     * @since 1.0.0
     */
    public function getDownloadId(): int;

    /**
     * Sets the download ID of the pro plugin.
     *
     * @param int $downloadId The download ID of the pro plugin.
     * @return self The pro plugin.
     * @since 1.0.0
     */
    public function setDownloadId(int $downloadId): self;
}
