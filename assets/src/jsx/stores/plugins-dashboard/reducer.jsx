import apiFetch from '@wordpress/api-fetch';

export const DEFAULT_STATE = {
    selectedFilter: 'all',
    plugins: [],
    isLoading: false,
    error: null,
    currentFilter: 'all',
}

const setSelectedFilter = (state, selectedFilter) => {
    return {
        ...state,
        selectedFilter,
    }
}

const setPlugins = (state, plugins) => {
    return {
        ...state,
        plugins,
        isLoading: false,
        error: null,
    }
}

const setLoading = (state, isLoading) => {
    return {
        ...state,
        isLoading,
    }
}

const setError = (state, error) => {
    return {
        ...state,
        error,
        isLoading: false,
    }
}

const fetchPluginsStart = (state) => {
    return {
        ...state,
        isLoading: true,
        error: null,
    }
}

const fetchPluginsSuccess = (state, data) => {
    return {
        ...state,
        plugins: data,
        isLoading: false,
        error: null,
    }
}

const fetchPluginsError = (state, error) => {
    return {
        ...state,
        error,
        isLoading: false,
    }
}

const setCurrentFilter = (state, currentFilter) => {
    return {
        ...state,
        currentFilter,
    }
}

const installPluginStart = (state, data) => {
    const plugins = state.plugins.map((plugin) => {
        if (plugin.slugFree === data.pluginSlug) {
            return {
                ...plugin,
                installation: {
                    inProgress: true,
                    error: null,
                },
            }
        }

        return plugin;
    });

    return {
        ...state,
        plugins,
    }
}

const installPluginSuccess = (state, data) => {
    const plugins = data.plugins.map((plugin) => {
        if (plugin.slug === data.pluginSlug) {
            return {
                ...plugin,
                installation: {
                    inProgress: false,
                    error: null,
                },
            }
        }

        return plugin;
    });

    return {
        ...state,
        plugins,
    }
}

const installPluginError = (state, pluginSlug, error) => {
    const plugins = data.plugins.map((plugin) => {
        if (plugin.slug === pluginSlug) {
            return {
                ...plugin,
                installation: {
                    inProgress: false,
                    error,
                },
            }
        }

        return plugin;
    });

    return {
        ...state,
        plugins,
    }
}

export const reducer = (state = DEFAULT_STATE, action) => {
    if (! action) {
        return state;
    }

    switch (action.type) {
        case 'SET_SELECTED_FILTER':
            return setSelectedFilter(state, action.selectedFilter);
        case 'SET_PLUGINS':
            return setPlugins(state, action.plugins);
        case 'SET_LOADING':
            return setLoading(state, action.isLoading);
        case 'SET_ERROR':
            return setError(state, action.error);
        case 'FETCH_PLUGINS_START':
            return fetchPluginsStart(state);
        case 'FETCH_PLUGINS_SUCCESS':
            return fetchPluginsSuccess(state, action.data);
        case 'FETCH_PLUGINS_ERROR':
            return fetchPluginsError(state, action.error);
        case 'SET_CURRENT_FILTER':
            return setCurrentFilter(state, action.currentFilter);
        case 'INSTALL_PLUGIN_START':
            return installPluginStart(state, action.data);
        case 'INSTALL_PLUGIN_SUCCESS':
            return installPluginSuccess(state, action.data);
        case 'INSTALL_PLUGIN_ERROR':
            return installPluginError(state, action.pluginSlug, action.error);
        default:
            return state;
    }
}
