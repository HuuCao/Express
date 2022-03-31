import { get } from 'utils/Fetch';
import React from 'react';
export const getStatistical = (params) =>
  get('/statistical/totalcharge', params);
