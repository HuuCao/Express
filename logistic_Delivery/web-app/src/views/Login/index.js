import React, { useContext } from 'react';
import './index.scss';

//component antd
import {
  Row,
  Input,
  Button,
  Checkbox,
  Form,
  Typography,
  notification,
} from 'antd';

//icon antd
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

//utils
import Context from 'utils/Context';
import { translate, setLanguage } from 'utils/i18n';
import { ROUTES, ACTION } from 'consts';
import { decodeJWT } from 'utils';

//api
import { login } from 'apis/auth';

export default () => {
  const context = useContext(Context);
  const _onFinishInput = async (value) => {
    try {
      if (context.isLoading) {
        return;
      }
      context.dispatch({ name: ACTION.LOADING, data: true });
      const response = await login(value);
      context.dispatch({ name: ACTION.LOADING, data: false });
      if (response.status === 200) {
        context.dispatch({ name: ACTION.LOGIN, data: response.data });
      } else {
        notification.error({
          message: translate('Error'),
          description: (
            <div style={{ maxHeight: 100, overflow: 'auto' }}>
              {response.data &&
                response.data.message
                  .split(',')
                  .map((text) => <div>{translate(text)}</div>)}
            </div>
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-form">
        <Typography.Title
          level={1}
          style={{
            marginBottom: 64,
            textAlign: 'center',
          }}
        >
          {translate('Login')}
        </Typography.Title>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={_onFinishInput}
        >
          <Form.Item
            name="tel"
            rules={[
              {
                required: true,
                message: translate(
                  'Please input {value}',
                  translate('username')
                ),
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              placeholder={translate('username')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: translate(
                  'Please input {value}',
                  translate('password')
                ),
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder={translate('password')}
            />
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{translate('remember me')}</Checkbox>
              </Form.Item>
              {/* <Link to={ROUTES.FORGOT_PASSWORD}> */}
              {/* {translate('forgot password')} */}
              {/* </Link> */}
            </Row>
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <Button
                size="large"
                type="primary"
                style={{
                  width: '100%',
                }}
                htmlType="submit"
              >
                {translate('log in')}
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
