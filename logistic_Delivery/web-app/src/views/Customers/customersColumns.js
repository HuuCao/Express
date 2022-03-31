import moment from 'moment'
import { formatNumber } from 'utils'
import { translate } from 'utils/i18n'

export default [
  {
    title: translate('Customer code'),
    dataIndex: 'customer_code',
  },
  {
    title: translate('Name'),
    dataIndex: 'name',
  },
  {
    title: translate('Tel'),
    dataIndex: 'tel',
  },
  // {
  //   title: translate('Email'),
  //   dataIndex: 'email',
  // },
  {
    title: translate('Address'),
    dataIndex: 'address',
  },
  {
    title: translate('Tổng doanh thu'),
    dataIndex: 'revenueSum',
    render(data) {
      return formatNumber(data)
    },
  },
  {
    title: 'Tổng công nợ',
    dataIndex: 'sum_debit',
    render(data) {
      return formatNumber(data)
    },
  },
  {
    title: 'Công thức tính giá',
    dataIndex: 'effort_price_id',
  },
  // {
  //   title: 'Thời gian sử dụng CTTG',
  //   dataIndex: 'time_expired_price',
  //   render(data) {
  //     return data && moment(data).format('DD/MM/YYYY');
  //   },
  // },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    render(data) {
      return moment(data).format('DD/MM/YYYY')
    },
  },
  {
    title: 'Action',
    key: 'action',
  },

  // {
  //   key: 'chooseCustomer',
  // },
]
