import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects"

import {
  FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
  FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_SUCCSESS,
  GET_FILTER_BUTTON_SUCCSESS,
} from "../../constants/actions"

export function* watchFilter({ value }) {
  try {
    const store = yield select()
    const dataPackage =
      store?.ListPackageReducer?.backup || store?.ListPackageReducer?.data
    const dataShipment =
      store?.ListShipmentReducer?.backup || store?.ListShipmentReducer?.data 

    const valueFilter = value.value
    const typeFilter = value.type

    if (typeFilter == "Shipment") {
      const data = dataPackage.reduce((target, value) => {
        return [...target, ...[{ ...value, ...{ checkbox: false } }]]
      }, [])

      if (valueFilter == "all") {
        yield put({
          type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: data,
            backup: data,
          },
        })
      } else {
        const arr = data.filter(item => item?.shipmentId == valueFilter)
        yield put({
          type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: arr,
            backup: data,
          },
        })
      }
    }

    if (valueFilter == "all-import") {
      yield put({
        type: FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_SUCCSESS,
        payload: {
          isLoading: false,
          data: dataShipment,
          backup: dataShipment,
        },
      })
    } else {
      if (typeFilter == "Mawb") {
        const arr = dataShipment.filter(item => item.wbId == valueFilter)
        yield put({
          type: FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: arr,
            backup: dataShipment,
          },
        })
      }

      if (typeFilter == "Shipment-import") {
        const arr = dataShipment.filter(item => item?.id == valueFilter)
        yield put({
          type: FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: arr,
            backup: dataShipment,
          },
        })
      }
    }

    if (typeFilter == "Client") {
      const arr = dataPackage.filter(
        item => item?.pkg_receiver?.customer_receiver?.id == valueFilter,
      )

      if (valueFilter == "all") {
        yield put({
          type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: dataPackage,
            backup: dataPackage,
          },
        })
      } else {
        yield put({
          type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: arr,
            backup: dataPackage,
          },
        })
      }
    }
  } catch (error) {}
}

export function* watchFilterButton({ value }) {
  try {
    const data = value.value
    const type = value.type

    let newArr1 = []
    let newArr2 = []
    let newArr3 = []
    let newArr4 = []

    if (type == "Mawb") {
      let _newArr1 = []
      for (var i = 0; i < data.length; i++) {
        if (newArr1.indexOf(data[i].wbId) === -1 && data[i].at_warehouse == 0 && data[i].state == "closed" && data[i].wbId != null) {
          newArr1.push(data[i].wbId)
          _newArr1.push({
            id: data[i].id,
            name: data[i].wbId,
            value: data[i].wbId,
          })
        }
      }
      yield put({
        type: GET_FILTER_BUTTON_SUCCSESS,
        payload: {
          data: _newArr1,
        },
      })
    }

    if (type == "Shipment") {
      let _newArr2 = []
      for (var i = 0; i < data.length; i++) {
        if (newArr2.indexOf(data[i]?.id) === -1) {
          newArr2.push(data[i]?.id)
          _newArr2.push({
            id: data[i]?.id,
            shipmentId: data[i]?.shipmentId,
            name: data[i]?.shipment?.invoiceNo,
          })
        }
      }
      yield put({
        type: GET_FILTER_BUTTON_SUCCSESS,
        payload: {
          data: _newArr2,
        },
      })
    }

    if (type == "Shipment-import") {
      let _newArr3 = []
      for (var i = 0; i < data.length; i++) {
        if (newArr3.indexOf(data[i]?.id) === -1 && data[i].at_warehouse == 0 && data[i].state == "closed") {
          newArr3.push(data[i]?.id)
          _newArr3.push({
            id: data[i]?.id,
            shipmentId: data[i]?.id,
            name: data[i]?.invoiceNo,
          })
        }
      }
      yield put({
        type: GET_FILTER_BUTTON_SUCCSESS,
        payload: {
          data: _newArr3,
        },
      })
    }

    let _newArr4 = []

    if (type == "Client") {
      for (var i = 0; i < data.length; i++) {
        if (newArr4.indexOf(data[i]?.id) === -1) {
          newArr4.push(data[i]?.id)
          _newArr4.push({
            id: data[i]?.id,
            value: data[i]?.id,
            name: data[i]?.name,
          })
        }
      }
      yield put({
        type: GET_FILTER_BUTTON_SUCCSESS,
        payload: {
          data: _newArr4,
        },
      })
    }
  } catch (error) {}
}
