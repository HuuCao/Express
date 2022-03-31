import React, { useEffect, useState } from 'react';
import {
  Row,
  Typography,
  Col,
  Input,
  Tabs,
  InputNumber,
  notification,
  Button,
} from 'antd';
import { translate } from 'utils/i18n';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'consts';
import {
  createPrice,
  deletePackage,
  deletePrice,
  updatePrice,
} from 'apis/price';
export default function TablePriceCreatePage(props) {
  const [effortPricePackage, setEffortPricePackage] = useState({
    currentLen: 1,
    data: [
      {
        title: 'Gói 1',
        cost_per_kg: 0,
        cost_per_m3: 0,
        condition_miximum_kg: 0,
        condition_maximum_kg: 0,

        closeable: false,
        key: 1,
      },
    ],
  });
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deleteList, setDeleteList] = useState([]);

  const history = useHistory();
  const editAction = {
    add() {
      let tmp = [...effortPricePackage.data];
      tmp.push({
        title: 'Gói ' + (effortPricePackage.currentLen + 1),
        cost_per_kg: 0,
        cost_per_m3: 0,
        condition_miximum_kg: 0,
        condition_maximum_kg: 0,
        closeable: true,
        key: effortPricePackage.currentLen + 1,
      });

      tmp[0].closeable = false;

      setEffortPricePackage({
        currentLen: effortPricePackage.currentLen + 1,
        data: tmp,
      });
    },

    remove(key) {
      let tmp = [...effortPricePackage.data];
      let deletedItem = tmp.splice(
        tmp
          .map((e) => {
            return e.key + '';
          })
          .indexOf(key),
        1
      );

      deletedItem[0].id && setDeleteList([...deleteList, deletedItem[0].id]);
      console.log(deletedItem[0].id, deleteList);
      tmp[0].closeable = false;
      setEffortPricePackage({
        currentLen: effortPricePackage.currentLen,
        data: tmp,
      });
    },
  };
  const onEdit = (targetKey, action) => {
    console.log(targetKey, action);
    editAction[action](targetKey);
  };
  const changePriceValue = (key, val, index) => {
    let tmp = [...effortPricePackage.data];
    tmp[index][key] = val;
    setEffortPricePackage({
      currentLen: effortPricePackage.currentLen,
      data: tmp,
    });
  };
  const updateEffortPrice = async (data) => {
    try {
      const res = await updatePrice(history.location.state.id, data);
      if (res.data.success && res.status == 200) {
        notification.success({
          message: 'Cập nhật công thức tính giá thành công',
        });
        history.push(ROUTES.TABLE_PRICE);
      } else {
        notification.error({
          message: 'Cập nhật công thức tính giá thất bại',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteEffortPrice = async () => {
    try {
      const res = await deletePrice(history.location.state.id);
      if (res.data.success && res.status == 200) {
        notification.success({
          message: 'Xóa công thức tính giá thành công',
        });
        history.push(ROUTES.TABLE_PRICE);
      } else {
        notification.error({
          message: 'Xóa công thức tính giá thất bại',
        });
      }
    } catch (err) {
      notification.error({
        message: 'Thất bại',
      });
      console.log(err);
    }
  };
  const createEffortPrice = async () => {
    try {
      const body = {
        title: title,
        description: desc,
        effort_price_packages: effortPricePackage.data.map((e) => {
          return {
            cost_per_kg: e.cost_per_kg,
            cost_per_m3: e.cost_per_m3,
            condition_miximum_kg: e.condition_miximum_kg,
            condition_maximum_kg: e.condition_maximum_kg,
            id: e.id,
          };
        }),
      };
      if (props.type && props.type === 'update') {
        let deleted = true;
        console.log('deleteList', deleteList);
        if (deleteList.length) {
          const res = await Promise.all(
            deleteList.map((e) => {
              return deletePackage({
                id: e,
                effort_price_id: history.location.state.id,
              });
            })
          );
          updateEffortPrice(body);
          // if(res.reduce((a,b)=>a&&b.data.success)){
          //   noti
          // }
        } else {
          updateEffortPrice(body);
        }
      } else {
        const res = await createPrice(body);
        if (res.data.success && res.status == 200) {
          notification.success({
            message: 'Tạo công thức tính giá thành công',
          });
          history.push(ROUTES.TABLE_PRICE);
        } else {
          notification.error({ message: 'Tạo công thức tính giá thất bại' });
        }
      }
    } catch (e) {
      notification.error({ message: 'Thất bại' });
      console.log(e);
    }
  };
  useEffect(() => {
    if (props.type && props.type === 'update') {
      setEffortPricePackage({
        currentLen: history.location.state.effort_price_packages
          ? history.location.state.effort_price_packages.length
          : 1,
        data:
          history.location.state.effort_price_packages &&
          history.location.state.effort_price_packages.map((e, index) => {
            return {
              condition_maximum_kg: e.condition_maximum_kg,
              condition_miximum_kg: e.condition_miximum_kg,
              cost_per_kg: e.cost_per_kg,
              cost_per_m3: e.cost_per_m3,
              id: e.id,
              title: 'Gói ' + (index + 1),
              key: index + 1,
              closeable: index !== 0,
            };
          }),
      });
      setTitle(history.location.state.title);
      setDesc(history.location.state.description);
    }
  }, []);
  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{ paddingBottom: 10, borderBottom: 'solid 1px #c2c2c2' }}
      >
        <Typography.Title
          level={4}
          onClick={() => history.push(ROUTES.TABLE_PRICE)}
          style={{ cursor: 'pointer' }}
        >
          <ArrowLeftOutlined /> {translate('Create price formula')}
        </Typography.Title>
      </Row>
      <Row justify="space-between" style={{ width: '90%', margin: 'auto' }}>
        <Col span={10}>
          <Row style={{ fontSize: 16, fontWeight: 600 }}>Tên</Row>
          <Row>
            <Input
              value={title}
              placeholder="Tên hiển thị tiêu đề"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Row>
        </Col>
        <Col span={10}>
          <Row style={{ fontSize: 16, fontWeight: 600 }}>Mô tả</Row>
          <Row>
            <Input
              value={desc}
              placeholder="Mô tả công thức tính giá"
              onChange={(e) => setDesc(e.target.value)}
            />
          </Row>
        </Col>
      </Row>
      <Row style={{ width: '90%', margin: 'auto', marginTop: 20 }}>
        <Tabs type="editable-card" style={{ width: '100%' }} onEdit={onEdit}>
          {effortPricePackage.data.map((e, index) => (
            <Tabs.TabPane
              tab={e.title}
              key={e.key}
              style={{ backgroundColor: '#fff', padding: 20 }}
              closable={e.closeable}
            >
              <Row style={{ marginBottom: 10 }}>
                <Col span={6}>Minimum (kg)</Col>
                <Col span={18}>
                  <InputNumber
                    value={effortPricePackage.data[index].condition_miximum_kg}
                    onChange={(e) =>
                      changePriceValue('condition_miximum_kg', e, index)
                    }
                    min={0}
                    style={{ width: '100%' }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6}> Maximum (kg)</Col>
                <Col span={18}>
                  <InputNumber
                    value={effortPricePackage.data[index].condition_maximum_kg}
                    onChange={(e) =>
                      changePriceValue('condition_maximum_kg', e, index)
                    }
                    min={0}
                    style={{ width: '100%' }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6}> Cost/1kg</Col>
                <Col span={18}>
                  <InputNumber
                    value={effortPricePackage.data[index].cost_per_kg}
                    onChange={(e) => changePriceValue('cost_per_kg', e, index)}
                    min={0}
                    style={{ width: '100%' }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6}>
                  Cost/1m<sup>3</sup>
                </Col>
                <Col span={18}>
                  <InputNumber
                    value={effortPricePackage.data[index].cost_per_m3}
                    onChange={(e) => changePriceValue('cost_per_m3', e, index)}
                    min={0}
                    style={{ width: '100%' }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Col>
              </Row>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Row>
      <Row
        justify="end"
        style={{ paddingTop: 30, marginTop: 30, borderTop: 'solid 1px' }}
      >
        <Button
          type="primary"
          style={{ width: 120 }}
          onClick={createEffortPrice}
        >
          {props.type && props.type === 'update' ? 'Cập nhật' : 'Tạo'}
        </Button>
      </Row>
    </div>
  );
}
