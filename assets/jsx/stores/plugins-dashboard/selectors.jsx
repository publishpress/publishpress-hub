export const getSelectedFilter = (state) => {
    return state.selectedFilter;
}

export const getPlugins = (state) => {
    return state.plugins;
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
