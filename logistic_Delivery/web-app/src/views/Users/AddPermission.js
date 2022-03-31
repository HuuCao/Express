import React, { useState, useContext, useEffect } from 'react';

import { PERMISSIONS, PERMISSIONS_ID } from 'consts/permissions';
import Context from 'utils/Context';
import { ACTION } from 'consts';

//component antd
import {
  Button,
  Table,
  Modal,
  Input,
  notification,
  Typography,
  Row,
} from 'antd';

//icon antd
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

//apis
import { addPermission, removePermission } from 'apis/users';

export default ({ ListPermission, idRole }) => {
  const context = useContext(Context);

  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  const _listPermission = ListPermission.map((e) => e);
  const permissions = Object.keys(PERMISSIONS).map((e) => PERMISSIONS[e]);

  const _addPermission = async (idPermission) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true });

      const res = await addPermission(idRole, idPermission);
      console.log(res);
      if (res.status === 200) {
        notification.success({ message: 'Success' });
        toggle();
      }

      context.dispatch({ name: ACTION.LOADING, data: false });
    } catch (error) {
      console.log(error);
      context.dispatch({ name: ACTION.LOADING, data: false });
    }
  };

  const _removePermission = async (idPermission) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true });

      const res = await removePermission(idRole, idPermission);
      console.log(res);
      if (res.status === 200) {
        notification.success({ message: 'Success' });
        toggle();
      }

      context.dispatch({ name: ACTION.LOADING, data: false });
    } catch (error) {
      console.log(error);
      context.dispatch({ name: ACTION.LOADING, data: false });
    }
  };

  const confirmAdd = (idPermission) =>
    Modal.confirm({
      title: 'Do you want add permission?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        _addPermission(idPermission);
      },
    });

  const confirmRemove = (idPermission) =>
    Modal.confirm({
      title: 'Do you want remove permission?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        _removePermission(idPermission);
      },
    });

  const columns = [
    {
      title: 'Permissions',
      render: (text) => text,
    },
    {
      render: (permission) => {
        let isHave = false;

        isHave = _listPermission.find((e) => e.action == permission);

        return isHave ? (
          <Row align="middle">
            <Typography.Title level={5} style={{ marginBottom: 0 }}>
              Had
            </Typography.Title>
            <Button
              danger
              type="primary"
              style={{ marginLeft: 20 }}
              onClick={() =>
                confirmRemove(PERMISSIONS_ID[permission.toUpperCase()])
              }
            >
              Remove
            </Button>
          </Row>
        ) : (
          <Button
            type="primary"
            onClick={() => confirmAdd(PERMISSIONS_ID[permission.toUpperCase()])}
          >
            Add
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Button type="primary" onClick={toggle}>
        See Permission
      </Button>
      <Modal
        title="Permission User"
        width={900}
        visible={visible}
        onCancel={toggle}
      >
        <Input
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          style={{ marginBottom: 20 }}
        />
        <Table
          size="small"
          dataSource={permissions}
          columns={columns}
          scroll={{ y: 380 }}
        />
      </Modal>
    </>
  );
};
