import axios from "axios"
import { ROOT_URL } from "../constants/url"
import { setToken, Authorization } from "../auth/auth-header"

class AuthService {
  login({ username, password }) {
    return axios
      .post(ROOT_URL + "auth/login", {
        username,
        password,
      })
      .then(response => {
        setToken({ info: response.data })
        return response
      })
      .catch(error => {
        return error.response
      })
  }
  async getInfoUser({ id }) {
    const authorization = await Authorization()
    return axios
      .post(ROOT_URL + "users/details", { id }, { headers: authorization })
      .then(response => {
        return response
      })
      .catch(response => {
        return response.response
      })
  }
}

export default new AuthService()
