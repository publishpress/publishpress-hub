/**
 * Notices list.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\notices
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * WordPress dependencies
 */
import { NoticeList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

export default function NoticesList() {
    const { removeNotice } = useDispatch('core/notices');
    const notices = useSelect(
        (select) => select('core/notices').getNotices(),
        []
    );
    const dismissibleNotices = filter(notices, {
        isDismissible: true,
        type: 'default',
    });
    const nonDismissibleNotices = filter(notices, {
        isDismissible: false,
        type: 'default',
    });

    return (
        <>
            <NoticeList
                notices={nonDismissibleNotices}
                className="pp-hub-notices-list"
            />
            <NoticeList
                notices={dismissibleNotices}
                className="pp-hub-notices-list"
                onRemove={removeNotice}
            />
        </>
    );
}
