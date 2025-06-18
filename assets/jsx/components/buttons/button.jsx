import { Button as WPButton } from "@wordpress/components";

export const Button = ({
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
}) => {
    return (
        <WPButton
            variant={variant}
            icon={icon}
            onClick={onClick}
            href={href}
            target={target || '_blank'}
            rel={rel || 'noopener noreferrer'}
            className={className}
            disabled={disabled}
            title={title}
            style={style}
        >
            {children}
        </WPButton>
    )
}
