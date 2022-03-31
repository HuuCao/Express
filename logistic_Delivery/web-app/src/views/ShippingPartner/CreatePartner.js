import { Drawer, Form, Input, Row, Upload, Button, notification } from 'antd';
import React, { useState } from 'react';
import { translate } from 'utils/i18n';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import uploadFile from 'apis/upload';
import { createShipping } from 'apis/shipping';
export default function CreatePartner({ visible, onClose, reload }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadImg = async (file) => {
    setLoading(true);
    const image = await uploadFile(file.file.originFileObj);

    if (image) {
      setImageUrl(image);
    }
    setLoading(false);
  };
  const onFinish = async (value) => {
    if (imageUrl) {
      const body = {
        ...value,
        avt: imageUrl,
      };
      const res = await createShipping(body);
      if (res.status == 200) {
        notification.success({ message: 'Thêm Đối tác thành công' });
        onClose();
        setImageUrl('');
        form.setFieldsValue({
          name: '',
          tel: '',
        });
        reload();
      } else {
        notification.error({ message: 'Vui lòng thêm hình ảnh' });
      }
    } else {
      notification.error({ message: 'Vui lòng thêm hình ảnh' });
    }
  };
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title={translate('Create shipping partner')}
      width={500}
    >
      <Row justify="center">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={uploadImg}
          maxCount={1}
        >
          {imageUrl && !loading ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Row>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item name="name" label={translate('Partner name')}>
          <Input />
        </Form.Item>
        <Form.Item name="tel" label={translate('Phone')}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              {translate('Create')}
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
