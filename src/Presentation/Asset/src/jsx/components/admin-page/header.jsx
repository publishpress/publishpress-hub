import { memo, useMemo } from '@wordpress/element';
import Button from "../buttons/button";

import { __ } from '@publishpress-hub/i18n';

// Constants moved outside to prevent recreation
const BASE_HEADER_CLASS = "pp-hub-admin-page-header";
const COMPACT_HEADER_CLASS = "pp-hub-admin-page-header pp-hub-admin-page-header--compact";
const LOGO_ALT_TEXT = "PublishPress";
const LOGO_TEXT = "Hub";

const AdminPageHeaderComponent = ({
    logoUrl,
    children,
    compact = false
}) => {
    // Memoize the header class computation
    const headerClass = useMemo(() => {
        return compact ? COMPACT_HEADER_CLASS : BASE_HEADER_CLASS;
    }, [compact]);

    return (
        <div className={headerClass}>
            <img
                src={logoUrl}
                alt={LOGO_ALT_TEXT}
                className="pp-hub-admin-page-header__logo"
            />
            <span className="pp-hub-admin-page-header__logo-text">{LOGO_TEXT}</span>
            <div className="pp-hub-admin-page-header__content">
                {children}
            </div>
            <div className="pp-hub-admin-page-header__actions">
                <Button
                    variant='secondary'
                    href='https://publishpress.com/publishpress-support/'
                    target='_blank'
                    rel='noopener noreferrer'
                    icon='editor-help'
                >{__('Get Support', 'publishpress-hub')}</Button>
            </div>
        </div>
    );
};

// Memoize the component to prevent unnecessary re-renders
export const AdminPageHeader = memo(AdminPageHeaderComponent);

export default AdminPageHeader;
