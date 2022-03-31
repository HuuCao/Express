import React, { useState, useEffect } from 'react';

import styles from './info.module.scss';
import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';

//components antd
import { Select, DatePicker, Row, Col } from 'antd';

//icons antd
import { ShoppingCartOutlined, CreditCardOutlined } from '@ant-design/icons';
import BalanceItem from './balance-item';
import { getStatistical } from 'apis/statics';

import { getTimeRange, removeNull } from 'utils';
import { translate } from 'utils/i18n';
const { Option } = Select;
const { RangePicker } = DatePicker;
const Dashboard = () => {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState({});
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const toggleOpenSelect = () => setIsOpenSelect(!isOpenSelect);
  const changeRange = (date, dateString) => {
    setFilter({ ...filter, startDate: dateString[0], endDate: dateString[1] });
  };
  const changeTimeOption = (value) => {
    let tmp = getTimeRange(value);
    setFilter({ ...filter, startDate: tmp.from_date, endDate: tmp.to_date });
  };
  const getStatis = async (params) => {
    try {
      const res = await getStatistical(params);
      if (res.data.success) {
        setData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(filter);
    getStatis(removeNull(filter));
  }, [filter]);
  return (
    <div className={styles['dashboard_manager']}>
      <div className={styles['dashboard_manager_balance']}>
        <Row style={{ width: '100%', padding: '20px' }} gutter={30}>
          <Col>
            <Row style={{ color: 'gray' }}>Lọc theo ngày</Row>
            <Row>
              <Select
                open={isOpenSelect}
                defaultValue="this_month"
                onBlur={() => {
                  if (isOpenSelect) toggleOpenSelect();
                }}
                onClick={() => {
                  if (!isOpenSelect) toggleOpenSelect();
                }}
                style={{ width: 380 }}
                placeholder="Choose time"
                allowClear
                onChange={async (value) => {
                  if (isOpenSelect) toggleOpenSelect();
                  changeTimeOption(value);
                }}
                dropdownRender={(menu) => (
                  <div>
                    <RangePicker
                      onFocus={() => {
                        if (!isOpenSelect) toggleOpenSelect();
                      }}
                      onBlur={() => {
                        if (isOpenSelect) toggleOpenSelect();
                      }}
                      style={{ width: '100%' }}
                      onChange={changeRange}
                    />
                    {menu}
                  </div>
                )}
              >
                <Option value="to_day">{translate('Today')} </Option>
                <Option value="yesterday">{translate('Yesterday')}</Option>
                <Option value="this_week">{translate('This week')}</Option>
                <Option value="last_week">{translate('Last week')}</Option>
                <Option value="last_month">{translate('Last month')}</Option>
                <Option value="this_month">{translate('This month')}</Option>
                <Option value="this_year">{translate('This year')}</Option>
                <Option value="last_year">{translate('Last year')}</Option>
              </Select>
            </Row>
          </Col>
        </Row>
        <div className={styles['dashboard_manager_balance_items']}>
          <Row gutter={[20, 20]}>
            <Col span={8}>
              <BalanceItem
                colorFrom="rgba(66, 78, 190, 1)"
                colorTo="rgba(97, 107, 201, 1)"
                title="Tổng số đơn hàng"
                icon={<ShoppingCartOutlined />}
                price={data.countOrder || 0}
              />
            </Col>
            <Col span={8}>
              <BalanceItem
                colorFrom="rgba(143, 66, 190, 1)"
                colorTo="rgba(130, 97, 201, 1)"
                title="Tổng số tiền cước chưa thanh toán"
                icon={<CreditCardOutlined />}
                price={data.totalChecking || 0}
              />
            </Col>
            <Col span={8}>
              <BalanceItem
                colorFrom="rgba(190, 66, 163, 1)"
                colorTo="rgba(193, 103, 157, 1)"
                title="Tổng số tiền cước thanh toán"
                icon={<CreditCardOutlined />}
                price={data.totalChecked || 0}
              />
            </Col>
            <Col span={8}>
              <BalanceItem
                colorFrom="rgba(190, 66, 163, 1)"
                colorTo="rgba(193, 103, 157, 1)"
                title="Tổng công nợ khách hàng"
                icon={<CreditCardOutlined />}
                price={data.totalDebitCus || 0}
              />
            </Col>
            <Col span={8}>
              <BalanceItem
                colorFrom="rgba(190, 66, 163, 1)"
                colorTo="rgba(193, 103, 157, 1)"
                title="Tổng công nợ vận chuyển"
                icon={<CreditCardOutlined />}
                price={data.totalDebitShipping || 0}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          margin: '1em 0',
          background: '#fff',
          padding: '1em 3em',
        }}
      >
        <LineChart data={data.data} />
      </div>
    </div>
  );
};
export default Dashboard;
