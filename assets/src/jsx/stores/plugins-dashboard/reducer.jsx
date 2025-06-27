import apiFetch from '@wordpress/api-fetch';

export const DEFAULT_STATE = {
    selectedFilter: 'all',
    plugins: [],
    isLoading: false,
    error: null,
    currentFilter: 'all',
    pluginInstallationInProgress: {},
    pluginUninstallationInProgress: {},
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
        pluginErrors: {},
    }
}

const setInstallationTypeModalOpen = (state, isOpen) => {
    return {
        ...state,
        isInstallationTypeModalOpen: isOpen,
        pluginErrors: {},
    }
}

const installPluginStart = (state, data) => {
    return {
        ...state,
        pluginInstallationInProgress: {
            ...state.pluginInstallationInProgress,
            [data.pluginSlugFree]: true,
        },
        pluginErrors: {
            ...state.pluginErrors,
            [data.pluginSlugFree]: null,
        },
    }
}

const installPluginSuccess = (state, data) => {
    return {
        ...state,
        pluginInstallationInProgress: {
            ...state.pluginInstallationInProgress,
            [data.pluginSlugFree]: false,
        },
        pluginErrors: {
            ...state.pluginErrors,
            [data.pluginSlugFree]: null,
        },
    }
}

const installPluginError = (state, data) => {
    return {
        ...state,
        pluginInstallationInProgress: {
            ...state.pluginInstallationInProgress,
            [data.pluginSlugFree]: false,
        },
        pluginErrors: {
            ...state.pluginErrors,
            [data.pluginSlugFree]: data.error,
        },
    }
}

const uninstallPluginStart = (state, data) => {
    return {
        ...state,
        pluginUninstallationInProgress: {
            ...state.pluginUninstallationInProgress,
            [data.pluginSlugFree]: true,
        },
    }
}

const uninstallPluginSuccess = (state, data) => {
    return {
        ...state,
        pluginUninstallationInProgress: {
            ...state.pluginUninstallationInProgress,
            [data.pluginSlugFree]: false,
        },
    }
}

const uninstallPluginError = (state, data) => {
    return {
        ...state,
        pluginUninstallationInProgress: {
            ...state.pluginUninstallationInProgress,
            [data.pluginSlugFree]: false,
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
        case 'UNINSTALL_PLUGIN_START':
            return uninstallPluginStart(state, action.data);
        case 'UNINSTALL_PLUGIN_SUCCESS':
            return uninstallPluginSuccess(state, action.data);
        case 'UNINSTALL_PLUGIN_ERROR':
            return uninstallPluginError(state, action.data);
        default:
            return state;
    }
}
