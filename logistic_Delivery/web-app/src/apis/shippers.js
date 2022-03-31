import { get, post } from 'utils/Fetch'

export const getShippers = () => get('/shipper/getallshipper')
export const getShippersTakeMoney = (body) =>
  post('/shipper/getallshipperbywhId', { ...body })
export const getShippersByWarehouseId = (id) =>
  get('/shipper/getallshipper?id_warehouse=' + id)
export const getShipperCodConfirm = (wareHouseId) =>
  post('/shipper/getshippercodconfirmbywhid', { wareHouseId })
export const getShippersByCompanyId = (id_company) =>
  post('/shipper/getallshipperbycompanyid?id_company=' + id_company)
