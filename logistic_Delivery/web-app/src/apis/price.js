const { get, patch, post, destroy } = require('utils/Fetch');

export const getPrice = (params) => get('/price/getall', params && params);
export const updatePrice = (id, data) => patch(`/price/update/${id}`, data);
export const createPrice = (data) => post('/price/create', data);
export const deletePrice = (id) => destroy('/price/remove/' + id);
export const deletePackage = (data) => post('/price/remove_package', data);
