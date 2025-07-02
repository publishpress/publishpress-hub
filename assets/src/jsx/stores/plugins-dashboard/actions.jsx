import { apiFetch } from '@wordpress/data-controls';
import { dispatch } from '@wordpress/data';

import { __ } from '@publishpress/hub-i18n';

import apiReady from '../../utils/apiReady';

const API_NAMESPACE = '/publishpress-hub/v1';

const { createSuccessNotice, createErrorNotice } = dispatch('core/notices');

const createNotice = (message, type) => {
    if (type === 'success') {
        createSuccessNotice(message, {
            isDismissible: true,
        });
        return;
    }

    createErrorNotice(message, {
        isDismissible: true,
    });
};

const createSnackbarNotice = (message, type) => {
    if (type === 'success') {
        createSuccessNotice(
            message,
            {
                type: 'snackbar',
                isDismissible: true,
            }
        );
        return;
    }

    createErrorNotice(
        message,
        {
            type: 'snackbar',
            isDismissible: true,
        }
    );
}

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

export function* setIsUninstallConfirmationModalOpen(isOpen) {
    yield {
        type: 'SET_IS_UNINSTALL_CONFIRMATION_MODAL_OPEN',
        isOpen,
    };
}

export function* fetchPlugins() {
    try {
        yield {type: 'FETCH_PLUGINS_START'};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins`,
        });

        if (data.success) {
            yield {type: 'FETCH_PLUGINS_SUCCESS', data: data.data};

            return {
                success: true,
                data: data.data,
            };
        } else {
            throw new Error(data.error || 'Failed to fetch plugins');
        }
    } catch (error) {
        yield {type: 'FETCH_PLUGINS_ERROR', error: error};

        yield createNotice(__('Failed to fetch plugins', 'publishpress-hub'), 'error');

        return {
            success: false,
            error,
        };
    }
}

export function* installFreePlugin(pluginSlugFree) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginSlugFree}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginSlugFree}/install/free`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: {pluginSlugFree}};

            yield createSnackbarNotice(__('Plugin installed successfully', 'publishpress-hub'), 'success');

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

        yield createNotice(__('Plugin installation failed', 'publishpress-hub'), 'error');

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
            path: `${API_NAMESPACE}/plugins/${pluginSlugFree}/install/pro`,
            method: 'POST',
            data: {
                license_key: licenseKey,
            },
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: {pluginSlugFree}};

            yield createSnackbarNotice(__('Plugin installed successfully', 'publishpress-hub'), 'success');

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

        yield createNotice(__('Plugin installation failed', 'publishpress-hub'), 'error');

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
            path: `${API_NAMESPACE}/plugins/${pluginSlugFree}/uninstall`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'UNINSTALL_PLUGIN_SUCCESS', data: {pluginSlugFree}};

            yield createSnackbarNotice(__('Plugin uninstalled successfully', 'publishpress-hub'), 'success');

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

        yield createNotice(__('Plugin uninstall failed', 'publishpress-hub'), 'error');

        return {
            success: false,
            pluginSlugFree,
            error,
        };
    }
}

export function* activatePlugin(pluginSlugFree) {
    try {
        yield {type: 'ACTIVATE_PLUGIN_START', data: {pluginSlugFree}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginSlugFree}/activate`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'ACTIVATE_PLUGIN_SUCCESS', data: {pluginSlugFree}};

            yield createSnackbarNotice(__('Plugin activated successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginSlugFree,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin activation failed');
        }
    } catch (error) {
        yield {type: 'ACTIVATE_PLUGIN_ERROR', data: {pluginSlugFree, error: error}};

        yield createNotice(__('Plugin activation failed', 'publishpress-hub'), 'error');

        return {
            success: false,
            pluginSlugFree,
            error,
        };
    }
}

export function* deactivatePlugin(pluginSlugFree) {
    try {
        yield {type: 'DEACTIVATE_PLUGIN_START', data: {pluginSlugFree}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginSlugFree}/deactivate`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'DEACTIVATE_PLUGIN_SUCCESS', data: {pluginSlugFree}};

            yield createSnackbarNotice(__('Plugin deactivated successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginSlugFree,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin deactivation failed');
        }
    } catch (error) {
        yield {type: 'DEACTIVATE_PLUGIN_ERROR', data: {pluginSlugFree, error: error}};

        yield createNotice(__('Plugin deactivation failed', 'publishpress-hub'), 'error');

        return {
            success: false,
            pluginSlugFree,
            error,
        };
    }
}
