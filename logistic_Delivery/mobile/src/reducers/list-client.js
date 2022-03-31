import * as Constants from "../constants/actions"

const inttialState = {
  message: "",
  isLoading: true,
  data: [],
}

const ListClientReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.FETCH_LIST_CLIENT_LOADING:
      return action.payload
    case Constants.FETCH_LIST_CLIENT_ERROR:
      return action.payload
    case Constants.FETCH_LIST_CLIENT_SUCCSESS:
      return action.payload
    default:
      return state
  }
}

export { ListClientReducer }
