import { PAGE_SIZE } from "consts";
import { useState } from "react";

const defaultQuery = {
  pageSize: PAGE_SIZE,
  currentPage: 1,
}

export default (initialQuery) => {
  const [query, setQuery] = useState(Object.assign(defaultQuery, initialQuery));

  const _customSetQuery = (_query) => {
    if (!_query) {
      setQuery(initialQuery)
    }
    else if (typeof _query === 'object') {
      setQuery({
        ...query,
        ..._query
      })
    }
  }

  return [query, _customSetQuery]
}