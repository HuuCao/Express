import AsyncStorage from "@react-native-community/async-storage"

export const setToken = async ({ info }) => {
  try {
    await AsyncStorage.setItem(
      "__token",
      JSON.stringify({ token: info.accessToken, id: info.userid }),
    )
  } catch (e) {}
}

export const Authorization = async () => {
  try {
    const info = await AsyncStorage.getItem("__token")
    const _info = JSON.parse(info)
    if (_info !== null) {
      return { Authorization: "Bearer " + _info.token }
    }
  } catch (e) {}
}
