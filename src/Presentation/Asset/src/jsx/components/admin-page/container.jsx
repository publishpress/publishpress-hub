import { Popover, SlotFillProvider } from '@wordpress/components';

export const AdminPageContainer = ({
    className = '',
    variant = 'contained', // 'contained' | 'fullwidth'
    children,
}) => {
    const baseClass = 'pp-hub-admin-page-container';
    const variantClass = `pp-hub-${variant}`;
    const combinedClassName = `${baseClass} ${variantClass} pp-hub-root ${className}`.trim();

    return (
        <div
            id="publishpress-hub-admin-page-container"
            className={combinedClassName}
            data-theme="default"
        >
            {children}
            <SlotFillProvider>
                <Popover.Slot />
            </SlotFillProvider>
        </div>
    )
}

export default AdminPageContainer;
