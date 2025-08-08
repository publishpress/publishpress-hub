/**
 * Tooltip.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\tooltip
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import {
    memo,
    useState,
    useRef,
    useEffect,
    useCallback,
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

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (showTimeoutRef.current) {
                clearTimeout(showTimeoutRef.current);
            }
        };
    }, []);

    if (!text) {
        return children;
    }

    const handleMouseEnter = useCallback(() => {
        // Clear any existing timeout
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
        }

        // Start timeout to show tooltip
        showTimeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            showTimeoutRef.current = null;
        }, delay);
    }, [delay]);

    const handleMouseLeave = useCallback(() => {
        // Cancel pending show timeout
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
        }

        // Immediately hide tooltip
        setIsVisible(false);
    }, []);

    const handleFocus = useCallback(() => {
        // Clear any existing timeout
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
        }

        // Start timeout to show tooltip
        showTimeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            showTimeoutRef.current = null;
        }, delay);
    }, [delay]);

    const handleBlur = useCallback(() => {
        // Cancel pending show timeout
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
        }

        // Immediately hide tooltip
        setIsVisible(false);
    }, []);

    // Use custom tooltip implementation
    if (useCustom) {
        const combinedClassName = `pp-hub-tooltip-trigger ${className}`.trim();

        return (
            <div
                className={combinedClassName}
                style={{ position: 'relative', display: 'inline-block' }}
            >
                <div
                    ref={triggerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {children}
                </div>

                {isVisible && (
                    <div
                        ref={tooltipRef}
                        className="pp-hub-tooltip pp-hub-tooltip--custom"
                        style={{
                            position: 'fixed',
                            top: position.top,
                            left: position.left,
                            zIndex: 'var(--pp-hub-z-tooltip)',
                            pointerEvents: 'none',
                            opacity: 1,
                            transform: 'none'
                        }}
                    >
                        {text}
                    </div>
                )}
            </div>
        );
    }

    // Use WordPress's default tooltip (renders in portal)
    const classNames = `pp-hub-tooltip ${className}`.trim();
    return <WPTooltip text={text} placement={placement} className={classNames}>{children}</WPTooltip>;
};

export const Tooltip = memo(CustomTooltipComponent);
