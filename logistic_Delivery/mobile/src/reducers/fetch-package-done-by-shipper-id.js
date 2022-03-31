import * as Constants from "../constants/actions"

const inttialState = {
  data: [],
}

const fetchPackageDoneReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.FETCH_PACKAGE_DONE_BY_SHIPPER_ID_LOADING:
      return action.payload
    case Constants.FETCH_PACKAGE_DONE_BY_SHIPPER_ID_SUCCSESS:
      return action.payload
    case Constants.FETCH_PACKAGE_DONE_BY_SHIPPER_ID_ERROR:
      return action.payload
    default:
      return state
  }
}

export { fetchPackageDoneReducer }
