import React, { cloneElement } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { ROUTES } from 'consts'
import { notification } from 'antd'
import { translate } from 'utils/i18n'
import { decodeJWT } from 'utils'

/**
 *
 * @param {Object} props
 * @param {Array<String>} props.permissions
 * @param {React.ReactChildren} props.children
 */
const Authentication = ({ permissions, title, children, ...props }) => {
  const history = useHistory()
  const payload = decodeJWT(localStorage.getItem('refreshToken'))

  //modify title
  document.title = title

  //check đã đăng nhập chưa hoặc token còn hạn -> vào trang home
  if (!permissions) {
    if (!payload || new Date(payload.exp * 1000).getTime() < Date.now()) {
      return cloneElement(children, props)
    }
    return <Redirect to={ROUTES.HOME} />
  }

  //check login ?
  if (!payload) {
    return <Redirect to={ROUTES.LOGIN} />
  }

  // permissions.length = 0 -> screen public
  // permissions.length > 0 -> check user có quyền truy cập vào màn hình này
  if (
    permissions.length === 0 ||
    permissions.filter((p) => payload.permissions.includes(p)).length > 0
  ) {
    return cloneElement(children, props)
  }

  notification.warning({
    message: translate('Permission Denied'),
  })

  history.goBack()

  return <div />
}

export default Authentication