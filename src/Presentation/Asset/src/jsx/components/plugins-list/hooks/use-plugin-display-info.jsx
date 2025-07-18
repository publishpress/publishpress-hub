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
