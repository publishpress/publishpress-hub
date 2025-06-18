import { Button } from "@wordpress/components";
import { __ } from '@publishpress/hub-i18n';

export const HelpButton = ({
    variant = 'default', // 'default' | 'primary' | 'secondary' | 'ghost'
    size = 'default', // 'small' | 'default' | 'large'
    icon = 'editor-help',
    children,
    className = '',
    ...props
}) => {
    const helpUrl = 'https://publishpress.com/publishpress-support/';

    const handleClick = () => {
        window.open(helpUrl, '_blank');
    }

    // Build CSS classes
    const baseClass = 'pp-hub-help-button';
    const variantClass = variant !== 'default' ? `pp-hub-help-button--${variant}` : '';
    const sizeClass = size !== 'default' ? `pp-hub-help-button--${size}` : '';
    const combinedClassName = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

    return (
        <Button
            icon={icon}
            onClick={handleClick}
            className={combinedClassName}
            {...props}
        >
            {children || __('Need Help?', 'publishpress-hub')}
        </Button>
    )
}

export default HelpButton;
