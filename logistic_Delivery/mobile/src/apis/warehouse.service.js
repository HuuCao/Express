import axios from "axios"
import { ROOT_URL } from "../constants/url"
import { Authorization } from "../auth/auth-header"

class WarehouseService {
  async fetchShipmentByWarehouseId({ wareHouseId }) {
    const authorization = await Authorization()
    return axios
      .post(
        ROOT_URL + "shipment/getshipmentbywarehouseid",
        { wareHouseId },
        { headers: authorization },
      )
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }

  async fetchPackageByShipmentId({ shipmentId }) {
    const authorization = await Authorization()
    return axios
      .post(
        ROOT_URL + "package/getpackagebyshipmentid",
        { shipmentId },
        { headers: authorization },
      )
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }

  async fetchPackageByWarehouseId({ wareHouseId, status_id }) {
    const authorization = await Authorization()
    return axios
      .post(
        ROOT_URL + "package/getpackagebywarehouseid",
        {
          wareHouseId,
          status_id,
        },
        { headers: authorization },
      )
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }

  async fetchShippersByWarehouseId({ wareHouseId }) {
    const authorization = await Authorization()
    return axios
      .get(
        ROOT_URL + `shipper/getallshipper?id_warehouse=${wareHouseId}`,
        { headers: authorization },
      )
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }
}

export default new WarehouseService()
