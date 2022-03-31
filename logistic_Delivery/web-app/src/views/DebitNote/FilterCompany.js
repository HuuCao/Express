import React, { useState, useEffect, useContext } from 'react'

import Context from 'utils/Context'
import { ACTION } from 'consts'

//components antd
import { Col, Select } from 'antd'

//apis
import { getCompanies } from 'apis/companies'
import { getShipmentsByCompanyId } from 'apis/shipments'

export default ({ reloadShipments, setShipments }) => {
  const context = useContext(Context)

  const [companies, setCompanies] = useState([])

  const _getCompanies = async () => {
    try {
      const res = await getCompanies()
      console.log(res)
      if (res.status === 200) setCompanies(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const _filterShipmentByCompany = async (companyId) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true })
      const res = await getShipmentsByCompanyId(companyId)
      console.log(res)
      if (res.status === 200) setShipments(res.data.listShipment)

      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      context.dispatch({ name: ACTION.LOADING, data: false })
    }
  }

  useEffect(() => {
    _getCompanies()
  }, [])

  return (
    <Col style={{ marginLeft: 10 }}>
      <h5 style={{ marginBottom: 0 }}>Filter by company</h5>
      <Select
        placeholder="Company"
        style={{ width: 220 }}
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        disabled={context.id === 3 ? true : false}
        onChange={(value) => {
          if (value == 'all') reloadShipments()
          else _filterShipmentByCompany(value)
        }}
        defaultValue="all"
      >
        <Select.Option value="all" key="all">
          All
        </Select.Option>
        {companies.map((e, index) => (
          <Select.Option value={e.id} key={index}>
            {e.viName}
          </Select.Option>
        ))}
      </Select>
    </Col>
  )
}
