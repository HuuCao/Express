import * as Constants from "../constants/actions"

const inttialState = {
  message: "",
  isLoading: true,
  list: [],
}

const fetchWalletDetailShipper = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.FETCH_DETAIL_WALLET_SHIPPER_LOADING:
      return action.payload
    case Constants.FETCH_DETAIL_WALLET_SHIPPER_SUCCSESS:
      return action.payload
    case Constants.FETCH_DETAIL_WALLET_SHIPPER_ERROR:
      return action.payload
    default:
      return state
  }
}

export { fetchWalletDetailShipper }