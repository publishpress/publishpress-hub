/**
 * API ready.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\utils
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

export function apiReady() {
    return new Promise((resolve) => {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // Small delay to ensure REST API routes are registered
            setTimeout( resolve, 100 );
        } else {
            document.addEventListener( "DOMContentLoaded", function() {
                setTimeout( resolve, 100 );
            } );
        }
    });
}

export default apiReady;
