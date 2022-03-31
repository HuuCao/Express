import axios from "axios"
import { ROOT_URL } from "../constants/url"
import { Authorization } from "../auth/auth-header"

class ShipperService {
  async fetchPackageByShipperId({ userId }) {
    const authorization = await Authorization()
    return axios
      .post(
        ROOT_URL + "package/getpackagebyshipperid",
        { userId: userId, statusText: "shipping" },
        { headers: authorization },
      )
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }

  async fetchShipmentById({ id }) {
    const authorization = await Authorization()
    return axios
      .post(
        ROOT_URL + "shipment/getshipmentbyId",
        { id: id },
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

  async fetchPackageDonebyShipperId(id, date) {
    const authorization = await Authorization()
    return axios
      .post(
        ROOT_URL + "package/getpackagedonebyshipperid",
        { id_shipper: id, date: date },
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

  async fetchWalletDetailShipper(id) {
    const authorization = await Authorization()
    return axios
      .post(
        ROOT_URL + "shipper/getsumcodneedconfirm",
        { id_shipper: id },
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

export default new ShipperService()
