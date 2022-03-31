import { get, post } from 'utils/Fetch';

export const getPromotion = (params) =>
  get('/promotion/getallpromotion', params && params);

export const createPromotion = (data) => post('/promotion/create', data);
