import React from 'react'
import { useHistory, Redirect, Link } from 'react-router-dom'
import { Space, Row, Typography, Modal } from 'antd'
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { translate } from 'utils/i18n'
import { ROUTES } from '../../../../consts'

export default ({
  left,
  right,
  title,
  backable,
  afterTitle,
  onBack,
  isPackageDetail,
}) => {
  const history = useHistory()
  const _translationValue = []

  if (typeof title === 'string') {
    _translationValue.push(title)
  } else {
    _translationValue.push(...title)
  }
  const onClickBack = () => {
    if (onBack) {
      Modal.confirm({
        title: 'Attention',
        icon: <ExclamationCircleOutlined />,
        content: 'Please save before you exit this page!',
      })
    } else {
      if (history.length <= 1) {
        history.push('/')
      } else {
        history.goBack()
      }
    }
  }
  return (
    <Row justify="space-between">
      <Space>
        {left || (
          <Typography.Title level={4}>
            <Space>
              {backable && (
                <ArrowLeftOutlined
                  onClick={onClickBack}
                  style={{ color: '#0082ff' }}
                />
              )}
              {translate(..._translationValue)}
              {afterTitle}
            </Space>
          </Typography.Title>
        )}
      </Space>
      <Space>
        {React.Children.map(right, (child, index) =>
          React.cloneElement(child, { key: index })
        )}
      </Space>
    </Row>
  )
}
