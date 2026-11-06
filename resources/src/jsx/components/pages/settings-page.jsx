/**
 * Settings page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useState } from '@wordpress/element';
import { Button, Notice, TabPanel } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import { __ } from '@publishpress-hub/i18n';

import { AdminPageLayout } from '../admin-page';
import { DiagnosticsTab } from './settings/DiagnosticsTab';
import { DebugLogTab } from './settings/DebugLogTab';

const {
    logoUrl,
    debugModeEnabled,
} = window.ppHubSettingsPageConfig || {};

const TAB_QUERY_PARAM = 'tab';

const buildTabs = () => {
    const tabs = [
        {
            name: 'diagnostics',
            title: __('Diagnostics', 'publishpress-hub'),
            className: 'pp-hub-settings-tab',
        },
    ];

    if (debugModeEnabled) {
        tabs.push({
            name: 'debug-log',
            title: __('Debug Log', 'publishpress-hub'),
            className: 'pp-hub-settings-tab',
        });
    }

    return tabs;
};

const getInitialTabName = (tabs) => {
    const defaultTab = tabs[0]?.name || '';

    if (!defaultTab) {
        return '';
    }

    const currentUrl = new URL(window.location.href);
    const selectedTab = currentUrl.searchParams.get(TAB_QUERY_PARAM);
    const hasSelectedTab = tabs.some((tab) => tab.name === selectedTab);

    return hasSelectedTab ? selectedTab : defaultTab;
};

const updateSelectedTabInUrl = (tabName) => {
    if (!tabName) {
        return;
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set(TAB_QUERY_PARAM, tabName);
    window.history.replaceState({}, '', currentUrl.toString());
};

const renderTab = (tab) => {
    if (tab.name === 'debug-log') {
        return <DebugLogTab />;
    }

    return <DiagnosticsTab />;
};

const SettingsPageComponent = () => {
    const title = __('Settings', 'publishpress-hub');
    const tabs = buildTabs();
    const initialTabName = getInitialTabName(tabs);
    const [isLoadingReport, setIsLoadingReport] = useState(false);
    const [notice, setNotice] = useState(null);

    const fetchReport = async () => {
        const response = await apiFetch({
            path: '/publishpress-hub/v1/settings/site-health-report',
        });

        return response;
    };

    const copyTextToClipboard = async (text) => {
        const copyViaExecCommand = () => {
            const el = document.createElement('textarea');
            el.value = text;
            el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
            document.body.appendChild(el);
            el.focus();
            el.select();
            const success = document.execCommand('copy');
            document.body.removeChild(el);
            return success;
        };

        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                if (copyViaExecCommand()) {
                    return;
                }

                throw error;
            }
        }

        if (!copyViaExecCommand()) {
            throw new Error('execCommand copy failed');
        }
    };

    const handleCopyReport = async () => {
        setIsLoadingReport(true);
        setNotice(null);

        try {
            const response = await fetchReport();
            await copyTextToClipboard(response.report || '');

            setNotice({
                status: 'success',
                message: __('Site health report copied to clipboard.', 'publishpress-hub'),
            });
        } catch (error) {
            setNotice({
                status: 'error',
                message: __('Failed to copy the site health report. Please try again.', 'publishpress-hub'),
            });
        } finally {
            setIsLoadingReport(false);
        }
    };

    const handleDownloadReport = async () => {
        setIsLoadingReport(true);
        setNotice(null);

        try {
            const response = await fetchReport();
            const blob = new Blob([response.report || ''], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = response.filename || 'publishpress-hub-site-health-report.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setNotice({
                status: 'success',
                message: __('Site health report downloaded.', 'publishpress-hub'),
            });
        } catch (error) {
            setNotice({
                status: 'error',
                message: __('Failed to download the site health report. Please try again.', 'publishpress-hub'),
            });
        } finally {
            setIsLoadingReport(false);
        }
    };

    return (
        <AdminPageLayout
            title={title}
            logoUrl={logoUrl}
        >
            {notice && (
                <div className="pp-hub-settings-page__notice">
                    <Notice
                        status={notice.status}
                        isDismissible
                        onRemove={() => setNotice(null)}
                    >
                        {notice.message}
                    </Notice>
                </div>
            )}

            <div className="pp-hub-settings-page">
                <TabPanel
                    className="pp-hub-settings-tabs"
                    tabs={tabs}
                    initialTabName={initialTabName}
                    onSelect={(tabName) => updateSelectedTabInUrl(tabName)}
                >
                    {renderTab}
                </TabPanel>

                <div className="pp-hub-settings-page__report-actions">
                    <Button
                        variant="secondary"
                        onClick={handleCopyReport}
                        isBusy={isLoadingReport}
                        disabled={isLoadingReport}
                        accessibleWhenDisabled
                    >
                        {__('Copy Site Health Report', 'publishpress-hub')}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={handleDownloadReport}
                        disabled={isLoadingReport}
                        accessibleWhenDisabled
                    >
                        {__('Download Site Health Report', 'publishpress-hub')}
                    </Button>
                </div>
            </div>
        </AdminPageLayout>
    );
};

export const SettingsPage = memo(SettingsPageComponent);
