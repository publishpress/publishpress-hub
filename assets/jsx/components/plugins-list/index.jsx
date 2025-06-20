import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';

const PluginsListComponent = ({
    plugins,
    isLoading,
    pluginIconBaseUrl,
}) => {
    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => {



                return (
                    <div key={`plugin-${plugin.slugFree}`} className='pp-hub-plugins-list-item'>
                        <div className='pp-hub-plugins-list-item-icon'>
                            <img src={`${pluginIconBaseUrl}images/plugin-icons/${plugin.iconFile}-96x96.png`} alt={plugin.name} />
                        </div>
                        <div className='pp-hub-plugins-list-item-info'>
                            <div className='pp-hub-plugins-list-item-name'>{plugin.name}{plugin.isPro && ' Pro'}</div>
                            <div className='pp-hub-plugins-list-item-description'>{plugin.description}</div>
                        </div>
                        <div className='pp-hub-plugins-list-item-status'>
                            <span className='pp-hub-plugins-list-item-status-label'>{plugin.status}</span>
                        </div>
                        <div className='pp-hub-plugins-list-item-actions'>
                            <Button variant='secondary'>{__('Install', 'publishpress-hub')}</Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


