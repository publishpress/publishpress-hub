/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * WordPress dependencies
 */
import { NoticeList, SnackbarList } from '@wordpress/components';
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
