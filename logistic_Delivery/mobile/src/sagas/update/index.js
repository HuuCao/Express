import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects"
import { UpdateService, OtherService } from "../../apis/root"
import {
  UPDATE_PACKAGE_STATUS_SUCCSESS,
  UPDATE_PACKAGE_STATUS_ERROR,
  UPDATE_PACKAGE_DETAIL_LOADING,
  UPDATE_PACKAGE_DETAIL_SUCCSESS,
  UPDATE_PACKAGE_DETAIL_ERROR,
  UPDATE_COD_RECEIVED_SUCCSESS,
  UPDATE_COD_RECEIVED_ERROR,
  UPDATE_COD_RECEIVED_LOADING,
  FETCH_LIST_PACKAGE_BY_SHIPPER_ID,
  FETCH_LIST_PACKAGE_BY_SHIPMENT_ID,
  FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
  FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID
} from "../../constants/actions"

import { Alert } from "react-native"

export function* watchUpdatePackageStatus({ value }) {
  try {
    const store = yield select()
    const dataShipmentById = store
    const numberPackage = dataShipmentById.ListPackageReducer?.data
    const wareHouseId = store.LoginReducer.wareHouseId

    const arrUpload = value.arr_upload
    const statusId = value.status_id
    const shipperId = value.shipper_id
    const type = value?.type || false
    const navigation = value?.navigation
    const fromScreen = value.fromScreen
    const method = value?.method

    const checkStatusPackage = numberPackage.reduce((target, value) => {
      return value?.warehouse_package?.statusId == 2 ? target += 1 : target
    }, 0)

    const numberArrUpload = arrUpload.reduce((target, value) => {
      return value?.warehouse_package?.statusId == 2 ? target += 1 : target
    }, 0)

    const objUpdate = arrUpload.reduce((target, value) => {
      return [
        ...target,
        ...[
          {
            id: value.id,
            warehousepackage: {
              statusId: statusId,
              wareHouseId: wareHouseId,
              packageId: value.id,
            },
            packageuser: {
              userId: shipperId,
              packageId: value.id,
              isActive: true,
              codDone: false
            },
          },
        ],
      ]
    }, [])

    let progressBarLoading = 0
    const aProgressBar = 100 / objUpdate.length

    for (let i = 0; i < objUpdate.length; i++) {
      const res = yield UpdateService.updatePackageStatus({
        value: objUpdate[i],
      })
      if (res?.status == 200) {
        progressBarLoading += aProgressBar
        yield put({
          type: UPDATE_PACKAGE_STATUS_SUCCSESS,
          payload: {
            isLoading: true,
            progressBarLoading: Math.round(progressBarLoading),
            update: "loading",
          },
        })
      } else {
        yield put({
          type: UPDATE_PACKAGE_STATUS_ERROR,
          payload: {
            isLoading: false,
            update: "error",
          },
        })
        break
      }
      yield delay(200) // để delay nếu không request nhanh quá sập server
    }

    if (Math.round(progressBarLoading) >= 100) {
      if (type == "import" && method == "at_warehouse") {
        if (checkStatusPackage == numberArrUpload) {
          const res = yield OtherService.updateStateShipment({
            state: "at_warehouse",
            id: arrUpload[0].shipmentId,
          })
          if (res.status == 200) {
            yield delay(2000)
            yield put({
              type: UPDATE_PACKAGE_STATUS_SUCCSESS,
              payload: {
                isLoading: false,
                progressBarLoading: Math.round(progressBarLoading),
                update: "done",
              },
            })

            yield put({
              type: UPDATE_PACKAGE_STATUS_SUCCSESS,
              payload: {
                isLoading: false,
                progressBarLoading: 0,
                update: "loading",
              },
            })

            if(fromScreen == "sp-delivery") {
              yield put({type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID})
            } else if(fromScreen == "wh-list-shipper") {
              yield put({
                type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
                status_id: 3
              })
            } else if (fromScreen == "wh-list-package") {
              yield put({
                type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID,
                shipment_id: arrUpload[0]?.shipment?.id
              })
              yield put({
                type: FETCH_LIST_SHIPMENT_BY_WAREHOUSE_ID
              })
              navigation.goBack()
            }

          } else {
            yield delay(2000)
            yield put({
              type: UPDATE_PACKAGE_STATUS_ERROR,
              payload: {
                isLoading: false,
                progressBarLoading: 0,
                update: "error",
              },
            })
          }
        } else {
          yield delay(2000)
          yield put({
            type: UPDATE_PACKAGE_STATUS_SUCCSESS,
            payload: {
              isLoading: false,
              progressBarLoading: Math.round(progressBarLoading),
              update: "done",
            },
          })

          yield put({
            type: UPDATE_PACKAGE_STATUS_SUCCSESS,
            payload: {
              isLoading: false,
              progressBarLoading: 0,
              update: "loading",
            },
          })

          if(fromScreen == "sp-delivery") {
            yield put({type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID})
          } else if(fromScreen == "wh-list-shipper") {
            yield put({
              type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
              status_id: 3
            })
          } else if (fromScreen == "wh-list-package") {
            yield put({
              type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID,
              shipment_id: arrUpload[0]?.shipment?.id
            })
          }
        }
      } else {
        yield delay(2000)
        yield put({
          type: UPDATE_PACKAGE_STATUS_SUCCSESS,
          payload: {
            isLoading: false,
            progressBarLoading: Math.round(progressBarLoading),
            update: "done",
          },
        })

        yield put({
          type: UPDATE_PACKAGE_STATUS_SUCCSESS,
          payload: {
            isLoading: false,
            progressBarLoading: 0,
            update: "loading",
          },
        })

        if(fromScreen == "sp-delivery") {
          yield put({type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID})
        } else if(fromScreen == "wh-list-shipper") {
          yield put({
            type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
            status_id: 3
          })
        } else if (fromScreen == "wh-list-package") {
          yield put({
            type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID,
            shipment_id: arrUpload[0]?.shipment?.id
          })
        }
      }
      if (navigation && fromScreen != "wh-list-package") {
        navigation.goBack()
      }
    }
  } catch (error) {}
}

export function* watchUpdatePackageDetail({ value, navigation, shipmentId, fromScreen }) {
  yield put({
    type: UPDATE_PACKAGE_DETAIL_LOADING,
    payload: {
      isLoading: true,
    },
  })

  const res = yield UpdateService.updatePackageDetail({
    value: value,
  })

  if (res?.status == 200) {
    yield delay(1000)
    yield put({
      type: UPDATE_PACKAGE_DETAIL_SUCCSESS,
      payload: {
        message: "upload succsess",
        isLoading: false,
      },
    })

    if(fromScreen == "delivery") {
      yield put({
        type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
        status_id: 3
      })
    } else if (fromScreen == "wh-return-package"){
      yield put({
        type: FETCH_LIST_PACKAGE_BY_WAREHOUSE_ID,
        status_id: 6
      })
    } else {
      yield put({
        type: FETCH_LIST_PACKAGE_BY_SHIPMENT_ID,
        shipment_id: shipmentId
      })
    }

    if (navigation != undefined) {
      navigation.pop(1)
    }
  } else {
    yield delay(1000)
    yield put({
      type: UPDATE_PACKAGE_DETAIL_ERROR,
      payload: {
        message: "upload error",
        isLoading: false,
      },
    })
  }
}

export function* watchUpdateCodReceived({ value, navigation }) {
  try {
    let progressBarLoading = 0
    const aProgressBar = 100 / (value.length * 2)
    let error = false

    for (let i = 0; i < value.length; i++) {
      const valueUpdate = {
        id_shipper: value[i]?.package_user?.userId,
        id_package: value[i].id,
        cod_received: value[0].fee.cod || 0,
        codDone: true,
      }

      const res = yield UpdateService.updateCodReceived(valueUpdate)
      if (res?.status == 200) {
        progressBarLoading += aProgressBar
        yield put({
          type: UPDATE_PACKAGE_STATUS_SUCCSESS,
          payload: {
            status: "loading",
            isLoading: true,
            progressBarLoading: Math.floor(progressBarLoading),
          },
        })
      } else {
        error = true
        yield put({
          type: UPDATE_PACKAGE_STATUS_ERROR,
          payload: {
            status: "error",
            isLoading: false,
          },
        })
        yield delay(200)
        Alert.alert("Thông báo", "Giao hàng thất bại!")
        break
      }
      yield delay(200)
    }

    if (error != true) {
      const store = yield select()

      const wareHouseId = store.LoginReducer.wareHouseId
      const userId = store.LoginReducer.id

      for (let i = 0; i < value.length; i++) {
        const res = yield UpdateService.updatePackageStatus({
          value: {
            id: value[i].id,
            warehousepackage: {
              statusId: 5,
              wareHouseId: wareHouseId,
              packageId: value[i].id,
            },
            packageuser: {
              userId: userId,
              packageId: value[i].id,
              isActive: true,
              codDone: 1
            },
          },
        })

        if (res?.status == 200) {
          progressBarLoading += aProgressBar
          yield put({
            type: UPDATE_PACKAGE_STATUS_SUCCSESS,
            payload: {
              isLoading: true,
              progressBarLoading: Math.floor(progressBarLoading),
              update: "loading",
            },
          })
        } else {
          yield put({
            type: UPDATE_PACKAGE_STATUS_ERROR,
            payload: {
              isLoading: false,
              update: "error",
            },
          })
          yield delay(200)
          Alert.alert("Thông báo", "Giao hàng thất bại!")
          break
        }
        yield delay(200)
      }
    }

    if (progressBarLoading >= 100) {
      yield put({
        type: UPDATE_PACKAGE_STATUS_SUCCSESS,
        payload: {
          isLoading: false,
          progressBarLoading: Math.floor(progressBarLoading),
          status: "done",
        },
      })

      yield delay(200)

      yield put({
        type: UPDATE_PACKAGE_STATUS_SUCCSESS,
        payload: {
          isLoading: false,
          progressBarLoading: 0,
          status: "done",
        },
      })

      yield put({type: FETCH_LIST_PACKAGE_BY_SHIPPER_ID})

      yield delay(200)
      navigation.goBack()
    }
  } catch (error) {}
}
