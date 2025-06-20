import { apiFetch } from '@wordpress/data-controls';

const { apiUrl, apiNonce } = window.ppHubPluginsDashboardConfig;

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

export function* fetchPlugins() {
    try {
        yield {type: 'FETCH_PLUGINS_START'};

        const data = yield apiFetch({
            path: `${apiUrl}/plugins`,
            headers: {
                'X-WP-Nonce': apiNonce,
            },
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
