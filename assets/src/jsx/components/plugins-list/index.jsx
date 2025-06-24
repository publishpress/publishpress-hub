import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';
import classNames from 'classnames';

import { Button } from '../buttons/button';
import { Tooltip } from '../tooltip';

const PluginsListComponent = ({
    plugins,
    pluginIconBaseUrl,
}) => {
    const getStatusFlagClass = (plugin) => classNames({
        'active': plugin.isActive,
        'inactive': !plugin.isActive,
        'pro': plugin.isPro,
        'free': !plugin.isPro,
        'licensed': plugin.isLicensed,
        'unlicensed': !plugin.isLicensed,
        'installed': plugin.isInstalled,
        'not-installed': !plugin.isInstalled,
    });

    const getStatusFlagTooltipText = (plugin) => {
        if (!plugin.isInstalled) {
            return __('This plugin is not installed.', 'publishpress-hub');
        }

        if (plugin.isActive) {
            return __('This plugin is active.', 'publishpress-hub');
        }

        if (!plugin.isActive) {
            return __('This plugin is not active.', 'publishpress-hub');
        }
    };

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => {
                return (
                    <div
                        key={`plugin-${plugin.slugFree}`}
                        className={`pp-hub-plugins-list-item ${getStatusFlagClass(plugin)}`}
                    >
                        <div className='pp-hub-plugins-list-item-icon'>
                            <img src={`${pluginIconBaseUrl}images/plugin-icons/${plugin.iconFile}-96x96.png`} alt={plugin.name} />
                        </div>
                        <div className='pp-hub-plugins-list-item-info'>
                            <Tooltip
                                text={getStatusFlagTooltipText(plugin)}
                                placement='top'
                                useCustom={true}
                            >
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

                            {plugin.isInstalled && plugin.isPro && plugin.isLicensed && (
                                <Button variant='secondary' style={{ width: '100%' }}>{__('Manage License', 'publishpress-hub')}</Button>
                            )}

                            {plugin.isInstalled && plugin.isPro && !plugin.isLicensed && (
                                <Button variant='secondary' style={{ width: '100%' }}>{__('Activate License', 'publishpress-hub')}</Button>
                            )}

                            {plugin.isInstalled && !plugin.isPro && (
                                <Button variant='highlight' style={{ width: '100%' }}>{__('Upgrade to Pro', 'publishpress-hub')}</Button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


