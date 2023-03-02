import { _getUsers } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function handleLogin (id) {
  return (dispatch) => {
    dispatch(showLoading())
    return _getUsers().then((users) => {
      dispatch(setAuthedUser(id))
      dispatch(hideLoading())
    })
  }
}
