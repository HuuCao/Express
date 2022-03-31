import React, { useState, useEffect, useContext } from 'react';

import debitNoteColumns from './debitNoteColumns';
import { ACTION } from 'consts';
import formatNumber from 'utils/formatNumber';
import Context from 'utils/Context';
import moment from 'moment';

//components antd
import {
  Typography,
  Col,
  Row,
  DatePicker,
  Select,
  Table,
  Button,
  Modal,
  Input,
  Form,
  Drawer,
  notification,
  InputNumber,
} from 'antd';

//components
import { translate } from 'utils/i18n';
import { getUsers, getUsersByRole } from 'apis/users';
import { getTimeRange, removeNull } from 'utils';
import { getAllDebit, updateDebit } from 'apis/debit';
import { getShipping } from 'apis/shipping';
import { EditOutlined } from '@ant-design/icons';

import shipmentsColumns from 'views/Order/shipmentsColumns';
const { Option } = Select;
const { RangePicker } = DatePicker;
export default () => {
  const [customerList, setCustomerList] = useState([]);
  const [debitList, setDebitList] = useState([]);
  const [filter, setFilter] = useState({});
  const [totalRecord, setTotalRecord] = useState(0);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [debitDetail, setDebitDetail] = useState({});
  const [partnerList, setPartnerList] = useState([]);
  const [pagination, setPagnation] = useState({ page: 1, pageSize: 10 });
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedRowKeys, setSelectedRowKey] = useState([]);
  const [showRecieveUpdate, setShowRecieveUpdate] = useState(false);
  const [priceLimit, setPriceLimit] = useState(0);
  const [formUpdate] = Form.useForm();
  const getCustomer = async (params) => {
    try {
      const res = await getUsers({ role_id: 7 });
      if (res.data.success) {
        setCustomerList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleOpenSelect = () => setIsOpenSelect(!isOpenSelect);
  const changeRange = (date, dateString) => {
    setFilter({
      ...filter,
      startDate: dateString[0],
      endDate: dateString[1],
    });
  };
  const changeTimeOption = (value) => {
    let tmp = getTimeRange(value);
    setFilter({
      ...filter,
      startDate: tmp.from_date,
      endDate: tmp.to_date,
    });
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

  const tableColumnRender = {
    0: {
      align: 'center',
      render: (text, record, index) => (
        <span style={{ fontSize: '10pt' }}>{index + 1}</span>
      ),
    },
    1: {
      align: 'center',
      render(data) {
        return data && moment(data).format('DD/MM/YYYY');
      },
    },
    2: {
      align: 'center',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{data}</span>;
      },
    },
    3: {
      align: 'center',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{data}</span>;
      },
    },
    4: {
      align: 'center',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{data}</span>;
      },
    },
    5: {
      align: 'center',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{data && data.customer_code}</span>
        );
      },
    },
    6: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    7: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    8: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    9: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    10: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} kg</span>
        );
      },
    },
    11: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>
            {formatNumber(data)} m<sup>3</sup>
          </span>
        );
      },
    },
    12: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    13: {
      align: 'right',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{formatNumber(0)} VND</span>;
      },
    },
    14: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    15: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    16: {
      align: 'center',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>
            {data === 'StackCar'
              ? 'Xếp xe'
              : data === 'Delivery'
              ? 'Đã nhận'
              : 'Đã về kho'}
          </span>
        );
      },
    },
  };

  const getDebit = async (params) => {
    try {
      const res = await getAllDebit(params);
      if (res.data.success) {
        setDebitList(res.data.data);
        setTotalRecord(res.data.count);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setDetailDebit = (record) => {
    const customer = customerList.find((e) => e.id == record.id_customer);
    const partner = partnerList.find((e) => e.id === record.id_shipping);
    setDebitDetail({
      ...record,
      customer,
      partner,
    });
  };
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKey(selectedRowKeys);
  };

  const onUpdateDebit = async (value) => {
    try {
      let tmp = { ...value };
      delete tmp.id;
      delete tmp.cost_remain;
      const res = await updateDebit(value.id, tmp);
      if (res.data.success) {
        notification.success({ message: 'Cập nhật thành công' });
        getDebit();
        setShowModalUpdate(false);
      } else {
        notification.error({ message: 'Cập nhật thất bại' });
      }
    } catch (err) {
      console.log(err);
      notification.error({ message: 'Cập nhật thất bại!' });
    }
  };

  const columns = [
    {
      title: 'STT',
      render(data, record, index) {
        return (pagination.page - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: 'Xem phiếu',
      render(data) {
        return (
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              setDetailDebit(data);
              setShowDetail(true);
            }}
          >
            Xem phiếu
          </span>
        );
      },
    },
    {
      title: 'Ngày',
      dataIndex: 'created_at',
      render(data) {
        return data && moment(data).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'id_customer',
    },
    {
      title: 'Tổng công nợ',
      dataIndex: 'sum_cost',
      // align: 'right',
      render(data) {
        return formatNumber(data) + ' VND';
      },
    },

    {
      title: 'Cần thu',
      dataIndex: 'cost_remain',
      render(data) {
        return formatNumber(data) + ' VND';
      },
    },
    {
      title: 'Đã thu',
      dataIndex: 'cost_received',
      render(data) {
        return formatNumber(data) + ' VND';
      },
    },
    {
      title: 'Chi chú',
      dataIndex: 'description',
      render(data, record) {
        return data && data === 'Phí Xuất Kho' ? (
          <span style={{ color: 'green' }}>{data}</span>
        ) : (
          <span style={{ color: 'red' }}>{data}</span>
        );
      },
    },
    {
      title: 'Cập nhật',
      render(data) {
        return (
          <EditOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setPriceLimit(data.sum_cost);
              formUpdate.setFieldsValue({
                ...data,
                cost_remain: data.cost_remain || 0,
                cost_received: data.cost_received || 0,
              });
              setShowModalUpdate(true);
            }}
          />
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const changePagination = (page, pageSize) => setPagnation({ page, pageSize });

  useEffect(() => {
    getCustomer();
    getPartnerList();
  }, []);
  useEffect(() => {
    getDebit(removeNull({ ...filter, ...pagination }));
  }, [filter]);
  return (
    <>
      <Row justify="space-between">
        <Col>
          <Typography.Title level={4}>
            {translate('Debit Note')}
          </Typography.Title>
          <br />
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8}>
          <h5 style={{ margin: 0 }}>{translate('Filter option')}</h5>
          <Select
            open={isOpenSelect}
            onBlur={() => {
              if (isOpenSelect) toggleOpenSelect();
            }}
            onClick={() => {
              if (!isOpenSelect) toggleOpenSelect();
            }}
            style={{ width: '100%' }}
            placeholder="Chọn thời gian"
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
            <Option value="this_week">{translate('This week')} </Option>
            <Option value="last_week">{translate('Last week')} </Option>
            <Option value="last_month">{translate('Last month')} </Option>
            <Option value="this_month">{translate('This month')} </Option>
            <Option value="this_year">{translate('This year')}</Option>
            <Option value="last_year">{translate('Last year')}</Option>
          </Select>
        </Col>
        <Col span={8}>
          <h5 style={{ margin: 0 }}>Tìm khách hàng</h5>
          <Select
            placeholder="Chọn khách hàng"
            style={{ width: '100%' }}
            allowClear
            onChange={(e) => setFilter({ ...filter, customer: e })}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            optionFilterProp="children"
          >
            {customerList.map((e) => (
              <Select.Option value={e.id}>{e.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <h5 style={{ margin: 0 }}>Lọc theo loại phí</h5>
          <Select
            placeholder="Chọn loại phí"
            style={{ width: '100%' }}
            allowClear
            onChange={(e) => setFilter({ ...filter, type: e })}
          >
            <Select.Option value="import">Phí nhập kho</Select.Option>
            <Select.Option value="export">Phí xuất kho</Select.Option>
          </Select>
        </Col>
      </Row>

      <br />
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          overflow: 'scroll',
          display: 'block',
          backgroundColor: '#fff',
        }}
      >
        <Row style={{ padding: 5 }}>
          {selectedRowKeys.length > 0 && (
            <Button type="primary" onClick={() => setShowRecieveUpdate(true)}>
              Cập Nhật Đã Thu
            </Button>
          )}
        </Row>
        <Table
          size="small"
          rowSelection={rowSelection}
          columns={columns.map((e) => {
            if (e.dataIndex == 'id_customer') {
              return {
                ...e,
                render(data) {
                  const customer = customerList.find((e) => e.id == data);
                  return customer ? customer.customer_code : ``;
                },
              };
            }
            return e;
          })}
          dataSource={debitList}
          rowKey="id"
          rowClassName={(data) => (data.is_received ? 'debit-recieved' : '')}
          // scroll={{ x: '100%' }}
          pagination={{ onChange: changePagination, total: totalRecord }}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ width: '100%', maxWidth: '100%' }}>
                <Table
                  columns={shipmentsColumns.map((e) => {
                    if (tableColumnRender[e.key]) {
                      return { ...e, ...tableColumnRender[e.key] };
                    }
                    return e;
                  })}
                  size="small"
                  scroll={{ x: 'max-content' }}
                  dataSource={record.card_io && record.card_io.orders}
                />
              </div>
            ),
            rowExpandable: (record) => true,
          }}
          summary={(pageData) => (
            <Table.Summary.Row>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell>
                {formatNumber(
                  pageData.reduce((a, b) => a + (b.sum_cost || 0), 0)
                )}{' '}
                VND
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {formatNumber(
                  pageData.reduce((a, b) => a + b.cost_remain || 0, 0)
                )}{' '}
                VND
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {formatNumber(
                  pageData.reduce((a, b) => a + b.cost_received || 0, 0)
                )}{' '}
                VND
              </Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>

      <Modal
        title="Chi tiết công nợ"
        visible={showDetail}
        onCancel={() => setShowDetail(false)}
        onOk={() => setShowDetail(false)}
      >
        <Row gutter={[20, 10]}>
          <Col span={12}>
            Tên Khách hàng: {debitDetail.customer && debitDetail.customer.name}
          </Col>
          <Col span={12}>Ghi chú:{debitDetail.description}</Col>
          <Col span={12}>
            Ngày tạo:{' '}
            {moment(debitDetail.created_at).format('DD/MM/YYYY hh:mm:ss')}
          </Col>
          <Col span={12}>
            Tổng công nợ: {formatNumber(debitDetail.sum_cost)}
            VND
          </Col>
          <Col span={12}>
            Tổng cần thu: {formatNumber(debitDetail.cost_remain)}
            VND
          </Col>
          <Col span={12}>
            Tổng đã thu: {formatNumber(debitDetail.cost_received)} VND
          </Col>
          <Col span={12}>
            Vận chuyển: {debitDetail.partner && debitDetail.partner.name}
          </Col>
          <Col span={12}>
            trạng thái: {debitDetail.is_received ? 'Đã thu' : 'Chưa thu'}
          </Col>
        </Row>
      </Modal>

      <Modal
        // title="Cập nhật công nợ"
        closable=""
        visible={showRecieveUpdate}
        onCancel={() => setShowRecieveUpdate(false)}
        onOk={() => setShowRecieveUpdate(false)}
      >
        <h3>Cập nhật đã thu {selectedRowKeys.length} công nợ. !!</h3>
      </Modal>

      <Drawer
        visible={showModalUpdate}
        width="30%"
        onClose={() => setShowModalUpdate(false)}
      >
        <Form layout="vertical" form={formUpdate} onFinish={onUpdateDebit}>
          <Form.Item name="cost_remain" label="Cần thu">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
              disabled
            />
          </Form.Item>
          <Form.Item name="cost_received" label="Đã thu">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
              max={priceLimit}
            />
          </Form.Item>
          <Form.Item name="description" label="ghi chú">
            <Input.TextArea />
          </Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              {translate('Update')}
            </Button>
          </Row>
          <Form.Item name="id">
            <Input hidden />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
