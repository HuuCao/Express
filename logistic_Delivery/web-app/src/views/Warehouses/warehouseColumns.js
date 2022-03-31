import React from 'react';

import moment from 'moment';
import { translate } from 'utils/i18n';
import { formatNumber } from 'utils';
export default [
  {
    title: translate('Card code'),
    dataIndex: 'code',
    key: 'code_io',
  },
  {
    title: translate('Amount package'),
    dataIndex: 'amount_import_package',
    key: 'order',
    render: (data) => data || 0,
    // render(data) {
    //   return (
    //     data && data.reduce((a, b) => a + (b.amount_package_imported || 0), 0)
    //   );
    // },
  },
  {
    title: 'Ngày',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text) =>
      text && moment(text).add(7, 'hour').format('YYYY/MM/DD hh:mm'),
  },
  {
    title: 'Vận chuyển',
    dataIndex: 'shipping_partner',
    key: 'shipping_partner',
    render(data) {
      return data && data.name;
    },
  },
  {
    title: 'Cước nhập kho',
    dataIndex: 'cost_import',
    key: 'cost',
    render(data) {
      return formatNumber(data) + ' VND';
    },
  },
];
