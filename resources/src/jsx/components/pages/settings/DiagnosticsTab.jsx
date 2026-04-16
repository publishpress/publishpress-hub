/**
 * Diagnostics settings tab.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useState } from '@wordpress/element';
import { ToggleControl, Notice } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import { __ } from '@publishpress-hub/i18n';

const { debugModeEnabled: initialDebugMode } = window.ppHubSettingsPageConfig || {};

const DiagnosticsTabComponent = () => {
    const [debugMode, setDebugMode] = useState(Boolean(initialDebugMode));
    const [isSaving, setIsSaving] = useState(false);
    const [notice, setNotice] = useState(null);

    const handleDebugModeChange = async (newValue) => {
        setIsSaving(true);
        setNotice(null);

        try {
            await apiFetch({
                path: '/publishpress-hub/v1/settings/diagnostics',
                method: 'POST',
                data: { debug_mode: newValue },
            });

            setDebugMode(newValue);

            setNotice({
                status: 'success',
                message: newValue
                    ? __('Debug mode enabled. A "Debug Log" tab is now available.', 'publishpress-hub')
                    : __('Debug mode disabled.', 'publishpress-hub'),
            });

            if (newValue !== Boolean(initialDebugMode)) {
                window.location.reload();
            }
        } catch (error) {
            setNotice({
                status: 'error',
                message: __('Failed to save the setting. Please try again.', 'publishpress-hub'),
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="pp-hub-diagnostics-tab">
            {notice && (
                <Notice
                    status={notice.status}
                    isDismissible
                    onRemove={() => setNotice(null)}
                >
                    {notice.message}
                </Notice>
            )}

            <div className="pp-hub-diagnostics-tab__section">
                <h3 className="pp-hub-diagnostics-tab__section-title">
                    {__('Debug Mode', 'publishpress-hub')}
                </h3>

                <p className="pp-hub-diagnostics-tab__description">
                    {__(
                        'When enabled, all HTTP requests and responses to remote services (license activation, plugin downloads, etc.) are logged to a dedicated log file. Use the Debug Log tab to inspect the captured data.',
                        'publishpress-hub'
                    )}
                </p>

                <ToggleControl
                    label={__('Enable Debug Mode', 'publishpress-hub')}
                    checked={debugMode}
                    onChange={handleDebugModeChange}
                    disabled={isSaving}
                    __nextHasNoMarginBottom
                />

                {debugMode && (
                    <p className="pp-hub-diagnostics-tab__hint">
                        {__(
                            'Debug logging is active. Switch to the "Debug Log" tab to view captured data.',
                            'publishpress-hub'
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};

export const DiagnosticsTab = memo(DiagnosticsTabComponent);
