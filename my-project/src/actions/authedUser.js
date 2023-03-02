import {authenticateUser} from '../utils/auth'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function handleLogin (userInfo) {
  return (dispatch) => {
    dispatch(showLoading())
    const {id, password} = userInfo;
    return authenticateUser(id, password).then((userId) => {
      console.log(userId);
      dispatch(setAuthedUser(userId))
      dispatch(hideLoading())
    })
  }
}
