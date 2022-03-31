import React from 'react'
import { Row, Typography } from 'antd'
import { translate } from 'utils/i18n'
import { useHistory } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default () => {
  const history = useHistory()

  return (
    <Row justify="space-between" align="middle">
      <Typography.Title level={4}>
        <ArrowLeftOutlined
          onClick={() => history.goBack()}
          style={{ color: '#0082ff', marginRight: '8px' }}
        />
        {translate(`Danh sách vai trò`)}
      </Typography.Title>
    </Row>
  )
}
