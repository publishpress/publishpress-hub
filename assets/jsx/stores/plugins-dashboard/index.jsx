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
