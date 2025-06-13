import '../css/admin-page.css';

export const AdminPageContainer = (props) => {
    return (
        <div id="publishpress-hub-admin-page-container" className={props.className}>
            {props.children}
        </div>
    )
}
