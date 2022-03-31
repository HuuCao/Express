import * as Constants from "../constants/actions"

const inttialState = {
  isLoading: false,
}

const UpdatePackageStatusReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.UPDATE_PACKAGE_STATUS_SUCCSESS:
      return action.payload
    case Constants.UPDATE_PACKAGE_STATUS_ERROR:
      return action.payload
    default:
      return state
  }
}

export { UpdatePackageStatusReducer }