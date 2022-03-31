import * as Constants from "../constants/actions"

const inttialState = {
  isLoading: false,
}

const UpdateCodReceivedReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.UPDATE_COD_RECEIVED_LOADING:
      return action.payload
    case Constants.UPDATE_COD_RECEIVED_SUCCSESS:
      return action.payload
    case Constants.UPDATE_COD_RECEIVED_ERROR:
      return action.payload
    default:
      return state
  }
}

export { UpdateCodReceivedReducer }