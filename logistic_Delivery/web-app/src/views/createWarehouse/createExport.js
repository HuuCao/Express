import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Button, notification, Form } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from 'consts';
import WarehouseExportForm from 'components/WarehouseForm/export';
import { createCardOut } from 'apis/card';

export default function CreateWarehouseExport() {
  const history = useHistory();
  const [exportData, setExportData] = useState({
    type: 'export',
    data: [],
  });
  const onCreateCardOut = async (is_activate) => {
    if (!exportData.id_customer) {
      notification.warning({ message: 'Vui lòng thêm khách hàng' });
      return;
    }
    if (!exportData.data.length) {
      notification.warning({ message: 'Vui lòng thêm đơn hàng' });
      return;
    }
    if (!exportData.id_shipping) {
      notification.warning({ message: 'Vui lòng thêm đơn vị vận chuyển' });
      return;
    }
    if (!exportData.cod) {
      notification.warning({ message: 'Vui lòng thêm đơn hàng' });
      return;
    }
    if (!exportData.cost_export) {
      notification.warning({ message: 'Vui lòng nhập cước nhập kho' });
      return;
    }
    const body = {
      ...exportData,
      type: 'export',
      is_activate,
      data: exportData.data.map((e) => {
        return {
          id: e.id,
          num: e.amount_package_imported,
        };
      }),
    };
    try {
      const res = await createCardOut(body);
      if (res.status === 200 && res.data.success) {
        notification.success({ message: 'Thành công' });
        history.push(ROUTES.WAREHOUSES);
      } else {
        notification.error({
          message: 'Thất bại',
          description: res.data ? res.data.mess : '',
        });
      }
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Thất bại',
        description: err.data ? err.data.mess : '',
      });
    }
  };
  return (
    <div
      style={{
        padding: '1em',
        backgroundColor: '#fff',
      }}
    >
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
        <Col>Tạo phiếu xuất kho</Col>
      </Row>
      <WarehouseExportForm data={exportData} setData={setExportData} />
      <Row style={{ margin: '1rem 0' }} justify="end" gutter={20}>
        <Col>
          <Button
            type="primary"
            style={{ width: 120, borderRadius: 5 }}
            size="large"
            onClick={() => onCreateCardOut(false)}
          >
            Lưu nháp
          </Button>
        </Col>
        <Button
          type="primary"
          size="large"
          style={{ width: 120, borderRadius: 5 }}
          onClick={() => onCreateCardOut(true)}
        >
          Tạo
        </Button>
      </Row>
    </div>
  );
}
