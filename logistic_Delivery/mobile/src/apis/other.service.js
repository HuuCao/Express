import axios from "axios"
import { ROOT_URL } from "../constants/url"
import { Authorization } from "../auth/auth-header"

class otherService {
  async fetchReason() {
    const authorization = await Authorization()
    return axios
      .get(ROOT_URL + "reason", { headers: authorization })
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }
  async fetchClients(value) {
    const authorization = await Authorization()
    return axios
      .post(ROOT_URL + "package/getallcustomerpreparingbywarehouseid", value, {
        headers: authorization,
      })
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }
  async updateStateShipment(value) {
    const authorization = await Authorization()
    return axios
      .patch(
        ROOT_URL + "shipment/" + value.id,
        {
          state: value.state
        },
        {
          headers: authorization,
        },
      )
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }
}

export default new otherService()
