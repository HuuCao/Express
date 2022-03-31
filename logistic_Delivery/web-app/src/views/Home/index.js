import React, { useState, useEffect, useContext } from 'react';

//component antd
import { Row, Space, Table, Col, Button, Tag } from 'antd';

//utils
import { convertDataCompany, convertDataUser, decodeJWT } from '../../utils';
import { translate } from '../../utils/i18n';
import useGetData from '../../utils/hooks/useGetData';
import Context from 'utils/Context';

import moment from 'moment';
import { Link } from 'react-router-dom';

import shipmentsColumns from '../Order/shipmentsColumns';

//consts
import { ROUTES, ACTION } from 'consts';
import { PERMISSIONS } from 'consts/permissions';
import { Must } from 'components/Permission';

//components
import EllipsisText from 'components/EllipsisText';

//apis
import { getUserDetail } from '../../apis/users';
import { getDetailCompany } from '../../apis/companies';
import { getShipments } from 'apis/shipments';

export default () => {
  const context = useContext(Context);
  const [dataCompany, setCompany] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataListPkl, setListPkl] = useState([]);
  const [numberPklCreating, setNumberPklCreating] = useState(0);
  const [numberPklConfirming, setNumberPklConfirming] = useState(0);
  const [numberPklWaiting, setNumberPklWaiting] = useState(0);
  const [numberPklClosed, setNumberPklClosed] = useState(0);

  useEffect(() => {
    async function initData() {
      context.dispatch({ name: ACTION.LOADING, data: true });
      await getShipments({ currentPage: 0, limit: 10, home: true }).then(
        (response) => {
          const listWaiting =
            (response.data.countStateShipment &&
              response.data.countStateShipment.wait_confirm) ||
            [];
          const listCreating =
            (response.data.countStateShipment &&
              response.data.countStateShipment.creating) ||
            [];
          const listConfirming =
            (response.data.countStateShipment &&
              response.data.countStateShipment.confirming) ||
            [];
          const listClosed =
            (response.data.countStateShipment &&
              response.data.countStateShipment.closed) ||
            [];

          const listPkl = context.permissions.includes(PERMISSIONS.CHECK_INV)
            ? [...listWaiting, ...listConfirming, ...listClosed]
            : [
                ...listCreating,
                ...listWaiting,
                ...listConfirming,
                ...listClosed,
              ];
          setListPkl(listPkl);

          setNumberPklConfirming(
            (response.data.countAll.confirming &&
              response.data.countAll.confirming) ||
              0
          );
          setNumberPklWaiting(
            (response.data.countAll.wait_confirm &&
              response.data.countAll.wait_confirm) ||
              0
          );
          setNumberPklClosed(
            (response.data.countAll.closed && response.data.countAll.closed) ||
              0
          );
        }
      );
      if (context.role === 'client') {
        await getDetailCompany({}).then((response) => {
          setCompany(convertDataCompany(response.data));
        });
      }
      await getUserDetail({}).then((response) => {
        setDataUser(convertDataUser(response.data));
      });
      context.dispatch({ name: ACTION.LOADING, data: false });
    }
    initData();
  }, []);

  const columnsCompany = [
    {
      title: 'Information',
      dataIndex: 'information',
      key: 'information',
      width: '50%',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '50%',
    },
  ];
  const columnsPKL = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'INV',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      render: (text, record) => {
        if (!Context.permissions.includes(PERMISSIONS.CHECK_INV)) {
          return <Link to={`/shipments/${record.id}`}>{text}</Link>;
        } else return <Link to={`/invoices/${record.id}`}>{text}</Link>;
      },
    },
    {
      title: 'POL',
      dataIndex: 'shippingFrom',
      key: 'shippingFrom',
    },
    {
      title: 'POD',
      dataIndex: 'shippingTo',
      key: 'shippingTo',
    },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'CS',
      dataIndex: 'csId',
      key: 'csId',
      render: (text, record) => (
        <span>
          {record.cs &&
            `${record.cs.name || record.cs.username}(ID: ${record.cs.id})`}
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'shippingDate',
      key: 'shippingDate',
      render: (text) => <span>{moment(text).format('YYYY/MM/DD hh:mm')}</span>,
    },
  ];

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Row type="flex" justify="space-between" gutter={[16, 32]}>
        {Must({
          permission: PERMISSIONS.CLIENT_VIEW_ONLY,
          children: (
            <>
              <Col span={24} lg={6}>
                <div
                  style={{
                    fontSize: 20,
                    color: 'rgba(0, 0, 0, 0.85)',
                    fontWeight: 800,
                    marginBottom: 5,
                  }}
                >
                  Client Information
                </div>
                <Table
                  size="small"
                  dataSource={dataCompany}
                  columns={columnsCompany}
                  pagination={false}
                  bordered
                  scroll={{ y: 380 }}
                />
              </Col>
            </>
          ),
        })}
        <Col
          span={24}
          lg={
            context.permissions.includes(PERMISSIONS.CLIENT_VIEW_ONLY) ? 18 : 24
          }
        >
          <Must permission={PERMISSIONS.CLIENT_VIEW_ONLY}>
            <div
              style={{
                fontSize: 20,
                color: 'rgba(0, 0, 0, 0.85)',
                fontWeight: 800,
                marginBottom: 5,
              }}
            >
              {translate('PKL List')}{' '}
            </div>
          </Must>
          <Must permission={PERMISSIONS.CS_ADMIN_VIEW_ONLY}>
            <div
              style={{
                fontSize: 20,
                color: 'rgba(0, 0, 0, 0.85)',
                fontWeight: 800,
                marginBottom: 5,
              }}
            >
              {translate('INV List')}{' '}
              <span
                style={{
                  marginLeft: 10,
                  fontWeight: 400,
                  fontSize: 17,
                }}
              >{`${
                !context.permissions.includes(PERMISSIONS.CHECK_INV)
                  ? `Creating: ${numberPklCreating} - `
                  : ''
              }Waiting : ${numberPklWaiting} – Confirming : ${numberPklConfirming} – Closed : ${numberPklClosed}`}</span>
            </div>
          </Must>
          <Table
            size="small"
            dataSource={dataListPkl}
            columns={shipmentsColumns.map((_shipmentColumn) => {
              if (
                _shipmentColumn.key === 'invoiceNo' &&
                decodeJWT(localStorage.getItem('accessToken')) &&
                decodeJWT(localStorage.getItem('accessToken')).role !== 'client'
              ) {
                return {
                  ..._shipmentColumn,
                  render: (text, record) => (
                    <EllipsisText>
                      <Link
                        to={{
                          pathname: ROUTES.DETAIL_INVOICE.replace(
                            ':id',
                            record.id
                          ),
                          state: record,
                        }}
                      >
                        {text}
                      </Link>
                    </EllipsisText>
                  ),
                };
              }
              return _shipmentColumn;
            })}
            pagination={false}
            bordered
            summary={(pageData) => {
              return (
                <>
                  <Table.Summary.Row style={{ textAlign: 'center' }}>
                    <Table.Summary.Cell colSpan={16}>
                      <Link
                        to={
                          context.permissions.includes(PERMISSIONS.CHECK_INV)
                            ? '/invoices'
                            : '/shipments'
                        }
                      >
                        {translate('See more')}
                      </Link>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
            rowClassName={(record) => {
              if (record.cs) {
                return 'locked_row';
              }
            }}
            scroll={{ y: 380 }}
          />
        </Col>
      </Row>
    </Space>
  );
};
