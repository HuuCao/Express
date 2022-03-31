import React, { useState, useEffect, useContext } from 'react'

//component antd
import { Select, Row, Col } from 'antd'

import { ACTION } from 'consts'
import Context from 'utils/Context'
import { translate } from 'utils/i18n'

//apis
import { getWarehouses } from 'apis/warehouses'
import { getShipmentsByWarehouseId } from 'apis/shipments'

export default ({ setWarehouseId }) => {
  const context = useContext(Context)

  const [warehouses, setWarehouses] = useState([])

  const _getWarehouses = async () => {
    try {
      const res = await getWarehouses()

      if (res.status === 200) {
        setWarehouses(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    _getWarehouses()

    if (context.id != 4 || context.id != 5) {
      setWarehouseId('all')
    }
  }, [])

  return (
    <>
      <Col>
        <h5 style={{ marginBottom: 0 }}>{translate('Filter by warehouse')}</h5>
        <Select
          disabled={context.id == 4 || context.id == 5 ? true : false}
          defaultValue={
            context.id == 4 || context.id == 5 ? context.warehouse_id : 'all'
          }
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          placeholder="warehouses"
          style={{ width: 220 }}
          onChange={(value) => setWarehouseId(value)}
        >
          <Select.Option value="all" key="all">
            {translate('All')}
          </Select.Option>
          {warehouses.map((e, index) => (
            <Select.Option value={e.id} key={index}>
              {e.name}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </>
  )
}
