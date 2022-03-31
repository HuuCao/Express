import { get, post } from 'utils/Fetch'

export const getCompanies = (search) => get('/companies', search && { search })
export const createCompanies = (body) => post('/companies', body)
export const getDetailCompany = (query) => get('/companies/detail', query)
export const updateCompany = (body) => post('/companies/update', body)
