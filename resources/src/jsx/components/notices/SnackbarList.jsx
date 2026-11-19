/**
 * Snackbar list.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\notices
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

/**
 * WordPress dependencies
 */
import { SnackbarList as WpSnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

export const SnackbarList = () => {
    const { removeNotice } = useDispatch('core/notices');
    const notices = useSelect(
        (select) => select('core/notices').getNotices(),
        []
    );
    const snackbarNotices = notices.filter((notice) => notice.type === 'snackbar');

    return (
        <WpSnackbarList
            notices={snackbarNotices}
            className="pp-hub-snackbar-list"
            onRemove={removeNotice}
        />
    );
}

export default SnackbarList;
