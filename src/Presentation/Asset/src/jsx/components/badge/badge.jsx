import { memo } from '@wordpress/element';

const BadgeComponent = ({
    className,
    children,
    icon,
}) => {
    return (
        <span className={`pp-hub-badge ${className}`}>
            {icon && <span className="pp-hub-badge-icon">{icon}</span>}
            {children}
        </span>
    );
};

export const Badge = memo(BadgeComponent);

export default Badge;
