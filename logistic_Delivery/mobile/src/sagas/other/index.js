import { put, select, delay } from "redux-saga/effects"
import { OtherService, WarehouseService } from "../../apis/root"
import { Alert } from "react-native"

import {
  FETCH_REASON_LOADING,
  FETCH_REASON_SUCCSESS,
  FETCH_REASON_ERROR,
  FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_LOADING,
  FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_SUCCSESS,
  FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_ERROR,
  FETCH_LIST_PACKAGE_BY_SHIPPER_ID_SUCCSESS,
} from "constants/actions"

export function* watchFetchReason() {
  try {
    yield put({
      type: FETCH_REASON_LOADING,
      payload: {
        isLoading: true,
      },
    })

    const res = yield OtherService.fetchReason()

    if (res?.status == 200) {
      yield delay(200)
      yield put({
        type: FETCH_REASON_SUCCSESS,
        payload: {
          isLoading: false,
          data: res.data,
          message: "succsess",
        },
      })
    } else {
      yield delay(100)
      yield put({
        type: FETCH_REASON_ERROR,
        payload: {
          isLoading: false,
          message: "error",
        },
      })
    }
  } catch (error) {}
}

export function* watchFetchPackageByShipmentIdQrcode({ value, navigation }) {
  try {
    const store = yield select()

    const arr_scan_qrcode_by_shipment_id =
      store?.ListPackageByShipmentIdQrcodeReducer?.data || []

    const arr_package_by_shipper_id = store?.ListPackageReducer

    const package_id = value.packageId

    yield put({
      type: FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_LOADING,
      payload: {
        isLoading: true,
      },
    })

    if (arr_scan_qrcode_by_shipment_id.length == 0) {
      const res = yield WarehouseService.fetchPackageByShipmentId({
        shipmentId: value.shipment_id,
      })

      const new_arr = res.data.reduce((target, value, index) => {
        return value?.warehouse_package?.statusId
          ? [
              ...target,
              ...[
                {
                  ...value,
                  ...{
                    ready: value.id == package_id ? true : false,
                    checkbox: false,
                  },
                },
              ],
            ]
          : target
      }, [])

      if (res.status == 200 && res.data.length > 0) {
        const concat_arr = [...arr_package_by_shipper_id?.data, ...new_arr]

        const new_concat_arr = concat_arr.reduce((target, value) => {
          const exist = target.filter(e => e.id == value.id)

          if (exist.length == 0) {
            target.push(value)
          }

          return target
        }, [])

        yield put({
          type: FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_SUCCSESS,
          payload: {
            isLoading: false,
            data: new_arr,
            message: "succsess",
          },
        })

        yield put({
          type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: new_concat_arr,
            activeButton: new_concat_arr.some(item => item.checkbox),
            allReady: new_concat_arr.every(item => item?.ready),
          },
        })
      } else {
        yield put({
          type: FETCH_PACKAGE_BY_SHIPMENT_ID_QRCODE_ERROR,
          payload: {
            isLoading: false,
            message: "error",
          },
        })
        Alert.alert("Thông báo", "Không tìm thấy danh sách kiện hàng nào!")
      }
    } else {
      const checkId = arr_package_by_shipper_id?.data.findIndex(
        item => item.id == package_id,
      )

      const check = arr_package_by_shipper_id?.data.filter(
        item => item.id == package_id,
      )

      if (checkId != -1) {
        const arr = arr_package_by_shipper_id?.data

        arr[checkId].ready = true

        yield put({
          type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID_SUCCSESS,
          payload: {
            isLoading: false,
            data: arr_package_by_shipper_id?.data,
            activeButton: arr_package_by_shipper_id?.data.some(
              item => item.checkbox,
            ),
            allReady: arr_package_by_shipper_id?.data.every(
              item => item?.ready,
            ),
          },
        })
      } else {
        Alert.alert(
          "Thông báo",
          "Kiện hàng này không nằm trong danh sách các kiện hàng đang quét!",
        )
      }
    }
  } catch (error) {}
}
