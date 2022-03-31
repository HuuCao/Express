import React, { useContext } from 'react';

//component antd
import { Select, notification, Col } from 'antd';

import { translate } from 'utils/i18n';

import moment from 'moment';
//lodash

export default (props) => {
  const changeTimeOption = (value) => {
    switch (value) {
      case 'to_day':
        props.setFilter({
          ...props.filter,
          startDate: moment().format('YYYY/MM/DD'),
          endDate: moment().format('YYYY/MM/DD'),
        });
        break;
      case 'yesterday':
        props.setFilter({
          ...props.filter,
          startDate: moment().subtract(1, 'days').format('YYYY/MM/DD'),
          endDate: moment().subtract(1, 'days').format('YYYY/MM/DD'),
        });
        break;
      case 'this_week':
        props.setFilter({
          ...props.filter,
          startDate: moment().startOf('week').format('YYYY/MM/DD'),
          endDate: moment().endOf('week').format('YYYY/MM/DD'),
        });
        break;
      case 'last_week':
        props.setFilter({
          ...props.filter,
          startDate: moment()
            .subtract(1, 'weeks')
            .startOf('week')
            .format('YYYY/MM/DD'),
          endDate: moment()
            .subtract(1, 'weeks')
            .endOf('week')
            .format('YYYY/MM/DD'),
        });
        break;
      case 'this_month':
        props.setFilter({
          ...props.filter,
          startDate: moment().startOf('month').format('YYYY/MM/DD'),
          endDate: moment().format('YYYY/MM/DD'),
        });
        break;
      case 'last_month':
        props.setFilter({
          ...props.filter,
          startDate: moment()
            .subtract(1, 'month')
            .startOf('month')
            .format('YYYY/MM/DD'),
          endDate: moment()
            .subtract(1, 'month')
            .endOf('month')
            .format('YYYY/MM/DD'),
        });
        break;
      case 'this_year':
        props.setFilter({
          ...props.filter,
          startDate: moment().startOf('years').format('YYYY/MM/DD'),
          endDate: moment().endOf('years').format('YYYY/MM/DD'),
        });
        break;
      case 'last_year':
        props.setFilter({
          ...props.filter,
          startDate: moment()
            .subtract(1, 'year')
            .startOf('year')
            .format('YYYY/MM/DD'),
          endDate: moment()
            .subtract(1, 'year')
            .endOf('year')
            .format('YYYY/MM/DD'),
        });
        break;
      default:
        props.setFilter({
          ...props.filter,
          startDate: moment().startOf('month').format('YYYY/MM/DD'),
          endDate: moment().format('YYYY/MM/DD'),
        });
        break;
    }
  };

  return (
    <Select
      defaultValue="to_day"
      style={{ width: '80%' }}
      onChange={changeTimeOption}
    >
      <Select.Option value="to_day">{translate('Today')}</Select.Option>
      <Select.Option value="yesterday">{translate('Yesterday')}</Select.Option>
      <Select.Option value="this_week">{translate('This week')}</Select.Option>
      <Select.Option value="last_week">{translate('Last week')}</Select.Option>
      <Select.Option value="this_month">
        {translate('This month')}
      </Select.Option>
      <Select.Option value="last_month">
        {translate('Last month')}
      </Select.Option>
      <Select.Option value="this_year">{translate('This year')}</Select.Option>
      <Select.Option value="last_year">{translate('Last year')}</Select.Option>
    </Select>
  );
};
