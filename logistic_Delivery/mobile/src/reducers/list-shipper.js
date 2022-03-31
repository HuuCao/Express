import * as Constants from "../constants/actions"

const inttialState = {
  message: "",
  isLoading: true,
  list: [],
}

const ListShipperReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_LOADING:
      return action.payload
    case Constants.FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_SUCCSESS:
      return action.payload
    case Constants.FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_ERROR:
      return action.payload
    default:
      return state
  }
}

export { ListShipperReducer }