import { memo } from '@wordpress/element';

const BadgeComponent = ({
    text,
    className,
}) => {
    return (
        <span className={`pp-hub-badge ${className}`}>{text}</span>
    );
};

export const Badge = memo(BadgeComponent);

export default Badge;
