import * as Constants from "../constants/actions"

const inttialState = {
  data: [],
  isLoading: true,
}

const ListPackageReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_LOADING:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_SUCCSESS:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_ERROR:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_SHIPPER_ID_LOADING:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_SHIPPER_ID_SUCCSESS:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_SHIPPER_ID_ERROR:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_LOADING:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS:
      return action.payload
    case Constants.FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_ERROR:
      return action.payload
    default:
      return state
  }
}

export { ListPackageReducer }
