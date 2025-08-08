/**
 * Use plugin display info.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useMemo } from '@wordpress/element';

export const usePluginDisplayInfo = (pluginFamily, pluginIconBaseUrl, status) => {
    return useMemo(() => {
        const { isPro } = status;
        const iconSrc = `${pluginIconBaseUrl}images/plugin-icons/${pluginFamily.iconPath}-96x96.png`;
        const displayName = isPro ?
            pluginFamily.proPlugin.name :
            pluginFamily.freePlugin.name;

        return { iconSrc, displayName };
    }, [pluginFamily, pluginIconBaseUrl, status.isPro]);
};
