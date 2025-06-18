import { AdminPageContainer } from './container';
import { AdminPageHeader } from './header';

export const AdminPageLayout = ({
    title,
    logoUrl,
    children,
}) => {
    return (
        <AdminPageContainer
            title={title}
            logoUrl={logoUrl}
        >
            <AdminPageHeader
                title={title}
                logoUrl={logoUrl}
            />
            {children}
        </AdminPageContainer>
    )
}

export default AdminPageLayout;
