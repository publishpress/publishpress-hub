/**
 * Plugins dashboard.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo, useEffect, memo, useState } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { AdminPageLayout } from '../admin-page';
import FilterButtonsBar from '../filter/filter-buttons-bar';
import { store } from '../../stores/plugins-dashboard';
import { PluginsList } from '../plugins-list';
import NoticesList from '../notices/NoticesList';
import SnackbarList from '../notices/SnackbarList';
import { Button } from '../buttons/button';
import { Tooltip } from '../tooltip';
import { useLicenseExpirationWarning } from './hooks/use-license-expiration-warning';

const {
    logoUrl,
    pluginIconBaseUrl,
} = window.ppHubPluginsDashboardConfig;

// Optimize selector by splitting into focused selectors
const selectPluginsDashboardData = (select) => {
    const storeSelect = select(store);
    return {
        selectedFilter: storeSelect.getSelectedFilter(),
        filterCounts: storeSelect.getFilterCounts(),
        plugins: storeSelect.getFilteredPlugins(),
        allPlugins: storeSelect.getPlugins(),
        isLoading: storeSelect.getIsLoading(),
        error: storeSelect.getError(),
    };
};

// Memoize filter options outside component to prevent recreation
const createFilterOptions = (filterCounts) => [
    {
        label: __('All', 'publishpress-hub'),
        value: 'all',
        total: filterCounts.all,
    },
    {
        label: __('Unlicensed', 'publishpress-hub'),
        value: 'unlicensed',
        total: filterCounts.unlicensed,
    },
    {
        label: __('Expired', 'publishpress-hub'),
        value: 'expired',
        total: filterCounts.expired,
    },
    {
        label: __('Active', 'publishpress-hub'),
        value: 'active',
        total: filterCounts.active,
    },
    {
        label: __('Inactive', 'publishpress-hub'),
        value: 'inactive',
        total: filterCounts.inactive,
    },
    {
        label: __('Not installed', 'publishpress-hub'),
        value: 'notInstalled',
        total: filterCounts.notInstalled,
    },
    {
        label: __('Updates available', 'publishpress-hub'),
        value: 'updatesAvailable',
        total: filterCounts.updatesAvailable,
    },
];

const PluginsDashboardComponent = () => {
    const {
        selectedFilter,
        filterCounts,
        plugins,
        allPlugins,
        isLoading,
    } = useSelect(selectPluginsDashboardData, []);

    const {
        setSelectedFilter,
        fetchPlugins
    } = useDispatch(store);

    const handleFilterChange = useCallback((selectedFilter) => {
        setSelectedFilter(selectedFilter);
    }, [setSelectedFilter]);


    // Optimize filterOptions memoization with stable reference
    const filterOptions = useMemo(() => {
        return createFilterOptions(filterCounts);
    }, [filterCounts.expired, filterCounts.all, filterCounts.unlicensed, filterCounts.active, filterCounts.inactive, filterCounts.notInstalled, filterCounts.updatesAvailable]);

    // Fetch plugins only once on mount
    useEffect(() => {
        fetchPlugins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Check for licenses expiring within the specified days
    useLicenseExpirationWarning(allPlugins, 30);

    const [isAltPressed, setIsAltPressed] = useState(false);

    // Track ALT key state
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Alt' || event.altKey) {
                setIsAltPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'Alt' || !event.altKey) {
                setIsAltPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleRefresh = useCallback(() => {
        fetchPlugins(isAltPressed);
    }, [fetchPlugins, isAltPressed]);

    const refreshButtonTooltip = useMemo(() => {
        return __('To force a refresh, hold Option on Mac or Alt on Windows and then click Refresh.', 'publishpress-hub');
    }, []);

    return (
        <AdminPageLayout logoUrl={logoUrl}>
            <div className="pp-hub-plugins-dashboard">
                <NoticesList />
                <div className="pp-hub-dashboard-heading">
                    <div>
                        <h1>{__('Plugins & Features', 'publishpress-hub')}</h1>
                        <p>{__('Activate, open, and license each product directly from the Hub.', 'publishpress-hub')}</p>
                    </div>
                    <Tooltip text={refreshButtonTooltip} placement="top">
                        <Button variant="link" onClick={handleRefresh} isLoading={isLoading} spinnerPosition="left">
                            {isAltPressed ? __('Force Refresh', 'publishpress-hub') : __('Refresh', 'publishpress-hub')}
                        </Button>
                    </Tooltip>
                </div>
                <FilterButtonsBar
                    options={filterOptions}
                    selectedOption={selectedFilter}
                    onChange={handleFilterChange}
                />
                <PluginsList
                    plugins={plugins}
                    isLoading={isLoading}
                    pluginIconBaseUrl={pluginIconBaseUrl}
                />
                <SnackbarList />
            </div>
        </AdminPageLayout>
    );
};

export const PluginsDashboard = memo(PluginsDashboardComponent);
