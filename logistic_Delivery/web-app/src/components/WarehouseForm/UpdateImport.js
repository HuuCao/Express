import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Divider,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  notification,
  Table,
  Modal,
} from 'antd';
import { getShipping } from 'apis/shipping';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { orderScan, getOrderByDate } from 'apis/order';
import shipmentsColumns from 'views/Order/shipmentsColumns';
import moment from 'moment';
export default function WarehouseUpdateImportForm({
  formkey,
  data,
  allData,
  setData,
}) {
  const [partnerList, setPartnerList] = useState([]);
  const [billCodeSearch, setBillCodeSearch] = useState('');
  const [listsSearchByDate, setListSearchByDate] = useState([]);
  const [showPickOrder, setShowPickOrder] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

  const searchBill = async () => {
    try {
      const res = await orderScan({ code: billCodeSearch });
      if (res.status == 404) {
        notification.warning({ message: 'Không tìm thấy đơn hàng' });
        return;
      }

      if (res.status == 500) {
        notification.error({ message: 'Hệ thống đang xẩy ra sự cố!' });
        return;
      }

      if (res.status == 200) {
        let tmp = [...allData];
        tmp[formkey] = {
          ...tmp[formkey],
          orders: [...tmp[formkey].orders, res.data.data],
        };
        setData(tmp);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const searchBillByDate = async (params) => {
    try {
      const res = await getOrderByDate(params);
      if (res.data.success) {
        setListSearchByDate(
          res.data.data.filter((e) => e.order_status == 'StackCar')
        );
        setShowPickOrder(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeBill = (id) => {
    let tmp = [...data.orders];
    tmp.splice(
      data.orders
        .map((e) => {
          return e.id;
        })
        .indexOf(id),
      1
    );
    let tmp2 = [...allData];
    tmp2[formkey] = tmp;
    setData(tmp2);
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

  useEffect(() => {
    getPartnerList();
  }, []);
  return (
    <>
      <Row style={{ margin: '7px 0' }}>
        <Col span={8}>
          <DatePicker
            size="large"
            defaultValue={moment(data.created_at)}
            style={{ width: '100%', borderRadius: 8 }}
            placeholder="Chọn ngày nhập kho"
            onChange={(date, dateString) => {
              let tmp = { ...data };
              tmp.created_at = dateString;
              setData(tmp);
            }}
          />
        </Col>
      </Row>
      <Row style={{ margin: '7px 0' }}>
        <Col span={8}>
          <Input
            placeholder="Nhập mã Bill"
            size="large"
            style={{ borderRadius: 8 }}
            onChange={(e) => setBillCodeSearch(e.target.value)}
          />
        </Col>
        <Col span={2}>
          <Button
            type="ghost"
            size="large"
            style={{ border: 'none', fontSize: 18 }}
            onClick={searchBill}
          >
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
      {data.orders &&
        data.orders.map((e, index) => (
          <Row style={{ margin: '7px 0' }}>
            <Col span={16}>
              <Row
                style={{
                  width: '100%',
                  border: 'solid 1px',
                  borderRadius: 15,
                  padding: 5,
                }}
                align="middle"
                justify="space-between"
              >
                <Col span={14}>{e.code_bill}</Col>
                <Col span={10}>
                  <Row align="middle">
                    <Col span={12}>
                      <InputNumber
                        placeholder="Số kiện"
                        style={{ width: '100%' }}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={(e) => {
                          let tmp = [...allData];
                          tmp[formkey].orders[index].num = e;
                          setData(tmp);
                        }}
                      />
                    </Col>
                    <Col span={9}>/{e.total_quantity_package}</Col>
                    <Col span={3}>
                      <CloseOutlined onClick={() => removeBill(e.id)} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}

      <Divider style={{ backgroundColor: 'rgb(0 0 5 / 20%)', height: 2 }} />
      <Row justify="space-between">
        <Col span={6}>
          <Select
            placeholder="Vận chuyển"
            style={{ width: '100%' }}
            value={data.id_shipping}
            onChange={(e) => {
              let tmp = [...allData];
              tmp[formkey].id_shipping = e;
              setData(tmp);
            }}
          >
            {partnerList.map((e) => (
              <Select.Option value={e.id}>{e.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={14}>
          <Row span={24} style={{ marginBottom: 7 }}>
            <Input
              placeholder="Ghi chú"
              onChange={(e) => {
                let tmp = [...allData];
                tmp[formkey].note = e.target.value;
                setData(tmp);
              }}
            />
          </Row>
          <Row span={24} style={{ marginBottom: 7 }}>
            <Input
              placeholder="Biên lai ghi nhận thực tế(link liên kết hình ảnh google drive)"
              value={data.link_image}
              onChange={(e) => {
                let tmp = [...allData];
                tmp[formkey].link_image = e.target.value;
                setData(tmp);
              }}
            />
          </Row>
          <Row style={{ marginBottom: 7 }} justify="end">
            <Col span={8}>
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Cước nhập kho"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                value={data.cost}
                value={data.cost_import}
                onChange={(e) => {
                  let tmp = [...allData];
                  tmp[formkey].cost_import = e;
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
