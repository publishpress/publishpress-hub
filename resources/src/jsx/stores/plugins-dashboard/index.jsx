/**
 * Plugins dashboard store.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { register, createReduxStore } from '@wordpress/data';
import { controls } from '@wordpress/data-controls';

import { STORE_NAME } from './name';
import { reducer } from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';

export const store = createReduxStore(
    STORE_NAME,
    {
        reducer,
        actions,
        selectors,
        controls
    }
);

register(store);

export default store;
