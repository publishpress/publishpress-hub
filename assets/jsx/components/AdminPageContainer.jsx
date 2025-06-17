import '../css/admin-page.css';

export const AdminPageContainer = ({
    className,
    children,
}) => {
    return (
        <div id="publishpress-hub-admin-page-container" className={className}>
            {children}
        </div>
    )
}
