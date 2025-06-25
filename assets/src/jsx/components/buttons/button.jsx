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
                {children}
                <Spinner />
            </>
        );

        disabled = true;
    }

    const buttonClassName = useMemo(() => {
        let variantClassName = '';
        if (variant === 'highlight') {
            variantClassName = 'is-highlight';
        }

        return `pp-hub-button ${variantClassName} ${className ? className : ''} ${isFullWidth ? 'is-full-width' : ''}`;
    }, [className, isFullWidth, variant]);

    return (
        <WPButton
            variant={variant}
            icon={icon}
            onClick={onClick}
            href={href}
            target={targetValue}
            rel={relValue}
            className={buttonClassName}
            disabled={disabled}
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
