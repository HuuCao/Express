import React, { useState, useEffect } from 'react';

//component antd
import {
  Table,
  Row,
  Col,
  Typography,
  Input,
  Select,
  Button,
  DatePicker,
  Upload,
  Tabs,
} from 'antd';

//icons antd
import {
  SearchOutlined,
  DownloadOutlined,
  UploadOutlined,
  FormOutlined,
} from '@ant-design/icons';

//apis

import warehouseColumns from './warehouseColumns';
import inventoryColumns from './inventoryColumns';
import exportColumns from './exportColumns';
import { ACTION, ROUTES } from 'consts';
import { translate } from 'utils/i18n';
import { getTimeRange, removeNull } from 'utils';

//components
import ImportModal from 'components/ExcelModal/Modal';
import exportToCSV from 'components/ExcelModal/exportData';
import { getCardByType } from 'apis/card';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;

export default () => {
  const [data, setData] = useState();
  const [viewPage, setViewPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filter, setFilter] = useState({});
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const history = useHistory();
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

  const getCard = async (params) => {
    try {
      setLoading(true);
      const res = await getCardByType({
        type: viewPage === 1 ? 'import' : 'export',
        ...params,
      });
      if (res.data.success && res.status === 200) {
        setData(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onSelectChange = (selected) => {
    setSelectedRowKeys(selected);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const settings = {
    maxCount: 1,
  };
  const ImportComponent = () => (
    <Upload {...settings}>
      <Button type="primary">Import</Button>
    </Upload>
  );
  useEffect(() => {
    getCard(removeNull(filter));
  }, [viewPage, filter]);

  return (
    <>
      <Row justify="space-between">
        <Typography.Title level={4}>{translate('Warehouses')}</Typography.Title>
      </Row>
      <br />
      <Tabs onChange={setViewPage}>
        <Tabs.TabPane tab="Nhập kho" key={1}></Tabs.TabPane>
        <Tabs.TabPane tab="Tồn kho" key={2}></Tabs.TabPane>
        <Tabs.TabPane tab="Xuất kho" key={3}></Tabs.TabPane>
      </Tabs>
      <br />
      <Row gutter={20}>
        {viewPage != 1 && (
          <Col span={6}>
            <Row>Tìm kiếm Khách hàng</Row>
            <Row>
              <Input
                prefix={<SearchOutlined style={{ color: '#bdc3c7' }} />}
                placeholder={translate('Search by customer code')}
                onChange={(e) =>
                  setFilter({ ...filter, customer_name: e.target.value })
                }
              />
            </Row>
          </Col>
        )}
        <Col span={6}>
          <Row>{translate('Filter by date')}</Row>
          <Row>
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
          </Row>
        </Col>
      </Row>
      <br />
      <Row justify="space-between">
        {(viewPage == 1 || viewPage == 3) && (
          <Col>
            <Row gutter={15}>
              <Col>
                <Button
                  icon={<DownloadOutlined />}
                  type="primary"
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#C12222D4',
                    border: 'none',
                    borderRadius: 5,
                  }}
                  onClick={() => setShowImport(true)}
                >
                  Import
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  style={{
                    backgroundColor: '#DB710FD4',
                    border: 'none',
                    borderRadius: 5,
                  }}
                  onClick={() =>
                    exportToCSV(
                      [],
                      false,
                      viewPage == 1
                        ? 'nhap_kho'
                        : viewPage == 2
                        ? 'ton_kho'
                        : 'xuat_kho'
                    )
                  }
                >
                  Export
                </Button>
              </Col>
              {selectedRowKeys.length ? (
                // <Row gutter={15}>
                //   <Col>
                //     <Button>{selectedRowKeys.length} Selected</Button>
                //   </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    style={{ borderRadius: 5 }}
                    onClick={() =>
                      history.push({
                        pathname:
                          viewPage === 1
                            ? ROUTES.UPDATE_WAREHOUSE_IMPORT
                            : ROUTES.UPDATE_WAREHOUSE_EXPORT,
                        state: {
                          billData: selectedRowKeys.map((e) => {
                            return data.find((d) => d.id == e);
                          }),
                        },
                      })
                    }
                  >
                    Chỉnh sửa
                  </Button>
                </Col>
              ) : (
                // </Row>
                ''
              )}
            </Row>
          </Col>
        )}

        <Col>
          <Row justify="end" gutter={20}>
            {viewPage == 1 && (
              <Col>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#5ECBA1',
                    border: 'none',
                    borderRadius: 5,
                  }}
                  onClick={() =>
                    history.push({
                      pathname: ROUTES.CREATE_WAREHOUSE_IMPORT,
                      state: { type: 'import' },
                    })
                  }
                >
                  Tạo phiếu nhập
                </Button>
              </Col>
            )}

            {viewPage == 2 && selectedRowKeys.length > 0 && (
              <Col>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#5ECBA1',
                    border: 'none',
                    borderRadius: 5,
                  }}
                  onClick={() =>
                    history.push({
                      pathname: ROUTES.CREATE_WAREHOUSE_EXPORT,
                      state: { type: 'export' },
                    })
                  }
                >
                  Tạo phiếu xuất
                </Button>
              </Col>
            )}

            {viewPage == 3 && (
              <Col>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#5ECBA1',
                    border: 'none',
                    borderRadius: 5,
                  }}
                  onClick={() =>
                    history.push({
                      pathname: ROUTES.CREATE_WAREHOUSE_EXPORT,
                      state: { type: 'export' },
                    })
                  }
                >
                  Tạo phiếu xuất
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <br />

      <Table
        rowKey="id"
        columns={
          viewPage == 1
            ? warehouseColumns
            : viewPage == 2
            ? inventoryColumns
            : exportColumns
        }
        scroll={{ x: 'max-content' }}
        dataSource={data}
        loading={loading}
        scroll={{ y: 380 }}
        rowSelection={rowSelection}
        size="small"
      />
      <ImportModal
        actionComponent={<ImportComponent />}
        visible={showImport}
        onCancel={() => setShowImport(false)}
        columns={
          viewPage == 1
            ? warehouseColumns
            : viewPage == 2
            ? inventoryColumns
            : exportColumns
        }
        dataSource={[]}
        downTemplate="./template/nhap_kho.xlsx"
      />
    </>
  );
};
