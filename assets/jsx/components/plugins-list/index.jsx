import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

const PluginsListComponent = ({
    plugins,
    isLoading,
    pluginIconBaseUrl,
}) => {
    console.log(plugins);
    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => (
                <div key={`plugin-${plugin.slugFree}`} className='pp-hub-plugins-list-item'>
                    <div className='pp-hub-plugins-list-item-icon'>
                        <img src={`${pluginIconBaseUrl}images/plugin-icons/${plugin.iconFile}-96x96.png`} alt={plugin.name} />
                    </div>
                    <div className='pp-hub-plugins-list-item-info'>
                        <div className='pp-hub-plugins-list-item-name'>{plugin.name}</div>
                        <div className='pp-hub-plugins-list-item-description'>{plugin.description}</div>
                    </div>
                    <div className='pp-hub-plugins-list-item-status'>
                        <span className='pp-hub-plugins-list-item-status-label'>{plugin.status}</span>
                    </div>
                    <div className='pp-hub-plugins-list-item-actions'>
                        <button className='pp-hub-plugins-list-item-action-button'>{__('Install', 'publishpress-hub')}</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


