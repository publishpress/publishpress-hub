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
