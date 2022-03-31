import * as Constants from "../constants/actions"

const inttialState = {
  id: null,
  role: null,
  name: null,
  email: null,
  phone: null,
  message: "Login false",
  login: null,
  isLoading: false
}

const LoginReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.LOGIN_LOADING:
      return action.payload
    case Constants.LOGIN_SUCCSESS:
      return action.payload
    case Constants.LOGIN_FALSE:
      return action.payload
    default:
      return state
  }
}

export { LoginReducer }
