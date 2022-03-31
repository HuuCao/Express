import React, { useState, useEffect, useContext, useRef } from 'react';

//component antd
import {
  Button,
  Form,
  message,
  Select,
  InputNumber,
  notification,
  Input,
  Checkbox,
  Modal,
} from 'antd';

//icon antd
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { translate } from 'utils/i18n';
import { INVOICE_TYPE, ROUTES, ACTION } from 'consts';
import { useHistory } from 'react-router-dom';
import Context from 'utils/Context';

//apis
import { generateInvoiceNo, getLastInvoiceNo } from 'apis/shipments';
import { getCompanies } from 'apis/companies';

export default () => {
  const context = useContext(Context);
  const history = useHistory();

  const [visible, setVisible] = useState(false);

  //shipment
  const [invoiceType, setInvoiceType] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [numberLast, setNumberLast] = useState('');
  const [invoiceNoLast, setInvoiceNoLast] = useState('');
  const [form] = Form.useForm();

  //shipper create option
  const [shipperName, setShipperName] = useState('');
  const [shipperAddress, setShipperAddress] = useState('');
  const [shipperPhone, setShipperPhone] = useState('');
  const [shipperCorporateNumber, setShipperCorporateNumber] = useState('');
  const [shipperConsigneeStandard, setShipperConsigneeStandard] = useState('');

  const [message, setMessage] = useState({});
  const [invoiceIndex, setInvoiceIndex] = useState('');

  const [isUseCustom, setIsUseCustom] = useState(false);

  const _validateShipment = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (error) {
      return false;
    }
  };

  const _getInvoiceNo = async () => {
    try {
      const res = await getLastInvoiceNo();
      console.log(res);
      if (res.status === 200) {
        const invoice = res.data.invoiceNew;
        const stringInvoice = invoice.split('-');
        setInvoiceNo(stringInvoice[0]);
        setInvoiceNoLast(stringInvoice);
        setNumberLast(stringInvoice[1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInvoiceNo = async (prefixInvoiceNo) => {
    const response = await generateInvoiceNo(prefixInvoiceNo);
    console.log(response);
    if (response.status === 200 && response.data) {
      let indexInvoice, codeInvoice;
      response.data
        .replace(context.customerId, '')
        .replace(/(^.+)(-\d+$)/g, (match, g1, g2) => {
          indexInvoice = `-${Number(g2.replace('-', '')) + 1}`;
          codeInvoice = g1;
        });
      return [codeInvoice, indexInvoice];
    }
    if (!prefixInvoiceNo) {
      return ['', '-1'];
    }
    return [prefixInvoiceNo.replace(context.customerId, ''), '-1'];
  };

  const _generateInvoiceNo = async () => {
    const [codeInvoice, indexInvoice] = await getInvoiceNo();
    setInvoiceNo(codeInvoice);
    setInvoiceIndex(indexInvoice);
  };

  const _toggleModal = () => setVisible(!visible);

  const _onSelectInvoiceType = (value) => {
    setInvoiceType(value);
    setMessage({});
  };

  const _getCompanies = async () => {
    try {
      const res = await getCompanies();
      console.log(res);
      if (res.status === 200) {
        for (let i = 0; i < res.data.data.length; ++i) {
          if (context.companyId == res.data.data[i].id) {
            setCompanyCode(res.data.data[i].companyCode);
            break;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _onChangeInvoiceNo = (value) => {
    setInvoiceNo(value.replace(/\D/g, ''));
  };
  const _onChangeTaxCode = ({ target: { value } }) => {
    setShipperCorporateNumber(value);
  };
  const _onChangeTel = ({ target: { value } }) => {
    setShipperPhone(value);
  };
  const _onChangeShipperName = ({ target: { value } }) => {
    setShipperName(value);
  };
  const _onChangeAddress = ({ target: { value } }) => {
    setShipperAddress(value);
  };
  const _onChangeExpCode = ({ target: { value } }) => {
    setShipperConsigneeStandard(value);
  };
  const onChangeCheckbox = ({ target: { checked } }) => {
    if (checked === false) {
      setShipperCorporateNumber('');
      setShipperPhone('');
      setShipperCorporateNumber('');
      setShipperConsigneeStandard('');
      setShipperAddress('');
    }
    setIsUseCustom(checked);
  };

  const _onOk = async () => {
    if (invoiceType.trim() === '') {
      setMessage({
        invoiceType: translate(
          'Please input {value}',
          translate('Invoice Type')
        ),
      });
      return;
    }
    if (invoiceNo.trim() === '') {
      setMessage({
        invoiceNo: translate('Please input {value}', translate('Invoice No')),
      });
      return;
    }

    if (invoiceNo.length != 3) {
      notification.warning({
        message: 'Warning',
        description: 'InvoiceNo is 3 characters',
      });
      return;
    }

    const validated = await _validateShipment();
    if (!validated) return;

    // context.dispatch({ name: ACTION.LOADING, data: true })
    // const [codeInvoice, indexInvoice] = await getInvoiceNo(
    //   context.customerId + invoiceNo
    // )
    // context.dispatch({ name: ACTION.LOADING, data: false })

    //random two number
    const prefixInvoiceNo = Math.floor(Math.random() * (99 - 10)) + 10;

    history.push(ROUTES.CREATE_SHIPMENT, {
      invoiceType,
      invoiceNo: 'DEV' + invoiceNo + '-' + numberLast,
      shipperName: shipperName || null,
      shipperAddress: shipperAddress || null,
      shipperPhone: shipperPhone || null,
      shipperCorporateNumber: shipperCorporateNumber || null,
      shipperConsigneeStandard: shipperConsigneeStandard || null,
    });
  };

  useEffect(() => {
    _getCompanies();
    _getInvoiceNo();
  }, []);

  useEffect(() => {
    //reset field khi open modal
    if (visible) {
      //shipper value
      setShipperName('');
      setShipperAddress('');
      setShipperPhone('');
      setShipperCorporateNumber('');
      setShipperConsigneeStandard('');

      _getInvoiceNo();
    }
  }, [visible]);

  return (
    <>
      <Button type="primary" href={ROUTES.CREATE_SHIPMENT}>
        {translate('Create Shipment')}
      </Button>
      <Modal
        title={translate('Choose Invoice Type')}
        visible={visible}
        onCancel={_toggleModal}
        onOk={_onOk}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={translate('Invoice Type')}
            validateStatus={message.invoiceType && 'error'}
            help={message.invoiceType}
            required
          >
            <div>
              <Select onSelect={_onSelectInvoiceType}>
                {Object.keys(INVOICE_TYPE).map((type, index) => (
                  <Select.Option value={INVOICE_TYPE[type]} key={index}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item
            required
            label={translate('Invoice No')}
            validateStatus={message.invoiceNo && 'error'}
            help={message.invoiceNo}
          >
            <div>
              <Input
                addonBefore="DEV"
                value={invoiceNo}
                addonAfter={numberLast}
                onChange={(e) => {
                  const value = e.target.value;
                  _onChangeInvoiceNo(value);

                  //nếu user điền 3 số khác với 3 số invoiceNo cuối cùng thì mặc định 2 số cuối là 01
                  //ngược lại nếu user điền 3 số giống với 3 số invoiceNo cuối cùng thì sẽ điền
                  //2 số cuối của invoiceNo cuối cùng
                  if (value == invoiceNoLast[0])
                    setNumberLast(invoiceNoLast[1]);
                  else setNumberLast('1');
                }}
                style={{ width: 300 }}
                allowClear
              />
            </div>
          </Form.Item>
          <Checkbox checked={isUseCustom} onChange={onChangeCheckbox}>
            {translate('Use Custom Information')}
          </Checkbox>
          {isUseCustom && (
            <div>
              <Form.Item
                label={translate('Shipper Name')}
                required
                name="nameShipper"
                rules={[
                  {
                    required: false,
                    message: 'Please input shipper name',
                  },
                ]}
              >
                <div>
                  <Input
                    value={shipperName}
                    onChange={_onChangeShipperName}
                    style={{ width: 300 }}
                    allowClear
                  />
                </div>
              </Form.Item>
              <Form.Item
                label={translate('Address')}
                required
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input address',
                  },
                ]}
              >
                <div>
                  <Input
                    value={shipperAddress}
                    onChange={_onChangeAddress}
                    style={{ width: 300 }}
                    allowClear
                  />
                </div>
              </Form.Item>
              <Form.Item
                label={translate('Tel')}
                required
                name="tel"
                rules={[
                  {
                    required: true,
                    message: 'Please input tel',
                  },
                ]}
              >
                <div>
                  <Input
                    value={shipperPhone}
                    onChange={_onChangeTel}
                    style={{ width: 300 }}
                    allowClear
                  />
                </div>
              </Form.Item>
              <Form.Item
                label={`${translate(
                  'Corporate Number'
                )} (Tax ID / Hojin Bango)`}
              >
                <div>
                  <Input
                    value={shipperCorporateNumber}
                    onChange={_onChangeTaxCode}
                    style={{ width: 300 }}
                    allowClear
                  />
                </div>
              </Form.Item>
              <Form.Item
                label={translate('Japan Shippers & Consignees Standard Code')}
              >
                <div>
                  <Input
                    value={shipperConsigneeStandard}
                    onChange={_onChangeExpCode}
                    style={{ width: 300 }}
                    allowClear
                  />
                </div>
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};
