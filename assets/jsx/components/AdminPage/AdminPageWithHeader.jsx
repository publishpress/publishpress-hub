import '../css/admin-page.css';
import { AdminPageContainer } from './AdminPage/AdminPageContainer';
import { AdminPageHeader } from './AdminPage/AdminPageHeader';

export const AdminPageWithHeader = ({
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
