import * as Constants from "../constants/actions"

const inttialState = {
  message: "",
  isLoading: true,
  list: [],
}

const ListPackageByShipmentIdQrcodeReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_LOADING:
      return action.payload
    case Constants.FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_SUCCSESS:
      return action.payload
    case Constants.FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_ERROR:
      return action.payload
    default:
      return state
  }
}

export { ListPackageByShipmentIdQrcodeReducer }