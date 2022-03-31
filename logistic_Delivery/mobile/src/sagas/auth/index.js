import AsyncStorage from "@react-native-community/async-storage"
import { put } from "redux-saga/effects"
import { LOGIN_FALSE, LOGIN_SUCCSESS, LOGIN_LOADING } from "../../constants/actions"
import { AuthService } from "../../apis/root"
import { Alert } from "react-native"

export function* watchLoginAction({ account, password, navigation }) {
  try {
    if(account && password) {
      yield put({
        type: LOGIN_LOADING,
        payload: {
          isLoading: true,
        },
      })
    } else {
      yield put({
        type: LOGIN_FALSE,
        payload: {
          message: "Vui lòng nhập đủ tài khoản và mật khẩu!",
          login: false,
          isLoading: false,
        },
      })
    }

    const response = yield AuthService.login({
      username: account.toLowerCase(),
      password: password.toLowerCase(),
    })

    if (response.status == 200) {
      const info = yield AuthService.getInfoUser({ id: response.data.userid })
      if (info.status == 200) {
        yield put({
          type: LOGIN_SUCCSESS,
          payload: {
            ...info.data,
            ...{ message: "Đăng nhập thành công", login: true, isLoading: false },
          },
        })
        if (info.data.roleId == 5) {
          navigation.replace("MainWarehouseScreen")
        } else if (info.data.roleId == 6) {
          navigation.replace("MainShipperScreen")
        } else {
          Alert.alert(
            "Thông báo",
            "Tài khoản của bạn không đủ quyền để truy cập ứng dụng",
          )
        }
      }
    } else {
      yield put({
        type: LOGIN_FALSE,
        payload: {
          message: "Tài khoản hoặc mật khẩu không chính xác",
          login: false,
          isLoading: false,
        },
      })
    }
  } catch (error) {}
}

export function* watchAuthencationAction({ navigation }) {
  try {
    const str = yield AsyncStorage.getItem("__token")
    const token = JSON.parse(str)
    if (token !== null) {
      const info = yield AuthService.getInfoUser({ id: token.id })
      if (info.data.message == "Forbiden") {
        navigation.replace("LoginScreen")
      } else {
        yield put({
          type: LOGIN_SUCCSESS,
          payload: {
            ...info.data,
            ...{ message: "Đăng nhập thành công", login: true },
          },
        })
        if (info.data.roleId == 5) {
          navigation.replace("MainWarehouseScreen")
        } else if (info.data.roleId == 6) {
          navigation.replace("MainShipperScreen")
        }
      }
    } else {
      navigation.replace("LoginScreen")
    }
  } catch (error) {}
}
