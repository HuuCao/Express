import React from 'react'
import './index.scss'

//components antd
import { Space, Tooltip } from 'antd'

import { calculateWarningWeightperVolume } from 'utils'
import moment from 'moment'
import formatNumber from 'utils/formatNumber'

//icons antd
import {
  WarningOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

export default [
  {
    title: 'PKG No',
    dataIndex: 'cartonNo',
    key: 'cartonNo',
    fixed: 'left',
    render: (text, record) => (
      <Space>
        {text}
        {calculateWarningWeightperVolume(record) && (
          <WarningOutlined size={24} style={{ color: '#f0a500' }} />
        )}
      </Space>
    ),
  },
  {
    title: 'PKG Type',
    dataIndex: 'pkgType',
    key: 'pkgType',
    align: 'center',
  },

  {
    title: 'Date Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm'),
  },

  {
    title: 'Real Weight',
    dataIndex: 'realWeight',
    key: 'realWeight',
    align: 'center',
  },

  {
    title: 'Volume',
    dataIndex: 'volume',
    key: 'volume',
    align: 'center',
  },
  {
    title: 'Date Paid',
    align: 'center',
    key: 'datePaid',
    dataIndex: 'fee',
    render: (text) =>
      text && text.paidDate && moment(text.paidDate).format('YYYY-MM-DD HH:mm'),
  },
  {
    title: 'Date Refund',
    key: 'dateRefund',
    align: 'center',
    dataIndex: 'fee',
    render: (text) =>
      text &&
      text.refundDate &&
      moment(text.refundDate).format('YYYY-MM-DD HH:mm'),
  },
  {
    title: 'Accountant Refund',
    align: 'center',
  },
  {
    title: 'Accountant Paid',
    align: 'center',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
    align: 'center',
    width: '10vw',
    render: (text) =>
      text && (
        <Tooltip title={text}>
          <p style={{ marginBottom: 0 }} className="note">
            {text}
          </p>
        </Tooltip>
      ),
  },

  {
    title: 'Cost',
    dataIndex: 'fee',
    key: 'cost',
    align: 'center',
    render: (text) => text && formatNumber(text.cost),
  },
  {
    title: 'Cod',
    dataIndex: 'fee',
    key: 'cod',
    align: 'center',
    render: (text) => text && formatNumber(text.cod),
  },

  {
    title: 'Cod Confirm',
    dataIndex: 'fee',
    key: 'codConfirm',
    align: 'center',
    render: (text, record) =>
      text && text.isRefundDone ? (
        <CheckCircleOutlined style={{ fontSize: '20px', color: 'green' }} />
      ) : (
        <CloseCircleOutlined style={{ fontSize: '20px', color: 'red' }} />
      ),
  },
  {
    title: 'Cost Confirm',
    key: 'codConfirm',
    dataIndex: 'fee',
    align: 'center',
    render: (text, record) =>
      text && text.isPaidDone ? (
        <CheckCircleOutlined style={{ fontSize: '20px', color: 'green' }} />
      ) : (
        <CloseCircleOutlined style={{ fontSize: '20px', color: 'red' }} />
      ),
  },
]
