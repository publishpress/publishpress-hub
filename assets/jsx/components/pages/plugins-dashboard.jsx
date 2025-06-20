import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo, useEffect, memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { AdminPageLayout } from '../admin-page';
import FilterButtonsBar from '../filter/filter-buttons-bar';
import { store } from '../../stores/plugins-dashboard';
import { PluginsList } from '../plugins-list';
import { ErrorPage } from '../pages/error-page';

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
        error,
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
        fetchPlugins();
    }, [fetchPlugins]);

    console.debug(plugins, filterCounts);

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
                value: 'licensed',
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

    if (error) {
        return (
            <ErrorPage
                error={error}
                title={title}
                logoUrl={logoUrl}
            />
        );
    }

    return (
        <AdminPageLayout
            title={title}
            logoUrl={logoUrl}
        >
            <div className="pp-hub-plugins-dashboard">
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
            </div>
        </AdminPageLayout>
    );
};

export const PluginsDashboard = memo(PluginsDashboardComponent);
