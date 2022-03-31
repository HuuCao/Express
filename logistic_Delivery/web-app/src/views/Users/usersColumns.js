import React from 'react'

import { Link } from 'react-router-dom'

import { Tag, Button } from 'antd'
import { getRoles } from 'apis/roles'
import AddPermission from './AddPermission'
import { PERMISSIONS } from 'consts/permissions'
import Permission from 'components/Permission'
import { ROUTES } from 'consts'

export default [
  {
    width: 80,
    title: 'STT',
    render(data, record, index) {
      return index + 1
    },
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  // {
  //   title: 'Position',
  //   dataIndex: 'position',
  //   key: 'position',
  // },
  {
    title: 'Telephone',
    dataIndex: 'tel',
    key: 'tel',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Role',
    dataIndex: 'role_id',
    key: 'roleId',
  },
  {
    title: 'Active',
    dataIndex: 'is_activate',
    key: 'isActive',
    render: (text) =>
      text ? (
        <Tag color="success">Active</Tag>
      ) : (
        <Tag color="warning">Not Active</Tag>
      ),
  },
  {
    title: 'Action',
    key: 'action',
  },
  // {
  //   key: 'addPermission',
  //   dataIndex: 'role',
  //   render: (record) => (
  //     <Link
  //       to={ROUTES.DETAIL_USER.replace(':idUser', record.id)}
  //       state={record}
  //     >
  //       <Button type="primary">See Permission</Button>
  //     </Link>
  //     // <Permission permissions={[PERMISSIONS.ADD_PERMISSION_ROLE]}>
  //     //   <AddPermission ListPermission={record.permissions} idRole={record.id} />
  //     // </Permission>
  //   ),
  // },
]
