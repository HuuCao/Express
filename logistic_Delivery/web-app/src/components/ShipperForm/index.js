import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, Row } from 'antd'
import CustomSpace from 'components/CustomSpace'
import { translate } from 'utils/i18n'

export default ({ form, initialValues, disabled, isUpdate, setIsUpdate }) => {
  //check user is update
  const _onFieldsChange = () => {
    if (!isUpdate && typeof setIsUpdate === 'function') setIsUpdate(true)
  }

  useEffect(() => {
    if (initialValues.user && initialValues.user.company) {
      let cpn = initialValues.user.company
      initialValues.shipperName =
        initialValues.shipperName != null ? initialValues.shipperName : cpn.name
      initialValues.shipperAddress =
        initialValues.shipperAddress != null
          ? initialValues.shipperAddress
          : cpn.address
      initialValues.shipperPhone =
        initialValues.shipperPhone != null
          ? initialValues.shipperPhone
          : cpn.tel
      initialValues.shipperCorporateNumber =
        initialValues.shipperCorporateNumber != null
          ? initialValues.shipperCorporateNumber
          : cpn.taxCode
      initialValues.shipperConsigneeStandard =
        initialValues.shipperConsigneeStandard != null
          ? initialValues.shipperConsigneeStandard
          : cpn.expCode
    }
  }, [initialValues])

  return (
    <Form
      form={form}
      initialValues={initialValues}
      labelAlign="left"
      labelCol={{
        span: 13,
        style: {
          whiteSpace: 'normal',
        },
      }}
    >
      <Row>
        <CustomSpace type="horizontal">
          <Form.Item
            style={{
              width: 300,
            }}
            name="shipperName"
            label={translate('Shipper Name')}
            // rules={[
            //   {
            //     required: true,
            //     message: translate(
            //       'Please input {value}!',
            //       translate('Shipper Name')
            //     ),
            //   },
            // ]}
            // required
          >
            <Input disabled={disabled} onChange={_onFieldsChange} />
          </Form.Item>
          <Form.Item
            style={{
              width: 300,
            }}
            name="shipperAddress"
            label={translate('Address')}
            // rules={[
            //   {
            //     required: true,
            //     message: translate(
            //       'Please input {value}!',
            //       translate('Address')
            //     ),
            //   },
            // ]}
            // required
          >
            <Input disabled={disabled} onChange={_onFieldsChange} />
          </Form.Item>
          <Form.Item
            style={{
              width: 300,
            }}
            // required
            // rules={[
            //   {
            //     required: true,
            //     message: translate(
            //       'Please input {value}!',
            //       translate('uTelephone')
            //     ),
            //   },
            // ]}
            name="shipperPhone"
            label={translate('Telephone')}
          >
            <Input disabled={disabled} onChange={_onFieldsChange} />
          </Form.Item>
          <Form.Item
            style={{
              width: 555,
            }}
            name="shipperCorporateNumber"
            label={translate('Corporate Number') + ' Tax ID / Hojin Bango'}
          >
            <Input disabled={disabled} onChange={_onFieldsChange} />
          </Form.Item>
          <Form.Item
            style={{
              width: 555,
            }}
            name="shipperConsigneeStandard"
            label={translate('Japan Shippers & Consignees Standard Code')}
          >
            <Input disabled={disabled} onChange={_onFieldsChange} />
          </Form.Item>
        </CustomSpace>
      </Row>
    </Form>
  )
}
