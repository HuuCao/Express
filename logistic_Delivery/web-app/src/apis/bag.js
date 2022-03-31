import { post } from 'utils/Fetch'

export const createBag = (body) =>
  post('/package/createbagbyshipmentid', { ...body })

export const getBagsByShipmentId = (shipment_id) =>
  post('/package/getallbagbyshipmentid', { shipment_id })
