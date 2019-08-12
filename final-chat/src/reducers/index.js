import { combineReducers } from 'redux';

import messages from './messages';
import userSession from './userSession';
import documentVisibility from './documentVisibility';

const rootReducer = combineReducers({messages, userSession, documentVisibility});

export default rootReducer;