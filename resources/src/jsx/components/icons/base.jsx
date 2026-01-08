/**
 * Base icon.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\icons
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import classNames from 'classnames';

export const BaseIcon = ({children, size, className}) => {
    const classes = classNames('pp-hub-icon', className);

    return (
        <span className={classes} style={{width: `${size}px`, height: `${size}px`, display: 'inline-block'}}>
            {children}
        </span>
    );
};
