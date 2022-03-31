import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects"
import { WarehouseService } from "../../apis/root"
import {
  FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_SUCCSESS,
  FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_ERROR,
  FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_SUCCSESS,
  FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_ERROR,
  FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
  FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_ERROR,
  FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_SUCCSESS,
  FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_ERROR,
  FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_LOADING,
  FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_LOADING,
  FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_LOADING,
  FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_LOADING,
} from "../../constants/actions"

export function* watchFetchListShipmentByWarehouseId() {
  try {
    yield put({
      type: FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_LOADING,
      payload: {
        isLoading: true,
      },
    })

    const store = yield select()
    const wareHouseId = store.LoginReducer.wareHouseId
    const res = yield WarehouseService.fetchShipmentByWarehouseId({
      wareHouseId: wareHouseId,
    })

    if (res.status == 200) {
      const data = res.data.reduce((target, value) => {
        return [...target, ...[{ ...value, ...{ checkbox: false } }]]
      }, [])

      yield delay(100)
      yield put({
        type: FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_SUCCSESS,
        payload: {
          isLoading: false,
          data: data,
        },
      })
    } else {
      yield delay(100)
      yield put({
        type: FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_ERROR,
        payload: {
          error: true,
          message: "error",
          isLoading: false,
        },
      })
    }
  } catch (error) {}
}

export function* watchfetchListPackageByShipmentId({ shipment_id }) {
  try {
    yield put({
      type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_LOADING,
      payload: {
        isLoading: true,
      },
    })

    const res = yield WarehouseService.fetchPackageByShipmentId({
      shipmentId: shipment_id,
    })

    if (res.status == 200) {
      const data = res.data.reduce((target, value) => {
        return [...target, ...[{ ...value, ...{ checkbox: false } }]]
      }, [])

      yield delay(100)
      yield put({
        type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_SUCCSESS,
        payload: {
          isLoading: false,
          data: data,
        },
      })
    } else {
      yield delay(100)
      yield put({
        type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_ERROR,
        payload: {
          error: true,
          message: "error",
          isLoading: false,
        },
      })
    }
  } catch (error) {}
}

export function* watchUpdateCheckBoxListPackageByShipmentId({ value, id }) {
  try {
    const store = yield select()
    let data = store?.ListPackageReducer?.data
    const i = data.findIndex(e => {
      return e.id == id
    })
    data[i].checkbox = value

    yield put({
      type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID_SUCCSESS,
      payload: {
        message: "update check box",
        data: data,
        isLoading: false,
        activeButton: data.some(item => item.checkbox),
        totalCheckBox: data.reduce((target, value) => {
          return value.checkbox ? (target += 1) : target
        }, 0),
        arrIsCheck: data.filter(e => e.checkbox),
        checkeInfo: data
          .filter(e => e.checkbox)
          .every(item => item.realWeight != 0),
      },
    })
  } catch (error) {
    console.log("err")
  }
}

export function* watchfetchListPackageByWarehouseId({ status_id }) {
  try {
    yield put({
      type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_LOADING,
      payload: {
        isLoading: true,
      },
    })

    const store = yield select()
    const warehouse_id = store.LoginReducer.wareHouseId
    const res = yield WarehouseService.fetchPackageByWarehouseId({
      wareHouseId: warehouse_id,
      status_id: status_id,
    })
    if (res.status == 200) {
      const data = res.data.reduce((target, value) => {
        return [...target, ...[{ ...value, ...{ checkbox: false } }]]
      }, [])

      yield delay(100)
      yield put({
        type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
        payload: {
          isLoading: false,
          data: data,
        },
      })
    } else {
      yield delay(100)
      yield put({
        type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_ERROR,
        payload: {
          error: true,
          message: "error",
          isLoading: false,
        },
      })
    }
  } catch (error) {}
}

export function* watchUpdateCheckBoxListPackageByWarehouseId({ value, id }) {
  try {
    const store = yield select()
    let data = store?.ListPackageReducer?.data
    let backup = store?.ListPackageReducer?.backup || store?.ListPackageReducer?.data
    const i = data.findIndex(e => {
      return e.id == id
    })

    data[i].checkbox = value

    yield put({
      type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
      payload: {
        message: "update check box",
        data: data,
        isLoading: false,
        activeButton: data.some(item => item.checkbox),
        totalCheckBox: data.reduce((target, value) => {
          return value.checkbox ? (target += 1) : target
        }, 0),
        arrIsCheck: data.filter(e => e.checkbox),
        backup: backup
      },
    })
  } catch (error) {}
}

export function* watchListShipperByWarehouseId() {
  try {
    yield put({
      type: FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_LOADING,
      payload: {
        isLoading: true,
      },
    })

    const store = yield select()
    const wareHouseId = store.LoginReducer.wareHouseId
    const res = yield WarehouseService.fetchShippersByWarehouseId({
      wareHouseId: wareHouseId,
    })
    if (res.status == 200) {
      yield delay(100)
      yield put({
        type: FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_SUCCSESS,
        payload: {
          data: res.data,
          isLoading: false,
        },
      })
    } else {
      yield delay(100)
      yield put({
        type: FETCH_LIST_SHIPPER_BY_WAREHOUSE_ID_ERROR,
        payload: {
          error: true,
          message: "error",
          isLoading: false,
        },
      })
    }
  } catch (error) {}
}
