import React from 'react';

import formatNumber from 'utils/formatNumber';
import moment from 'moment';

//icons antd
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

//components atnd
import { Checkbox, Tag } from 'antd';

export default [
  {
    title: 'STT',
    render(data, record, index) {
      return index + 1;
    },
  },
  {
    title: 'Ngày',
    dataIndex: 'created_at',
    render(data) {
      return moment(data).format('L');
    },
  },
  {
    title: 'Mã khách hàng',
    dataIndex: 'id_customer',
  },
  {
    title: 'Công nợ',
  },
  {
    title: 'Đã thu',
    render(data) {
      return <Checkbox />;
    },
  },
  {
    title: 'Thu khách',
  },
  {
    title: 'Chi chú',
    dataIndex: 'description',
  },
];
