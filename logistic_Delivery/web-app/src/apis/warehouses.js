import { get, post } from 'utils/Fetch'

export const getWarehouses = (search) => get('/warehouse', search && { search })
export const createWarehouse = (body) => post('/warehouse', body)
