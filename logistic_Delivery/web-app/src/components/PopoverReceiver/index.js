import React from 'react'
import './index.scss'

import { Col, Typography, Popover } from 'antd'

import avatar from 'assets/img/avatar.svg'

export default ({ receiver }) => (
  <Popover
    placement="topRight"
    content={
      <Col>
        <h3 style={{ marginBottom: 0 }}>
          Name: {receiver.customer_receiver.name}
        </h3>
        <h3 style={{ marginBottom: 0 }}>
          Phone: {receiver.customer_receiver.phone}
        </h3>
        <h3 style={{ marginBottom: 0 }}>
          Tel: {receiver.customer_receiver.tel}
        </h3>
        <h3 style={{ marginBottom: 0 }}>
          Email: {receiver.customer_receiver.email}
        </h3>
        <h3 style={{ marginBottom: 0 }}>
          Address: {receiver.customer_receiver.address}
        </h3>
      </Col>
    }
  >
    <Col>
      <img
        src={avatar}
        alt="avatar customer"
        style={{ width: 20, height: 20 }}
      />
      <Typography.Title level={5} className="name-customer">
        {receiver.customer_receiver.name}
      </Typography.Title>
    </Col>
  </Popover>
)
