import HelpButton from "../Buttons/HelpButton"

export const AdminPageHeader = ({
    title,
    description,
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
                {title && (
                    <h1 className="pp-hub-admin-page-header__title">{title}</h1>
                )}
                {description && (
                    <p className="pp-hub-admin-page-header__description">{description}</p>
                )}
                {children}
            </div>
            <div className="pp-hub-admin-page-header__actions">
                <HelpButton />
            </div>
        </div>
    )
}
