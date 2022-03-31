import { post, get } from 'utils/Fetch'

export const createCustomerReceiver = (body) => post('/cusreceiver', body)
export const customersReceiver = (search) =>
  get('/cusreceiver', search && { search })
export const customersReceiverByCompany = (companyId) =>
  get('/cusreceiver', companyId && { companyId })
export const getCustomersReceiverHavePackagesPreparingByWarehouseId = (
  wareHouseId
) => post('/package/getallcustomerpreparingbywarehouseid', { wareHouseId })
