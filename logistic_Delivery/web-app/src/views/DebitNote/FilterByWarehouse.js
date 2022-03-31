import React, { useState, useEffect, useContext } from 'react'

import Context from 'utils/Context'
import { ACTION } from 'consts'

//component antd
import { Select, Row, Col } from 'antd'

//apis
import { getWarehouses } from 'apis/warehouses'
import { getShipmentsByWarehouseId } from 'apis/shipments'

export default ({ reloadShipments, setShipments }) => {
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

  const _filterByWarehouse = async (whId) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true })
      const res = await getShipmentsByWarehouseId(whId)
      console.log(res)
      if (res.status === 200) setShipments(res.data)
      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      context.dispatch({ name: ACTION.LOADING, data: false })
    }
  }

  useEffect(() => {
    _getWarehouses()
  }, [])

  return (
    <>
      <Col>
        <h5 style={{ marginBottom: 0 }}>Filter by warehouse</h5>
        <Select
          disabled={context.id === 4 ? true : false}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          defaultValue="all"
          placeholder="warehouses"
          style={{ width: 220 }}
          onChange={(value) => {
            if (value == 'all') reloadShipments()
            else _filterByWarehouse(value)
          }}
        >
          <Select.Option value="all" key="all">
            All
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
