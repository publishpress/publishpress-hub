import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';
import { Tooltip } from '../tooltip';

const PluginsListComponent = ({
    plugins,
    isLoading,
    pluginIconBaseUrl,
}) => {
    const statusFlagClass = (isActive) => isActive ? 'active' : 'inactive';

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => {
                return (
                    <div
                        key={`plugin-${plugin.slugFree}`}
                        className={`pp-hub-plugins-list-item ${statusFlagClass(plugin.isActive)}`}
                    >
                        <div className='pp-hub-plugins-list-item-icon'>
                            <img src={`${pluginIconBaseUrl}images/plugin-icons/${plugin.iconFile}-96x96.png`} alt={plugin.name} />
                        </div>
                        <div className='pp-hub-plugins-list-item-info'>
                            <Tooltip text={plugin.name} placement='top'>
                                <div className='pp-hub-plugins-list-item-name'>
                                    {plugin.name}{plugin.isPro && ' Pro'}
                                </div>
                            </Tooltip>
                            <div className='pp-hub-plugins-list-item-description'>{plugin.description}</div>
                        </div>
                        <div className='pp-hub-plugins-list-item-actions'>
                            <span className='pp-hub-plugins-list-item-status-label'>{plugin.status}</span>

                            {!plugin.isInstalled && (
                                <Button variant='secondary' style={{ width: '100%' }}>{__('Install', 'publishpress-hub')}</Button>
                            )}

                            {plugin.isInstalled && (
                                <Button variant='secondary' style={{ width: '100%' }}>{__('Manage', 'publishpress-hub')}</Button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


