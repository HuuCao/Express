import { get, post, patch, destroy } from 'utils/Fetch';

export const getOrder = (params) => get('/order/getallorder', params && params);

export const getOrderByDate = (params) =>
  get('/order/getorderbyalldates', params && params);
export const orderScan = (params) => get('/order/scan', params && params);
export const createOrder = (data) => post('/order/create', data);
export const updateOrder = (id, data) => patch('/order/update/' + id, data);
export const deleteOrder = (id) => destroy(`/order/delete/${id}`);
