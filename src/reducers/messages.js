import { RECEIVE_MESSAGE } from '../constants';

const message = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      const map = new Map();
      const newState = [...state, ...action.payload];
      newState.forEach((item) => {
        map.set(item.id, item);
      });

      return Array.from(map, ([key, value]) => value);
    default:
      return state;
  }
};

export default message;
