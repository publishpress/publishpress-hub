export const getSelectedFilter = (state) => {
    return state.selectedFilter;
}

export const getPlugins = (state) => {
    return state.plugins;
}

export const getIsLoading = (state) => {
    return state.isLoading;
}

export const getError = (state) => {
    return state.error;
}

export const getFilterCounts = (state) => {
    const plugins = state.plugins;

    return {
        all: plugins.length,
        unlicensed: plugins.filter((plugin) => ! plugin.licensed).length,
        active: plugins.filter((plugin) => plugin.active).length,
        inactive: plugins.filter((plugin) => ! plugin.active).length,
        notInstalled: plugins.filter((plugin) => ! plugin.installed).length,
    }
}
