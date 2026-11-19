/**
 * Notices list.
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
import { NoticeList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

export default function NoticesList() {
    const { removeNotice } = useDispatch('core/notices');
    const notices = useSelect(
        (select) => select('core/notices').getNotices(),
        []
    );
    const dismissibleNotices = notices.filter(
        (notice) => notice.isDismissible && notice.type === 'default'
    );
    const nonDismissibleNotices = notices.filter(
        (notice) => !notice.isDismissible && notice.type === 'default'
    );

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
