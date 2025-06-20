import { memo } from '@wordpress/element';

const PluginsListComponent = ({
    plugins,
    isLoading,
    pluginIconBaseUrl,
}) => {
    console.log(plugins);
    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => (
                <div key={`plugin-${plugin.slugFree}`}>
                    <img src={`${pluginIconBaseUrl}images/plugin-icons/${plugin.iconFile}-96x96.png`} alt={plugin.name} />
                </div>
            ))}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


