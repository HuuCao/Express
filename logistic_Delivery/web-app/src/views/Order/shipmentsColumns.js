import React, { useContext } from 'react';

import { translate } from 'utils/i18n';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ROUTES, STATE_SHIPMENT } from 'consts';
import Context from 'utils/Context';

//components antd
import { Tag } from 'antd';
import { formatNumber } from 'utils';

const RenderShipper = ({ text }) => {
  const context = useContext(Context);
  return <div>{text ? text : context.companyName}</div>;
};

export default [
  {
    title: 'STT',
    key: 0,
  },
  {
    title: 'Ngày ký nhận',
    dataIndex: 'date_sign',
    key: 1,
  },

  {
    title: translate('Bill number'),
    dataIndex: 'code_bill',
    key: 2,
  },
  {
    title: translate('Amount package'),
    dataIndex: 'total_quantity_package',
    key: 3,

    // width: '4vw',
  },
  {
    title: translate('Waybill number'),
    dataIndex: 'tracking_number',
    key: 4,
  },
  {
    title: translate('Customer id'),
    dataIndex: 'user',
    key: 5,
  },

  {
    title: translate('Payment help'),
    dataIndex: 'cod',
    key: 6,
  },
  {
    title: translate('Chi phí Đóng gỗ/ Đóng tải'),
    dataIndex: 'bag',
    key: 7,
  },
  {
    title: 'Phí nâng hàng',
    dataIndex: 'fee_package',

    key: 8,
  },
  {
    title: translate('Surcharge'),
    dataIndex: 'sub_fee',
    key: 9,
  },
  {
    title: translate('Mass'),
    dataIndex: 'mass',
    key: 10,
  },
  {
    title: translate('Volume'),
    dataIndex: 'volume',
    key: 11,
  },
  {
    title: translate('Unit price'),
    dataIndex: 'unit_price',
    key: 12,
  },
  {
    title: translate('Total charge'),
    dataIndex: '',
    key: 13,
  },
  {
    title: translate('Origin cost'),
    dataIndex: 'origin_cost',
    key: 14,
  },
  {
    title: translate('Order status'),
    dataIndex: 'order_status',
    key: 16,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    key: 17,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 18,
  },
];
