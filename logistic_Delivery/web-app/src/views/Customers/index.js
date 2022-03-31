import React, { useState, useEffect, useContext, useRef } from 'react';

import customersColumns from './customersColumns';
import Context from 'utils/Context';
import { ACTION } from 'consts';
import { translate } from 'utils/i18n';
import { formatNumber } from 'utils';
import { PERMISSIONS } from 'consts/permissions';

//icon antd
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

//component antd
import {
  Table,
  Row,
  Typography,
  notification,
  Col,
  Input,
  Popconfirm,
  Select,
} from 'antd';

//component
import ModalCreateCustomer from './ModalCreateCustomer';
import Permission from 'components/Permission';

//apis
import { getUsers, deleteUser } from 'apis/users';

import { getPrice } from 'apis/price';

export default () => {
  const typingTimeoutRef = useRef(null);

  const [customers, setCustomers] = useState([]);
  const [paramsFilter, setParamsFilter] = useState({ page: 1, pageSize: 20 });
  const [count, setCount] = useState(0);
  const [filterKey, setFilterKey] = useState('customer_code');

  const [effortPriceList, setEffortPriceList] = useState([]);
  const context = useContext(Context);

  //Role client sẽ lấy customers receiver cùng companyId
  //Role admin, subadmin,... lấy all
  const getCustomers = async (params) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true });

      const res = await getUsers({ role_id: 7, ...params });
      console.log(res);
      if (res.data.success) {
        setCustomers(res.data.data);
        setCount(res.data.count);
      } else
        notification.error({ message: 'Error', description: res.statusText });

      context.dispatch({ name: ACTION.LOADING, data: false });
    } catch (error) {
      context.dispatch({ name: ACTION.LOADING, data: false });
      console.log(error);
    }
  };

  const onSearch = (e) => {
    const value = e.target.value;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      paramsFilter.page = 1;
      delete paramsFilter.name;
      delete paramsFilter.customer_code;
      if (!value) delete paramsFilter.search;
      else paramsFilter[filterKey] = value;
      getCustomers(paramsFilter);
      setParamsFilter(paramsFilter);
    }, 750);
  };

  const onDeleteCustomer = async (userId) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true });
      const res = await deleteUser(userId);
      console.log(res);
      if (res.status === 200) {
        getCustomers(paramsFilter);
        notification.success({ message: translate('Delete customer success') });
      } else
        notification.error({
          message: 'Error',
          description: translate('Delete customer failed'),
        });
      context.dispatch({ name: ACTION.LOADING, data: false });
    } catch (error) {
      console.log(error);
      context.dispatch({ name: ACTION.LOADING, data: false });
    }
  };

  const getEffortPrice = async () => {
    try {
      const res = await getPrice();
      if (res.data.success && res.status == 200) {
        setEffortPriceList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEffortPrice();
    getCustomers(paramsFilter);
  }, []);
  return (
    <>
      <Row justify="space-between">
        <Col>
          <Typography.Title level={4}>
            {translate('Customers')}
          </Typography.Title>
        </Col>
        <Permission permissions={[PERMISSIONS.CREATE_EDIT_CUSTOMER]}>
          <ModalCreateCustomer
            getInitialCustomersReceiver={() => getCustomers(paramsFilter)}
          />
        </Permission>
      </Row>
      <br />
      <Row gutter={20}>
        <Col xs={24} lg={9}>
          <Row>Tìm kiếm khách hàng</Row>
          <Input.Group compact>
            <Input
              prefix={<SearchOutlined style={{ color: '#bdc3c7' }} />}
              placeholder={translate('Find customer')}
              allowClear
              enterButton="Search"
              onChange={onSearch}
              style={{ width: '60%' }}
            />
            <Select
              style={{ width: '40%' }}
              value={filterKey}
              onChange={setFilterKey}
            >
              <Select.Option value="customer_code">Mã khách hàng</Select.Option>
              <Select.Option value="name">Tên khách hàng</Select.Option>
            </Select>
          </Input.Group>
        </Col>
      </Row>

      <br />
      <Table
        style={{ width: '100%' }}
        columns={customersColumns.map((e) => {
          if (e.key === 'action')
            return {
              ...e,
              width: 100,
              render: (text, record) => (
                <Row justify="center" align="middle" wrap={false}>
                  <ModalCreateCustomer
                    getInitialCustomersReceiver={() =>
                      getCustomers(paramsFilter)
                    }
                    customer={record}
                  >
                    <EditOutlined
                      style={{
                        fontSize: 16,
                        color: '#1890FF',
                        cursor: 'pointer',
                      }}
                    />
                  </ModalCreateCustomer>
                  <Popconfirm
                    title={`${translate(
                      'Are you sure delete this customer'
                    )} ?`}
                    okText="Ok"
                    cancelText="No"
                    onConfirm={() => onDeleteCustomer(record.id)}
                  >
                    <DeleteOutlined
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        color: 'orange',
                        cursor: 'pointer',
                      }}
                    />
                  </Popconfirm>
                </Row>
              ),
            };
          if (e.dataIndex === 'effort_price_id')
            return {
              ...e,
              render(data) {
                return data && effortPriceList.find((e) => e.id === data)
                  ? effortPriceList.find((e) => e.id === data)['title']
                  : '';
              },
            };

          return e;
        })}
        dataSource={customers}
        size="small"
        pagination={{
          current: paramsFilter.page,
          defaultPageSize: paramsFilter.pageSize,
          pageSizeOptions: [20, 30, 50, 60, 70, 80, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            paramsFilter.page = page;
            paramsFilter.pageSize = pageSize;

            setParamsFilter(paramsFilter);
            getCustomers(paramsFilter);
          },
          total: count,
        }}
        summary={(pageData) => (
          <Table.Summary.Row style={{ fontWeight: 500 }}>
            <Table.Summary.Cell>Tổng:</Table.Summary.Cell>
            <Table.Summary.Cell></Table.Summary.Cell>
            <Table.Summary.Cell></Table.Summary.Cell>
            <Table.Summary.Cell></Table.Summary.Cell>
            <Table.Summary.Cell>
              {formatNumber(
                pageData.reduce((a, b) => a + (b.revenueSum || 0), 0)
              )}
            </Table.Summary.Cell>
            <Table.Summary.Cell>
              {formatNumber(
                pageData.reduce((a, b) => a + (b.sum_debit || 0), 0)
              )}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </>
  );
};
