import { useReducer } from 'react'
import { ACTION } from 'consts'
import { decodeJWT } from 'utils'

const login = (_state, _data) => {
  localStorage.setItem('accessToken', _data.accessToken)
  localStorage.setItem('refreshToken', _data.refreshToken)
  if (_data.username) {
    localStorage.setItem('username', _data.username)
  }
  if (_data.userid) {
    localStorage.setItem('userid', _data.userid)
  }
  const refreshTokenPayload = decodeJWT(_data.refreshToken)
  if (new Date(refreshTokenPayload.exp * 1000).getTime() < Date.now()) {
    return {
      ..._state,
      isLogin: false,
      username: _data.username,
    }
  }

  return {
    ..._state,
    ...decodeJWT(_data.accessToken),
    isLogin: true,
    username: _data.username,
  }
}

const logout = (_state) => {
  localStorage.clear()
  return {
    ..._state,
    isLogin: false,
  }
}

const loading = (_state, _data) => {
  return { ..._state, isLoading: _data }
}

const closeSession = (_state, _data) => {}

const refreshToken = (_state, _data) => {}

const reducer = (_state, _action) => {
  switch (_action.name) {
    case ACTION.LOGIN:
      return login(_state, _action.data)
    case ACTION.LOGOUT:
      return logout(_state, _action.data)
    case ACTION.LOADING:
      return loading(_state, _action.data)
    case ACTION.REFRESH_TOKEN:
      return refreshToken(_state, _action.data)
    case ACTION.CLOSE_SESSION:
      return closeSession(_state, _action.data)
    default:
      return _state
  }
}

export default (_defaultState) => {
  return useReducer(reducer, _defaultState)
}
