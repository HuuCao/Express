import { Drawer, Form, Input, Row, Upload, Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { translate } from 'utils/i18n';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import uploadFile from 'apis/upload';
import { createShipping, updateShipping } from 'apis/shipping';
export default function UpdatePartner({ visible, onClose, reload, initvalue }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadImg = async (file, key) => {
    if (file.file.status == 'uploading') {
      const image = await uploadFile(file.file.originFileObj);
      if (image) {
        let tmp = [...initvalue];
        tmp[key].avt = image;
        form.setFieldsValue({ sights: tmp });
      }
    }
  };
  const onFinish = async (value) => {
    const res = await Promise.all(
      value.sights.map((e) => {
        const id = e.id;
        const data = { ...e };
        delete data.id;
        return updateShipping(id, data);
      })
    );
    if (res.reduce((a, b) => a && b.status == 200, true)) {
      notification.success({ message: translate('Update successfully') });
      reload();
      onClose();
    }
  };
  useEffect(() => {
    form.setFieldsValue({ sights: initvalue });
  }, [initvalue]);
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title={translate('Update shipping partner')}
      width={500}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.List name="sights">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <>
                  <Form.Item
                    name="avt"
                    {...restField}
                    name={[name, 'avt']}
                    fieldKey={[fieldKey, 'avt']}
                  >
                    <Row justify="center">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={(e) => uploadImg(e, fieldKey)}
                        maxCount={1}
                      >
                        <img
                          src={initvalue[fieldKey].avt}
                          alt="avatar"
                          style={{ width: '100%' }}
                        />
                      </Upload>
                    </Row>
                  </Form.Item>

                  <Form.Item
                    label={translate('Partner name')}
                    {...restField}
                    name={[name, 'name']}
                    fieldKey={[fieldKey, 'name']}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={translate('Phone')}
                    {...restField}
                    name={[name, 'tel']}
                    fieldKey={[fieldKey, 'tel']}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="id"
                    {...restField}
                    name={[name, 'id']}
                    fieldKey={[fieldKey, 'id']}
                  >
                    <Input hidden />
                  </Form.Item>
                </>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              {translate('Update')}
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
