import React from 'react';
import { Row, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { translate } from 'utils/i18n';
import { DoubleLeftOutlined } from '@ant-design/icons';

export default () => {
  const history = useHistory();

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "90vh",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          position: "relative",
          height: "fit-content"
        }}
      >
        <span
          style={{
            fontSize: "20vw",
            fontWeight: "lighter"
          }}
        >
          {translate("OOPS!")}
        </span>
        <div
          style={{
            fontSize: "3vw",
            fontWeight: "lighter",
            position: "absolute",
            backgroundColor: "#ffffff",
            bottom: 0,
            transform: "translate(50%, -150%)"
          }}
        >
          {translate("404 - Page Not Found")}
        </div>
      </div>
      <Button size="small"
        type="primary"
        size="large"
        onClick={history.goBack}
      >
        <DoubleLeftOutlined />
        {translate("Go Back")}
      </Button>
    </Row>
  )
}