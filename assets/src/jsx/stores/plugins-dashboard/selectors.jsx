export const getSelectedFilter = (state) => {
    return state.selectedFilter;
}

export const getPlugins = (state) => {
    return state.plugins;
}

// Memoization cache for getFilteredPlugins
let lastPluginsForFiltering = null;
let lastSelectedFilterForFiltering = null;
let lastFilteredPlugins = null;

const sortPlugins = (pluginFamily) => {
    return pluginFamily.sort((a, b) => {
        // First sort by installed status
        if (a.hasAnyVersionInstalled && !b.hasAnyVersionInstalled) {
            return -1;
        }
        if (!a.hasAnyVersionInstalled && b.hasAnyVersionInstalled) {
            return 1;
        }

        // If both are installed or both are not installed, sort by pro status
        if (a.hasAnyVersionInstalled && b.hasAnyVersionInstalled) {
            if (a.proPlugin.isLicensed && !b.proPlugin.isLicensed) {
                return -1;
            }
            if (!a.proPlugin.isLicensed && b.proPlugin.isLicensed) {
                return 1;
            }

            if (a.proPlugin.isInstalled && !b.proPlugin.isInstalled) {
                return -1;
            }
            if (!a.proPlugin.isInstalled && b.proPlugin.isInstalled) {
                return 1;
            }
        }

        return 0;
    });
}

export const getFilteredPlugins = (state) => {
    const plugins = state.plugins;
    const selectedFilter = state.selectedFilter;

    // If neither plugins nor selectedFilter have changed, return cached result
    if (plugins === lastPluginsForFiltering &&
        selectedFilter === lastSelectedFilterForFiltering &&
        lastFilteredPlugins !== null) {
        return lastFilteredPlugins;
    }

    // Calculate filtered plugins
    let filteredPlugins;
    if (!selectedFilter || selectedFilter === 'all') {
        filteredPlugins = plugins;
    } else {
        filteredPlugins = plugins.filter((plugin) => filterPlugin(plugin, selectedFilter));
    }

    const sortedPlugins = sortPlugins(filteredPlugins);

    // Cache the result
    lastPluginsForFiltering = plugins;
    lastSelectedFilterForFiltering = selectedFilter;
    lastFilteredPlugins = sortedPlugins;

    return lastFilteredPlugins;
}

export const getIsLoading = (state) => {
    return state.isLoading;
}

export const getError = (state) => {
    return state.error;
}

export const getCurrentFilter = (state) => {
    return state.currentFilter;
}

export const getPluginInstallationInProgress = (state) => {
    return state.pluginInstallationInProgress;
}

export const getPluginUninstallationInProgress = (state) => {
    return state.pluginUninstallationInProgress;
}

export const getPluginError = (state) => {
    return state.pluginErrors;
}

export const getIsLicenseInputModalOpen = (state) => {
    return state.isLicenseInputModalOpen;
}

export const getIsInstallationTypeModalOpen = (state) => {
    return state.isInstallationTypeModalOpen;
}

export const getPluginActivationInProgress = (state) => {
    return state.pluginActivationInProgress;
}

export const getPluginDeactivationInProgress = (state) => {
    return state.pluginDeactivationInProgress;
}

export const getIsUninstallConfirmationModalOpen = (state) => {
    return state.isUninstallConfirmationModalOpen;
}

export const getIsResolveConflictModalOpen = (state) => {
    return state.isResolveConflictModalOpen;
}

export const getIsUpgradeModalOpen = (state) => {
    return state.isUpgradeModalOpen;
}

export const getPluginUpgradeInProgress = (state) => {
    return state.pluginUpgradeInProgress;
}

export const getPluginResolveConflictInProgress = (state) => {
    return state.pluginResolveConflictInProgress;
}

export const getSelectedPluginForConflictResolution = (state) => {
    return state.selectedPluginForConflictResolution;
}

// Memoization cache for getFilterCounts
let lastPluginsForFilterCounts = null;
let lastFilterCountsForFilterCounts = null;

export const getFilterCounts = (state) => {
    const plugins = state.plugins;

    // If plugins haven't changed, return cached result
    if (plugins === lastPluginsForFilterCounts && lastFilterCountsForFilterCounts !== null) {
        return lastFilterCountsForFilterCounts;
    }

    // Calculate new filter counts
    const filterCounts = {
        all: plugins.filter((plugin) => filterPlugin(plugin, 'all')).length,
        unlicensed: plugins.filter((plugin) => filterPlugin(plugin, 'unlicensed')).length,
        active: plugins.filter((plugin) => filterPlugin(plugin, 'active')).length,
        inactive: plugins.filter((plugin) => filterPlugin(plugin, 'inactive')).length,
        notInstalled: plugins.filter((plugin) => filterPlugin(plugin, 'notInstalled')).length,
    };

    // Cache the result
    lastPluginsForFilterCounts = plugins;
    lastFilterCountsForFilterCounts = filterCounts;

    return filterCounts;
}

const filterPlugin = (plugin, selectedFilter) => {
    switch (selectedFilter) {
        case 'notInstalled':
            return !plugin.hasAnyVersionInstalled;
        case 'unlicensed':
            return plugin.proPlugin.isInstalled && !plugin.proPlugin.isLicensed;
        case 'active':
            return plugin.hasAnyVersionActive && plugin.hasAnyVersionInstalled;
        case 'inactive':
            return !plugin.hasAnyVersionActive && plugin.hasAnyVersionInstalled;
        default:
            return true;
    }
}
