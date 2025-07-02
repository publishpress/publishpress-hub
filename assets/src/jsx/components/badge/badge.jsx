import { memo } from '@wordpress/element';

const BadgeComponent = ({
    className,
    children,
}) => {
    return (
        <span className={`pp-hub-badge ${className}`}>{children}</span>
    );
};

export const Badge = memo(BadgeComponent);

export default Badge;
