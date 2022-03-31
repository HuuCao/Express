import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Form, Button, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from 'consts';
import WarehouseImportForm from 'components/WarehouseForm/import';
import { createCardIn } from 'apis/card';
export default function CreateWarehouseImport() {
  const [ImportData, setImportData] = useState({
    data: [],
    type: 'import',
  });
  const history = useHistory();
  const onCreateCardIn = async (is_activate) => {
    if (ImportData.data.reduce((a, b) => a && b.num && b.num >= 0, true)) {
      if (!ImportData.cost_import) {
        notification.warning({ message: 'Vui lòng nhập cước nhập kho' });
        return;
      }
      if (!ImportData.id_shipping) {
        notification.warning({ message: 'Vui lòng chọn đơn vị vận chuyển' });
        return;
      }
      if (!ImportData.data.length) {
        notification.warning({ message: 'Vui lòng thêm đơn hàng' });
        return;
      }
      try {
        const body = {
          ...ImportData,
          is_activate,
          data: ImportData.data.map((e) => {
            return { id: e.id, num: e.num };
          }),
        };
        const res = await createCardIn(body);
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
    } else {
      let tmp = ImportData.data.find((e) => e.num === -1);
      notification.warning({
        message: 'Thất bại',
        description: 'Vui lòng nhập đầy đủ số lượng kiện',
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
        <Col>Tạo phiếu nhập kho</Col>
      </Row>
      <WarehouseImportForm data={ImportData} setData={setImportData} />
      <Row justify="end" gutter={20}>
        <Col>
          <Button
            type="primary"
            style={{ width: 120, borderRadius: 5 }}
            size="large"
            onClick={() => onCreateCardIn(false)}
          >
            Lưu nháp
          </Button>
        </Col>
        <Col>
          <Button
            size="large"
            type="primary"
            style={{ width: 120, borderRadius: 5 }}
            onClick={() => onCreateCardIn(true)}
          >
            Nhập kho
          </Button>
        </Col>
      </Row>
    </div>
  );
}
