import HelpButton from "../buttons/help-button";

export const AdminPageHeader = ({
    logoUrl,
    children,
    compact = false
}) => {
    const headerClass = compact
        ? "pp-hub-admin-page-header pp-hub-admin-page-header--compact"
        : "pp-hub-admin-page-header";

    return (
        <div className={headerClass}>
            <img
                src={logoUrl}
                alt="PublishPress"
                className="pp-hub-admin-page-header__logo"
            />
            <span className="pp-hub-admin-page-header__logo-text">Hub</span>
            <div className="pp-hub-admin-page-header__content">
                {children}
            </div>
            <div className="pp-hub-admin-page-header__actions">
                <HelpButton />
            </div>
        </div>
    )
}

export default AdminPageHeader;
