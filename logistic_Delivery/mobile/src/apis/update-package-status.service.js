import axios from "axios"
import { ROOT_URL } from "../constants/url"
import { Authorization } from "../auth/auth-header"

class UpdateService {
  async updatePackageStatus({ value }) {
    const authorization = await Authorization()
    return axios
      .post(ROOT_URL + "package/update", value, {
        headers: authorization,
      })
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }

  async updatePackageDetail({ value }) {
    const authorization = await Authorization()
    return axios
      .post(ROOT_URL + "package/update", value, {
        headers: authorization,
      })
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }

  async updateCodReceived( value ) {
    const authorization = await Authorization()
    return axios
      .post(ROOT_URL + "package/updatecodreceived", value, {
        headers: authorization,
      })
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }
}

export default new UpdateService()
