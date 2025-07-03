import apiFetch from '@wordpress/api-fetch';

export const DEFAULT_STATE = {
    selectedFilter: 'all',
    plugins: [],
    isLoading: false,
    error: null,
    currentFilter: 'all',
    pluginInstallationInProgress: {},
    pluginUninstallationInProgress: {},
    pluginActivationInProgress: {},
    pluginDeactivationInProgress: {},
    pluginUpgradeInProgress: {},
    pluginErrors: {},
    isLicenseInputModalOpen: false,
    isInstallationTypeModalOpen: false,
    isUninstallConfirmationModalOpen: false,
    isUpgradeModalOpen: false,
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

const setIsUninstallConfirmationModalOpen = (state, isOpen) => {
    return {
        ...state,
        isUninstallConfirmationModalOpen: isOpen,
        pluginErrors: {},
    }
}

const setIsUpgradeModalOpen = (state, isOpen) => {
    return {
        ...state,
        isUpgradeModalOpen: isOpen,
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

const activatePluginStart = (state, data) => {
    return {
        ...state,
        pluginActivationInProgress: {
            ...state.pluginActivationInProgress,
            [data.pluginSlugFree]: true,
        },
    }
}

const activatePluginSuccess = (state, data) => {
    return {
        ...state,
        pluginActivationInProgress: {
            ...state.pluginActivationInProgress,
            [data.pluginSlugFree]: false,
        },
    }
}

const activatePluginError = (state, data) => {
    return {
        ...state,
        pluginActivationInProgress: {
            ...state.pluginActivationInProgress,
            [data.pluginSlugFree]: false,
        },
    }
}

const deactivatePluginStart = (state, data) => {
    return {
        ...state,
        pluginDeactivationInProgress: {
            ...state.pluginDeactivationInProgress,
            [data.pluginSlugFree]: true,
        },
    }
}

const deactivatePluginSuccess = (state, data) => {
    return {
        ...state,
        pluginDeactivationInProgress: {
            ...state.pluginDeactivationInProgress,
            [data.pluginSlugFree]: false,
        },
    }
}

const deactivatePluginError = (state, data) => {
    return {
        ...state,
        pluginDeactivationInProgress: {
            ...state.pluginDeactivationInProgress,
            [data.pluginSlugFree]: false,
        },
    }
}

const upgradePluginToProStart = (state, data) => {
    return {
        ...state,
        pluginUpgradeInProgress: {
            ...state.pluginUpgradeInProgress,
            [data.pluginSlugFree]: true,
        },
        pluginErrors: {
            ...state.pluginErrors,
            [data.pluginSlugFree]: null,
        },
    }
}

const upgradePluginToProSuccess = (state, data) => {
    return {
        ...state,
        pluginUpgradeInProgress: {
            ...state.pluginUpgradeInProgress,
            [data.pluginSlugFree]: false,
        },
        pluginErrors: {
            ...state.pluginErrors,
            [data.pluginSlugFree]: null,
        },
    }
}

const upgradePluginToProError = (state, data) => {
    return {
        ...state,
        pluginUpgradeInProgress: {
            ...state.pluginUpgradeInProgress,
            [data.pluginSlugFree]: false,
        },
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
        case 'SET_IS_UNINSTALL_CONFIRMATION_MODAL_OPEN':
            return setIsUninstallConfirmationModalOpen(state, action.isOpen);
        case 'SET_IS_UPGRADE_MODAL_OPEN':
            return setIsUpgradeModalOpen(state, action.isOpen);
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
        case 'ACTIVATE_PLUGIN_START':
            return activatePluginStart(state, action.data);
        case 'ACTIVATE_PLUGIN_SUCCESS':
            return activatePluginSuccess(state, action.data);
        case 'ACTIVATE_PLUGIN_ERROR':
            return activatePluginError(state, action.data);
        case 'DEACTIVATE_PLUGIN_START':
            return deactivatePluginStart(state, action.data);
        case 'DEACTIVATE_PLUGIN_SUCCESS':
            return deactivatePluginSuccess(state, action.data);
        case 'DEACTIVATE_PLUGIN_ERROR':
            return deactivatePluginError(state, action.data);
        case 'UPGRADE_PLUGIN_TO_PRO_START':
            return upgradePluginToProStart(state, action.data);
        case 'UPGRADE_PLUGIN_TO_PRO_SUCCESS':
            return upgradePluginToProSuccess(state, action.data);
        case 'UPGRADE_PLUGIN_TO_PRO_ERROR':
            return upgradePluginToProError(state, action.data);
        default:
            return state;
    }
}
