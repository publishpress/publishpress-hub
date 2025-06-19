import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo, memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { AdminPageLayout } from '../admin-page';
import FilterButtonsBar from '../filter/filter-buttons-bar';
import { store } from '../../stores/plugins-dashboard';

// Move selector outside component to prevent recreation on each render
const selectPluginsDashboardData = (select) => ({
    selectedFilter: select(store).getSelectedFilter(),
    filterCounts: select(store).getFilterCounts(),
});

const PluginsDashboardComponent = () => {
    const {
        selectedFilter,
        filterCounts,
    } = useSelect(selectPluginsDashboardData, []);

    const {
        setSelectedFilter
    } = useDispatch(store);

    const handleFilterChange = useCallback((selectedFilter) => {
        setSelectedFilter(selectedFilter);
    }, [setSelectedFilter]);

    const title = useMemo(() => __('Plugins Dashboard', 'publishpress-hub'), []);

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
            </div>
        </AdminPageLayout>
    );
};

export const PluginsDashboard = memo(PluginsDashboardComponent);
