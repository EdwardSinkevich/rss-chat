import { CACHE_MESSAGE, CLEAR_CACHE_MESSAGE } from '../constants';

const offlineMessage = (state = [], action) => {
  switch (action.type) {
    case CACHE_MESSAGE:
      return [
        ...state, action.payload,
      ];
    case CLEAR_CACHE_MESSAGE:
        return [];
    default:
      return state;
  }
}

export default offlineMessage;