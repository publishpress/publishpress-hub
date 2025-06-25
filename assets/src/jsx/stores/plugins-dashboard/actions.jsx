import { apiFetch } from '@wordpress/data-controls';

const { apiNonce } = window.ppHubPluginsDashboardConfig;

export function* setSelectedFilter(selectedFilter) {
    yield {
        type: 'SET_SELECTED_FILTER',
        selectedFilter,
    };
}

export function* setPlugins(plugins) {
    yield {
        type: 'SET_PLUGINS',
        plugins,
    };
}

export function* setLoading(isLoading) {
    yield {
        type: 'SET_LOADING',
        isLoading,
    };
}

export function* setError(error) {
    yield {
        type: 'SET_ERROR',
        error,
    };
}

export function* setCurrentFilter(currentFilter) {
    yield {
        type: 'SET_CURRENT_FILTER',
        currentFilter,
    };
}

export function* fetchPlugins() {
    try {
        yield {type: 'FETCH_PLUGINS_START'};

        const data = yield apiFetch({
            path: '/plugins',
        });

        if (data.success) {
            yield {type: 'FETCH_PLUGINS_SUCCESS', data: data.data};
        } else {
            yield {type: 'FETCH_PLUGINS_ERROR', error: data.error};
        }
    } catch (error) {
        yield {type: 'FETCH_PLUGINS_ERROR', error: error};
    }
}

export function* installFreePlugin(pluginSlug) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginSlug}};

        const data = yield apiFetch({
            path: `/plugins/${pluginSlug}/install/free`,
            method: 'POST',
        });

        if (data.success) {
            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: data.data};
        } else {
            yield {type: 'INSTALL_PLUGIN_ERROR', pluginSlug, error: data.error};
        }
    } catch (error) {
        yield {type: 'INSTALL_PLUGIN_ERROR', pluginSlug, error: error};
    }
}
