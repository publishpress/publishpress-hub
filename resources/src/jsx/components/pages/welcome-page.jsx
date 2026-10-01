/**
 * Welcome page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo } from '@wordpress/element';

import { __, sprintf } from '@publishpress-hub/i18n';
import {
    escapeHTML,
    escapeAttribute
} from '@wordpress/escape-html';

import { AdminPageLayout } from '../admin-page';
import { Button } from '../buttons/button';

const {
    logoUrl,
    welcomeImageUrl,
    dismissUrl
} = window.ppHubWelcomePageConfig;

const WelcomePageComponent = () => {
    return (
        <AdminPageLayout
            logoUrl={logoUrl}
        >
            <div className="pp-hub-welcome-page">
                <div className="pp-hub-welcome-page__container">
                    <section className="pp-hub-welcome-page__hero">
                        <div className="pp-hub-welcome-page__hero-copy">
                            <span className="pp-hub-welcome-page__eyebrow">{__('Welcome to PublishPress Hub', 'publishpress-hub')}</span>
                            <h1>{__('Your publishing tools, in one place.', 'publishpress-hub')}</h1>
                            <p className="pp-hub-welcome-page__lead">{__('Manage your plugins, build your editorial workflow, and find the help you need to get started.', 'publishpress-hub')}</p>
                            <Button variant="primary" href={window.ppHubWelcomePageConfig.pluginsDashboardUrl} target="_self" isFullWidth={false}>
                                {__('View Plugins Dashboard', 'publishpress-hub')}
                            </Button>
                            <nav className="pp-hub-welcome-page__resources" aria-label={__('Help and account', 'publishpress-hub')}>
                                <a href={window.ppHubWelcomePageConfig.pluginDocumentationUrl} target="_blank" rel="noopener noreferrer">
                                    <span className="pp-hub-welcome-page__resource-icon dashicons dashicons-book-alt" aria-hidden="true" />
                                    <span><strong>{__('Documentation', 'publishpress-hub')}</strong><small>{__('Setup guides and answers for every plugin.', 'publishpress-hub')}</small></span>
                                    <span className="dashicons dashicons-arrow-right-alt2" aria-hidden="true" />
                                </a>
                                <a href={window.ppHubWelcomePageConfig.pluginSupportUrl} target="_blank" rel="noopener noreferrer">
                                    <span className="pp-hub-welcome-page__resource-icon dashicons dashicons-sos" aria-hidden="true" />
                                    <span><strong>{__('Get support', 'publishpress-hub')}</strong><small>{__('Get help from the PublishPress team.', 'publishpress-hub')}</small></span>
                                    <span className="dashicons dashicons-arrow-right-alt2" aria-hidden="true" />
                                </a>
                                <a href="https://publishpress.com/dashboard/?active_tab=licenses" target="_blank" rel="noopener noreferrer">
                                    <span className="pp-hub-welcome-page__resource-icon dashicons dashicons-admin-users" aria-hidden="true" />
                                    <span><strong>{__('Account and licenses', 'publishpress-hub')}</strong><small>{__('Find your license keys and manage your subscription.', 'publishpress-hub')}</small></span>
                                    <span className="dashicons dashicons-arrow-right-alt2" aria-hidden="true" />
                                </a>
                            </nav>
                        </div>
                        <div className="pp-hub-welcome-page__hero-art"><img src={welcomeImageUrl} alt="" /></div>
                    </section>
                    <div className="pp-hub-welcome-page__box">
                        <h2 className="pp-hub-welcome-page__features-title">
                            {__('What you can do with PublishPress Hub', 'publishpress-hub')}
                        </h2>
                        <p className="pp-hub-welcome-page__message">
                            {__('PublishPress Hub has everything you need to install, update, and manage your PublishPress plugins. We\'re here to help you build a publishing system that works perfectly for your team.', 'publishpress-hub')}
                        </p>

                        <div className="pp-hub-welcome-page__features-grid">
                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">
                                    <span className="dashicons dashicons-chart-bar" aria-hidden="true" />
                                </div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('Centralized Dashboard', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('View all your PublishPress plugins with their licenses, versions, and key details.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">
                                    <span className="dashicons dashicons-admin-plugins" aria-hidden="true" />
                                </div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('One-Click Installation', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Install free PublishPress plugins directly from the Hub without visiting WordPress.org.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">
                                    <span className="dashicons dashicons-admin-network" aria-hidden="true" />
                                </div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('License Management', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Connect your PublishPress licenses to easily install and activate Pro versions.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">
                                    <span className="dashicons dashicons-update" aria-hidden="true" />
                                </div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('Easy Updates', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Keep all your PublishPress plugins up to date with one-click updates.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">
                                    <span className="dashicons dashicons-yes-alt" aria-hidden="true" />
                                </div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('Status Monitoring', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Monitor plugin activation status, detect conflicts, and ensure compatibility.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">
                                    <span className="dashicons dashicons-admin-tools" aria-hidden="true" />
                                </div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('Get Started', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description" dangerouslySetInnerHTML={{ __html: sprintf(
                                    escapeHTML(__('Ready to explore? Visit the %s to see all available PublishPress plugins.', 'publishpress-hub')),
                                        '<a href="' + escapeAttribute(window.ppHubWelcomePageConfig.pluginsDashboardUrl) + '">' + escapeHTML(__('Plugins Dashboard', 'publishpress-hub')) + '</a>'
                                    ) }}>

                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="pp-hub-welcome-page__dismiss">
                        {__('Already know what you\'re doing? Great! You can ', 'publishpress-hub')}
                        <a href={dismissUrl}>
                            {__('dismiss this page', 'publishpress-hub')}
                        </a>
                        {__('.', 'publishpress-hub')}
                    </p>
                </div>
            </div>
        </AdminPageLayout>
    );
};

export const WelcomePage = memo(WelcomePageComponent);
