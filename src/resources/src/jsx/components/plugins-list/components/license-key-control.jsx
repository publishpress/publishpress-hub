/**
 * License key control.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useCallback, useEffect } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

import { useFocusOnAction } from '../hooks/use-focus-on-action';

/**
 * LicenseKeyControl component for handling license key input with auto-focus and Enter key handling
 *
 * @param {Object} props - Component props
 * @param {boolean} props.autoFocus - Whether to auto-focus the input (default: true)
 * @param {Function} props.onEnterKeyDown - Callback when Enter key is pressed
 * @param {string} props.value - The input value
 * @param {Function} props.onChange - Callback when input value changes
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - CSS class name
 * @param {Function} props.onFocusReady - Callback that receives the setFocus function for external control
 * @param {Object} props.restProps - Additional props passed to TextControl
 */
export const LicenseKeyControlComponent = ({
    autoFocus = true,
    onEnterKeyDown,
    value,
    onChange,
    placeholder,
    className,
    onFocusReady,
    ...restProps
}) => {
    const [textControlRef, setFocus] = useFocusOnAction(autoFocus);

    // Expose setFocus function to parent component
    useEffect(() => {
        if (onFocusReady && setFocus) {
            onFocusReady(setFocus);
        }
    }, [onFocusReady, setFocus]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter' && onEnterKeyDown) {
            event.preventDefault();
            event.target.blur();
            onEnterKeyDown(event);
        }
    }, [onEnterKeyDown]);

    return (
        <div ref={textControlRef}>
            <TextControl
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
        </div>
    );
};

LicenseKeyControlComponent.displayName = 'LicenseKeyControl';

export const LicenseKeyControl = memo(LicenseKeyControlComponent);
