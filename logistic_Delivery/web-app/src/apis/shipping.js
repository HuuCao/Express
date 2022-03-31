const { get, post, patch } = require('utils/Fetch');

export const getShipping = (params) =>
  get('/shipping/getall', params && params);
export const createShipping = (data) => post('/shipping/create', data);
export const updateShipping = (id, data) =>
  patch('/shipping/update/' + id, data);
