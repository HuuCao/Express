// react
import React, { useState, useEffect } from 'react';
// antd
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Table,
  Modal,
  Checkbox,
  notification,
} from 'antd';
// components
import { orderScan } from 'apis/order';
import searchColumns from './searchColumns';
import { formatNumber } from 'utils';
import moment from 'moment';
import ReactDragListView from 'react-drag-listview';
// style
import styles from './search.module.scss';
import SettingColumns from 'components/setting-column';
export default function SearchBill() {
  const [displayColumns, setDisplayColumns] = useState([]);
  const [showSettingColumns, setShowSettingColumns] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [matchNotify, setMatchNotify] = useState(false);
  const [columns, setColumns] = useState(
    localStorage.getItem('searchColumns')
      ? JSON.parse(localStorage.getItem('searchColumns'))
      : [...searchColumns]
  );
  const tableColumnRender = {
    0: {
      align: 'center',
      render: (text, record, index) => (
        <span style={{ fontSize: '10pt' }}>{index + 1}</span>
      ),
    },
    1: {
      align: 'center',
      render(data) {
        return data && moment(data).format('DD/MM/YYYY');
      },
    },
    2: {
      align: 'center',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{data}</span>;
      },
    },
    3: {
      align: 'center',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{data}</span>;
      },
    },
    4: {
      align: 'center',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{data}</span>;
      },
    },
    5: {
      align: 'center',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{data && data.customer_code}</span>
        );
      },
    },
    6: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    7: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    8: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    9: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    10: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} kg</span>
        );
      },
    },
    11: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>
            {formatNumber(data)} m<sup>3</sup>
          </span>
        );
      },
    },
    12: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    13: {
      align: 'right',
      render(data) {
        return <span style={{ fontSize: '10pt' }}>{formatNumber(0)} VND</span>;
      },
    },
    14: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    15: {
      align: 'right',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>{formatNumber(data)} VND</span>
        );
      },
    },
    16: {
      align: 'center',
      render(data) {
        return (
          <span style={{ fontSize: '10pt' }}>
            {data === 'StackCar'
              ? 'Xếp xe'
              : data === 'Delivery'
              ? 'Đã nhận'
              : 'Đã về kho'}
          </span>
        );
      },
    },
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const tmpColumns = [...columns];
      const item = tmpColumns.splice(fromIndex, 1)[0];
      console.log('from', fromIndex, 'to', toIndex);
      tmpColumns.splice(toIndex, 0, item);
      localStorage.setItem('searchColumns', JSON.stringify(tmpColumns));
      setColumns(tmpColumns);
    },
    nodeSelector: 'th',
  };
  const onSearchBill = async ({ code }) => {
    try {
      const res = await orderScan({ code });
      if (res.status == 404) {
        // notification.warning({ message: 'Không tìm thấy đơn hàng' });
        setMatchNotify(true);
        return;
      }

      if (res.status == 500) {
        notification.error({ message: 'Hệ thống đang xẩy ra sự cố!' });
        return;
      }

      if (res.status == 200) {
        setSearchResult([res.data.data]);
        setMatchNotify(false);
      }
    } catch (err) {
      notification.error({ message: 'Hệ thống đang xẩy ra sự cố' });
      console.log(err);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem('searchColumns')) {
      localStorage.setItem('searchColumns', JSON.stringify(columns));
    }
  }, []);
  return (
    <div className={styles['search']}>
      <div className={styles['header']}>Tra cứu vận đơn</div>
      <div className={styles['search-box']}>
        <Form
          labelCol={{ xs: 4 }}
          wrapperCol={{ xs: 20 }}
          onFinish={onSearchBill}
        >
          <Row>
            <Col span={11}>
              <Form.Item
                name="code"
                label={<span style={{ fontSize: 18 }}>Tìm mã</span>}
              >
                <Input
                  placeholder="Tìm kiếm số vận đơn/mã bill"
                  // size="large"
                  style={{ borderRadius: '5px' }}
                />
              </Form.Item>
            </Col>
            <Form.Item>
              <Button
                type="primary"
                // size="large"
                htmlType="submit"
                style={{
                  width: 120,
                  borderRadius: 5,
                  marginLeft: '8px',
                  border: 'none',
                  backgroundColor: '#d32f2f',
                }}
              >
                Tra cứu
              </Button>
            </Form.Item>
          </Row>
        </Form>
        {matchNotify && (
          <div
            style={{
              backgroundColor: '#f9cb24a8',
              padding: '2px 5px',
              fontSize: 16,
              borderRadius: 2,
            }}
          >
            Không tìm thấy đơn hàng
          </div>
        )}
      </div>
      <Row justify="end" style={{ margin: '1em 0' }}>
        <SettingColumns
          width={700}
          columnsRender={searchColumns}
          columns={columns}
          setColumns={setColumns}
          nameColumn="searchColumns"
          buttonProps={{
            style: {
              backgroundColor: '#5ecba1',
              border: 'none',
              borderRadius: 5,
            },
          }}
        />
      </Row>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          columns={columns.map((e) => {
            if (tableColumnRender[e.key])
              return { ...e, ...tableColumnRender[e.key] };
            return e;
          })}
          dataSource={searchResult}
          scroll={{ x: 'max-content' }}
        />
      </ReactDragListView.DragColumn>
    </div>
  );
}
