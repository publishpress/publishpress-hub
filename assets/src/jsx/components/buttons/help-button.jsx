import { Button } from "@wordpress/components";
import { memo, useCallback, useMemo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

const BASE_CLASS = 'pp-hub-help-button';
const HELP_URL = 'https://publishpress.com/publishpress-support/';

const DEFAULT_HELP_TEXT = __('Need Help?', 'publishpress-hub');

const HelpButtonComponent = ({
    variant = 'default', // 'default' | 'primary' | 'secondary' | 'ghost'
    size = 'default', // 'small' | 'default' | 'large'
    icon = 'editor-help',
    children,
    className = '',
    ...props
}) => {
    const handleClick = useCallback(() => {
        window.open(HELP_URL, '_blank');
    }, []);

    const combinedClassName = useMemo(() => {
        const variantClass = variant !== 'default' ? `${BASE_CLASS}--${variant}` : '';
        const sizeClass = size !== 'default' ? `${BASE_CLASS}--${size}` : '';
        return `${BASE_CLASS} ${variantClass} ${sizeClass} ${className}`.trim();
    }, [variant, size, className]);

    const buttonText = useMemo(() => {
        return children || DEFAULT_HELP_TEXT;
    }, [children]);

    return (
        <Button
            icon={icon}
            onClick={handleClick}
            className={combinedClassName}
            {...props}
        >
            {buttonText}
        </Button>
    );
};

export const HelpButton = memo(HelpButtonComponent);

export default HelpButton;
