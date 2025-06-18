export function* setSelectedFilter(selectedFilter) {
    yield {
        type: 'SET_SELECTED_FILTER',
        selectedFilter,
    };
}
