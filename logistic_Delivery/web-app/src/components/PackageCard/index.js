import React from 'react'
import { Card, Form, Row, Col, Divider, Button } from 'antd'
import { translate } from 'utils/i18n'
import EllipsisText from 'components/EllipsisText'

export default ({ onClick, initialPackage, form, disabled, text }) => {
  const SpanValue = ({ value }) => (
    <EllipsisText width={50}>
      <span>{value}</span>
    </EllipsisText>
  )
  const _getRequiredRule = (field) => {
    return {
      required: true,
      message: translate('Please input {value}', translate(field)),
    }
  }
  const _renderPackage = (
    <Form
      form={form}
      initialValues={initialPackage}
      labelAlign="left"
      labelCol={{
        span: 12,
      }}
      style={{
        width: 300,
      }}
    >
      <Row>
        <Form.Item
          style={{
            width: 150,
          }}
          label={translate('Carton No')}
          rules={[_getRequiredRule('Carton No')]}
          name="cartonNo"
        >
          <SpanValue />
        </Form.Item>
        <Form.Item
          style={{
            width: 100,
          }}
          label={translate('Net')}
          rules={[_getRequiredRule('Net')]}
          labelCol={{
            span: 8,
          }}
          name="net"
        >
          <SpanValue />
        </Form.Item>
        <Form.Item
          style={{
            width: 100,
          }}
          label={translate('Gross')}
          rules={[_getRequiredRule('Gross')]}
          name="gross"
        >
          <SpanValue />
        </Form.Item>
        <Form.Item
          style={{
            width: 100,
          }}
          label={translate('Height')}
          rules={[_getRequiredRule('Height')]}
          labelCol={{
            span: 8,
          }}
          name="height"
        >
          <SpanValue />
        </Form.Item>
        <Form.Item
          style={{
            width: 100,
          }}
          label={translate('Width')}
          rules={[_getRequiredRule('Width')]}
          name="width"
        >
          <SpanValue />
        </Form.Item>
        <Form.Item
          style={{
            width: 100,
          }}
          label={translate('Length')}
          rules={[_getRequiredRule('Length')]}
          labelCol={{
            span: 8,
          }}
          name="length"
        >
          <SpanValue />
        </Form.Item>
      </Row>
    </Form>
  )

  return initialPackage ? (
    <Card
      style={{
        marginBottom: 8,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {_renderPackage}
    </Card>
  ) : (
    <Button type="primary" onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  )
}
