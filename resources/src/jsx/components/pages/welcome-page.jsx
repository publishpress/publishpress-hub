/**
 * Welcome page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
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
                    <div className="pp-hub-welcome-page__header">
                        <h1 className="pp-hub-welcome-page__title">
                            {__('Welcome to PublishPress Hub!', 'publishpress-hub')}
                        </h1>
                        <p className="pp-hub-welcome-page__subtitle">
                            {__('Get started with PublishPress Hub in a few simple steps.', 'publishpress-hub')}
                        </p>
                    </div>

                    <div className="pp-hub-welcome-page__box">
                        <div className="pp-hub-welcome-page__intro">
                            <div className="pp-hub-welcome-page__intro-image">
                                <img src={welcomeImageUrl} alt={__('Welcome to PublishPress Hub', 'publishpress-hub')} />
                            </div>
                        </div>

                        <h2 className="pp-hub-welcome-page__features-title">
                            {__('What you can do with PublishPress Hub', 'publishpress-hub')}
                        </h2>
                        <p className="pp-hub-welcome-page__message">
                            {__('PublishPress Hub has everything you need to install, update, and manage your PublishPress plugins. We\'re here to help you build a publishing system that works perfectly for your team.', 'publishpress-hub')}
                        </p>

                        <div className="pp-hub-welcome-page__features-grid">
                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">📊</div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('Centralized Dashboard', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('View all your PublishPress plugins with their licenses, versions, and key details.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">⚡</div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('One-Click Installation', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Install free PublishPress plugins directly from the Hub without visiting WordPress.org.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">🔑</div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('License Management', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Connect your PublishPress licenses to easily install and activate Pro versions.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">🔄</div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('Easy Updates', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Keep all your PublishPress plugins up to date with one-click updates.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">✅</div>
                                <h3 className="pp-hub-welcome-page__feature-title">
                                    {__('Status Monitoring', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__feature-description">
                                    {__('Monitor plugin activation status, detect conflicts, and ensure compatibility.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__feature-item">
                                <div className="pp-hub-welcome-page__feature-icon">🚀</div>
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
                        <div className="pp-hub-welcome-page__cta">
                            <Button
                                variant="primary"
                                href={window.ppHubWelcomePageConfig.pluginsDashboardUrl}
                                target="_self"
                                isFullWidth={false}
                                className="pp-hub-welcome-page__cta-button"
                            >
                                {__('View Plugins Dashboard', 'publishpress-hub')}
                            </Button>
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

