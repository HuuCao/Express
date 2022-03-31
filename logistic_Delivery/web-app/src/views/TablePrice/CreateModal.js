import {
  Button,
  Form,
  InputNumber,
  Modal,
  Row,
  Input,
  Select,
  notification,
} from 'antd';
import { createPrice } from 'apis/price';
import React from 'react';

export default function CreateTablePrice(props) {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 18,
      offset: 1,
    },
  };
  const onFinish = async () => {
    let isValidate = true;
    try {
      await form.validateFields();
    } catch (e) {
      isValidate = false;
    }
    if (!isValidate) {
      return;
    }
    try {
      const value = form.getFieldsValue();
      const res = await createPrice(value);
      if (res.status === 200) {
        notification.success({ message: 'Tạo bảng giá thành công' });
        props.onCancel();
        props.reload();
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Thất bại',
        description: err.data && err.data.message,
      });
    }
  };
  return (
    <Modal
      title="Thêm bảng giá"
      visible={props.visible}
      footer=""
      onCancel={props.onCancel}
      centered
    >
      <Form form={form} {...layout}>
        <Form.Item label="Tên" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Loại" initialValue="normal" name="type">
          <Select defaultValue="normal">
            <Select.Option value="normal">Loại thường</Select.Option>
            <Select.Option value="VIP">Loại VIP</Select.Option>
          </Select>
        </Form.Item>
        <h3 style={{ lineHeight: 0.9 }}>Giá dưới 15kg</h3>
        <Form.Item label="Tính theo kg" name="price_regular_kg">
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Tính theo cm3" name="price_regular_cm3">
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <h3 style={{ lineHeight: 0.9 }}>Giá từ 15-50kg</h3>
        <Form.Item label="Tính theo kg" name="price_medium_kg">
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Tính theo cm3" name="price_medium_cm3">
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <h3 style={{ lineHeight: 0.9 }}>Giá trên 50kg</h3>
        <Form.Item label="Tính theo kg" name="price_premium_kg">
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Tính theo cm3" name="price_premium_cm3">
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
      <Row justify="center" style={{ width: '100%' }}>
        <Button type="primary" onClick={onFinish} style={{ width: 110 }}>
          Tạo
        </Button>
      </Row>
    </Modal>
  );
}
