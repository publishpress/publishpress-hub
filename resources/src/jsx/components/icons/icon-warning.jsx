/**
 * Icon warning.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\icons
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { BaseIcon } from "./base"

/**
 * Icon IoMdWarning from 'react-icons/io'.
 */
export const IconWarning = ({size = 24, className}) => {
    return (
        <BaseIcon size={size} className={className}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path></svg>
        </BaseIcon>
    );
};
