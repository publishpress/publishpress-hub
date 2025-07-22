<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;

class InstallPluginUseCase
{
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;
    private WordPressPluginLifecycleAdapter $pluginLifecycle;

    public function __construct(
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        WordPressPluginLifecycleAdapter $pluginLifecycle
    ) {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->pluginLifecycle = $pluginLifecycle;
    }

    public function execute(string $familySlug, string $pluginType): array
    {
        $family = $this->pluginFamilyRepository->findFamilyBySlug($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        $plugin = $this->getPluginFromFamily($family, $pluginType);

        if (!$plugin) {
            throw new PluginNotFoundException(['family_slug' => $familySlug, 'plugin_type' => $pluginType]);
        }

        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException(['plugin_slug' => $plugin->getSlug()]);
        }

        try {
            $this->pluginLifecycle->installPlugin($plugin->getSlug());

            $plugin->setInstalled(true);

            return [
                'slug' => $plugin->getSlug(),
            ];
        } catch (\Exception $e) {
            throw new PluginInstallException(['plugin_slug' => $plugin->getSlug(), 'error' => $e->getMessage()]);
        }
    }

    private function getPluginFromFamily($family, string $type)
    {
        try {
            if ($type === 'free') {
                return $family->getFreePlugin();
            } elseif ($type === 'pro') {
                return $family->getProPlugin();
            }
        } catch (\RuntimeException $e) {
            return null;
        }

        return null;
    }
}
