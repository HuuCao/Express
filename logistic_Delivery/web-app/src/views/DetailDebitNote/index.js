import React, { useState, useEffect, useContext } from 'react';

//components antd
import {
  Space,
  Form,
  Divider,
  Row,
  Button,
  notification,
  Typography,
  Col,
  Card,
  Table,
} from 'antd';

//router
import { useParams, useLocation, useHistory } from 'react-router-dom';

import { ACTION } from 'consts';
import Context from 'utils/Context';
import formatNumber from 'utils/formatNumber';
import { translate } from 'utils/i18n';
import packageColumns from './packageColumns';
import moment from 'moment';

//apis
import { getPackagesByShipmentId } from 'apis/packages';

//components
import Title from './Title';
import ShipmentForm from 'components/OrderForm';
import ShipperForm from 'components/ShipperForm';
import Consignee from 'components/Consignee&NotifiParty';

export default () => {
  const context = useContext(Context);
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [shipmentForm] = Form.useForm();
  const [packages, setPackages] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [totalCodRefund, setTotalCodRefund] = useState(0);
  const [totalCostPaid, setTotalCostPaid] = useState(0);

  const _getPackagesByShipmentId = async () => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true });
      const res = await getPackagesByShipmentId(params.idShipment);
      console.log(res);
      if (res.status === 200) {
        let sumCod = 0;
        let sumCost = 0;
        res.data.map((e) => {
          if (e.fee && !e.fee.isPaidDone) sumCost += e.fee.cost;
          if (e.fee && !e.fee.isRefundDone) sumCod += e.fee.cod;
        });

        setTotalCodRefund(sumCod);
        setTotalCostPaid(sumCost);
        setPackages(res.data);
      }

      context.dispatch({ name: ACTION.LOADING, data: false });
    } catch (error) {
      console.log(error);
      context.dispatch({ name: ACTION.LOADING, data: false });
    }
  };

  useEffect(() => {
    if (!location.state) {
      history.goBack();
      return;
    } else {
      setShipments({
        ...location.state,
        shippingDate: moment(location.state.shippingDate),
      });
      shipmentForm.setFieldsValue({
        ...location.state,
        shippingDate: moment(location.state.shippingDate),
      });
    }
  }, []);

  useEffect(() => {
    _getPackagesByShipmentId();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Title title={location.state && location.state.invoiceNo} />
        <Button type="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? translate('Hidden') : translate('Show More')}
        </Button>
      </Row>
      <ShipmentForm
        initialShipment={shipments}
        form={shipmentForm}
        disabled={true}
        required={true}
      />
      <br />

      <Col style={{ display: showForm ? '' : 'none' }}>
        <Divider
          style={{
            margin: 0,
            backgroundColor: '#d0d0d0',
            height: 1,
          }}
        />
        <Typography.Title
          level={4}
          style={{
            color: 'rgba(0, 0, 0, 0.85)',
          }}
        >
          {translate('Shipper')}
        </Typography.Title>

        <ShipperForm
          form={shipmentForm}
          initialValues={shipments}
          disabled={true}
        />

        <Divider
          style={{
            margin: 0,
            backgroundColor: '#d0d0d0',
            height: 1,
          }}
        />
        <Typography.Title
          level={4}
          style={{
            color: 'rgba(0, 0, 0, 0.85)',
          }}
        >
          {translate('Cosignee & Notify Party')}
        </Typography.Title>
        <Consignee
          form={shipmentForm}
          initialValues={shipments}
          disabled={true}
        />
        <Divider style={{ height: 1, backgroundColor: '#d0d0d0' }} />
      </Col>

      <Row justify="end">
        <Card style={{ width: 250 }} title={translate('Total Cod Need Refund')}>
          {formatNumber(totalCodRefund)} VNĐ
        </Card>
        <Card
          style={{ width: 250, marginLeft: 10 }}
          title={translate('Total Cost Need Paid')}
        >
          {formatNumber(totalCostPaid)} VNĐ
        </Card>
      </Row>

      <Divider style={{ height: 1, backgroundColor: '#d0d0d0' }} />

      <Col>
        <Typography.Title level={4}>{translate('Packages')}</Typography.Title>
        <Table
          size="small"
          columns={packageColumns}
          dataSource={packages}
          scroll={{ y: 380 }}
        />
      </Col>
    </>
  );
};
