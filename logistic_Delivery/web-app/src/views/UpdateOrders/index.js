import React, { useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import { Row, Typography, Tabs, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { translate } from 'utils/i18n';
import ShipmentForm from 'components/OrderForm';
import { updateOrder } from 'apis/order';
import moment from 'moment';
export default function UpdateOrders() {
  const history = useHistory();
  const [formList, setFormList] = useState({});
  const [updateDataList, setUpdateDataList] = useState({});
  console.log(history.location.state);

  const onUpdateOrders = async () => {
    let passValidate = true;
    try {
      for (var key in formList) {
        formList[key].validateFields();
      }
    } catch (err) {
      passValidate = false;
    }
    if (passValidate) {
      try {
        const res = await Promise.all(
          Object.keys(updateDataList).map((e) => {
            //   let body = {...updateDataList[e]}
            //   if(updateDataList[e].date_sign){
            //     body.date_sign = moment()
            //   }
            return updateOrder(e, updateDataList[e]);
          })
        );

        if (res.reduce((a, b) => a && b.data.success, true)) {
          notification.success({ message: 'Cập nhật thành công' });
          history.push('/orders');
        } else {
          notification.error({ message: 'Cập nhật thất bại' });
        }
      } catch (err) {
        console.log(err);
        notification.error({ message: 'Thất bại' });
      }
    }
  };
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>
          <Link onClick={history.goBack}>
            <ArrowLeftOutlined style={{ marginRight: '7px' }} />
          </Link>
          {translate('Update orders')}
        </Typography.Title>
      </Row>
      <Tabs>
        {history.location.state &&
          history.location.state.map((e, index) => (
            <Tabs.TabPane
              key={index}
              tab={e.code_bill}
              style={{ paddingTop: 10 }}
            >
              <ShipmentForm
                initialValue={e}
                getForm={(data) => setFormList({ ...formList, [e.id]: data })}
                onChange={(data) =>
                  setUpdateDataList({ ...updateDataList, [e.id]: data })
                }
              />
            </Tabs.TabPane>
          ))}
      </Tabs>
      <Row justify="end">
        <Button type="primary" onClick={onUpdateOrders}>
          {translate('Update')}
        </Button>
      </Row>
    </div>
  );
}
