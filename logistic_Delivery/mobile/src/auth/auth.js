import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { authencation } from "../actions"

const Auth = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authencation(navigation))
  }, [])
  return null
}

export default Auth
