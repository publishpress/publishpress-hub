import { memo } from '@wordpress/element';

const PluginsListComponent = ({
    plugins,
}) => {
    return (
        <div className="pp-hub-plugins-list">
            <h1>Plugins List</h1>

            {plugins.map((plugin) => (
                <div key={`plugin-${plugin.slugFree}`}>
                    <h2>{plugin.name}</h2>
                    <p>{plugin.version}</p>
                </div>
            ))}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);
