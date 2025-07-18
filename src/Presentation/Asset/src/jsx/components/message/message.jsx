import { memo } from '@wordpress/element';

import classNames from 'classnames';

const MessageComponent = ({
    children,
    className,
    variant,
}) => {
    const classes = classNames('pp-hub-message', className, {
        'is-error': variant === 'error',
        'is-success': variant === 'success',
        'is-warning': variant === 'warning',
        'is-info': variant === 'info',
    });

    return <div className={classes}>{children}</div>;
}

export const Message = memo(MessageComponent);
