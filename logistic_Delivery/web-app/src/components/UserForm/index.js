import React, { useContext, useEffect, useRef, useState } from 'react'

//component antd
import {
  Form,
  Input,
  Select,
  Divider,
  Row,
  Col,
  Checkbox,
  Modal,
  Button,
  notification,
} from 'antd'

//icon antd
import { PlusOutlined } from '@ant-design/icons'

import { translate } from 'utils/i18n'
import { REG_PASSWORD, ACTION } from 'consts'
import useGetData from 'utils/hooks/useGetData'
import { composeAsync, handleDataRole } from './../../utils'
import Context from '../../utils/Context'

//component
import CreateCompanyModal from './CreateCompanyModal'

//api
import { getRoles } from 'apis/roles'
import { getCompanies } from 'apis/companies'
import { getWarehouses } from 'apis/warehouses'
import { register } from 'apis/auth'
import { updateUser } from 'apis/users'

export default ({ getInitialUsers, user, children }) => {
  const selectCompanyRef = useRef()
  const modalCompanyRef = useRef()
  const context = useContext(Context)

  const [companies, reloadCompanies] = useGetData(getCompanies)
  const [roles, reloadRoles] = useGetData(
    composeAsync(handleDataRole(context.role), getRoles)
  )
  const [warehouses, setWarehouses] = useState([])
  const [forms] = Form.useForm()

  //hiện thị select warehouse khi chọn role là thủ kho
  //kế toán, shipper
  const [showSelectWarehouse, setShowSelectWarehouse] = useState(false)

  const [visible, setVisible] = useState(false)

  const _toggleModal = () => setVisible(!visible)

  const setCompanyIdValue = async (value) => {
    await reloadCompanies()
    forms.setFieldsValue({
      companyId: value,
    })
  }

  const _getWarehouses = async () => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true })

      const res = await getWarehouses()

      if (res.status === 200) setWarehouses(res.data.data)

      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      context.dispatch({ name: ACTION.LOADING, data: false })

      console.log(error)
    }
  }

  const _onCreateCompany = () => {
    selectCompanyRef.current.blur()
    setTimeout(() => {
      modalCompanyRef.current.toggleModal()
    }, 100)
  }

  const onCreateOrEditUser = async () => {
    await forms.validateFields()

    context.dispatch({ name: ACTION.LOADING, data: true })

    let body = forms.getFieldsValue()
    //Lọc ra các field ko điền(undefined)
    Object.keys(body).map((e) => {
      if (!body[e]) delete body[e]
    })
    delete body.confirmPassword

    let res
    console.log(body)
    if (user) {
      delete body.password
      res = await updateUser(user.id, body)
    } else res = await register(body)
    console.log(res)
    if ((res.status === 200 && res.data.success) || res.data.status) {
      notification.success({
        message: translate('Success'),
      })
      //Get all user khi tạo user thành công
      getInitialUsers()
      setVisible(false)
    } else {
      notification.error({ message: translate('Failed') })
    }

    context.dispatch({ name: ACTION.LOADING, data: false })
  }

  useEffect(() => {
    reloadCompanies()
    reloadRoles()
    _getWarehouses()
  }, [])

  //Reset các field mỗi khi show modal
  useEffect(() => {
    if (!visible) forms.resetFields()
    else {
      if (user) forms.setFieldsValue({ ...user })
    }
  }, [visible])

  return (
    <>
      {children ? (
        <div onClick={_toggleModal}>{children}</div>
      ) : (
        <Button size="large" type="primary" onClick={_toggleModal}>
          {translate('Create User')}
        </Button>
      )}

      <Modal
        width={650}
        onCancel={_toggleModal}
        title={user ? translate('Edit User') : translate('Create User')}
        visible={visible}
        okText={user ? translate('Save') : translate('Ok')}
        onOk={onCreateOrEditUser}
        centered>
        <Form layout="vertical" form={forms}>
          <Row justify="space-between">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: translate(
                    'Please input {value}',
                    translate('Email')
                  ),
                },
              ]}
              name="email"
              label={translate('Email')}>
              <Input style={{ width: 260 }} />
            </Form.Item>

            <Form.Item
              style={{ width: 260 }}
              name="password"
              label={translate('Password')}
              rules={[
                {
                  required: true,
                  message: translate(
                    'Please input {value}',
                    translate('Password')
                  ),
                },
                {
                  pattern: !user && REG_PASSWORD,
                  message: translate(
                    'Passwords must be at least 8 characters long, 1 uppercase character, 1 lowercase character and 1 digit'
                  ),
                },
              ]}>
              <Input.Password
                style={{ width: 260 }}
                disabled={user ? true : false}
              />
            </Form.Item>

            <Form.Item
              style={{ display: user && 'none' }}
              name="confirmPassword"
              label={translate('Confirm Password')}
              rules={[
                {
                  required: user ? false : true,
                  message: translate(
                    'Please input {value}',
                    translate('Confirm Password')
                  ),
                },
              ]}>
              <Input.Password style={{ width: 260 }} />
            </Form.Item>

            <Form.Item
              name="role_id"
              label={translate('Role')}
              rules={[
                {
                  required: true,
                  message: translate('Please input {value}', translate('Role')),
                },
              ]}>
              <Select
                style={{ width: 260 }}
                onChange={(value) => {
                  console.log(value)
                  if (value == 4 || value == 5 || value == 6)
                    setShowSelectWarehouse(true)
                  else setShowSelectWarehouse(false)
                }}>
                {roles.data.map((role, index) => (
                  <Select.Option key={index} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="companyId" label={translate('Company')}>
              <Select
                style={{ width: 260 }}
                loading={roles.loading}
                ref={selectCompanyRef}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        padding: 8,
                      }}
                      onClick={_onCreateCompany}>
                      <div onClick={(event) => event.stopPropagation()}>
                        <CreateCompanyModal
                          ref={modalCompanyRef}
                          setCompanyIdValue={setCompanyIdValue}
                          onClick={_onCreateCompany}
                        />
                      </div>
                    </div>
                  </div>
                )}>
                {companies.data.map((company, index) => (
                  <Select.Option key={index} value={company.id}>
                    {company.enName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: translate('Please input {value}', translate('Name')),
                },
              ]}
              name="name"
              label={translate('Name')}>
              <Input style={{ width: 260 }} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: translate('Please input {value}', translate('Tel')),
                },
              ]}
              name="tel"
              label={translate('Tel')}>
              <Input style={{ width: 260 }} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: translate(
                    'Please input {value}',
                    translate('Address')
                  ),
                },
              ]}
              name="address"
              label={translate('Address')}>
              <Input style={{ width: 260 }} />
            </Form.Item>

            {showSelectWarehouse && (
              <Form.Item
                name="wareHouseId"
                label={translate('Warehouse')}
                rules={[
                  {
                    required: true,
                    message: translate(
                      'Please input {value}',
                      translate('Warehouse')
                    ),
                  },
                ]}>
                <Select
                  style={{ width: 260 }}
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }>
                  {warehouses.map((role, index) => (
                    <Select.Option key={index} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Row>
        </Form>
      </Modal>
    </>
  )
}
