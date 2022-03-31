import React from 'react'
import { Form, Input, Row } from 'antd'
import CustomSpace from 'components/CustomSpace'
import { translate } from 'utils/i18n'

export default ({ initialValues, form, disabled, isUpdate, setIsUpdate }) => {
  //check user is update
  const _onFieldsChange = () => {
    if (!isUpdate && typeof setIsUpdate === 'function') setIsUpdate(true)
  }

  return (
    <Form
      labelAlign="left"
      labelCol={{
        span: 10,
        style: {
          whiteSpace: 'normal',
        },
      }}
      initialValues={initialValues}
      form={form}
      onFieldsChange={_onFieldsChange}
    >
      <Row>
        <CustomSpace type="horizontal">
          <Form.Item
            style={{
              width: 270,
            }}
            name="cneeName"
            label={translate('Cnee Name')}
            // rules={[
            //   {
            //     required: true,
            //     message: translate(
            //       'Please input {value}!',
            //       translate('Cnee Name')
            //     ),
            //   },
            // ]}
            // required
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            style={{
              width: 270,
            }}
            name="cneeAddress"
            label={translate('Cnee Address')}
            // rules={[
            //   {
            //     required: true,
            //     message: translate(
            //       'Please input {value}!',
            //       translate('Cnee Address')
            //     ),
            //   },
            // ]}
            // required
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            style={{
              width: 270,
            }}
            name="cneePhone"
            label={translate('Cnee Phone')}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            style={{
              width: 270,
            }}
            name="cneeEmail"
            label={translate('Cnee Email')}
          >
            <Input disabled={disabled} />
          </Form.Item>
        </CustomSpace>
      </Row>
      <Row>
        <CustomSpace type="horizontal">
          <Form.Item
            style={{
              width: 270,
            }}
            name="npName"
            label={translate('NP Name')}
            rules={[
              {
                message: translate(
                  'Please input {value}!',
                  translate('NP Name')
                ),
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            style={{
              width: 270,
            }}
            name="npAddress"
            label={translate('NP Address')}
            rules={[
              {
                message: translate(
                  'Please input {value}!',
                  translate('NP Address')
                ),
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            style={{
              width: 270,
            }}
            name="npPhone"
            label={translate('NP Phone')}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            style={{
              width: 270,
            }}
            name="npEmail"
            label={translate('NP Email')}
          >
            <Input disabled={disabled} />
          </Form.Item>
        </CustomSpace>
      </Row>
    </Form>
  )
}
