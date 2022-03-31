import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
//component antd
import {
  Table,
  Space,
  Row,
  Typography,
  Button,
  Modal,
  Checkbox,
  Col,
  Input,
  Select,
  DatePicker,
  Upload,
  notification,
} from 'antd';
import {
  DownloadOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
  EditOutlined,
} from '@ant-design/icons';

//api
import { getShipping } from 'apis/shipping';
import { createOrder, getOrder, getOrderByDate, deleteOrder } from 'apis/order';

import XLSX from 'xlsx';
//utils
import useGetData from 'utils/hooks/useGetData';
import Context from 'utils/Context';
import { PERMISSIONS } from '../../consts/permissions';
import { translate } from '../../utils/i18n';
import { ACTION, ROUTES } from 'consts';
import { getTimeRange, formatNumber } from 'utils';

//component
import ModalCreateShipment from './ModalCreateShipment';
import Permission from '../../components/Permission';

import shipmentsColumns from './shipmentsColumns';
import ReactDragListView from 'react-drag-listview';
import SettingColumns from 'components/setting-column';
import exportToCSV from 'components/ExcelModal/exportData';
import ImportModal from 'components/ExcelModal/Modal';
import { orderConvertFields } from 'components/ExcelModal/fieldConvert';
//lodash
import _ from 'lodash';
import moment from 'moment';

import styles from './shipments.module.scss';
const { Option } = Select;
const { RangePicker } = DatePicker;
function removeNull(a) {
  return Object.keys(a)
    .filter((key) => a[key] !== '' && a[key] !== undefined)
    .reduce((res, key) => ((res[key] = a[key]), res), {});
}
export default () => {
  const context = useContext(Context);
  const abordController = new AbortController();
  const [shipments, reloadShipments, abordShipments] = useGetData(getOrder, {
    signal: abordController.signal,
  });
  const [dataShipment, setDataShipment] = useState([]);
  const [shipmentDefault, setShipmentDefault] = useState(null);
  const [filterDay, setFilterDay] = useState({ startDate: '', endDate: '' }); //filter
  const [showImport, setShowImport] = useState(false);
  const [defaultShowColumns, setDefaultShowColumns] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);
  const [importData, setImportData] = useState([]);
  const [importLoading, setImportLoading] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [displayColumns, setDisplayColumns] = useState([]);
  const [showSettingColumns, setShowSettingColumns] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [columns, setColumns] = useState(
    localStorage.getItem('orderColumns')
      ? JSON.parse(localStorage.getItem('orderColumns'))
      : [...shipmentsColumns]
  );
  const history = useHistory();
  const [filter, setFilter] = useState({});
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [importParner, setImportPartner] = useState(undefined);
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
  const _effectShipments = () => {
    reloadShipments();
    return abordShipments;
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
        return data && moment(data).format('DD/MM/YYYY hh:mm:ss');
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
      render(data, record) {
        return (
          <span style={{ fontSize: '10pt' }}>
            {record.customer_code || (data && data.customer_code)}
          </span>
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
    17: {
      align: 'center',
      render(data) {
        return data && moment(data).format('DD/MM/YYYY');
      },
    },
    18: {
      align: 'center',
      render(data) {
        return data;
      },
    },
  };

  const getAllOrder = async (params) => {
    try {
      const res = await getOrder(params);
      console.log(res);
      if (res.status === 200) setDataShipment(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const settings = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 1,
    onChange(info) {
      if (info.file.status === 'uploading') {
        setImportLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
          const bstr = e.target.result;
          const workBook = XLSX.read(bstr, {
            type: 'binary',
            cellDates: true,
          });
          const workSheetname = workBook.SheetNames[0];
          const workSheet = workBook.Sheets[workSheetname];

          const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 0 });
          let success = true;
          const fileDataConverted = fileData.map((e) => {
            const newData = orderConvertFields(e);
            const newDateSign = moment(newData.date_sign)
              .add(40, 'seconds')
              .format('YYYY-MM-DD[T]hh:mm:ss+07:00');
            return {
              ...newData,
              date_sign: newDateSign,
              shipping_partner_id: importParner,
            };
            //   const tmp = orderConvertFields(e);
            //   if (
            //     partnerList.find(
            //       (partner) =>
            //         partner.shipping_partner_code == tmp.shipping_partner_id
            //     )
            //   ) {
            //     const partnerid = partnerList.find(
            //       (partner) =>
            //         partner.shipping_partner_code == tmp.shipping_partner_id
            //     )['id'];
            //     return { ...tmp, shipping_partner_id: partnerid };
            //   } else {
            //     notification.error({
            //       message: 'Không tìm thấy đối tác ' + tmp.shipping_partner_id,
            //     });
            // success = false;
            // }
          });
          console.log(fileData, fileDataConverted);
          if (success) setImportData(fileDataConverted);

          setImportLoading(false);
        };

        reader.readAsBinaryString(info.file.originFileObj);
      }
    },
  };

  const onImport = async (data) => {
    const res = await Promise.all(
      data.map((e) => {
        return createOrder({
          ...e,
          order_status: 'StackCar',
          status_check: 'Checking',
        });
      })
    );
    if (res.reduce((a, b) => a && b.data.success, true)) {
      reloadShipments();
      setShowImport(false);
      setImportData([]);
    } else {
      const errorList = res.filter((e) => !e.data.success);
      console.log(errorList);
      notification.error({
        message: 'Fail',
        description: errorList[0] && errorList[0].data.mess,
      });
    }
  };
  const deleteOrders = async () => {
    try {
      const res = await Promise.all(
        selectedRowKeys.map((e) => {
          return deleteOrder(e);
        })
      );
      if (res.reduce((a, b) => a && b.data.success, true)) {
        notification.success({ message: 'Xóa hóa đơn thành công' });
        setSelectedRowKeys([]);
        getAllOrder();
      } else {
        const errorList = res.filter((e) => e.data.success);
        notification.error({ message: 'Xóa hóa đơn thất bại' });
      }
    } catch (err) {
      console.log(err);
      notification.error({ message: 'Thất bại' });
    }
  };
  const ImportButton = () => (
    <Upload {...settings}>
      <Button>Import</Button>
    </Upload>
  );
  const getPartner = async () => {
    try {
      const res = await getShipping();
      if (res.data.success) {
        setPartnerList(res.data.data);
        setImportPartner(
          (res.data.data[0] && res.data.data[0].id) || undefined
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectChange = (selected) => {
    setSelectedRowKeys(selected);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const tmpColumns = [...columns];
      const item = tmpColumns.splice(fromIndex - 1, 1)[0];
      console.log('from', fromIndex, 'to', toIndex);
      tmpColumns.splice(toIndex - 1, 0, item);
      localStorage.setItem('orderColumns', JSON.stringify(tmpColumns));
      setColumns(tmpColumns);
    },
    nodeSelector: 'th',
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const passStateUpdate = () => {
    let data = dataShipment.filter((e) => selectedRowKeys.includes(e.id));

    history.push({ pathname: ROUTES.ORDERS_UPDATE, state: data });
  };

  useEffect(() => {
    if (!localStorage.getItem('orderColumns')) {
      localStorage.setItem('orderColumns', JSON.stringify(columns));
    }

    getPartner();
  }, []);

  useEffect(_effectShipments, []);
  useEffect(() => {
    // context.dispatch({ name: ACTION.LOADING, data: shipments.loading });

    delete shipments.loading;

    //parse object to array
    const dataShipments = Object.keys(shipments).map((e) => shipments[e]);

    //sort date
    const newDataShipments = _.sortBy(dataShipments, (shipment) => {
      return new Date(shipment.created_at);
    });

    setDataShipment(newDataShipments[1]);
    console.log(newDataShipments);
  }, [shipments]);

  useEffect(() => {
    getAllOrder(removeNull(filter));
  }, [filter]);
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>{translate('Shipments')}</Typography.Title>
      </Row>

      <Row gutter={30}>
        <Col span={6}>
          <Row>{translate('Search by customer')}</Row>
          <Row>
            <Input
              prefix={<SearchOutlined style={{ color: '#bdc3c7' }} />}
              // size="large"
              placeholder={translate('Search by customer code')}
              onChange={(e) => getAllOrder({ search: e.target.value })}
            />
          </Row>
        </Col>
        <Col span={6}>
          <Row>{translate('Filter by time')}</Row>
          <Row>
            <Select
              open={isOpenSelect}
              onBlur={() => {
                if (isOpenSelect) toggleOpenSelect();
              }}
              onClick={() => {
                if (!isOpenSelect) toggleOpenSelect();
              }}
              style={{ width: 380 }}
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
              <Option value="to_day">{translate('Today')}</Option>
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
        <Col span={6}>
          <Row>{translate('Filter by status')}</Row>
          <Row>
            <Select
              defaultValue=""
              style={{ width: '100%' }}
              onChange={(e) => getAllOrder(e && { order_status: e })}
            >
              <Select.Option value="">Tất cả</Select.Option>
              <Select.Option value="StackCar">Xếp xe</Select.Option>
              <Select.Option value="CameBack">Đã về kho</Select.Option>
              <Select.Option value="Delivery">Đã nhận</Select.Option>
            </Select>
          </Row>
        </Col>
      </Row>
      <div style={{ background: 'white' }} className={styles['orders']}>
        <Row
          style={{ margin: '10px 0', padding: '5px' }}
          justify="space-between"
          gutter={20}
        >
          <Col>
            <Row gutter={20}>
              <Col>
                <Permission permissions={[PERMISSIONS.CREATE_EDIT_SHIPMENT]}>
                  <ModalCreateShipment shipmentDefault={shipmentDefault} />
                </Permission>
              </Col>
              <Col>
                <Button
                  icon={<UploadOutlined />}
                  type="primary"
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#C12222D4',
                    border: 'none',
                  }}
                  onClick={() => setShowImport(true)}
                >
                  Tải lên hàng loạt
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  style={{ backgroundColor: '#DB710FD4', border: 'none' }}
                  onClick={() =>
                    exportToCSV(dataShipment, orderConvertFields, 'order_data')
                  }
                >
                  Tải về hóa đơn
                </Button>
              </Col>
              <Col>
                {selectedRowKeys.length > 0 && (
                  <>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={passStateUpdate}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginLeft: 20 }}
                      icon={<DeleteOutlined />}
                      onClick={deleteOrders}
                      danger
                    >
                      Xóa
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Col>

          <Col>
            <SettingColumns
              width={700}
              columnsRender={shipmentsColumns}
              columns={columns}
              setColumns={setColumns}
              nameColumn="orderColumns"
              buttonProps={{
                style: {
                  backgroundColor: '#5ecba1',
                  border: 'none',
                  borderRadius: 5,
                },
              }}
            />
          </Col>
        </Row>
        <ReactDragListView.DragColumn {...dragProps} ignoreSelector>
          <Table
            rowKey="id"
            size="small"
            rowSelection={rowSelection}
            pagination={{ pageSize: 30, pageSizeOptions: [30, 50, 100] }}
            columns={columns.map((e) => {
              if (tableColumnRender[e.key])
                return { ...e, ...tableColumnRender[e.key] };
              return e;
            })}
            dataSource={dataShipment}
            scroll={{ x: 'max-content' }}
          />
        </ReactDragListView.DragColumn>

        <Modal
          title={
            <a href="./template/file import đơn hàng.xlsx">template.xlsx</a>
          }
          visible={showImport}
          onCancel={() => setShowImport(false)}
          onOk={() => onImport(importData)}
          width={1000}
          centered
          footer={[
            <Select
              style={{ width: 200, marginRight: 8 }}
              value={importParner}
              onChange={(e) => setImportPartner(e)}
            >
              {partnerList.map((e) => (
                <Option value={e.id}>{e.name}</Option>
              ))}
            </Select>,
            <Button key="back" onClick={() => setShowImport(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => onImport(importData)}
            >
              Ok
            </Button>,
          ]}
        >
          <Row style={{ marginBottom: 15 }}>
            <ImportButton />
          </Row>

          <Table
            columns={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14].map((e) => {
              return { ...shipmentsColumns[e], ...tableColumnRender[e] };
            })}
            size="small"
            loading={importLoading}
            dataSource={importData}
            scroll={{ x: 'max-content' }}
          />
        </Modal>
      </div>
    </Space>
  );
};
