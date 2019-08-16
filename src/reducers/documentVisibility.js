import { CHANGE_VISIBILITY } from '../constants';

const documentVisibility = (state = false, action) => {
  switch (action.type) {
    case CHANGE_VISIBILITY:
      return !state;
    default:
      return state;
  }
};

export default documentVisibility;
