import { useState } from 'react'

export default (functionGetData) => {
  const [data, setData] = useState({
    data: [],
    totalRecord: 0,
    loading: false,
  })
  const _options = {
    signal: false,
  }

  const abord = () => {
    _options.signal = true
  }

  const reloadData = async (_query) => {
    setData({
      ...data,
      loading: true,
    })

    const response = await functionGetData(_query)
    if (_options.signal) {
      return
    }

    if (response.status === 200) {
      setData({
        ...response.data,
        loading: false,
      })
    } else
      setData({
        ...data,
        loading: false,
      })
  }

  const resetData = () => {
    setData({
      data: [],
      totalRecord: 0,
      loading: false,
    })
  }

  const appendData = (item, field = 'data') => {
    const _data = JSON.parse(JSON.stringify(data[field]))
    if (item instanceof Array) {
      setData({
        ...data,
        [field]: item,
      })
      return
    }
    if (_data instanceof Array) {
      _data.push(item)
      setData({
        ...data,
        [field]: _data,
      })
    }
  }

  return [data, reloadData, abord, setData]
}
