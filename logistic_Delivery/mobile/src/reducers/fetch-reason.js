import * as Constants from "../constants/actions"

const inttialState = {
  message: "",
  isLoading: true,
  list: [],
}

const ReasonReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.FETCH_REASON_LOADING:
      return action.payload
    case Constants.FETCH_REASON_SUCCSESS:
      return action.payload
    case Constants.FETCH_REASON_ERROR:
      return action.payload
    default:
      return state
  }
}

export { ReasonReducer }
