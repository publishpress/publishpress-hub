import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo, useEffect, memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

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

// Move selector outside component to prevent recreation on each render
const selectPluginsDashboardData = (select) => ({
    selectedFilter: select(store).getSelectedFilter(),
    filterCounts: select(store).getFilterCounts(),
    plugins: select(store).getFilteredPlugins(),
    isLoading: select(store).getIsLoading(),
    error: select(store).getError(),
});

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

    useEffect(() => {
        /**
         * TODO: Find another way to avoid race conditions. We were receiving an intermitent error
         * "Uncaught (in promise) Error: The resource could not be loaded because the app is not ready."
         * when fetching plugins. This is a temporary solution to avoid the error.
         */
        setTimeout(() => {
            fetchPlugins();
        }, 100);
    }, [fetchPlugins]);

    const filterOptions = useMemo(() => {
        return [
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
    }, [filterCounts]);

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
