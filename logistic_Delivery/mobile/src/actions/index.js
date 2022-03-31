import * as Constants from "../constants/actions"

export const loginAction = value => ({
  type: Constants.CHECK_LOGIN,
  account: value.account,
  password: value.password,
  navigation: value.navigation,
})

export const fetchListShipmentByWarehouseId = () => ({
  type: Constants.FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID,
})

export const fetchListClient = () => ({
  type: Constants.FETCH_LIST_CLIENT,
})

export const authencation = navigation => ({
  type: Constants.AUTHENCATION,
  navigation: navigation,
})

export const fetchListPackageByShipmentId = value => ({
  type: Constants.FETCH_LIST_PACKAGE_BY_SHIPMENT_ID,
  shipment_id: value.shipment_id,
  navigation: value.navigation,
})

export const fetchListPackageByShipperId = () => ({
  type: Constants.FETCH_LIST_PACKAGE_BY_SHIPPER_ID,
})

export const fetchListPackageByWarehouseId = ({ status_id }) => ({
  type: Constants.FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
  status_id: status_id,
})

export const updateCheckBoxListPackageByWarehouseId = value => ({
  type: Constants.UPDATE_CHECKBOX_LIST_PACKAGE_BY_WAREHOUSE_ID,
  value: value.value,
  id: value.id,
})

export const updateCheckBoxListPackageByShipperId = value => ({
  type: Constants.UPDATE_CHECKBOX_LIST_PACKAGE_BY_SHIPPER_ID,
  value: value.value,
  id: value.id,
})

export const updatePackageStatus = value => ({
  type: Constants.UPDATE_PACKAGE_STATUS,
  value: value,
})

export const fetchListShipperByWarehouseId = () => ({
  type: Constants.FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID,
})

export const updateCheckBoxListPackageByShipmentId = value => ({
  type: Constants.UPDATE_CHECKBOX_LIST_PACKAGE_BY_SHIPMENT_ID,
  value: value.value,
  id: value.id,
})

export const filter = value => ({
  type: Constants.FILTER,
  value: value,
})

export const filterButton = value => ({
  type: Constants.GET_FILTER_BUTTON,
  value: value,
})

export const updetePackageDetail = (value, navigation, shipmentId, fromScreen) => ({
  type: Constants.UPDATE_PACKAGE_DETAIL,
  value: value,
  navigation: navigation,
  shipmentId: shipmentId,
  fromScreen: fromScreen
})

export const updateCodReceived = (value, navigation) => ({
  type: Constants.UPDATE_COD_RECEIVED,
  value: value,
  navigation: navigation
})

export const fetchPackageDoneByShipperId = value => ({
  type: Constants.FETCH_PACKAGE_DONE_BY_SHIPPER_ID,
  value: value,
})

export const fetchReason = () => ({
  type: Constants.FETCH_REASON,
})

export const updateStatusShipment = (value, navigation) => ({
  type: Constants.UPDATE_STATUS_SHIPMENT,
  navigation: navigation,
  value: value,
})

export const fetchListPackageByShipmentIdQrcode = (value, navigation) => ({
  type: Constants.FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE,
  navigation: navigation,
  value: value,
})

export const fetchWalletDetailShipper = (value) => ({
  type: Constants.FETCH_DETAIL_WALLET_SHIPPER,
})
