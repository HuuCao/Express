import React from 'react';
import { Row, Pagination } from 'antd';
import { PAGE_SIZE } from 'consts';

export default ({
  total,
  query,
  setQuery
}) => {
  const _onChange = (page) => {
    setQuery({
      currentPage: page
    })
  }
  return (
    <Row
      justify="end"
      align="middle"
    >
      <Pagination
        showLessItems
        showQuickJumper
        size="small"
        total={total}
        current={query.currentPage}
        pageSize={PAGE_SIZE}
        onChange={_onChange}
      />
    </Row>
  )
}