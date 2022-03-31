import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects"

import { watchLoginAction, watchAuthencationAction } from "./auth"

import { watchFetchListClient } from "./client"

import { watchFilter, watchFilterButton } from "./filter"

import {
  watchFetchListShipmentByWarehouseId,
  watchfetchListPackageByShipmentId,
  watchfetchListPackageByWarehouseId,
  watchUpdateCheckBoxListPackageByWarehouseId,
  watchListShipperByWarehouseId,
  watchUpdateCheckBoxListPackageByShipmentId
} from "./warehouse"

import { 
  watchFetchListPackageByShipperId, 
  watchUpdateCheckBoxListPackageByShipperId, 
  watchFetchPackageDonebyShipperId,
  watchFetchWalletDetailShipper
} from "./shipper"

import { watchFetchReason, watchFetchPackageByShipmentIdQrcode } from "./other"

import {watchUpdatePackageStatus, watchUpdatePackageDetail, watchUpdateCodReceived} from "./update"

import {
  AUTHENCATION,
  CHECK_LOGIN,
  FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID,
  FETCH_LIST_CLIENT,
  FETCH_LIST_PACKAGE_BY_SHIPMENT_ID,
  FETCH_LIST_PACKAGE_BY_SHIPPER_ID,
  FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
  UPDATE_CHECKBOX_LIST_PACKAGE_BY_WAREHOUSE_ID,
  UPDATE_CHECKBOX_LIST_PACKAGE_BY_SHIPPER_ID,
  UPDATE_PACKAGE_STATUS,
  FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID,
  UPDATE_CHECKBOX_LIST_PACKAGE_BY_SHIPMENT_ID,
  FILTER,
  GET_FILTER_BUTTON,
  UPDATE_PACKAGE_DETAIL,
  UPDATE_COD_RECEIVED,
  FETCH_PACKAGE_DONE_BY_SHIPPER_ID,
  FETCH_REASON,
  FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE,
  FETCH_DETAIL_WALLET_SHIPPER
} from "../constants/actions"

function* rootSaga() {
  yield takeEvery(AUTHENCATION, watchAuthencationAction)
  yield takeEvery(CHECK_LOGIN, watchLoginAction)
  yield takeEvery(FETCH_LIST_PACKAGE_BY_SHIPPER_ID, watchFetchListPackageByShipperId)
  yield takeEvery(FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID, watchfetchListPackageByWarehouseId)
  yield takeEvery(UPDATE_CHECKBOX_LIST_PACKAGE_BY_WAREHOUSE_ID, watchUpdateCheckBoxListPackageByWarehouseId)
  yield takeEvery(FETCH_LIST_PACKAGE_BY_SHIPMENT_ID, watchfetchListPackageByShipmentId)
  yield takeEvery(FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID, watchFetchListShipmentByWarehouseId)
  yield takeEvery(FETCH_LIST_CLIENT, watchFetchListClient)
  yield takeEvery(UPDATE_CHECKBOX_LIST_PACKAGE_BY_SHIPPER_ID, watchUpdateCheckBoxListPackageByShipperId)
  yield takeEvery(UPDATE_PACKAGE_STATUS, watchUpdatePackageStatus)
  yield takeEvery(FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID, watchListShipperByWarehouseId)
  yield takeEvery(UPDATE_CHECKBOX_LIST_PACKAGE_BY_SHIPMENT_ID, watchUpdateCheckBoxListPackageByShipmentId)
  yield takeEvery(FILTER, watchFilter)
  yield takeEvery(GET_FILTER_BUTTON, watchFilterButton)
  yield takeEvery(UPDATE_PACKAGE_DETAIL, watchUpdatePackageDetail)
  yield takeEvery(UPDATE_COD_RECEIVED, watchUpdateCodReceived)
  yield takeEvery(FETCH_PACKAGE_DONE_BY_SHIPPER_ID, watchFetchPackageDonebyShipperId)
  yield takeEvery(FETCH_REASON, watchFetchReason)
  yield takeEvery(FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE, watchFetchPackageByShipmentIdQrcode)
  yield takeEvery(FETCH_DETAIL_WALLET_SHIPPER, watchFetchWalletDetailShipper)
}

export default rootSaga
