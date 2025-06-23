import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { AdminPageLayout } from '../admin-page';

const ErrorPageComponent = ({ error, title, logoUrl }) => {
    return (
        <AdminPageLayout
            title={title}
            logoUrl={logoUrl}
        >
            <div className="pp-hub-plugins-dashboard">
                <div className="error-message">
                    {error?.data?.status && sprintf(__('Error [%s]: %s', 'publishpress-hub'), error.data.status, error.message)}
                    {!error?.data?.status && sprintf(__('Error: %s', 'publishpress-hub'), error.message)}
                </div>
            </div>
        </AdminPageLayout>
    );
};

export const ErrorPage = memo(ErrorPageComponent);
