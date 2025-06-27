import { apiFetch } from '@wordpress/data-controls';
import apiReady from '../../utils/apiReady';

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

        yield apiReady();

        const data = yield apiFetch({
            path: '/plugins',
        });

        if (data.success) {
            yield {type: 'FETCH_PLUGINS_SUCCESS', data: data.data};
        } else {
            throw new Error(data.error || 'Failed to fetch plugins');
        }
    } catch (error) {
        yield {type: 'FETCH_PLUGINS_ERROR', error: error};
    }
}

export function* installFreePlugin(pluginSlugFree) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginSlugFree}};

        yield apiReady();

        const data = yield apiFetch({
            path: `/plugins/${pluginSlugFree}/install/free`,
            method: 'POST',
        });

        if (data.success) {
            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: {pluginSlugFree}};

            return {
                success: true,
                pluginSlugFree,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin installation failed');
        }
    } catch (error) {
        yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginSlugFree, error: error}};

        return {
            success: false,
            pluginSlugFree,
            error,
        };
    }
}

export function* installProPlugin(pluginSlugFree, licenseKey) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginSlugFree}};

        yield apiReady();

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

            // Return context along with the API response
            return {
                success: true,
                pluginSlugFree,
                licenseKey,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin installation failed');
        }
    } catch (error) {
        yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginSlugFree, error: error}};
        // Return error context
        return {
            success: false,
            pluginSlugFree,
            licenseKey,
            error,
        };
    }
}


export function* uninstallPlugin(pluginSlugFree) {
    try {
        yield {type: 'UNINSTALL_PLUGIN_START', data: {pluginSlugFree}};

        yield apiReady();

        const data = yield apiFetch({
            path: `/plugins/${pluginSlugFree}/uninstall`,
            method: 'POST',
        });

        if (data.success) {
            yield {type: 'UNINSTALL_PLUGIN_SUCCESS', data: {pluginSlugFree}};

            return {
                success: true,
                pluginSlugFree,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin uninstall failed');
        }
    } catch (error) {
        yield {type: 'UNINSTALL_PLUGIN_ERROR', data: {pluginSlugFree, error: error}};

        return {
            success: false,
            pluginSlugFree,
            error,
        };
    }
}
