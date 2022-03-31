import React, { useState, useContext, useEffect } from 'react'

import moment from 'moment'

//component antd
import {
  Modal,
  Button,
  Form,
  Input,
  notification,
  Select,
  DatePicker,
  Checkbox,
  Row,
} from 'antd'

//apis
import { createCustomerReceiver } from 'apis/customers'
import { getCompanies } from 'apis/companies'

import { translate } from 'utils/i18n'
import Context from 'utils/Context'
import { ACTION } from 'consts'
import { createCustomer, updateUser } from 'apis/users'
import { getPrice } from 'apis/price'

export default ({ getInitialCustomersReceiver, customer, children }) => {
  const [form] = Form.useForm()
  const context = useContext(Context)
  const dateFormat = 'DD/MM/YYYY'

  const [visible, setVisible] = useState(false)
  const [companies, setCompanies] = useState([])
  const [effortPriceList, setEffortPriceList] = useState([])

  const [useCompany, setUseCompany] = useState(false)
  const toggle = () => setVisible(!visible)

  const isValidateForm = async () => {
    try {
      await form.validateFields()
      return true
    } catch (error) {
      return false
    }
  }

  const getInitialCompanies = async () => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true })

      const res = await getCompanies()
      if (res.status === 200) setCompanies(res.data.data)
      else notification.error({ message: 'Error', description: res.statusText })

      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      context.dispatch({ name: ACTION.LOADING, data: false })
      console.log(error)
    }
  }

  const onCreateOrEditCustomer = async () => {
    try {
      //check validate field trước khi submit
      const isValidate = await isValidateForm()
      if (!isValidate) return

      context.dispatch({ name: ACTION.LOADING, data: true })

      const body = { ...form.getFieldsValue() }

      //bỏ các field ko điền
      Object.keys(body).map((key) => {
        if (!body[key]) delete body[key]
      })

      let res
      if (customer) res = await updateUser(customer.id, body)
      else res = await createCustomer({ ...body, role_id: 7, password: ' ' })

      console.log(res)
      if (res.status === 200 && res.data.success) {
        //Get all customer again
        await getInitialCustomersReceiver()

        setVisible(false)

        notification.success({ message: 'Success' })
      } else {
        notification.error({ message: 'Có lỗi xảy ra' })
      }
      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      context.dispatch({ name: ACTION.LOADING, data: false })
      console.log(error)
    }
  }

  const getEffortPrice = async () => {
    try {
      const res = await getPrice()
      if (res.data.success) {
        setEffortPriceList(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const layout = {
    labelCol: {
      span: 7,
    },

    wrapperCol: {
      span: 17,
      offset: 1,
    },
  }

  useEffect(() => {
    //reset all field khi open modal
    if (!visible) form.resetFields()
    else {
      if (customer)
        form.setFieldsValue({
          ...customer,
          time_expired_price: moment(customer.time_expired_price),
        })

      console.log(customer)
    }
  }, [visible])

  // useEffect(() => {
  //   getInitialCompanies();
  // }, []);

  useEffect(() => {
    getEffortPrice()
  }, [])

  return (
    <>
      {children ? (
        <div onClick={toggle}>{children}</div>
      ) : (
        <Button type="primary" onClick={toggle} size="large">
          {translate('Create Customer')}
        </Button>
      )}

      <Modal
        visible={visible}
        title={
          customer ? translate('Edit Customer') : translate('Create Customer')
        }
        cancelText={translate('Cancel')}
        okText={customer ? translate('Save') : 'OK'}
        onCancel={toggle}
        onOk={onCreateOrEditCustomer}
        width={600}
        centered>
        <Form
          {...layout}
          form={form}
          initialValues={{
            //Nếu là client thì điền sẵn company và disabled
            companyId: context.id == 3 && context.companyId,
          }}>
          <Form.Item
            label={translate('Name')}
            name="name"
            rules={[
              {
                required: true,
                message: translate('Please input name'),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={translate('Customer code')}
            name="customer_code"
            rules={[
              {
                required: true,
                message: translate('Please input Customer code'),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={translate('Email')}
            name="email"
            rules={[
              {
                required: true,
                message: translate('Please input email'),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={translate('Phone')}
            name="tel"
            rules={[
              {
                required: true,
                message: translate('Please input phone'),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={translate('Address')}
            name="address"
            rules={[
              {
                required: true,
                message: translate('Please input address'),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item name="effort_price_id" label="Công thức tính giá">
            <Select>
              {effortPriceList.map((e) => (
                <Select.Option value={e.id}>{e.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="time_expired_price" label="Thời gian sử dụng CTTG">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Row>
            <Checkbox onChange={(e) => setUseCompany(e.target.checked)}>
              Thêm công ty
            </Checkbox>
          </Row>
          {useCompany && (
            <Form.Item label={translate('Company')} name="companyId">
              <Select disabled={context.id === 3 ? true : false}>
                {companies.map((e, index) => (
                  <Select.Option key={index} value={e.id}>
                    {e.viName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  )
}
