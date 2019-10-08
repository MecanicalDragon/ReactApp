import {combineReducers} from 'redux';

import localeReducer from './localeReducer';
import breadCrumpReducer from './breadCrumpReducer';
import authReducer from './authReducer';

// Redux.step4: add reducer to combineReducers
export const reducers = combineReducers({
    intl: localeReducer,
    navPosition: breadCrumpReducer,
    auth: authReducer,
});