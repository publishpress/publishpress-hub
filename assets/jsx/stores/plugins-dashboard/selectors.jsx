export const getSelectedFilter = (state) => {
    return state.selectedFilter;
}

export const getPlugins = (state) => {
    return state.plugins;
}

export const getFilteredPlugins = (state) => {
    const plugins = state.plugins;
    const selectedFilter = state.selectedFilter;

    if (!selectedFilter || selectedFilter === 'all') {
        return plugins;
    }

    return plugins.filter((plugin) => filterPlugin(plugin, selectedFilter));
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

export const getFilterCounts = (state) => {
    const plugins = state.plugins;

    return {
        all: plugins.filter((plugin) => filterPlugin(plugin, 'all')).length,
        unlicensed: plugins.filter((plugin) => filterPlugin(plugin, 'unlicensed')).length,
        active: plugins.filter((plugin) => filterPlugin(plugin, 'active')).length,
        inactive: plugins.filter((plugin) => filterPlugin(plugin, 'inactive')).length,
        notInstalled: plugins.filter((plugin) => filterPlugin(plugin, 'notInstalled')).length,
    }
}

const filterPlugin = (plugin, selectedFilter) => {
    switch (selectedFilter) {
        case 'unlicensed':
            return !plugin.isLicensed && plugin.isInstalled;
        case 'active':
            return plugin.isActive && plugin.isInstalled;
        case 'inactive':
            return !plugin.isActive && plugin.isInstalled;
        case 'notInstalled':
            return !plugin.isInstalled;
        default:
            return true;
    }
}
