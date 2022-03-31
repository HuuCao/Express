import { get, patch, post } from 'utils/Fetch'

export const getShipments = (query) => get('/shipment', query)

export const generateInvoiceNo = (prefixInvoiceNo) =>
  get('/shipment/generateInvoiceNo', { prefixInvoiceNo })

export const updateShipment = (id, body) => patch('/shipment/' + id, body)

export const createShipment = (body) => post('/shipment', body)
export const getListShipmentHome = (body) => get('/shipment/home', body)

export const closeShipmentById = (id, body) =>
  patch('/shipment/close/' + id, body)
export const closeInvoiceById = (id, body) =>
  patch(`/shipment/invoice/${id}/close`, body)

// export const getShipmentById = (id) => get('/shipment/' + id)

export const getItemByShipmentId = (id) => get('/itemsv2/pkl/' + id)

export const exportPkl = (body) => post('/package/pkl/export', body)

//new
export const getShipmentById = (id) => post('/shipment/getshipmentbyId', { id })
export const getShipmentsByStatus = (statusText) =>
  post('/shipment/getshipmentbystatustext', { statusText })
export const getShipmentsByWarehouseId = (wareHouseId, state) =>
  post('/shipment/getshipmentbywarehouseid', { wareHouseId, state })

export const getShipmentsBrokenByWarehouseId = (wareHouseId) =>
  post('/package/getshippmentbrokenbywarehouseid', { wareHouseId })

export const getShipmentsByCompanyId = (companyId, state) =>
  post('/shipment/getshipmentbycompanyid', { companyId, state })

export const getSumDebitShipments = (body) =>
  post('/shipment/getsumdebitshipment', body && body)

export const getSumDebitShipmentByStatus = (status) =>
  post('/shipment/getsumdebitshipment?status=' + status)

//lấy invoiceNo shipment cuối cùng của company shipper
export const getLastInvoiceNo = () => get('/shipment/getlastinvoiceno')

/*
  query để lọc các shipment theo ngày
  body: {
    "startDate":"2021-05-15",
    "endDate":"2021-05-30"
  }
*/
