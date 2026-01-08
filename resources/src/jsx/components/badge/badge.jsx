/**
 * Badge.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\badge
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

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
