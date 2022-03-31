import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from 'consts';
import WarehouseExportForm from 'components/WarehouseForm/export';
import WarehouseUpdateExportForm from 'components/WarehouseForm/UpdateExport';
import { updateCard } from 'apis/card';
export default function UpdateExportWarehouse() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const onUpdate = async (is_activate) => {
    let pass = true;
    const body = data.map((e) => {
      if (!e.id_customer) {
        notification.warning({ message: 'Vui lòng thêm khách hàng' });
        pass = false;
        return;
      }
      if (!e.data.length) {
        notification.warning({ message: 'Vui lòng thêm đơn hàng' });
        pass = false;
        return;
      }
      if (!e.id_shipping) {
        notification.warning({ message: 'Vui lòng thêm đơn vị vận chuyển' });
        pass = false;
        return;
      }
      if (!e.cod) {
        notification.warning({ message: 'Vui lòng thêm đơn hàng' });
        pass = false;
        return;
      }
      if (!e.cost_export) {
        notification.warning({ message: 'Vui lòng nhập cước nhập kho' });
        pass = false;
        return;
      }
      return {
        id: e.id,
        cost: e.cost,
        is_activate,
        id_customer: e.id_customer,
        id_shipping: e.id_shipping,
        cod: e.cod,
        note: e.note,
        sub_cost: e.sub_cost,
        data: e.orders.map((o) => {
          return {
            id: o.id,
            num: o.amount_package_imported,
          };
        }),
      };
    });

    try {
      if (pass) {
        const res = await Promise.all(
          body.map((e) => {
            let tmp = { ...e };
            let idtmp = e.id;

            delete tmp.id;

            return updateCard(idtmp, tmp);
          })
        );
        if (res.reduce((a, b) => a && b.status === 200 && b.data.success)) {
          notification.success({ message: 'Cập nhật thành công' });
          history.push(ROUTES.WAREHOUSES);
        } else {
          console.log(res);
          notification.success({
            message: 'Thất bại',
            description: `Cập nhật phiếu thất bại`,
          });
        }
      }
    } catch (err) {
      console.log(err);
      notification.error({ message: 'Cập nhật thất bại' });
    }
  };
  useEffect(() => {
    setData(history.location.state.billData);
  }, []);
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
        <Col>Cập nhật phiếu xuất kho</Col>
      </Row>
      <Tabs>
        {data.map((e, index) => (
          <Tabs.TabPane tab={e.code} key="1">
            <WarehouseUpdateExportForm
              formkey={index}
              data={e}
              allData={data}
              setData={setData}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
      <Row justify="end" style={{ marginTop: '1rem 0' }}>
        <Button
          type="primary"
          size="large"
          style={{ width: 120, borderRadius: 5 }}
          onClick={() => onUpdate(true)}
        >
          Lưu
        </Button>
      </Row>
    </div>
  );
}
