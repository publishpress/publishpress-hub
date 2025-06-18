export const DEFAULT_STATE = {
    selectedFilter: 'all',
    plugins: [],
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
        default:
            return state;
    }
}
