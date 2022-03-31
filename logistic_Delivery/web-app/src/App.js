import React, { useEffect, useState } from 'react'

import Views from 'views'
import Context from 'utils/Context'
import useGlobalState from 'utils/hooks/useGlobalState'
import { ACTION } from 'consts'
import { decodeJWT } from './utils'

import { notification } from 'antd'

import Loading from './components/shared/loading/Loading'

export default () => {
  const [state, dispatch] = useGlobalState({
    ...(localStorage.getItem('accessToken') &&
      decodeJWT(localStorage.getItem('accessToken'))),
    isLogin: false,
    isLoading: false, //component loading app
  })

  //config notification
  notification.config({ duration: 1.5 })

  useEffect(() => {
    if (
      !state.isLogin &&
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    ) {
      dispatch({
        name: ACTION.LOGIN,
        data: {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
        },
      })
    }
  }, [])

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch,
      }}>
      <Loading />
      <Views />
    </Context.Provider>
  )
}
