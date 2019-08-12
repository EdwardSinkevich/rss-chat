import { RECEIVE_MESSAGE, LOG_IN, LOG_OUT, CHANGE_VISIBILITY } from '../constants';

export const receiveMessage = (data) => ({
  type: RECEIVE_MESSAGE,
  payload: data,
})

export const logIn = userName => {
  localStorage.setItem('userName', userName);
  return dispatch => {
    dispatch({
      type: LOG_IN,
      payload: userName,
    })
  }
}

export const logOut = () => {
  localStorage.removeItem('userName');
  return dispatch => {
    dispatch({
      type: LOG_OUT,
    })
  }
}

export const changeVisibility = () => {
  return dispatch => {
    dispatch({
      type: CHANGE_VISIBILITY,
    })
  }
}