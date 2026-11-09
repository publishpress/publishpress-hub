/**
 * Tooltip.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\tooltip
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import {
    memo,
    useState,
    useRef,
    useEffect,
    useCallback,
    useId,
} from '@wordpress/element';
import { Tooltip as WPTooltip } from '@wordpress/components';

const CustomTooltipComponent = ({
    children,
    text,
    placement = 'top',
    className = '',
    useCustom = false,
    delay = 700
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const showTimeoutRef = useRef(null);
    const hideTimeoutRef = useRef(null);
    const tooltipId = useId();

    useEffect(() => {
        if (!isVisible || !triggerRef.current || !tooltipRef.current || !useCustom) return;

        const updatePosition = () => {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            let top, left;

            switch (placement) {
                case 'top':
                    top = triggerRect.top - tooltipRect.height - 8;
                    left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + 8;
                    left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.left - tooltipRect.width - 8;
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.right + 8;
                    break;
                default:
                    top = triggerRect.top - tooltipRect.height - 8;
                    left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            }

            setPosition({ top, left });
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isVisible, placement, useCustom]);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            clearTimeout(showTimeoutRef.current);
            clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    // Let keyboard users dismiss the tooltip without moving focus (WCAG 1.4.13).
    useEffect(() => {
        if (!isVisible) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsVisible(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isVisible]);

    const show = useCallback(() => {
        clearTimeout(hideTimeoutRef.current);
        clearTimeout(showTimeoutRef.current);

        showTimeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            showTimeoutRef.current = null;
        }, delay);
    }, [delay]);

    const hide = useCallback(() => {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
        setIsVisible(false);
    }, []);

    // Short grace period so the pointer can cross the gap onto the tooltip (WCAG 1.4.13).
    const hideSoon = useCallback(() => {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 150);
    }, []);

    if (!text) {
        return children;
    }

    // Use custom tooltip implementation
    if (useCustom) {
        const combinedClassName = `pp-hub-tooltip-trigger ${className}`.trim();

        // The trigger is focusable and described by the tooltip so keyboard and screen reader
        // users get the same information as mouse users (WCAG 1.3.1, 2.1.1). The tooltip text
        // stays in the DOM, visually hidden, while it is not shown.
        return (
            <div
                className={combinedClassName}
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseEnter={show}
                onMouseLeave={hideSoon}
            >
                <div
                    ref={triggerRef}
                    tabIndex={0}
                    aria-describedby={tooltipId}
                    onFocus={show}
                    onBlur={hide}
                >
                    {children}
                </div>

                <div
                    ref={tooltipRef}
                    id={tooltipId}
                    role="tooltip"
                    className={isVisible ? 'pp-hub-tooltip pp-hub-tooltip--custom' : 'screen-reader-text'}
                    style={isVisible ? {
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        zIndex: 'var(--pp-hub-z-tooltip)',
                        opacity: 1,
                        transform: 'none'
                    } : undefined}
                >
                    {text}
                </div>
            </div>
        );
    }

    // Use WordPress's default tooltip (renders in portal)
    const classNames = `pp-hub-tooltip ${className}`.trim();
    return <WPTooltip text={text} placement={placement} className={classNames}>{children}</WPTooltip>;
};

export const Tooltip = memo(CustomTooltipComponent);
