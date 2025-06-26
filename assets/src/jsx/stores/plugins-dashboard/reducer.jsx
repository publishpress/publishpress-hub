import apiFetch from '@wordpress/api-fetch';

export const DEFAULT_STATE = {
    selectedFilter: 'all',
    plugins: [],
    isLoading: false,
    error: null,
    currentFilter: 'all',
    pluginInstallationInProgress: {},
    pluginErrors: {},
    isLicenseInputModalOpen: false,
    isInstallationTypeModalOpen: false,
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

const setLicenseInputModalOpen = (state, isOpen) => {
    return {
        ...state,
        isLicenseInputModalOpen: isOpen,
    }
}

const setInstallationTypeModalOpen = (state, isOpen) => {
    return {
        ...state,
        isInstallationTypeModalOpen: isOpen,
    }
}

const installPluginStart = (state, data) => {
    delete state.pluginErrors[data.pluginSlugFree];

    return {
        ...state,
        pluginInstallationInProgress: {
            ...state.pluginInstallationInProgress,
            [data.pluginSlugFree]: true,
        },
    }
}

const installPluginSuccess = (state, data) => {
    delete state.pluginInstallationInProgress[data.pluginSlugFree];
    delete state.pluginErrors[data.pluginSlugFree];

    return {
        ...state,
    }
}

const installPluginError = (state, data) => {
    console.log('installPluginError', data);
    delete state.pluginInstallationInProgress[data.pluginSlugFree];

    return {
        ...state,
        pluginErrors: {
            ...state.pluginErrors,
            [data.pluginSlugFree]: data.error,
        },
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
        case 'SET_LICENSE_INPUT_MODAL_OPEN':
            return setLicenseInputModalOpen(state, action.isOpen);
        case 'SET_INSTALLATION_TYPE_MODAL_OPEN':
            return setInstallationTypeModalOpen(state, action.isOpen);
        case 'INSTALL_PLUGIN_START':
            return installPluginStart(state, action.data);
        case 'INSTALL_PLUGIN_SUCCESS':
            return installPluginSuccess(state, action.data);
        case 'INSTALL_PLUGIN_ERROR':
            return installPluginError(state, action.data);
        default:
            return state;
    }
}
