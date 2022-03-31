import { translate } from 'utils/i18n';
import moment from 'moment';
import React from 'react';
export default [
  {
    title: translate('Partner code'),
    dataIndex: 'shipping_partner_code',
  },
  {
    title: translate('Partner name'),
    dataIndex: 'name',
  },
  {
    title: translate('Tel'),
    dataIndex: 'tel',
  },
  {
    title: translate('Create date'),
    dataIndex: 'created_at',
    render(data) {
      return moment(data).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Công nợ',
    dataIndex: 'debit',
  },
  {
    title: translate('Logo'),
    dataIndex: 'avt',
    render(data) {
      return <img src={data} width="50" height="50" />;
    },
  },
];
