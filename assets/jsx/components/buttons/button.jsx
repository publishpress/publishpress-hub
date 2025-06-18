import { Button as WPButton } from "@wordpress/components";
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
    ...restProps
}) => {
    const targetValue = useMemo(() => {
        return target || (href ? DEFAULT_TARGET : undefined);
    }, [target, href]);

    const relValue = useMemo(() => {
        return rel || (href ? DEFAULT_REL : undefined);
    }, [rel, href]);

    return (
        <WPButton
            variant={variant}
            icon={icon}
            onClick={onClick}
            href={href}
            target={targetValue}
            rel={relValue}
            className={className}
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
