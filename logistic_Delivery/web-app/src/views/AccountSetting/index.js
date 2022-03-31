import { Col, Row, Form, Input, Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './account.module.scss';
import { getUsers, updateUser } from 'apis/users';
import avatar from '../../assets/img/avatar.svg';
import { EditOutlined } from '@ant-design/icons';
import { translate } from 'utils/i18n';
export default function AccountSetting(props) {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const getUser = () => {
    getUsers()
      .then((res) =>
        setUser(res.data.data.find((e) => e.id == localStorage.userid))
      )
      .catch((err) => console.log(err));
  };
  const onFinish = async (value) => {
    try {
      let tmp = { ...value };
      delete tmp.tel;
      const res = await updateUser(user.id, tmp);
      if (res.status == 200) {
        getUser();
        setEdit(false);
        notification.success({ message: 'Update Successfully' });
      } else {
        notification.error({ message: translate('Update fail') });
      }
    } catch (e) {
      console.log(e);
      notification.error({ message: translate('Update fail') });
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      tel: user.tel,
      address: user.address,
      code: user.code,
    });
  }, [user]);
  return (
    <div className={styles['account-setting']}>
      <Row gutter={30}>
        <Col span={8}>
          <div className={styles['account-image']}>
            <div className={styles['avatar']}>
              <img src={avatar} />
            </div>
            <span className={styles['name']}>{user.name}</span>
          </div>
        </Col>
        <Col span={16}>
          <div className={styles['account-info']}>
            {!edit && (
              <Row justify="end">
                <Button type="text" onClick={() => setEdit(true)}>
                  <EditOutlined />
                </Button>
              </Row>
            )}

            <Form
              layout={edit ? 'vertical' : 'horizontal'}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item label="Họ tên" name="name">
                {edit ? <Input /> : user.name}
              </Form.Item>
              <Form.Item label="Số điện thoại" name="tel">
                {edit ? <Input disabled /> : user.tel}
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address">
                {edit ? <Input /> : user.address}
              </Form.Item>
              {/* <Form.Item label="code">{edit ? <Input /> : user.code}</Form.Item> */}
              {edit && (
                <Form.Item>
                  <Row justify="end">
                    <Button type="link" onClick={() => setEdit(false)}>
                      Hủy
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ padding: '5px 10px', borderRadius: 12 }}
                    >
                      Xác nhận
                    </Button>
                  </Row>
                </Form.Item>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
