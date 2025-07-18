import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo, useEffect, memo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { AdminPageLayout } from '../admin-page';
import FilterButtonsBar from '../filter/filter-buttons-bar';
import { store } from '../../stores/plugins-dashboard';
import { PluginsList } from '../plugins-list';
import NoticesList from '../notices/NoticesList';
import SnackbarList from '../notices/SnackbarList';

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
];

const PluginsDashboardComponent = () => {
    const {
        selectedFilter,
        filterCounts,
        plugins,
        isLoading,
    } = useSelect(selectPluginsDashboardData, []);

    const {
        setSelectedFilter,
        fetchPlugins
    } = useDispatch(store);

    const handleFilterChange = useCallback((selectedFilter) => {
        setSelectedFilter(selectedFilter);
    }, [setSelectedFilter]);

    const title = useMemo(() => __('Plugins Dashboard', 'publishpress-hub'), []);

    // Optimize filterOptions memoization with stable reference
    const filterOptions = useMemo(() => {
        return createFilterOptions(filterCounts);
    }, [filterCounts.all, filterCounts.unlicensed, filterCounts.active, filterCounts.inactive, filterCounts.notInstalled]);

    useEffect(() => {
        // Improved approach: Check if plugins are already available before fetching
        if (!plugins || plugins.length === 0) {
            fetchPlugins();
        }
    }, [fetchPlugins, plugins]);

    return (
        <AdminPageLayout
            title={title}
            logoUrl={logoUrl}
        >
            <div className="pp-hub-plugins-dashboard">
                <NoticesList />
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
