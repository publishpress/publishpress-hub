import classNames from 'classnames';

export const BaseIcon = ({children, size, className}) => {
    const classes = classNames('pp-hub-icon', className);

    return (
        <span className={classes} style={{width: `${size}px`, height: `${size}px`, display: 'inline-block'}}>
            {children}
        </span>
    );
};
