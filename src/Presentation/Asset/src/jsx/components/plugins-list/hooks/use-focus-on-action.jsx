import { useRef, useEffect, useCallback } from '@wordpress/element';

/**
 * Custom hook to focus an input element when a specific action is triggered
 * @param {boolean} shouldFocus - Whether to focus the input element (default: true)
 * @param {number} delay - Delay in milliseconds before focusing (default: 100)
 * @returns {React.RefObject} Reference to the container element
 */
export const useFocusOnAction = (shouldFocus = true, delay = 100) => {
    const textControlRef = useRef(null);

    const focusInput = useCallback(() => {
        if (!textControlRef.current) {
            return;
        }

        const input = textControlRef.current.querySelector('input');
        if (input) {
            input.focus();
            input.select();
        }
    }, []);

    const setFocus = useCallback(() => {
        focusInput();
    }, [focusInput]);

    useEffect(() => {
        if (!shouldFocus) {
            return;
        }

        const timeoutId = setTimeout(focusInput, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [shouldFocus, delay, focusInput]);

    return [
        textControlRef,
        setFocus,
    ];
};
