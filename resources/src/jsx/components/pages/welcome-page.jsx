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

import { __ } from '@publishpress-hub/i18n';

import { AdminPageLayout } from '../admin-page';
import { Footer } from '../admin-page/footer';

const {
    logoUrl,
    welcomeImageUrl,
    dismissUrl,
    pluginSlug,
    pluginName,
    pluginAboutUrl,
    pluginDocumentationUrl,
    pluginSupportUrl,
} = window.ppHubWelcomePageConfig;

const WelcomePageComponent = () => {
    return (
        <AdminPageLayout
            logoUrl={logoUrl}
        >
            <div className="pp-hub-welcome-page">
                <div className="pp-hub-welcome-page__header">
                    <div className="pp-hub-welcome-page__header-content">
                        <div className="pp-hub-welcome-page__header-text">
                            <h1 className="pp-hub-welcome-page__title">
                                {__('Welcome to PublishPress Hub!', 'publishpress-hub')}
                            </h1>
                        </div>
                        <div className="pp-hub-welcome-page__header-image">
                            <img src={welcomeImageUrl} alt={__('Welcome to PublishPress Hub', 'publishpress-hub')} />
                        </div>
                    </div>
                </div>

                <div className="pp-hub-welcome-page__content">
                    <h2 className="pp-hub-welcome-page__subtitle">
                        {__('Thank you for giving PublishPress Hub a try!', 'publishpress-hub')}
                    </h2>
                    <p className="pp-hub-welcome-page__message">
                        {__('Our plugins are designed to make managing your publishing workflow as simple as possible, and PublishPress Hub is the key to facilitate that.', 'publishpress-hub')}
                    </p>
                    <p className="pp-hub-welcome-page__message">
                        {__('Whether you\'re just getting started or looking to streamline your existing setup, you\'ll find everything you need to install, update, and manage your PublishPress plugins from one central location. We\'re here to help you build a publishing system that works perfectly for your team.', 'publishpress-hub')}
                    </p>

                    <div className="pp-hub-welcome-page__features">
                        <h2 className="pp-hub-welcome-page__tab-content-title">
                            {__('What you can do with PublishPress Hub', 'publishpress-hub')}
                        </h2>

                        <div className="pp-hub-welcome-page__tab-content-grid">
                            <div className="pp-hub-welcome-page__tab-content-item">
                                <div className="pp-hub-welcome-page__tab-content-icon">📊</div>
                                <h3 className="pp-hub-welcome-page__tab-content-item-title">
                                    {__('Centralized Dashboard', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__tab-content-item-description">
                                    {__('View all your PublishPress plugins with their license information, versions, and status in one convenient place.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__tab-content-item">
                                <div className="pp-hub-welcome-page__tab-content-icon">⚡</div>
                                <h3 className="pp-hub-welcome-page__tab-content-item-title">
                                    {__('One-Click Installation', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__tab-content-item-description">
                                    {__('Install free PublishPress plugins directly from the Hub without visiting the WordPress.org repository.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__tab-content-item">
                                <div className="pp-hub-welcome-page__tab-content-icon">🔑</div>
                                <h3 className="pp-hub-welcome-page__tab-content-item-title">
                                    {__('License Management', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__tab-content-item-description">
                                    {__('Connect your PublishPress license to install and activate Pro versions seamlessly, all from one place.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__tab-content-item">
                                <div className="pp-hub-welcome-page__tab-content-icon">🔄</div>
                                <h3 className="pp-hub-welcome-page__tab-content-item-title">
                                    {__('Easy Updates', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__tab-content-item-description">
                                    {__('Keep all your PublishPress plugins up to date with real-time monitoring and one-click updates.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__tab-content-item">
                                <div className="pp-hub-welcome-page__tab-content-icon">✅</div>
                                <h3 className="pp-hub-welcome-page__tab-content-item-title">
                                    {__('Status Monitoring', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__tab-content-item-description">
                                    {__('Monitor plugin activation status, detect conflicts, and ensure compatibility across your publishing tools.', 'publishpress-hub')}
                                </p>
                            </div>

                            <div className="pp-hub-welcome-page__tab-content-item">
                                <div className="pp-hub-welcome-page__tab-content-icon">🚀</div>
                                <h3 className="pp-hub-welcome-page__tab-content-item-title">
                                    {__('Get Started', 'publishpress-hub')}
                                </h3>
                                <p className="pp-hub-welcome-page__tab-content-item-description">
                                    {__('Ready to explore? Visit the ', 'publishpress-hub')}
                                    <a href={window.ppHubWelcomePageConfig.pluginsDashboardUrl}>
                                        {__('Plugins Dashboard', 'publishpress-hub')}
                                    </a>
                                    {__(' to see all available PublishPress plugins.', 'publishpress-hub')}
                                </p>
                            </div>
                        </div>
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
            <Footer
                pluginSlug={pluginSlug}
                pluginName={pluginName}
                pluginDocumentationUrl={pluginDocumentationUrl}
                pluginAboutUrl={pluginAboutUrl}
                pluginSupportUrl={pluginSupportUrl}
                logoUrl={logoUrl}
            />
        </AdminPageLayout>
    );
};

export const WelcomePage = memo(WelcomePageComponent);

