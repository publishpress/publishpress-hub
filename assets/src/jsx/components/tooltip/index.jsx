import { memo } from '@wordpress/element';
import { Tooltip as WPTooltip } from '@wordpress/components';

const TooltipComponent = ({ children, text, placement = 'top', className = '' }) => {
    if (!text) {
        return children;
    }

    const classNames = 'pp-hub-tooltip' + className;

    return <WPTooltip text={text} placement={placement} className={classNames}>{children}</WPTooltip>;
};

export const Tooltip = memo(TooltipComponent);
