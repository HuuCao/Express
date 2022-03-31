import React from 'react'
import { Select } from 'antd'
import locations from 'consts/locations'

function filterOption(input, option) {
  if (!input) {
    return true
  }
  return option.children.toLowerCase().startsWith(input.toLowerCase())
}

export default ({ value, onChange, disabled }) => (
  <Select
    value={value}
    onChange={onChange}
    showSearch
    filterOption={filterOption}
    disabled={disabled}
    style={{
      width: '100%',
    }}
  >
    {locations.map((location) => (
      <Select.Option
        key={location['3-letter location code']}
        value={location['3-letter location code']}
      >
        {location['3-letter location code']}
      </Select.Option>
    ))}
  </Select>
)
