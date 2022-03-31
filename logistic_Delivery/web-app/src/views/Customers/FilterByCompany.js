import React, { useState, useEffect, useContext } from 'react'

import { ACTION } from 'consts'
import Context from 'utils/Context'

//component antd
import { Select, Row, Col } from 'antd'

//apis
import { getCompanies } from 'apis/companies'
import { customersReceiverByCompany } from 'apis/customers'
import { translate } from 'utils/i18n'

export default ({ reloadCustomers, setCustomers }) => {
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

  const _getCustomersReceiverByCompany = async (companyId) => {
    try {
      context.dispatch({ name: ACTION.LOADING, data: true })
      const res = await customersReceiverByCompany(companyId)
      if (res.status === 200) setCustomers(res.data)
      context.dispatch({ name: ACTION.LOADING, data: false })
    } catch (error) {
      context.dispatch({ name: ACTION.LOADING, data: false })
    }
  }

  useEffect(() => {
    _getCompanies()
  }, [])

  return (
    <Col>
      <h5 style={{ marginBottom: 0 }}>{translate('Filter by company')}</h5>
      <Select
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        placeholder={translate('Company')}
        style={{ width: 220 }}
        onChange={(companyId) => {
          if (companyId == 'all') reloadCustomers()
          else _getCustomersReceiverByCompany(companyId)
        }}
        defaultValue="all"
      >
        <Select.Option value="all" key="all">
          {translate('All')}
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
