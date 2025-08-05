import { useRef, useEffect } from '@wordpress/element';

/**
 * Custom hook to focus an input element when a specific action is triggered
 * @param {bool} shouldFocus - Whether to focus the input element (default: true)
 * @param {number} delay - Delay in milliseconds before focusing (default: 100)
 */
export const useFocusOnAction = (shouldFocus = true, delay = 100) => {
    const textControlRef = useRef(null);

    useEffect(() => {
        if (!shouldFocus) {
            return;
        }

        setTimeout(() => {
            const input = textControlRef.current.querySelector('input');
            if (input) {
                input.focus();
                input.select();
            }
        }, delay);
    }, [textControlRef, delay, shouldFocus]);

    return textControlRef;
};
