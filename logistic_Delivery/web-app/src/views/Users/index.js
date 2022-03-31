import React, { useState, useEffect, useContext, useRef } from 'react'

//component antd
import { Table, notification, Row, Typography, Input, Popconfirm } from 'antd'

//icons antd
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import usersColumns from './usersColumns'
import Context from 'utils/Context'
import { ACTION } from 'consts'
import { translate } from 'utils/i18n'
import { PERMISSIONS } from 'consts/permissions'

//components
import ModalCreateUser from 'components/UserForm'
import Permission from 'components/Permission'

//apis
import { getUsers, deleteUser } from 'apis/users'
import { removeNull } from 'utils'
import { getRoles } from 'apis/roles'
export default () => {
  const context = useContext(Context)
  const typingTimeoutRef = useRef(null)

  const [paramsFilter, setParamsFilter] = useState({ page: 1, pageSize: 20 })
  const [data, setData] = useState([])
  const [roles, setRoles] = useState([])
  const [count, setCount] = useState(0)

  const onSearch = (e) => {
    const value = e.target.value
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      paramsFilter.page = 1

      if (!value) delete paramsFilter.search
      else paramsFilter.search = value

      getInitialUsers(paramsFilter)
      setParamsFilter(paramsFilter)
    }, 750)
  }

  const getInitialUsers = async (params) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true })
      const res = await getUsers(params)
      console.log(res)
      if (res.status === 200) {
        setData(res.data.data.filter((e) => e.role_id != 7))
        setCount(res.data.count)
      } else
        notification.error({ message: 'Error', description: res.statusText })
      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      context.dispatch({ name: ACTION.LOADING, data: false })
    }
  }

  const onDeleteUser = async (userId) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true })
      const res = await deleteUser(userId)
      console.log(res)
      if (res.status === 200) {
        getInitialUsers(paramsFilter)
        notification.success({ message: translate('Delete user success') })
      } else
        notification.error({
          message: 'Error',
          description: translate('Delete user failed'),
        })
      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      context.dispatch({ name: ACTION.LOADING, data: false })
    }
  }

  const getAllRoles = async () => {
    try {
      const res = await getRoles()
      if (res.data.success) {
        setRoles(res.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllRoles()
    getInitialUsers(paramsFilter)
  }, [])

  return (
    <>
      <Row justify="space-between">
        <Typography.Title level={4}>{translate('Users')}</Typography.Title>
        {/* create user */}
        <Permission permissions={[PERMISSIONS.CREATE_EDIT_USER]}>
          <ModalCreateUser
            getInitialUsers={() => getInitialUsers(paramsFilter)}
          />
        </Permission>
      </Row>
      <br />
      <Input.Search
        prefix={<SearchOutlined style={{ color: '#bdc3c7' }} />}
        placeholder={translate('Input search name')}
        allowClear
        enterButton="Search"
        size="large"
        onChange={onSearch}
      />

      <br />
      <br />

      <Table
        style={{ width: '100%' }}
        columns={usersColumns.map((e) => {
          if (e.key === 'action')
            return {
              ...e,
              width: 100,
              render: (text, record) => (
                <Row justify="center" align="middle" wrap={false}>
                  <ModalCreateUser
                    getInitialUsers={() => getInitialUsers(paramsFilter)}
                    user={record}>
                    <EditOutlined
                      style={{
                        fontSize: 16,
                        color: '#1890FF',
                        cursor: 'pointer',
                      }}
                    />
                  </ModalCreateUser>
                  <Popconfirm
                    title={`${translate('Are you sure delete this user')} ?`}
                    okText="Ok"
                    cancelText="No"
                    onConfirm={() => onDeleteUser(record.id)}>
                    <DeleteOutlined
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        color: 'orange',
                        cursor: 'pointer',
                      }}
                    />
                  </Popconfirm>
                </Row>
              ),
            }
          if (e.key === 'roleId')
            return {
              ...e,
              render(data) {
                return (
                  roles.find((role) => role.id == data) &&
                  roles.find((role) => role.id == data)['name']
                )
              },
            }

          return e
        })}
        dataSource={data}
        pagination={{
          current: paramsFilter.page,
          defaultPageSize: paramsFilter.pageSize,
          pageSizeOptions: [20, 30, 50, 60, 70, 80, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            paramsFilter.page = page
            paramsFilter.pageSize = pageSize

            setParamsFilter(paramsFilter)
            getInitialUsers(paramsFilter)
          },
          total: count,
        }}
        size="small"
      />
    </>
  )
}
