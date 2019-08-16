import { LOG_IN, LOG_OUT } from '../constants';

const userSession = (state = '', action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return '';
    default:
      return state;
  }
};

export default userSession;
