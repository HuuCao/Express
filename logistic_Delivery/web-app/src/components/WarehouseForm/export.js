import React, { useState, useEffect } from 'react';
import {
  Divider,
  Row,
  Col,
  Select,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Table,
  Modal,
  notification,
} from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { getUsersByRole, getUsers } from 'apis/users';
import { getShipping } from 'apis/shipping';
import { getOrderByDate, getOrder } from 'apis/order';
import shipmentsColumns from 'views/Order/shipmentsColumns';
import moment from 'moment';
export default function WarehouseExportForm({ data, setData }) {
  const [customerList, setCustomerList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);
  const [listsSearchByDate, setListSearchByDate] = useState([]);
  const [showPickOrder, setShowPickOrder] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const getCustomerList = async () => {
    try {
      const res = await getUsers({ role_id: 7 });
      if (res.data.success) {
        setCustomerList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getPartnerList = async () => {
    try {
      const res = await getShipping();
      if (res.data.success) {
        setPartnerList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const searchByCustomer = async (params) => {
    try {
      const res = await getOrder({ id_customer: params });
      if (res.data.success) {
        setListSearchByDate(
          res.data.data.filter((e) => e.order_status == 'CameBack')
        );
        setShowPickOrder(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: 'Mã bill',
      dataIndex: 'code_bill',
    },
    {
      title: 'Số kiện',
      dataIndex: 'total_quantity_package',
      render(data, record) {
        return record.amount_package_imported + '/' + data;
      },
    },
    {
      title: 'Khối lượng',
      dataIndex: 'mass',
      render(data) {
        return data + ' kg';
      },
    },
    {
      title: 'Trọng lượng',
      dataIndex: 'volume',
      render(data) {
        return (
          <>
            {data} m<sup>3</sup>
          </>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      render(data) {
        return moment(data).format('DD/MM/YYYY');
      },
    },
  ];
  const searchBillByDate = async (params) => {
    try {
      const res = await getOrderByDate(params);
      if (res.data.success) {
        setListSearchByDate(
          res.data.data.filter((e) => e.order_status == 'CameBack')
        );
        setShowPickOrder(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const onAddOrder = () => {
    let tmp = listsSearchByDate.filter(
      (e) => selectedRowKeys.indexOf(e.id) != -1
    );
    tmp = tmp.filter(
      (e) =>
        data.data
          .map((f) => {
            return f.id;
          })
          .indexOf(e.id) == -1
    );
    setData((e) => {
      return { ...e, data: [...e.data, ...tmp] };
    });
    setShowPickOrder(false);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const copyMessage = () => {
    let mess = data.data
      .map((e) => {
        return `${e.code_bill} ${e.amount_package_imported} ${
          e.weight || 0
        }kg ${moment(e.create_at).format('L')}`;
      })
      .join('\r\n');
    console.log(mess);
    navigator.clipboard.writeText(mess);
    notification.success({ message: 'Đã sao chép vào bộ nhớ tạm' });
  };
  useEffect(() => {
    getCustomerList();
    getPartnerList();
  }, []);

  useEffect(() => {
    setData({ ...data, created_at: moment().format('YYYY-MM-DD') });
  }, []);
  return (
    <>
      <Row style={{ margin: '7px 0' }}>
        <Col span={8}>
          <DatePicker
            size="large"
            style={{ width: '100%', borderRadius: 8 }}
            placeholder="Chọn ngày xuất kho"
            defaultValue={moment()}
            onChange={(date, dateString) => {
              let tmp = { ...data };
              tmp.created_at = dateString;
              setData(tmp);
            }}
          />
        </Col>
      </Row>
      <Row style={{ margin: '7px 0' }}>
        {/* <Col span={8}>
          <Input
            placeholder="Tìm kiếm mã khách hàng"
            size="large"
            style={{ borderRadius: 8 }}
            onPressEnter={(e) => searchByCustomer(e.target.value)}
          />
        </Col> */}
        <Col span={8} className={styles['chooseCustomer']}>
          <Select
            style={{ width: '100%', borderRadius: 8 }}
            placeholder="Chọn khách hàng"
            size="large"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(e) => {
              let tmp = { ...data };
              tmp.id_customer = e;
              searchByCustomer(e);
              setData(tmp);
            }}
          >
            {customerList.map((e) => (
              <Select.Option value={e.id}>{e.name}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row style={{ margin: '7px 0' }}>
        <Button
          size="large"
          type="primary"
          style={{ borderRadius: 5 }}
          icon={<MessageOutlined />}
          onClick={copyMessage}
        >
          Coppy hóa đơn
        </Button>
      </Row>

      <Table columns={columns} size="small" dataSource={data.data} />
      <div style={{ borderTop: 'solid 1px', margin: '10px 0' }}></div>

      {/* <Divider style={{ backgroundColor: 'rgb(0 0 5 / 20%)', height: 2 }} /> */}
      <Row justify="space-between">
        <Col span={6}>
          <Select
            placeholder="Vận chuyển"
            style={{ width: '100%' }}
            onChange={(e) => {
              let tmp = { ...data };
              tmp.id_shipping = e;
              setData(tmp);
            }}
          >
            {partnerList.map((e) => (
              <Select.Option value={e.id}>{e.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={14}>
          <Row style={{ marginBottom: 7 }}>
            <Input
              placeholder="Ghi chú"
              onChange={(e) => {
                let tmp = { ...data };
                tmp.note = e.target.value;
                setData(tmp);
              }}
            />
          </Row>
          <Row style={{ marginBottom: 7 }}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder="COD"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              onChange={(e) => {
                let tmp = { ...data };
                tmp.cod = e;
                setData(tmp);
              }}
            />
          </Row>
          <Row style={{ marginBottom: 7 }} justify="end" gutter={20}>
            <Col span={12}>
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Phụ phí khác"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={(e) => {
                  let tmp = { ...data };
                  tmp.sub_cost = e;
                  setData(tmp);
                }}
              />
            </Col>
            <Col span={12}>
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Cước xuất kho"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={(e) => {
                  let tmp = { ...data };
                  tmp.cost_export = e;
                  setData(tmp);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Các hóa đơn trong ngày"
        visible={showPickOrder}
        onCancel={() => setShowPickOrder(false)}
        onOk={onAddOrder}
        width={1000}
      >
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={shipmentsColumns}
          scroll={{ x: 'max-content' }}
          dataSource={listsSearchByDate}
        />
      </Modal>
    </>
  );
}
