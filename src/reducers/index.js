import { combineReducers } from 'redux';

import messages from './messages';
import userSession from './userSession';
import documentVisibility from './documentVisibility';
import offlineMessages from './offlineMessages';

const rootReducer = combineReducers({
  messages,
  userSession,
  documentVisibility,
  offlineMessages,
});

export default rootReducer;
