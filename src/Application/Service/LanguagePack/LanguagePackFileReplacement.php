<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\LanguagePack;

\defined('ABSPATH') || exit;

class LanguagePackFileReplacement
{
    /**
     * @param \WP_Filesystem_Base $filesystem WordPress filesystem driver.
     * @param array<string, string> $files Temporary paths mapped to destination paths.
     */
    public function replace(object $filesystem, array $files): bool
    {
        $backups = [];
        $replaced = [];
        $suffix = '.backup-' . bin2hex(random_bytes(8));

        foreach ($files as $destination) {
            if ($filesystem->exists($destination)) {
                $backup = $destination . $suffix;
                if (!$filesystem->copy($destination, $backup, true)) {
                    foreach ($backups as $path) {
                        $filesystem->delete($path);
                    }
                    return false;
                }
                $backups[$destination] = $backup;
            }
        }

        foreach ($files as $temporary => $destination) {
            if (!$filesystem->move($temporary, $destination, true)) {
                // A driver may remove the destination before reporting a failed move.
                $replaced[] = $destination;
                foreach ($replaced as $path) {
                    if (isset($backups[$path])) {
                        if ($filesystem->copy($backups[$path], $path, true)) {
                            $filesystem->delete($backups[$path]);
                        }
                        unset($backups[$path]);
                    } else {
                        $filesystem->delete($path);
                    }
                }
                foreach ($backups as $path) {
                    $filesystem->delete($path);
                }
                return false;
            }
            $replaced[] = $destination;
        }

        foreach ($backups as $path) {
            $filesystem->delete($path);
        }
        return true;
    }
}
