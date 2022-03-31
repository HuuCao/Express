import { get, post, patch, destroy } from 'utils/Fetch'

// export const getPackagesByShipmentId = (shipmentId) => get("/package", { id: shipmentId })

export const createPackage = (body) => post('/package', body)

// export const updatePackage = (id, body) => patch('/package/' + id, body)

export const getItemsByPackageList = (id) => get('/package/pkl/item', { id })

export const getPackageById = (id) => get('/package/' + id)

export const deletePackatgesByIds = (ids) => destroy('/package', { ids })

//new
export const getPackagesByShipmentId = (shipmentId) =>
  post('/package/getpackagebyshipmentid', { shipmentId })

export const getPackageErrorByWareHouseId = (wareHouseId) =>
  post('/package/getpackageerrorbywhid', { wareHouseId })

export const deletePackageById = (id) =>
  post('/package/deletepackagebypackageid', { id })

export const getPackageByStatusByWarehouseId = (body) =>
  post('/package/getpackagebywarehouseid', { ...body })

export const getPackageByStatusByWarehouseIdBySearch = (body, search) =>
  post('/package/getpackagebywarehouseid?search=' + search, { ...body })

export const getPackagesByStatusText = (statusText) =>
  get('/package/get/' + statusText)

export const updatePackageByStatusId = (id, statusId) =>
  post('/package/updatestatus', {
    id,
    warehousepackage: {
      statusId,
    },
  })

//Nhập package tồn kho
export const addPackageError = (id, reasonId) =>
  post('/package/addpackageerror', { id, reasonId })

export const updatePackage = (body) => post('/package/update', { ...body })

//xác nhận thu tiền từ shipper
export const accountantConfirmPackageCod = (id_accountant, id_package) =>
  post('/package/updateaccounteenconfirmpackage', { id_accountant, id_package })

//filter package theo customer receiver id
export const getPackagesByWarehouseIdByReceiverId = (
  wareHouseId,
  id_receiver
) => post('/package/getallpkgbyreceiverid', { wareHouseId, id_receiver })

// lấy kiện hàng broken theo shipment id và warehouse id
export const getPackagesBrokenByShipmentIdByWarehouseId = (
  wareHouseId,
  shipmentId
) =>
  post('/package/getpkgbrokenbyshipmentandwarehouseid', {
    wareHouseId,
    shipmentId,
  })

// lấy kiện hàng done theo shipment id và warehouse id
export const getPackagesDoneByShipmentIdByWarehouseId = (
  wareHouseId,
  shipmentId
) =>
  post('/package/getpkgdonebyshipmentandwarehouseid', {
    wareHouseId,
    shipmentId,
  })

export const getPackagesByShipperId = (userId) =>
  post('/package/getpackagebyshipperid', { userId })

export const getPackagesByShipperIdBySearch = (userId, search) =>
  post('/package/getpackagebyshipperid?search=' + search, { userId })
