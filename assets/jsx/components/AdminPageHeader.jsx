import HelpButton from "./HelpButton"

export const AdminPageHeader = ({ title, description, logoUrl, children }) => {
    return (
        <div className="publishpress-hub-admin-page-header">
            <img src={logoUrl} alt="PublishPress" className="publishpress-hub-admin-page-header-logo" />
            {children}
            <div className="publishpress-hub-admin-page-header-actions">
                <HelpButton />
            </div>
        </div>
    )
}
