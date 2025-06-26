import { apiFetch } from '@wordpress/data-controls';

const { apiNonce } = window.ppHubPluginsDashboardConfig;

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

export function* setLoading(isLoading) {
    yield {
        type: 'SET_LOADING',
        isLoading,
    };
}

export function* setError(error) {
    yield {
        type: 'SET_ERROR',
        error,
    };
}

export function* setCurrentFilter(currentFilter) {
    yield {
        type: 'SET_CURRENT_FILTER',
        currentFilter,
    };
}

export function* setLicenseInputModalOpen(isOpen) {
    yield {
        type: 'SET_LICENSE_INPUT_MODAL_OPEN',
        isOpen,
    };
}

export function* setInstallationTypeModalOpen(isOpen) {
    yield {
        type: 'SET_INSTALLATION_TYPE_MODAL_OPEN',
        isOpen,
    };
}

export function* fetchPlugins() {
    try {
        yield {type: 'FETCH_PLUGINS_START'};

        const data = yield apiFetch({
            path: '/plugins',
        });

        if (data.success) {
            yield {type: 'FETCH_PLUGINS_SUCCESS', data: data.data};
        } else {
            yield {type: 'FETCH_PLUGINS_ERROR', error: data.error};
        }
    } catch (error) {
        yield {type: 'FETCH_PLUGINS_ERROR', error: error};
    }
}

export function* installFreePlugin(pluginSlugFree) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginSlugFree}};

        const data = yield apiFetch({
            path: `/plugins/${pluginSlugFree}/install/free`,
            method: 'POST',
        });

        if (data.success) {
            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: {pluginSlugFree}};
        } else {
            yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginSlugFree, error: data?.error}};
        }
    } catch (error) {
        yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginSlugFree, error: error}};
    }
}

export function* installProPlugin(pluginSlugFree, licenseKey) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginSlugFree}};

        licenseKey = licenseKey.trim();

        const data = yield apiFetch({
            path: `/plugins/${pluginSlugFree}/install/pro`,
            method: 'POST',
            data: {
                license_key: licenseKey,
            },
        });

        if (data.success) {
            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: {pluginSlugFree}};
        } else {
            yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginSlugFree, error: data?.error}};
        }
    } catch (error) {
        yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginSlugFree, error: error}};
    }
}
