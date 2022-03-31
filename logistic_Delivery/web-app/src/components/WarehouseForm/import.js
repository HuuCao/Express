import React, { useEffect, useState } from 'react';
import locale from 'antd/es/date-picker/locale/vi_VN';
import {
  Row,
  Col,
  Divider,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Modal,
  Table,
  notification,
} from 'antd';
import { getShipping } from 'apis/shipping';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { orderScan, getOrderByDate, getOrder } from 'apis/order';
import shipmentColumns from 'views/Order/shipmentsColumns';
import moment from 'moment';
export default function WarehouseImportForm({ data, setData }) {
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
      if (res.data.data && res.data.data.order_status !== 'StackCar') {
        notification.warning({ message: 'Đơn hàng đã được nhập kho' });
        return;
      }
      if (res.status == 200) {
        // setBillCodeSearch('');
        setData((e) => {
          return { ...e, data: [...e.data, res.data.data] };
        });
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
    let tmp = [...data.data];
    tmp.splice(
      data.data
        .map((e) => {
          return e.id;
        })
        .indexOf(id),
      1
    );
    setData((e) => {
      return { ...e, data: tmp };
    });
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
            placeholder="Chọn Ngày nhập kho"
            locale={locale}
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
      {data.data &&
        data.data.map((e, index) => (
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
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: '100%' }}
                        max={e.total_quantity_package}
                        onChange={(e) => {
                          let tmp = [...data.data];
                          tmp[index].num = e;
                          setData({ ...data, data: tmp });
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
          <Row span={24} style={{ marginBottom: 7 }}>
            <Input
              placeholder="Ghi chú"
              onChange={(e) => {
                let tmp = { ...data };
                tmp.note = e.target.value;
                setData(tmp);
              }}
            />
          </Row>
          <Row span={24} style={{ marginBottom: 7 }}>
            <Input
              placeholder="Biên lai ghi nhận thực tế(link liên kết hình ảnh google drive)"
              onChange={(e) => {
                let tmp = { ...data };
                tmp.link_image = e.target.value;
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
                onChange={(e) => {
                  let tmp = { ...data };
                  tmp.cost_import = e;
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
          columns={shipmentColumns}
          scroll={{ x: 'max-content' }}
          dataSource={listsSearchByDate}
        />
      </Modal>
    </>
  );
}
