import {
  RECEIVE_MESSAGE,
  LOG_IN,
  LOG_OUT,
  CHANGE_VISIBILITY,
  CACHE_MESSAGE,
  CLEAR_CACHE_MESSAGE,
} from '../constants';

export const receiveMessage = (data) => ({
  type: RECEIVE_MESSAGE,
  payload: data,
});

export const logIn = (userName) => {
  localStorage.setItem('userName', userName);
  return (dispatch) => {
    dispatch({
      type: LOG_IN,
      payload: userName,
    });
  };
};

export const logOut = () => {
  localStorage.removeItem('userName');
  return (dispatch) => {
    dispatch({
      type: LOG_OUT,
    });
  };
};

export const changeVisibility = () => (dispatch) => {
  dispatch({
    type: CHANGE_VISIBILITY,
  });
};

export const cacheMessage = (fromUser, message) => (dispatch) => {
  dispatch({
    type: CACHE_MESSAGE,
    payload: {
      from: fromUser,
      message,
    },
  });
};

export const clearCacheMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_CACHE_MESSAGE,
  });
};
