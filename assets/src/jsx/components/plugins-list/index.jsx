import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';
import classNames from 'classnames';

import { Button } from '../buttons/button';
import { Tooltip } from '../tooltip';
import { Badge } from '../badge/badge';

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

    const ActionButton = ({ plugin }) => {
        if (!plugin.isInstalled) {
            return (
                <Button variant='secondary'>{__('Install', 'publishpress-hub')}</Button>
            );
        }

        if (plugin.isPro && plugin.isLicensed) {
            return (
                <Button variant='secondary'>{__('Manage License', 'publishpress-hub')}</Button>
            );
        }

        if (plugin.isPro && !plugin.isLicensed) {
            return (
                <Button variant='secondary'>{__('Activate License', 'publishpress-hub')}</Button>
            );
        }

        if (!plugin.isPro) {
            return (
                <Button variant='highlight'>{__('Upgrade to Pro', 'publishpress-hub')}</Button>
            );
        }

        return null;
    };

    const StatusFlag = ({ plugin }) => {
        if (!plugin.isInstalled) {
            return (
                <Badge text={__('Not Installed', 'publishpress-hub')} className='not-installed' />
            )
        }

        if (!plugin.isPro) {
            return (
                <Badge text={__('Free', 'publishpress-hub')} className='free' />
            );
        }

        if (plugin.isLicensed) {
            return (
                <Badge text={__('Licensed', 'publishpress-hub')} className='licensed' />
            );
        }

        if (!plugin.isLicensed) {
            return (
                <Badge text={__('Unlicensed', 'publishpress-hub')} className='unlicensed' />
            );
        }

        return null;
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
                            <StatusFlag plugin={plugin} />
                            <ActionButton plugin={plugin} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


