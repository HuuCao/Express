import React, { useContext } from 'react'
import Context from 'utils/Context'
import { decodeJWT } from '../../utils'

/**
 *
 * @param {Object} props
 * @param {Array<String>} props.permissions
 * @param {React.ReactElement} props.children
 */
const Permission = ({ permissions, children, ...props }) => {
  const context =
    localStorage.getItem('accessToken') &&
    decodeJWT(localStorage.getItem('accessToken'))

  if (!context) {
    return null
  }

  if (
    !permissions ||
    permissions.length === 0 ||
    permissions.filter((permission) => context.permissions.includes(permission))
      .length
  ) {
    return React.cloneElement(children, props)
  }

  return null
}

export default Permission

export const Must = ({ permission, children, ...props }) => {
  const context =
    localStorage.getItem('accessToken') &&
    decodeJWT(localStorage.getItem('accessToken'))

  if (!context) {
    return null
  }

  if (!permission || context.permissions.includes(permission)) {
    return React.cloneElement(children, props)
  }

  return null
}
