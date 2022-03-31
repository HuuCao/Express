import { get, patch, post } from 'utils/Fetch';

export const createCardIn = (data) => post('/card/createcardin', data);
export const createCardOut = (data) => post('/card/createcardout', data);
export const getCardByType = (data) => get('/card', data);
export const updateCard = (id, data) => patch('/card/update/' + id, data);
