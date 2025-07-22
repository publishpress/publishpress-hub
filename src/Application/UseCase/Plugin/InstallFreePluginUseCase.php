<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use WP_REST_Request;

class InstallFreePluginUseCase implements UseCaseInterface
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

    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        $family = $this->pluginFamilyRepository->findFamilyBySlug($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        $plugin = $family->getFreePlugin();

        if (!$plugin) {
            throw new PluginNotFoundException(['family_slug' => $familySlug, 'plugin_type' => 'free']);
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
}
