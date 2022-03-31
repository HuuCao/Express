import React, {
  Fragment,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Radio,
  Checkbox,
  Col,
  Space,
  notification,
} from 'antd'
import { t, translate } from 'utils/i18n'
import { PlusOutlined } from '@ant-design/icons'
import { createCompanies } from 'apis/companies'

const CreateCompanyModal = (props, ref) => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    toggleModal: _toggleModal,
    visible,
  }))

  useEffect(() => {
    if (visible) {
      form.resetFields()
    }
  }, [visible])

  const _toggleModal = () => setVisible(!visible)

  const onCreateCompany = async () => {
    let isValidate = true
    try {
      await form.validateFields()
    } catch (e) {
      isValidate = false
    }
    if (!isValidate) {
      return
    }
    let body = await form.getFieldsValue()
    body.isActive = 1
    body.effort_prices = {
      cost_per_kg: body.cost_per_kg,
      type_cal: body.type_cal,
    }

    delete body.cost_per_kg
    delete body.type_cal

    const response = await createCompanies(body)

    if (response.status === 200) {
      setVisible(false)
      // //điền value id vào field company sau khi
      // //tạo thành công company ở modal create user
      // props.setCompanyIdValue(response.data.id)

      //load lại all company page Companies
      props.getInitialCompanies()

      notification.success({
        message: translate('Success'),
      })
    } else {
      notification.error({
        message: translate('Error'),
        description: (
          <div style={{ maxHeight: 100, overflow: 'auto' }}>
            {response.data.message &&
              response.data.message
                .split(',')
                .map((text) => <div>{translate(text)}</div>)}
          </div>
        ),
      })
    }
  }
  return (
    <Fragment>
      <a
        onClick={props.onClick}
        style={{
          flex: 'none',
          padding: 0,
          display: 'block',
          cursor: 'pointer',
        }}
      >
        {translate('Create Company')}
      </a>

      <Modal
        width="60%"
        className=""
        title={translate('Create Company')}
        visible={visible}
        onOk={onCreateCompany}
        onCancel={_toggleModal}
        confirmLoading={confirmLoading}
      >
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
        >
          <Row type="flex" justify="space-between" gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                style={{}}
                name={`enName`}
                label={`EN Name`}
                rules={[
                  {
                    required: true,
                    message: 'Please input EN Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{}}
                name={`oriName`}
                label={`Ori Name`}
                rules={[
                  {
                    required: true,
                    message: 'Please input Ori Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input VI Name!',
                  },
                ]}
                name={`viName`}
                label={`VI Name`}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Other Name!',
                  },
                ]}
                name={`otherName`}
                label={`Other Name`}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{}}
                name={`viAddress`}
                label={`VI Address`}
                rules={[
                  {
                    required: true,
                    message: 'Please input VI Address!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{}}
                name={`enAddress`}
                label={`EN Address`}
                rules={[
                  {
                    required: true,
                    message: 'Please input EN Address!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Ori Address!',
                  },
                ]}
                name={`oriAddress`}
                label={`Ori Address`}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input tel!',
                  },
                ]}
                name={`tel`}
                label={`Tel`}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Exp Code!',
                  },
                ]}
                name={`expCode`}
                label={`Exp Code`}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Tax Code!',
                  },
                ]}
                name={`taxCode`}
                label={`Tax Code`}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Cell Phone!',
                  },
                ]}
                name="cellPhone"
                label={translate('Cell Phone')}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Company Code!',
                  },
                ]}
                name="companyCode"
                label={translate('Company Code')}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Representative!',
                  },
                ]}
                name="representative"
                label={translate('Representative')}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Recipe!',
                  },
                ]}
                name="cost_per_kg"
                label={translate('Cost per kg')}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Recipe!',
                  },
                ]}
                name="type_cal"
                label={translate('Type Cal')}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Type!',
                  },
                ]}
                name="type"
                label={translate('Type')}
              >
                <Select>
                  <Select.Option value="Agency">Agency</Select.Option>
                  <Select.Option value="ShipperCompany">
                    ShipperCompany
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default forwardRef(CreateCompanyModal)
