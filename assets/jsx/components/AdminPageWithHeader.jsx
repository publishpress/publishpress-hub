import '../css/admin-page.css';
import { AdminPageContainer } from './AdminPageContainer';
import { AdminPageHeader } from './AdminPageHeader';

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
