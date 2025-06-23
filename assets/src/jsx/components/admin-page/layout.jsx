import { AdminPageContainer } from './container';
import { AdminPageHeader } from './header';

export const AdminPageLayout = ({
    title,
    logoUrl,
    children,
}) => {
    return (
        <div className="pp-hub-admin-page-layout">
            <AdminPageHeader logoUrl={logoUrl} />
            <AdminPageContainer>
                {title && (
                    <h1 className="pp-hub-admin-page-layout__title">{title}</h1>
                )}

                <div className="pp-hub-admin-page-layout__content">
                    {children}
                </div>
            </AdminPageContainer>
        </div>
    )
}

export default AdminPageLayout;
