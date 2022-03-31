import React, { useEffect, useState } from 'react'
import './index.scss'

//components antd
import { Form, Input, Row, Col, InputNumber, Select, Checkbox } from 'antd'

import { translate } from 'utils/i18n'
import formatNumber from 'utils/formatNumber'

//components
import CustomSpace from 'components/CustomSpace'

const PackageForm = ({
  initialPackage,
  form,
  required,
  setIsUpdate,
  isUpdate,
}) => {
  const _getRequiredRule = (field) => {
    return {
      required: true,
      message: translate('Please input {value}', translate(field)),
    }
  }

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 14,
      offset: 1,
    },
  }

  return (
    <Form
      initialValues={{
        ...initialPackage,
        cod:
          initialPackage &&
          initialPackage.fee.cod &&
          formatNumber(initialPackage.fee.cod),
        cost:
          initialPackage &&
          initialPackage.fee.cost &&
          formatNumber(initialPackage.fee.cost),
      }}
      form={form}
      {...layout}
      onFieldsChange={(changedFields, allFields) => {
        if (!isUpdate && typeof setIsUpdate === 'function') {
          setIsUpdate(true)
        }

        if (
          changedFields[0].name[0] === 'gross' ||
          changedFields[0].name[0] === 'width'
        ) {
          const gw = form.getFieldValue('gross')
          const number = form.getFieldValue('width')
          if (gw && number) {
            form.setFieldsValue({
              cost: gw * number && formatNumber(gw * number),
            })
          } else
            form.setFieldsValue({
              cost: '',
            })
        }

        if (
          changedFields[0].name[0] === 'height' ||
          changedFields[0].name[0] === 'width' ||
          changedFields[0].name[0] === 'length'
        ) {
          const height = form.getFieldValue('height')
          const width = form.getFieldValue('width')
          const length = form.getFieldValue('length')

          if (height && width && length) {
            form.setFieldsValue({
              volume: ((height * width * length) / Math.pow(10, 6)).toFixed(3),
            })
          } else form.setFieldsValue({ volume: '' })
        }
      }}
    >
      <Row>
        <CustomSpace type="horizontal">
          <Form.Item
            style={{
              width: 350,
            }}
            name="cartonNo"
            label={translate('PKG No')}
            rules={[
              {
                ..._getRequiredRule('PKG No'),
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="pkgType"
            label={translate('Package Type')}
            rules={[
              {
                ..._getRequiredRule('Package Type'),
                required: true,
              },
            ]}
          >
            <Select>
              <Select.Option value="Loose carton">
                {translate('Loose carton')}
              </Select.Option>
              <Select.Option value="Pallet">
                {translate('Pallet')}
              </Select.Option>
              <Select.Option value="Wooden crate">
                {translate('Wooden crate')}
              </Select.Option>
              <Select.Option value="Bag">{translate('Bag')}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="net"
            label={translate('NW')}
            required
            rules={[
              {
                ..._getRequiredRule('Net must be number type!'),
                required: true,
              },
            ]}
          >
            <InputNumber
              Number
              min={0}
              style={{
                width: '100%',
              }}
              className="kg"
            />
          </Form.Item>

          <Row>
            <Form.Item
              style={{
                width: 350,
              }}
              name="gross"
              required
              label={translate('GW')}
              rules={[
                {
                  ..._getRequiredRule('Gross must be number type!'),
                  required: true,
                },
              ]}
            >
              <InputNumber
                Number
                min={0}
                style={{
                  width: '100%',
                }}
                className="kg"
              />
            </Form.Item>
          </Row>

          <Form.Item
            style={{
              width: 350,
            }}
            name="height"
            required
            label={translate('Height')}
            rules={[
              {
                ..._getRequiredRule('Height must be number type!'),
                required: true,
              },
            ]}
          >
            <InputNumber
              Number
              min={0}
              style={{
                width: '100%',
              }}
              className="cm"
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="width"
            required
            label={translate('Width')}
            rules={[
              {
                ..._getRequiredRule('Width must be number type!'),
                required: true,
              },
            ]}
          >
            <InputNumber
              Number
              min={0}
              style={{
                width: '100%',
              }}
              className="cm"
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="length"
            required
            label={translate('Length')}
            rules={[
              {
                ..._getRequiredRule('Length must be number type!'),
                required: true,
              },
            ]}
          >
            <InputNumber
              Number
              min={0}
              style={{
                width: '100%',
              }}
              className="cm"
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            required
            name="cod"
            label={translate('Cod')}
            rules={[
              {
                ..._getRequiredRule('Cod must be number type!'),
                required: true,
              },
            ]}
          >
            <InputNumber
              min={0}
              style={{
                width: '100%',
              }}
              onBlur={() => {
                form.setFieldsValue({
                  cod: formatNumber(
                    form.getFieldValue('cod') && form.getFieldValue('cod')
                  ),
                })
              }}
              onFocus={(e) => {
                form.setFieldsValue({
                  cod:
                    form.getFieldValue('cod') &&
                    (form.getFieldValue('cod') + '').replace(/,/g, ''),
                })
              }}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="volume"
            label={translate('Volume')}
          >
            <InputNumber
              min={0}
              style={{
                width: '100%',
              }}
              disabled
              className="m"
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="numItem"
            label={translate('Number of Items')}
          >
            <InputNumber
              min={0}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="pcs"
            label={translate('PCS')}
          >
            <InputNumber
              min={0}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: 350,
            }}
            label={translate('RW')}
          >
            <InputNumber
              min={0}
              style={{
                width: '100%',
              }}
              className="kg"
              disabled
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 350,
            }}
            name="cost"
            label={translate('Cost')}
          >
            <InputNumber
              min={0}
              style={{
                width: '100%',
              }}
              disabled
            />
          </Form.Item>
          <Form.Item
            style={{
              width: 350,
            }}
            name="coCheck"
            valuePropName="checked"
            label={translate('Co Check')}
          >
            <Checkbox value={1}></Checkbox>
          </Form.Item>
        </CustomSpace>
      </Row>
      <Form.Item
        labelCol={{ span: 24, offset: 1 }}
        name="note"
        label={translate('Description')}
      >
        <Input.TextArea rows={5} style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  )
}

PackageForm.defaultProps = {
  required: true,
}

export default PackageForm
