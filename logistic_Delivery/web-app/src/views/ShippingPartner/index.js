import { Typography, Row, Button, Col, Input, DatePicker, Table } from 'antd';
import { getShipping } from 'apis/shipping';
import { ROUTES } from 'consts';
import React, { useEffect, useState } from 'react';
import { translate } from 'utils/i18n';
import CreatePartner from './CreatePartner';
import shippingPartnerColumns from './shippingPartnerColumns';
import UpdatePartner from './updatePartner';
export default function ShippingPartner() {
  const [partnerList, setPartnerList] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [initValue, setInitvalue] = useState([]);
  const getPartner = async (params) => {
    try {
      const res = await getShipping(params);
      if (res.data.success) {
        setPartnerList(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onShowUpdate = () => {
    let tmp = [];
    selectedRowKeys.map((e) => {
      const res = partnerList.find((p) => p.id == e);
      tmp.push({
        id: res.id,
        avt: res.avt,
        name: res.name,
        tel: res.tel,
      });
    });
    setInitvalue(tmp);
    setShowUpdate(true);
  };
  useEffect(() => {
    getPartner();
  }, []);
  return (
    <div>
      <Row justify="space-between">
        <Typography.Title level={4}>
          {translate('Shipping partner')}
        </Typography.Title>
        <Button type="primary" onClick={() => setShowCreate(true)}>
          {translate('Create shipping partner')}
        </Button>
      </Row>
      <Row gutter={30} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Input
            placeholder={translate('Search by partner name')}
            onChange={(e) =>
              getPartner(e.target.value && { name: e.target.value })
            }
          />
        </Col>
        {/* <Col span={8}>
          <DatePicker.RangePicker />
        </Col> */}
      </Row>
      <Row style={{ marginBottom: 15 }}>
        {selectedRowKeys.length > 0 && (
          <Button type="primary" onClick={onShowUpdate}>
            {translate('Update partner')}
          </Button>
        )}
      </Row>
      <Table
        columns={shippingPartnerColumns}
        dataSource={partnerList}
        rowKey="id"
        rowSelection={rowSelection}
        size="small"
        scroll={{ y: 380 }}
      />
      <CreatePartner
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        reload={getPartner}
      />
      <UpdatePartner
        visible={showUpdate}
        onClose={() => setShowUpdate(false)}
        reload={getPartner}
        initvalue={initValue}
      />
    </div>
  );
}
