import { get, destroy, post, patch } from 'utils/Fetch'

export const getUsers = (params) => get('/users', params && params)
export const getUsersByRole = (params) => get('/users/getuserbyroles', params)
export const getHomeData = (query) => get(`/users/home`, query)
export const getUserDetail = (query) => get(`/users/detail`, query)
export const deleteUser = (userId) => destroy(`/users/${userId}`)
export const updateUser = (id, data) => patch('/users/' + id, data)
export const addUser = (data) => post('/auth/register', data)
export const createCustomer = (data) => post('/users/create', data)
//new
export const addPermission = (id_role, id_permission) =>
  post('/roles/addpermission', { id_role, id_permission })
export const removePermission = (id_role, id_permission) =>
  post('/roles/removepermission', { id_role, id_permission })
