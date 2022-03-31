import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Input,
  Select,
  Button,
  Modal,
  Checkbox,
  DatePicker,
} from 'antd';
import {
  ArrowLeftOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import { ROUTES } from 'consts';
import { getOrder } from 'apis/order';
import shipmentsColumns from '../Order/shipmentsColumns';
import { getTimeRange } from 'utils';
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function OrderList() {
  const history = useHistory();
  const [listData, setListData] = useState([]);
  const [defaultShowColumns, setDefaultShowColumns] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);
  const [displayColumns, setDisplayColumns] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showSettingColumns, setShowSettingColumns] = useState(false);
  const [filter, setFilter] = useState({});
  const [isOpenSelect, setIsOpenSelect] = useState(false);
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
  const onSelectChange = (selected) => {
    setSelectedRowKeys(selected);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleChangeColumns = () => {
    let tmp = [];
    defaultShowColumns
      .sort((a, b) => a - b)
      .forEach((e) => {
        tmp.push(shipmentsColumns[e]);
      });
    setDisplayColumns(tmp);
    setShowSettingColumns(false);
  };
  const getListOrder = async (params) => {
    try {
      const res = await getOrder(params);
      if (res.data.success) {
        setListData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleChangeColumns();
  }, []);
  useEffect(() => {
    getListOrder({
      order_status:
        history.location.state && history.location.state.type === 'import'
          ? 'StackCar'
          : 'CameBack',
    });
  }, []);
  return (
    <>
      <Row
        align="middle"
        style={{
          fontSize: 18,
          padding: '0.75em 0',
          fontWeight: 600,
          borderBottom: '1px solid',
        }}
      >
        <Col>
          <Link to={ROUTES.WAREHOUSES}>
            <ArrowLeftOutlined style={{ marginRight: 8, color: '#000' }} />
          </Link>
        </Col>
        <Col>
          Danh sách đơn hàng{' '}
          {history.location.state && history.location.state.type === 'export'
            ? 'xuất'
            : 'Nhập'}{' '}
          kho
        </Col>
      </Row>
      <Row style={{ margin: '1em 0' }} gutter={30}>
        <Col span={16}>
          <Input
            size="large"
            prefix={<SearchOutlined style={{ color: '#bdc3c7' }} />}
            placeholder="Tìm kiếm khách hàng"
          />
        </Col>
        <Col span={8}>
          <Select
            open={isOpenSelect}
            onBlur={() => {
              if (isOpenSelect) toggleOpenSelect();
            }}
            onClick={() => {
              if (!isOpenSelect) toggleOpenSelect();
            }}
            style={{ width: '100%' }}
            placeholder="Choose time"
            allowClear
            size="large"
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
            <Option value="to_day">Today</Option>
            <Option value="yesterday">Yesterday</Option>
            <Option value="this_week">This week</Option>
            <Option value="last_week">Last week</Option>
            <Option value="last_month">Last month</Option>
            <Option value="this_month">This month</Option>
            <Option value="this_year">This year</Option>
            <Option value="last_year">Last year</Option>
          </Select>
        </Col>
      </Row>
      <Row justify="end" style={{ margin: '1em 0' }}>
        <Col>
          <Button
            icon={<SettingOutlined />}
            type="primary"
            onClick={() => setShowSettingColumns(true)}
          >
            Cài đặt cột
          </Button>
        </Col>
      </Row>
      <Table
        columns={displayColumns}
        rowSelection={rowSelection}
        dataSource={listData}
        scroll={{ x: 'max-content' }}
        size="small"
        rowKey="id"
      />
      <Row style={{ margin: '1em 0' }} justify="end">
        <Button
          type="primary"
          size="large"
          disabled={!selectedRowKeys.length}
          onClick={() => {
            history.push({
              pathname:
                history.location.state &&
                history.location.state.type == 'export'
                  ? ROUTES.CREATE_WAREHOUSE_EXPORT
                  : ROUTES.CREATE_WAREHOUSE_IMPORT,
              state: {
                billData: selectedRowKeys.map((e) => {
                  return listData.find((d) => d.id == e);
                }),
              },
            });
          }}
        >
          Tiếp theo
        </Button>
      </Row>
      <Modal
        visible={showSettingColumns}
        onCancel={() => setShowSettingColumns(false)}
        centered
        title="Cài đặt cột"
        onOk={handleChangeColumns}
      >
        <Checkbox.Group
          value={defaultShowColumns}
          onChange={(e) => setDefaultShowColumns(e)}
        >
          <Row>
            {shipmentsColumns.map((e, index) => (
              <Col span={12}>
                <Checkbox value={index}>{e.title}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Modal>
    </>
  );
}
