import React, { useState, useEffect, useContext } from 'react';

//components antd
import {
  Form,
  Space,
  Row,
  Col,
  Select,
  Input,
  DatePicker,
  notification,
  InputNumber,
  Checkbox,
} from 'antd';

//icon antd
import { LoadingOutlined } from '@ant-design/icons';

import {
  INVOICE_TYPE,
  INVOICE_TYPE_TO_PAYMENT_TERMS,
  STATE_SHIPMENT,
} from 'consts';
import { translate } from 'utils/i18n';
import { ACTION } from 'consts';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import Context from 'utils/Context';

//components
import CustomSpace from 'components/CustomSpace';

//apis
import { getWarehouses } from 'apis/warehouses';
import { getUsers } from 'apis/users';
import { getShipping } from 'apis/shipping';
import { forEach } from 'lodash';

const ShipmentForm = ({
  form,
  required,
  isUpdate,
  setIsUpdate,
  onChange,
  initialValue,
  getForm,
}) => {
  const context = useContext(Context);

  const [warehouses, setWarehouses] = useState([]);

  const [customersList, setCustomersList] = useState([]);

  const [ShippingPartner, setShippingPartner] = useState([]);

  const [componentForm] = Form.useForm();

  const _getRuleRequired = (field) => {
    return {
      required,
      message: translate('Please input') + ' ' + translate(field),
    };
  };

  const getAllCustomer = (params) => {
    getUsers(params)
      .then((res) => {
        if (res.data.success) setCustomersList(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAllShippingPartner = (params) => {
    getShipping()
      .then((res) => {
        if (res.data.success) setShippingPartner(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const _onSelectInvoiceType = (value) => {
    form.setFieldsValue({
      termPayment: INVOICE_TYPE_TO_PAYMENT_TERMS[value],
    });
  };

  const getInitialWarehouses = async () => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true });
      const res = await getWarehouses();
      if (res.status === 200) {
        setWarehouses(res.data.data);
      }
      context.dispatch({ name: ACTION.LOADING, data: false });
    } catch (error) {
      context.dispatch({ name: ACTION.LOADING, data: false });
      console.log(error);
    }
  };

  //check user is update
  const _onFieldsChange = () => {
    if (!isUpdate && typeof setIsUpdate === 'function') setIsUpdate(true);
  };

  const onChangeFieldsValue = (changedFields, allFields) => {
    if (onChange) {
      let tmp = {};

      allFields.forEach((e) => {
        tmp = { ...tmp, [e.name[0]]: e.value };
      });

      onChange(tmp);
    }
  };

  useEffect(() => {
    getInitialWarehouses();
  }, []);

  useEffect(() => {
    getAllCustomer();
    getAllShippingPartner();
  }, []);

  useEffect(() => {
    getForm && getForm(componentForm);
  }, []);

  useEffect(() => {
    initialValue &&
      componentForm.setFieldsValue({
        ...initialValue,
        date_sign: moment(initialValue.date_sign),
        customer_code: initialValue.user && initialValue.user.customer_code,
      });
  }, []);

  return (
    <>
      <Form
        form={form || componentForm}
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 14,
          offset: 1,
        }}
        onFieldsChange={onChangeFieldsValue}
      >
        <Row>
          <Col>
            <CustomSpace type="vertical">
              <Form.Item
                style={{
                  width: 350,
                }}
                label="Thời gian ký nhận"
                name="date_sign"
                rules={[_getRuleRequired('Thời gian ký nhận')]}
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                required
                name="code_bill"
                label={translate('Bill number')}
                rules={[{ ..._getRuleRequired('Bill number'), required: true }]}
                validateTrigger={false}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                required
                name="total_quantity_package"
                label={translate('Amount package')}
                rules={[
                  { ..._getRuleRequired('Amount package'), required: true },
                ]}
                validateTrigger={false}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                name="tracking_number"
                label={translate('Waybill number')}
                rules={[_getRuleRequired('Waybill number')]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                required
                name="customer_code"
                label={translate('Customer code')}
                rules={[
                  { ..._getRuleRequired('Customer code'), required: true },
                ]}
                validateTrigger={false}
              >
                <Select
                  // onSelect={_onSelectInvoiceType}
                  filterOption={(input, option) =>
                    option.children &&
                    option.children
                      .toLowerCase()
                      .indexOf(input && input.toLowerCase()) >= 0
                  }
                  optionFilterProp="children"
                  showSearch
                >
                  {customersList
                    .filter((e) => e.role_id === 7)
                    .map((val, index) => (
                      <Select.Option value={val.customer_code} key={index}>
                        {val.customer_code}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                name="description"
                rules={[_getRuleRequired('Product Description')]}
                label={translate('Product Description')}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                name="cod"
                label={translate('Payment help')}
                rules={[_getRuleRequired('Payment help')]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                label="Đóng gỗ/ Đóng tải"
                name="bag"
                rules={[_getRuleRequired('Đóng gỗ/ Đóng tải')]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="Phí nâng hàng"
                style={{
                  width: 350,
                }}
                name="fee_package"
                rules={[_getRuleRequired('Phí nâng hàng')]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  width: 350,
                }}
                name="sub_fee"
                label={translate('Surcharge')}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                style={{ width: 350 }}
                name="volume"
                label={translate('Volume')}
                rules={[_getRuleRequired('Volume')]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                style={{ width: 350 }}
                name="mass"
                label={translate('Mass')}
                rules={[_getRuleRequired('Mass')]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                style={{
                  width: 350,
                }}
                label="Giá vốn"
                name="cost_origin"
                rules={[_getRuleRequired('Giá vốn')]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                style={{
                  width: 350,
                }}
                name="shipping_partner_id"
                label={translate('Shipping partner')}
                rules={[_getRuleRequired('Shipping partner')]}
              >
                <Select
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  optionFilterProp="children"
                  showSearch
                >
                  {ShippingPartner.map((e) => (
                    <Select.Option value={e.id}>{e.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* <Form.Item
            style={{ width: 350 }}
            name="order_status"
            label={translate('Order status')}
            initialValue="StackCar"
          >
            <Select>
              <Select.Option value="StackCar">Xếp xe</Select.Option>
              <Select.Option value="CameBack">Nhập kho</Select.Option>
              <Select.Option value="Delivery">Đang giao</Select.Option>
            </Select>
          </Form.Item> */}
            </CustomSpace>
          </Col>
        </Row>
      </Form>
    </>
  );
};

ShipmentForm.defaultProps = {
  required: true,
};

export default ShipmentForm;
