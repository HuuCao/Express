const { Op } = require('sequelize')

module.exports = (query) => {
  const _query = { ...query, where: { deletedAt: null }, order: [['createdAt', 'DESC']] };
  if (query.limit && Number(query.limit) && Number(query.limit) < 200) {
    _query.limit = Number(query.limit)
  }
  else {
    _query.limit = 20
  }

  if (query.page && Number(query.page) && Number(query.page) < 200) {
    _query.page = Number(query.page)
  }
  else {
    _query.page = 1
  }

  if (query.where) {
    Object.assign(_query.where, JSON.parse(query.where), { deletedAt: null })
  }

  if (query.filterDate) {
    const _filterDate = JSON.parse(query.filterDate);
    if (_filterDate.field) {
      if (_filterDate.$lte) {
        _query.where[_filterDate.field][Op.lte] = new Date(_filterDate.$lte)
      }
      if (_filterDate.$gte) {
        _query.where[_filterDate.field][Op.gte] = new Date(_filterDate.$gte)
      }
    }
  }

  if (query.order) {
    _query.order = [
      query.order
    ]
  }

  return _query
}