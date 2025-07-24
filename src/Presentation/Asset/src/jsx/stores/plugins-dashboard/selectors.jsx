const createMemoizedSelector = (selectorFn) => {
    let lastArgs = null;
    let lastResult = null;

    return (...args) => {
        // Simple equality check for arguments
        if (!lastArgs || !areArgsEqual(lastArgs, args)) {
            lastArgs = args;
            lastResult = selectorFn(...args);
        }
        return lastResult;
    };
};

const areArgsEqual = (prev, curr) => {
    if (prev.length !== curr.length) return false;
    for (let i = 0; i < prev.length; i++) {
        if (prev[i] !== curr[i]) return false;
    }
    return true;
};

export const getSelectedFilter = (state) => {
    return state.selectedFilter;
}

export const getPlugins = (state) => {
    return state.plugins;
}

const sortPlugins = (pluginFamily) => {
    return pluginFamily.sort((a, b) => {
        // Then sort by installed status
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

export const getFilteredPlugins = createMemoizedSelector((state) => {
    const plugins = state.plugins;
    const selectedFilter = state.selectedFilter;

    let filteredPlugins;
    if (!selectedFilter || selectedFilter === 'all') {
        filteredPlugins = plugins;
    } else {
        filteredPlugins = plugins.filter((plugin) => filterPlugin(plugin, selectedFilter));
    }

    return sortPlugins(filteredPlugins);
});

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

export const getIsLicenseInputModalOpenForUpgrade = (state) => {
    return state.isLicenseInputModalOpenForUpgrade;
}

export const getFilterCounts = createMemoizedSelector((state) => {
    const plugins = state.plugins;

    // Pre-calculate filter results for better performance
    const filterResults = {
        all: [],
        unlicensed: [],
        active: [],
        inactive: [],
        notInstalled: [],
    };

    // Single pass through plugins to calculate all filters
    plugins.forEach((plugin) => {
        filterResults.all.push(plugin);

        if (!plugin.hasAnyVersionInstalled) {
            filterResults.notInstalled.push(plugin);
        } else {
            if (plugin.proPlugin.isInstalled && !plugin.proPlugin.isLicensed) {
                filterResults.unlicensed.push(plugin);
            }

            if (plugin.hasAnyVersionActive) {
                filterResults.active.push(plugin);
            } else {
                filterResults.inactive.push(plugin);
            }
        }
    });

    return {
        all: filterResults.all.length,
        unlicensed: filterResults.unlicensed.length,
        active: filterResults.active.length,
        inactive: filterResults.inactive.length,
        notInstalled: filterResults.notInstalled.length,
    };
});

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
