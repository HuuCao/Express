import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from 'consts';
import { updateCard } from 'apis/card';
import WarehouseUpdateImportForm from 'components/WarehouseForm/UpdateImport';
export default function UpdateImportWarehouse() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const onUpdate = async (is_activate) => {
    let pass = true;
    const body = data.map((e) => {
      if (!e.cost_import) {
        notification.warning({ message: 'Vui lòng nhập cước nhập kho' });
        pass = false;
        return;
      }
      if (!e.id_shipping) {
        notification.warning({ message: 'Vui lòng chọn đơn vị vận chuyển' });
        pass = false;
        return;
      }
      if (!e.data.length) {
        notification.warning({ message: 'Vui lòng thêm đơn hàng' });
        pass = false;
        return;
      }
      return {
        id: e.id,
        is_activate,
        cost_import: e.cost_import,
        id_shipping: e.id_shipping,
        link_image: e.link_image,
        data: e.orders.map((o) => {
          return {
            id: o.id,
            num: o.num,
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
        <Col>Cập nhật phiếu nhập kho</Col>
      </Row>
      <Tabs>
        {data.length > 0 &&
          data.map((e, index) => (
            <Tabs.TabPane tab={e.code} key={index}>
              <WarehouseUpdateImportForm
                data={e}
                setData={setData}
                formkey={index}
                allData={data}
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
