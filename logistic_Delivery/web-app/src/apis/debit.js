import { get, patch } from 'utils/Fetch';
export const getAllDebit = (params) => get('/debit', params && params);
export const getDebitByTime = (params) =>
  get('/debit/getdebitbytime', params && params);
export const updateDebit = (id, data) =>
  patch('/debit/updatedebit/' + id, data);
