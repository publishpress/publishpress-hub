import { memo } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

import { useFocusOnAction } from '../hooks/use-focus-on-action';

export const LicenseKeyControlComponent = ({
    autoFocus = true,
    ...props
}) => {
    const textControlRef = useFocusOnAction(autoFocus);

    return (
        <div ref={textControlRef}>
            <TextControl
                {...props}
            />
        </div>
    );
}

LicenseKeyControlComponent.displayName = 'LicenseKeyControl';

export const LicenseKeyControl = memo(LicenseKeyControlComponent);
