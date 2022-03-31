import React from 'react';

import { translate } from 'utils/i18n';
import moment from 'moment';

//components antd
import { formatNumber } from 'utils';

export default [
  {
    title: 'STT',
    key: 0,
    render: (text, record, index) => <>{index + 1}</>,
  },
  {
    title: 'Mã Bill',
    dataIndex: 'bill_code',
    key: 1,
  },
  {
    title: 'Mã khách hàng',
    dataIndex: 'customer_code',
    key: 1,
  },
  {
    title: 'Khối lượng',
    dataIndex: 'mass',
    key: 1,
  },
  {
    title: 'Trọng lượng',
    dataIndex: 'volume',
    key: 1,
  },
  {
    title: 'Ngày nhập kho',
    dataIndex: 'created_at',
    key: 1,
  },
];
