import * as Constants from "../constants/actions"

const inttialState = {
  isLoading: false,
}

const UpdatePackageDetailReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.UPDATE_PACKAGE_DETAIL_LOADING:
      return action.payload
    case Constants.UPDATE_PACKAGE_DETAIL_SUCCSESS:
      return action.payload
    case Constants.UPDATE_PACKAGE_DETAIL_ERROR:
      return action.payload
    default:
      return state
  }
}

export { UpdatePackageDetailReducer }
