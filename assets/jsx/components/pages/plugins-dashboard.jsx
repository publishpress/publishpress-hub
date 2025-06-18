import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo, memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { AdminPageLayout } from '../admin-page';
import FilterButtonsBar from '../filter/filter-buttons-bar';
import { store } from '../../stores/plugins-dashboard';

const FILTER_OPTIONS = [
    {
        label: __('All', 'publishpress-hub'),
        value: 'all',
        total: 10,
    },
    {
        label: __('Unlicensed', 'publishpress-hub'),
        value: 'unlicensed',
        total: 5,
    },
    {
        label: __('Active', 'publishpress-hub'),
        value: 'licensed',
        total: 5,
    },
    {
        label: __('Inactive', 'publishpress-hub'),
        value: 'inactive',
        total: 5,
    },
    {
        label: __('Not installed', 'publishpress-hub'),
        value: 'not-installed',
        total: 5,
    },
];

// Move selector outside component to prevent recreation on each render
const selectPluginsDashboardData = (select) => ({
    selectedFilter: select(store).getSelectedFilter(),
});

const PluginsDashboardComponent = () => {
    const {
        selectedFilter
    } = useSelect(selectPluginsDashboardData, []);

    const {
        setSelectedFilter
    } = useDispatch(store);

    const handleFilterChange = useCallback((selectedFilter) => {
        setSelectedFilter(selectedFilter);
    }, [setSelectedFilter]);

    const title = useMemo(() => __('Plugins Dashboard', 'publishpress-hub'), []);

    return (
        <AdminPageLayout
            title={title}
            logoUrl={window.ppHubPluginsDashboardConfig.logoUrl}
        >
            <div className="pp-hub-plugins-dashboard">
                <FilterButtonsBar
                    options={FILTER_OPTIONS}
                    selectedOption={selectedFilter}
                    onChange={handleFilterChange}
                />
            </div>
        </AdminPageLayout>
    );
};

export const PluginsDashboard = memo(PluginsDashboardComponent);
