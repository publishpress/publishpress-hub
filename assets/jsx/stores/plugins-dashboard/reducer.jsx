export const DEFAULT_STATE = {
    selectedFilter: 'all',
}

const setSelectedFilter = (state, selectedFilter) => {
    return {
        ...state,
        selectedFilter,
    }
}

export const reducer = (state = DEFAULT_STATE, action) => {
    if (! action) {
        return state;
    }

    switch (action.type) {
        case 'SET_SELECTED_FILTER':
            return setSelectedFilter(state, action.selectedFilter);
        default:
            return state;
    }
}
