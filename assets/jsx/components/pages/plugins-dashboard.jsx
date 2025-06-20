import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo, useEffect, memo } from '@wordpress/element';

import { __, sprintf } from '@publishpress/hub-i18n';

import { AdminPageLayout } from '../admin-page';
import FilterButtonsBar from '../filter/filter-buttons-bar';
import { store } from '../../stores/plugins-dashboard';
import { PluginsList } from '../../../css/components/plugins-list';

// Move selector outside component to prevent recreation on each render
const selectPluginsDashboardData = (select) => ({
    selectedFilter: select(store).getSelectedFilter(),
    filterCounts: select(store).getFilterCounts(),
    plugins: select(store).getPlugins(),
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
            <AdminPageLayout
                title={title}
                logoUrl={window.ppHubPluginsDashboardConfig.logoUrl}
            >
                <div className="pp-hub-plugins-dashboard">
                    <div className="error-message">
                        {error?.data?.status && sprintf(__('Error [%s]: %s', 'publishpress-hub'), error.data.status, error.message)}
                        {!error?.data?.status && sprintf(__('Error: %s', 'publishpress-hub'), error.message)}
                    </div>
                </div>
            </AdminPageLayout>
        );
    }

    return (
        <AdminPageLayout
            title={title}
            logoUrl={window.ppHubPluginsDashboardConfig.logoUrl}
        >
            <div className="pp-hub-plugins-dashboard">
                <FilterButtonsBar
                    options={filterOptions}
                    selectedOption={selectedFilter}
                    onChange={handleFilterChange}
                />
                <PluginsList plugins={plugins} isLoading={isLoading} />
            </div>
        </AdminPageLayout>
    );
};

export const PluginsDashboard = memo(PluginsDashboardComponent);
