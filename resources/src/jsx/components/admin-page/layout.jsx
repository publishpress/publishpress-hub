/**
 * Admin page layout.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\admin-page\layout
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { AdminPageContainer } from './container';
import { AdminPageHeader } from './header';

export const AdminPageLayout = ({
    title,
    logoUrl,
    children,
    titleChildren,
}) => {
    return (
        <div className="pp-hub-admin-page-layout">
            <AdminPageHeader logoUrl={logoUrl} />
            <AdminPageContainer>
                {title && (
                    <div className="pp-hub-admin-page-layout__title-container">
                        <h1 className="pp-hub-admin-page-layout__title">{title}</h1>
                        {titleChildren && (
                            <div className="pp-hub-admin-page-layout__title-children">
                                {titleChildren}
                            </div>
                        )}
                    </div>
                )}

                <div className="pp-hub-admin-page-layout__content">
                    {children}
                </div>
            </AdminPageContainer>
        </div>
    )
}

export default AdminPageLayout;
