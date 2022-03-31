import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography, Row, Divider, Form, Upload } from 'antd';
import { ROUTES } from 'consts';
import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'utils/i18n';
export default function CreateShippingPartner() {
  return (
    <div>
      <Row>
        <Typography.Title level={4}>
          <Link to={ROUTES.SHIPPING_PARTNER}>
            <ArrowLeftOutlined style={{ marginRight: 7 }} />
          </Link>
          {translate('Create shipping partner')}
        </Typography.Title>
      </Row>
      <Divider />
      <div></div>
    </div>
  );
}
