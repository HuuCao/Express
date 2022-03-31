import React, { useEffect, useState } from 'react';
// antd components
import {
  Button,
  Row,
  Typography,
  Radio,
  Col,
  Tabs,
  notification,
  Modal,
} from 'antd';

import { translate } from 'utils/i18n';
import CreateTablePrice from './CreateModal';
import { formatNumber } from 'utils';
import { ROUTES } from 'consts';
import { getPrice, deletePrice } from 'apis/price';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { TabPane } = Tabs;
export default function TablePrice() {
  const [showCreate, setShowCreate] = useState(false);
  const [type, setType] = useState('basic');
  const [price, setPrice] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const history = useHistory();
  const colorList = ['#2895E4', '#DF9401', '#01AA12'];
  const getAllPrice = async (params) => {
    try {
      const res = await getPrice(params);
      if (res.data.success) {
        setPrice(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteEffortPrice = async (id) => {
    try {
      const res = await deletePrice(id);
      if (res.data.success && res.status == 200) {
        notification.success({
          message: 'Xóa công thức tính giá thành công',
        });
        getAllPrice();
      } else {
        notification.error({
          message: 'Xóa công thức tính giá thất bại',
        });
      }
    } catch (err) {
      notification.error({
        message: 'Thất bại',
      });
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPrice();
  }, []);
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>
          {translate('Price formula')}
        </Typography.Title>

        <Button
          type="primary"
          href={ROUTES.CREATE_TABLE_PRICE}
          // onClick={() => setShowCreate(true)}
          style={{ borderRadius: '5px' }}
        >
          Tạo công thức tính giá
        </Button>
      </Row>
      <br />
      <Row>
        <Tabs type="card" style={{ width: '100%' }}>
          {price.map((e, priceIndex) => (
            <TabPane
              tab={e.title}
              key={priceIndex}
              style={{ background: '#fff', padding: 20 }}
            >
              <Row justify="end">
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  style={{ marginRight: 15 }}
                  onClick={() => setShowDeleteConfirm(true)}
                  danger
                >
                  Xóa
                </Button>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() =>
                    history.push({
                      pathname: ROUTES.UPDATE_TABLE_PRICE,
                      state: e,
                    })
                  }
                >
                  Cập nhật
                </Button>
              </Row>
              {e.description}
              <div
                style={{
                  width: '960px',
                  overflowX: 'auto',
                  margin: 'auto',
                  marginTop: '1em',
                  display: 'block',
                  background: '#fff',
                }}
              >
                <div style={{ width: 'max-content' }}>
                  {e.effort_price_packages &&
                    e.effort_price_packages.map((pack, index) => (
                      <div
                        style={{
                          width: 320,
                          display: 'inline-block',
                          padding: 10,
                          background: '#fff',
                          border: 'solid 1px #C2C2C2',
                          height: '100%',
                          textAlign: 'center',
                          fontSize: 16,
                        }}
                      >
                        <h1
                          style={{
                            fontSize: 21,
                            fontWeight: 700,
                            color: colorList[index % colorList.length],
                          }}
                        >
                          {`Gói ${index + 1}`}
                        </h1>
                        <div style={{ fontSize: 19, fontWeight: 600 }}>
                          Minimum (kg)
                        </div>
                        {/* <div style={{ fontSize: 17, fontWeight: 500 }}>
                          <i>Theo kg</i>
                        </div> */}
                        {formatNumber(pack.condition_miximum_kg || 0)} kg
                        <div
                          style={{
                            fontSize: 19,
                            fontWeight: 600,
                            marginTop: 7,
                          }}
                        >
                          Maximum (kg)
                        </div>
                        {formatNumber(pack.condition_maximum_kg || 0)} kg
                        <div
                          style={{
                            fontSize: 19,
                            fontWeight: 600,
                            marginTop: 7,
                          }}
                        >
                          Cost/1kg
                        </div>
                        {formatNumber(pack.cost_per_kg || 0)} VND
                        <div
                          style={{
                            fontSize: 19,
                            fontWeight: 600,
                            marginTop: 7,
                          }}
                        >
                          Cost/1m<sup>3</sup>
                        </div>
                        {formatNumber(pack.cost_per_m3 || 0)} VND
                      </div>
                    ))}
                </div>
              </div>

              <Modal
                visible={showDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                onOk={() => {
                  deleteEffortPrice(e.id);
                  setShowDeleteConfirm(false);
                }}
              >
                <h3>Bạn muốn xóa công thức tính giá {e.title}</h3>
              </Modal>
            </TabPane>
          ))}
        </Tabs>
      </Row>
      <CreateTablePrice
        visible={showCreate}
        onCancel={() => setShowCreate(false)}
        reload={getAllPrice}
      />
    </div>
  );
}
