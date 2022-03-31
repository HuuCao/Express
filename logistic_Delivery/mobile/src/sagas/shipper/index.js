import { call, put, takeEvery, takeLatest, select, delay } from "redux-saga/effects"
import { ShipperService } from "../../apis/root"
import {
  FETCH_LIST_PACKAGE_BY_SHIPPER_ID_SUCCSESS,
  FETCH_LIST_PACKAGE_BY_SHIPPER_ID_ERROR,
  FETCH_LIST_PACKAGE_BY_SHIPPER_ID_LOADING,
  FETCH_PACKAGE_DONE_BY_SHIPPER_ID_LOADING,
  FETCH_PACKAGE_DONE_BY_SHIPPER_ID_SUCCSESS,
  FETCH_PACKAGE_DONE_BY_SHIPPER_ID_ERROR,
  FETCH_DETAIL_WALLET_SHIPPER_LOADING,
  FETCH_DETAIL_WALLET_SHIPPER_SUCCSESS,
  FETCH_DETAIL_WALLET_SHIPPER_ERROR
} from "../../constants/actions"

export function* watchFetchListPackageByShipperId() {
  try {
    yield put({
      type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID_LOADING,
      payload: {
        isLoading: true,
      },
    })

    const store = yield select()
    const shipper_id = store.LoginReducer.id

    const res = yield ShipperService.fetchPackageByShipperId({
      userId: shipper_id,
    })

    const arr_full = res.data.filter(
      item => item.pkg_receiver?.customer_receiver?.id,
    )
    const arr_lack = res.data.filter(
      item => item.pkg_receiver?.customer_receiver?.id == undefined,
    )

    let arr_fix = []

    for (let i = 0; i < arr_lack.length; i++) {
      const infoShipment = yield ShipperService.fetchShipmentById({
        id: arr_lack[i]?.shipmentId,
      })
      arr_fix.push({
        ...arr_lack[i],
        ...{
          client_id: infoShipment?.data?.userId,
          cneeName: infoShipment?.data?.cneeName,
          cneeAddress: infoShipment?.data?.cneeAddress,
          cneePhone: infoShipment?.data?.cneePhone,
        },
      })
    }

    const newArr = [...arr_full, ...arr_fix]

    if (res.status == 200) {
      const data = newArr.reduce((target, value) => {
        return [...target, ...[{ ...value, ...{ checkbox: false, ready: true } }]]
      }, [])

      yield put({
        type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID_SUCCSESS,
        payload: {
          isLoading: false,
          data: data,
          activeButton: data.some(item => item.checkbox),
          allReady: true
        },
      })
    } else {
      yield put({
        type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID_ERROR,
        payload: {
          error: true,
          message: "error",
          isLoading: false,
        },
      })
    }
  } catch (error) {}
}

export function* watchUpdateCheckBoxListPackageByShipperId({ value, id }) {
  try {
    const store = yield select()

    let data = store.ListPackageReducer.data

    const i = data.findIndex(e => {
      return e.id == id
    })

    data[i].checkbox = value

    const arrIsCheck = data.filter(e => e.checkbox)

    let isCheck = false

    if (arrIsCheck.length > 0) {
      const default_value =
        arrIsCheck[0].pkg_receiver?.customer_receiver?.id ||
        arrIsCheck[0]?.client_id
      isCheck = arrIsCheck
        .reduce((target, item) => {
          const user_id =
            item?.pkg_receiver?.customer_receiver?.id || item?.client_id
          target.push(user_id)
          return target
        }, [])
        .every(item => item == default_value)
    }

    yield put({
      type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID_SUCCSESS,
      payload: {
        message: "update check box",
        data: data,
        activeButton: data.some(item => item.checkbox),
        arrIsCheck: arrIsCheck,
        isCheck: isCheck,
        allReady: data.every(
          item => item?.ready,
        ),
      },
    })
  } catch (error) {}
}

export function* watchFetchPackageDonebyShipperId({ value }) {
  try {
    yield put({
      type: FETCH_PACKAGE_DONE_BY_SHIPPER_ID_LOADING,
      payload: {
        isLoading: true,
      }
    })

    const store = yield select()
    const shipper_id = store.LoginReducer.id
    const res = yield ShipperService.fetchPackageDonebyShipperId(shipper_id, value.date)
    if(res?.status == 200) {
      yield delay (100)
      yield put({
        type: FETCH_PACKAGE_DONE_BY_SHIPPER_ID_SUCCSESS,
        payload: {
          isLoading: false,
          message: "succsess",
          data: res?.data
        }
      })
    } else {
      yield delay (100)
      yield put({
        type: FETCH_PACKAGE_DONE_BY_SHIPPER_ID_ERROR,
        payload: {
          isLoading: false,
          message: "error"
        }
      })
    }
  } catch (error) {}
}

export function* watchFetchWalletDetailShipper () {
  try {
    yield put({
      type: FETCH_DETAIL_WALLET_SHIPPER_LOADING,
      payload: {
        isLoading: true,
      }
    })

    const store = yield select()
    const shipper_id = store.LoginReducer.id

    const res = yield ShipperService.fetchWalletDetailShipper(shipper_id)

    if(res?.status == 200) {
      yield delay (300)
      yield put({
        type: FETCH_DETAIL_WALLET_SHIPPER_SUCCSESS,
        payload: {
          isLoading: false,
          message: "succsess",
          data: res?.data
        }
      })
    } else {
      yield delay (300)
      yield put({
        type: FETCH_DETAIL_WALLET_SHIPPER_ERROR,
        payload: {
          isLoading: false,
          message: "error"
        }
      })
    }

  } catch (error) {
    
  }
}
