import { put, select } from "redux-saga/effects"
import { OtherService } from "../../apis/root"

import {
  FETCH_LIST_CLIENT_SUCCSESS,
  FETCH_LIST_CLIENT_ERROR,
  FETCH_LIST_CLIENT_LOADING,
} from "constants/actions"

export function* watchFetchListClient() {
  try {
    yield put({
      type: FETCH_LIST_CLIENT_LOADING,
      payload: {
        isLoading: true,
      },
    })

    const store = yield select()
    const wareHouseId = store.LoginReducer.wareHouseId

    const res = yield OtherService.fetchClients({"wareHouseId": wareHouseId})
    if (res.status == 200) {
      yield put({
        type: FETCH_LIST_CLIENT_SUCCSESS,
        payload: {
          data: res.data,
          isLoading: false,
          message: "fetch data succsess",
        },
      })
    } else {
      yield put({
        type: FETCH_LIST_CLIENT_ERROR,
        payload: {
          isLoading: false,
          message: "fetch data error",
        },
      })
    }
  } catch (error) {}
}
