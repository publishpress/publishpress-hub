import { escapeHTML } from '@wordpress/escape-html';
import { memo, useMemo } from '@wordpress/element';

import { __, sprintf, esc_html__ } from '@publishpress-hub/i18n';

const FooterComponent = ({
    pluginSlug,
    pluginName,
    pluginDocumentationUrl,
    pluginAboutUrl,
    pluginSupportUrl,
    logoUrl,
}) => {
    const stars = useMemo(
        () => Array(5).fill('<span class="dashicons dashicons-star-filled"></span>').join(''),
        []
    );

    return (
        <footer className="pp-hub-footer">
            <div className="pp-hub-footer-rating">
                <a href={`//wordpress.org/support/plugin/${pluginSlug}/reviews/#new-post`} target="_blank" rel="noopener noreferrer">
                    <span dangerouslySetInnerHTML={{
                        __html: sprintf(
                            /* translators: %s is the plugin name, %s is the rating */
                            escapeHTML(__('If you like %s please leave us a %s rating. Thank you!', 'publishpress-hub')),
                            `<strong>${escapeHTML(pluginName)}</strong>,`,
                            `<span className="pp-hub-footer-stars">${stars}</span>`
                        )
                    }} />
                </a>
            </div>
            <hr className="pp-hub-footer-separator" />
            <nav className="pp-hub-footer-nav">
                <ul>
                    <li>
                        <a
                            href={pluginAboutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={sprintf(
                                /* translators: %s is the plugin name */
                                __('About %s', 'publishpress-hub'),
                                pluginName
                            )}>{__('About', 'publishpress-hub')}</a>
                    </li>
                    <li>
                        <a
                            href={pluginDocumentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={sprintf(
                                /* translators: %s is the plugin name */
                                __('Documentation for %s', 'publishpress-hub'),
                                pluginName
                            )}>{__('Documentation', 'publishpress-hub')}</a>
                    </li>
                    <li>
                        <a
                            href={pluginSupportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={sprintf(
                                /* translators: %s is the plugin name */
                                __('Contact the %s team', 'publishpress-hub'),
                                pluginName
                            )}>{__('Contact', 'publishpress-hub')}</a>
                    </li>
                </ul>
            </nav>
            <div className="pp-hub-footer-logo">
                <a href="https://publishpress.com" target="_blank" rel="noopener noreferrer">
                    <img src={logoUrl} alt="PublishPress" />
                </a>
            </div>
        </footer>
    );
};

export const Footer = memo(FooterComponent);
