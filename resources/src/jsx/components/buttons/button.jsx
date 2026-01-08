/**
 * Button.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\buttons
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { Button as WPButton, Spinner } from "@wordpress/components";
import { memo, useMemo } from '@wordpress/element';

const DEFAULT_TARGET = '_blank';
const DEFAULT_REL = 'noopener noreferrer';

const ButtonComponent = ({
    variant,
    icon,
    onClick,
    href,
    target,
    rel,
    className,
    disabled,
    title,
    style,
    children,
    isFullWidth,
    isLoading,
    spinnerPosition = 'right',
    ...restProps
}) => {
    const targetValue = useMemo(() => {
        return target || (href ? DEFAULT_TARGET : undefined);
    }, [target, href]);

    const relValue = useMemo(() => {
        return rel || (href ? DEFAULT_REL : undefined);
    }, [rel, href]);

    if (isLoading) {
        children = (
            <>
                {spinnerPosition === 'left' && <Spinner />}
                {children}
                {spinnerPosition === 'right' && <Spinner />}
            </>
        );

        disabled = true;
    }

    const buttonClassName = useMemo(() => {
        let variantClassName = '';
        if (variant === 'highlight') {
            variantClassName = 'is-highlight';
        }

        if (variant === 'danger') {
            variantClassName = 'is-danger';
        }

        return `pp-hub-button ${variantClassName} ${className ? className : ''} ${isFullWidth ? 'is-full-width' : ''} ${spinnerPosition === 'left' ? 'is-link-left' : ''}`;
    }, [className, isFullWidth, variant, spinnerPosition]);

    return (
        <WPButton
            variant={variant}
            icon={icon}
            onClick={onClick}
            href={href}
            target={targetValue}
            rel={relValue}
            className={buttonClassName}
            disabled={disabled || isLoading}
            title={title}
            style={style}
            {...restProps}
        >
            {children}
        </WPButton>
    );
};

// Memoize the component to prevent unnecessary re-renders
export const Button = memo(ButtonComponent);

export default Button;
