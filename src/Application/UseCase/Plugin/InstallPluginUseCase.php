<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginInstallRequest;
use PublishPress\Hub\Application\DTO\Plugin\PluginInstallResponse;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginAdapter;

class InstallPluginUseCase
{
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;
    private WordPressPluginAdapter $wordPressAdapter;

    public function __construct(
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        WordPressPluginAdapter $wordPressAdapter
    ) {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->wordPressAdapter = $wordPressAdapter;
    }

    public function execute(PluginInstallRequest $request): PluginInstallResponse
    {
                $families = $this->pluginFamilyRepository->getAllFamilies();
        $family = null;

        foreach ($families as $f) {
            if ($f->getSlug() === $request->getSlug()) {
                $family = $f;
                break;
            }
        }

        if (!$family) {
            throw new PluginNotFoundException('Plugin family not found: ' . $request->getSlug());
        }

        $plugin = $this->getPluginFromFamily($family, $request->getType());

        if (!$plugin) {
            throw new PluginNotFoundException('Plugin not found: ' . $request->getSlug() . ' (' . $request->getType() . ')');
        }

        if ($plugin->isInstalled()) {
            return PluginInstallResponse::error('Plugin is already installed');
        }

        try {
            $this->wordPressAdapter->installPlugin($plugin->getSlug());

            $plugin->setInstalled(true);

            return PluginInstallResponse::success(
                'Plugin installed successfully',
                $plugin->getSlug(),
                'installed'
            );
        } catch (\Exception $e) {
            return PluginInstallResponse::error('Failed to install plugin: ' . $e->getMessage());
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
