/**
 * Plugins dashboard actions.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { apiFetch, select } from '@wordpress/data-controls';
import { dispatch } from '@wordpress/data';

import { __, sprintf } from '@publishpress-hub/i18n';

import apiReady from '../../utils/apiReady';
import { STORE_NAME } from './name';

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

/**
 * Gets the plugin name from the plugin family slug.
 *
 * @param {string} pluginFamilySlug The plugin family slug.
 * @return {string} The plugin name or fallback to slug.
 */
function* getPluginName(pluginFamilySlug) {
    const plugins = yield select(STORE_NAME, 'getPlugins');
    const pluginFamily = plugins.find(plugin => plugin.slug === pluginFamilySlug);

    if (!pluginFamily) {
        return pluginFamilySlug;
    }

    // Use the installed plugin's name if available, otherwise use family name
    if (pluginFamily.hasAnyVersionInstalled) {
        if (pluginFamily.proPlugin.isInstalled) {
            return pluginFamily.proPlugin.name;
        }
        if (pluginFamily.freePlugin.isInstalled) {
            return pluginFamily.freePlugin.name;
        }
    }

    // Fallback to family name
    return pluginFamily.name || pluginFamilySlug;
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

export function* fetchPlugins(forceCheck = false) {
    try {
        yield {type: 'FETCH_PLUGINS_START'};

        yield apiReady();

        const path = forceCheck
            ? `${API_NAMESPACE}/plugins?force-check=1`
            : `${API_NAMESPACE}/plugins`;

        const data = yield apiFetch({
            path,
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

        const errorMessage = getErrorMessage(error, __('Failed to fetch plugins', 'publishpress-hub'));
        yield createNotice(errorMessage, 'error');

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

            const pluginName = yield* getPluginName(pluginFamilySlug);
            yield createSnackbarNotice(
                sprintf(__('%s installed successfully', 'publishpress-hub'), pluginName),
                'success'
            );

            // Activate the plugin after successful installation
            yield* activatePlugin(pluginFamilySlug);

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

        const pluginName = yield* getPluginName(pluginFamilySlug);
        yield createNotice(
            sprintf(__('%s installation failed', 'publishpress-hub'), pluginName),
            'error'
        );

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

            const pluginName = yield* getPluginName(pluginFamilySlug);
            yield createSnackbarNotice(
                sprintf(__('%s installed successfully', 'publishpress-hub'), pluginName),
                'success'
            );

            // Activate the plugin after successful installation
            yield* activatePlugin(pluginFamilySlug);

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

        const pluginName = yield* getPluginName(pluginFamilySlug);
        yield createNotice(
            sprintf(__('%s installation failed', 'publishpress-hub'), pluginName),
            'error'
        );

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
    // Get plugin name before uninstall, as it won't be available after
    const pluginName = yield* getPluginName(pluginFamilySlug);

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

            yield createSnackbarNotice(
                sprintf(__('%s uninstalled successfully', 'publishpress-hub'), pluginName),
                'success'
            );

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

        yield createNotice(
            sprintf(__('%s uninstall failed', 'publishpress-hub'), pluginName),
            'error'
        );

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

            const pluginName = yield* getPluginName(pluginFamilySlug);
            yield createSnackbarNotice(
                sprintf(__('%s activated successfully', 'publishpress-hub'), pluginName),
                'success'
            );

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

        const pluginName = yield* getPluginName(pluginFamilySlug);
        const defaultMessage = sprintf(__('%s activation failed', 'publishpress-hub'), pluginName);
        const errorMessage = getErrorMessage(error, defaultMessage);
        yield createNotice(errorMessage, 'error');

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

            const pluginName = yield* getPluginName(pluginFamilySlug);
            yield createSnackbarNotice(
                sprintf(__('%s deactivated successfully', 'publishpress-hub'), pluginName),
                'success'
            );

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

        const pluginName = yield* getPluginName(pluginFamilySlug);
        const defaultMessage = sprintf(__('%s deactivation failed', 'publishpress-hub'), pluginName);
        const errorMessage = getErrorMessage(error, defaultMessage);
        yield createNotice(errorMessage, 'error');

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

            const pluginName = yield* getPluginName(pluginFamilySlug);
            yield createSnackbarNotice(
                sprintf(__('%s upgraded to Pro successfully', 'publishpress-hub'), pluginName),
                'success'
            );

            yield* activatePlugin(pluginFamilySlug);

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

        const pluginName = yield* getPluginName(pluginFamilySlug);
        yield createNotice(
            sprintf(__('%s upgrade to Pro failed', 'publishpress-hub'), pluginName),
            'error'
        );

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

            yield createSnackbarNotice(
                sprintf(__('Conflict resolved successfully for %s', 'publishpress-hub'), pluginFamily.name),
                'success'
            );

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

        yield createNotice(
            sprintf(__('Failed to resolve conflict for %s', 'publishpress-hub'), pluginFamily.name),
            'error'
        );

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
        yield {type: 'DEACTIVATE_LICENSE_START', data: {pluginFamily}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/deactivate-license`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'DEACTIVATE_LICENSE_SUCCESS', data: {pluginFamily}};

            yield createSnackbarNotice(
                sprintf(__('%s license deactivated successfully', 'publishpress-hub'), pluginFamily.name),
                'success'
            );

            return {
                success: true,
                pluginFamily,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'License deactivation failed');
        }
    } catch (error) {
        yield {type: 'DEACTIVATE_LICENSE_ERROR', data: {pluginFamily, error: error}};

        yield createNotice(
            sprintf(__('%s license deactivation failed', 'publishpress-hub'), pluginFamily.name),
            'error'
        );

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamily,
            error,
        };
    }
}

export function* activateLicense(pluginFamily, licenseKey) {
    try {
        yield {type: 'ACTIVATE_LICENSE_START', data: {pluginFamily, licenseKey}};

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

            yield {type: 'ACTIVATE_LICENSE_SUCCESS', data: {pluginFamily, licenseKey}};

            yield createSnackbarNotice(
                sprintf(__('%s license activated successfully', 'publishpress-hub'), pluginFamily.name),
                'success'
            );

            return {
                success: true,
                pluginSlug: pluginFamily,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'License activation failed');
        }
    } catch (error) {
        yield {type: 'ACTIVATE_LICENSE_ERROR', data: {pluginFamily, licenseKey, error: error}};

        yield createNotice(
            sprintf(__('%s license activation failed', 'publishpress-hub'), pluginFamily.name),
            'error'
        );

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamily,
            licenseKey,
            error,
        };
    }
}

export function* updatePlugin(pluginFamilySlug) {
    try {
        yield {type: 'UPDATE_PLUGIN_START', data: {pluginFamilySlug}};

        yield apiReady();

        const data = yield apiFetch({
            path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/update`,
            method: 'POST',
        });

        if (data.success) {
            yield fetchPlugins();

            yield {type: 'UPDATE_PLUGIN_SUCCESS', data: {pluginFamilySlug}};

            const pluginName = yield* getPluginName(pluginFamilySlug);
            yield createSnackbarNotice(
                sprintf(__('%s updated successfully', 'publishpress-hub'), pluginName),
                'success'
            );

            return {
                success: true,
                pluginFamilySlug,
                apiResponse: data,
            };
        } else {
            throw new Error(data?.error || 'Plugin update failed');
        }
    } catch (error) {
        yield {type: 'UPDATE_PLUGIN_ERROR', data: {pluginFamilySlug, error: error}};

        const pluginName = yield* getPluginName(pluginFamilySlug);
        yield createNotice(
            sprintf(__('%s update failed', 'publishpress-hub'), pluginName),
            'error'
        );

        error = handleErrorMessageOnContext(error);

        return {
            success: false,
            pluginFamilySlug,
            error,
        };
    }
}

export function* cleanupError(pluginFamily) {
    yield {type: 'CLEANUP_ERROR', data: {pluginFamily}};
}

/**
 * Checks if an error is a rate limit error (429).
 *
 * @param {Error} error The error object.
 * @return {boolean} True if it's a rate limit error, false otherwise.
 */
function isRateLimitError(error) {
    if (!error) {
        return false;
    }

    // Check status code directly
    if (error.status === 429 || error?.data?.status === 429) {
        return true;
    }

    // Check error code
    if (error.code === 'rate_limit_exceeded' || error.code === 'rest_rate_limit_exceeded') {
        return true;
    }

    // Check error message
    const errorMessage = error.message || error.data?.message || '';
    if (errorMessage.includes('Too many requests') || errorMessage.includes('rate limit')) {
        return true;
    }

    // Check response status if available
    if (error.response?.status === 429) {
        return true;
    }

    return false;
}

/**
 * Gets an appropriate error message based on the error type.
 *
 * @param {Error} error The error object.
 * @param {string} defaultMessage The default error message.
 * @return {string} The error message.
 */
function getErrorMessage(error, defaultMessage) {
    if (isRateLimitError(error)) {
        return __('Too many requests. Please wait a few seconds and try again.', 'publishpress-hub');
    }

    return defaultMessage;
}

function handleErrorMessageOnContext(error) {
    let errorMessage = '';

    if (error.context?.cloudflare_ray_id) {
        errorMessage += ' ' + sprintf(__('Cloudflare Ray ID: %s', 'publishpress-hub'), error.context.cloudflare_ray_id);
    }

    if (errorMessage != '') {
        errorMessage = errorMessage.trim();

        if (error.context?.error_message) {
            error.context.error_message += ' ' + errorMessage;
        } else {
            error.context.error_message = errorMessage;
        }
    }

    return error;
}
