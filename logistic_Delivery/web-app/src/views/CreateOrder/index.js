import React, { useState, useEffect, useContext } from 'react';

//component antd
import {
  Space,
  Form,
  Row,
  Button,
  notification,
  Typography,
  Col,
  Checkbox,
} from 'antd';

//icons
import { ArrowLeftOutlined } from '@ant-design/icons';

import { translate } from 'utils/i18n';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES, INVOICE_TYPE_TO_PAYMENT_TERMS, ACTION } from 'consts';
import Context from 'utils/Context';
import moment from 'moment';

//component
import ShipmentForm from 'components/OrderForm';

//api
import { createShipment } from 'apis/shipments';
import { createOrder, getOrder } from 'apis/order';

export default () => {
  const history = useHistory();
  const context = useContext(Context);
  const [shipmentForm] = Form.useForm();

  const [shipmentDefault, setShipmentDefault] = useState(null);
  const [isPre, setIsPre] = useState(false);

  // useEffect(() => {
  //   //phải khởi tạo invoitype và invoiceno ở modalcreateshipment trc
  //   if (!state || !state.invoiceType || !state.invoiceNo) {
  //     notification.error({
  //       message: translate('Please create invoice information'),
  //     })
  //     history.goBack()
  //     return
  //   }
  // }, [])

  const getShipmentDefault = async () => {
    try {
      const res = await getOrder();

      if (res.status === 200)
        if (res.data.data.length) setShipmentDefault(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const _onSubmitShipment = async () => {
    try {
      await shipmentForm.validateFields();

      const value = shipmentForm.getFieldsValue();
      const body = {
        ...value,
        order_status: value.order_status || 'StackCar',
        sub_fee: value.sub_fee || 0,
        status_check: value.status_check || 'Checking',
      };

      context.dispatch({ name: ACTION.LOADING, data: true });
      const response = await createOrder(body);
      console.log(response);

      if (response.status === 200) {
        if (response.data.success) {
          notification.success({ message: 'Tạo đơn hàng thành công' });
          history.push(ROUTES.ORDERS);
        } else notification.error({ message: 'Tạo đơn hàng thất bại' });
      } else notification.error({ message: 'Tạo đơn hàng thất bại' });

      context.dispatch({ name: ACTION.LOADING, data: false });
    } catch (error) {
      console.log(error);
      context.dispatch({ name: ACTION.LOADING, data: false });
    }
  };

  useEffect(() => {
    getShipmentDefault();
  }, []);

  return (
    // <Space direction="vertical">
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>
          <a onClick={() => history.goBack()}>
            <ArrowLeftOutlined style={{ marginRight: '7px' }} />
          </a>
          {translate('Create Shipment')}
        </Typography.Title>
        <Checkbox
          checked={isPre}
          onChange={(e) => {
            setIsPre(e.target.checked);
            if (e.target.checked) {
              if (shipmentDefault)
                shipmentForm.setFieldsValue({
                  ...shipmentDefault,
                  date_sign: moment(shipmentDefault.date_sign),
                });
            } else shipmentForm.resetFields();
          }}
        >
          Điền sẵn từ đơn hàng gần nhất
        </Checkbox>
      </Row>
      <ShipmentForm form={shipmentForm} required={true} />
      <Row justify="end">
        <Button
          size="large"
          style={{ width: 120, borderRadius: 5 }}
          type="primary"
          onClick={_onSubmitShipment}
        >
          {translate('Create')}
        </Button>
      </Row>
    </>
    // </Space>
  );
};
