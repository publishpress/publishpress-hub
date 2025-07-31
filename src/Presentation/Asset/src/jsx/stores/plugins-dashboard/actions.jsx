import { apiFetch } from '@wordpress/data-controls';
import { dispatch } from '@wordpress/data';

import { __, sprintf } from '@publishpress-hub/i18n';

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

export function* setLicenseInputModalOpenForUpgrade(isOpen) {
    yield {
        type: 'SET_LICENSE_INPUT_MODAL_OPEN_FOR_UPGRADE',
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

export function* setIsUpgradeModalOpen(isOpen) {
    yield {
        type: 'SET_IS_UPGRADE_MODAL_OPEN',
        isOpen,
    };
}

export function* setIsResolveConflictModalOpen(isOpen) {
    yield {
        type: 'SET_IS_RESOLVE_CONFLICT_MODAL_OPEN',
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
            yield {type: 'FETCH_PLUGINS_SUCCESS', data: data.plugins};

            return {
                success: true,
                data: data.plugins,
            };
        } else {
            throw new Error(data.error || 'Failed to fetch plugins');
        }
    } catch (error) {
        yield {type: 'FETCH_PLUGINS_ERROR', error: error};

        yield createNotice(__('Failed to fetch plugins', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            error,
        };
    }
}

export function* installFreePlugin(pluginFamilySlug) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginFamilySlug}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/install/free`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: {pluginFamilySlug}};

            yield createSnackbarNotice(__('Plugin installed successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginFamilySlug,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin installation failed');
        }
    } catch (error) {
        yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginFamilySlug, error: error}};

        yield createNotice(__('Plugin installation failed', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamilySlug,
            error,
        };
    }
}

export function* installProPlugin(pluginFamilySlug, licenseKey) {
    try {
        yield {type: 'INSTALL_PLUGIN_START', data: {pluginFamilySlug}};

        yield apiReady();

        licenseKey = licenseKey.trim();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/install/pro`,
            method: 'POST',
            data: {
                licenseKey: licenseKey,
            },
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'INSTALL_PLUGIN_SUCCESS', data: {pluginFamilySlug}};

            yield createSnackbarNotice(__('Plugin installed successfully', 'publishpress-hub'), 'success');

            // Return context along with the API response
            return {
                success: true,
                pluginFamilySlug,
                licenseKey,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin installation failed');
        }
    } catch (error) {
        yield {type: 'INSTALL_PLUGIN_ERROR', data: {pluginFamilySlug, error: error}};

        yield createNotice(__('Plugin installation failed', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamilySlug,
            licenseKey,
            error,
        };
    }
}


export function* uninstallPlugin(pluginFamilySlug) {
    try {
        yield {type: 'UNINSTALL_PLUGIN_START', data: {pluginFamilySlug}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/uninstall`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'UNINSTALL_PLUGIN_SUCCESS', data: {pluginFamilySlug}};

            yield createSnackbarNotice(__('Plugin uninstalled successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginFamilySlug,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin uninstall failed');
        }
    } catch (error) {
        yield {type: 'UNINSTALL_PLUGIN_ERROR', data: {pluginFamilySlug, error: error}};

        yield createNotice(__('Plugin uninstall failed', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamilySlug,
            error,
        };
    }
}

export function* activatePlugin(pluginFamilySlug) {
    try {
        yield {type: 'ACTIVATE_PLUGIN_START', data: {pluginFamilySlug}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/activate`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'ACTIVATE_PLUGIN_SUCCESS', data: {pluginFamilySlug}};

            yield createSnackbarNotice(__('Plugin activated successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginFamilySlug,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin activation failed');
        }
    } catch (error) {
        yield {type: 'ACTIVATE_PLUGIN_ERROR', data: {pluginFamilySlug, error: error}};

        yield createNotice(__('Plugin activation failed', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamilySlug,
            error,
        };
    }
}

export function* deactivatePlugin(pluginFamilySlug) {
    try {
        yield {type: 'DEACTIVATE_PLUGIN_START', data: {pluginFamilySlug}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/deactivate`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'DEACTIVATE_PLUGIN_SUCCESS', data: {pluginFamilySlug}};

            yield createSnackbarNotice(__('Plugin deactivated successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginFamilySlug,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin deactivation failed');
        }
    } catch (error) {
        yield {type: 'DEACTIVATE_PLUGIN_ERROR', data: {pluginFamilySlug, error: error}};

        yield createNotice(__('Plugin deactivation failed', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamilySlug,
            error,
        };
    }
}

export function* upgradePluginToPro(pluginFamilySlug, licenseKey) {
    try {
        yield {type: 'UPGRADE_PLUGIN_TO_PRO_START', data: {pluginFamilySlug, licenseKey}};

        yield apiReady();

        licenseKey = licenseKey.trim();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/upgrade`,
            method: 'POST',
            data: {
                licenseKey: licenseKey,
            },
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'UPGRADE_PLUGIN_TO_PRO_SUCCESS', data: {pluginFamilySlug}};

            yield createSnackbarNotice(__('Plugin upgraded to Pro successfully', 'publishpress-hub'), 'success');

            // Return context along with the API response
            return {
                success: true,
                pluginFamilySlug,
                licenseKey,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin upgrade to Pro failed');
        }
    } catch (error) {
        yield {type: 'UPGRADE_PLUGIN_TO_PRO_ERROR', data: {pluginFamilySlug, error: error}};

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamilySlug,
            licenseKey,
            error,
        };
    }
}

export function* resolveConflict(pluginFamily, pluginToKeep) {
    try {
        const validPlugins = ['free', 'pro'];
        const validPluginToKeep = validPlugins.includes(pluginToKeep) ? pluginToKeep : null;

        if (!validPluginToKeep) {
            throw new Error('Invalid plugin to keep');
        }

        yield {type: 'RESOLVE_CONFLICT_START', data: {pluginFamily, pluginToKeep}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/resolve-conflict`,
            method: 'POST',
            data: {
                pluginToKeep: pluginToKeep,
            },
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'RESOLVE_CONFLICT_SUCCESS', data: {pluginFamily, pluginToKeep}};

            yield createSnackbarNotice(__('Conflict resolved successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginFamily,
                pluginToKeep,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Failed to resolve conflict');
        }
    } catch (error) {
        yield {type: 'RESOLVE_CONFLICT_ERROR', data: {pluginFamily, pluginToKeep, error: error}};

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamily,
            pluginToKeep,
            error,
        };
    }
}

export function* deactivateLicense(pluginFamily) {
    try {
        yield {type: 'DEACTIVATE_LICENSE_START', data: {pluginSlug: pluginFamily.slug}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/deactivate-license`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'DEACTIVATE_LICENSE_SUCCESS', data: {pluginSlug: pluginFamily.slug}};

            yield createSnackbarNotice(__('License deactivated successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginSlug: pluginFamily,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'License deactivation failed');
        }
    } catch (error) {
        yield {type: 'DEACTIVATE_LICENSE_ERROR', data: {pluginSlug: pluginFamily.slug, error: error}};

        yield createNotice(__('License deactivation failed', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginSlug: pluginFamily.slug,
            error,
        };
    }
}

export function* activateLicense(pluginFamily, licenseKey) {
    try {
        yield {type: 'ACTIVATE_LICENSE_START', data: {pluginSlug: pluginFamily.slug, licenseKey}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/activate-license`,
            method: 'POST',
            data: {
                licenseKey: licenseKey,
            },
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'ACTIVATE_LICENSE_SUCCESS', data: {pluginSlug: pluginFamily.slug, licenseKey}};

            yield createSnackbarNotice(__('License activated successfully', 'publishpress-hub'), 'success');

            return {
                success: true,
                pluginSlug: pluginFamily,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'License activation failed');
        }
    } catch (error) {
        yield {type: 'ACTIVATE_LICENSE_ERROR', data: {pluginSlug: pluginFamily.slug, licenseKey, error: error}};

        yield createNotice(__('License activation failed', 'publishpress-hub'), 'error');

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginSlug: pluginFamily.slug,
            error,
        };
    }
}

function handleErrorMessageOnContext(error) {
    if (error.context?.cloudflare_ray_id) {
        if (! error.context.error_message) {
            error.context.error_message = '';
        }

        error.context.error_message += ' ' + sprintf(__('Cloudflare Ray ID: %s', 'publishpress-hub'), error.context.cloudflare_ray_id);
    }

    if (error.context?.operation) {
        error.context.error_message += ' ' + sprintf(__('Operation: %s', 'publishpress-hub'), error.context.operation);
    }

    return error;
}
