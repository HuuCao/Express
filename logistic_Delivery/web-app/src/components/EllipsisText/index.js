import React, { useRef, useEffect, useState } from 'react'
import { Popover } from 'antd'

export default ({ width, children, ...props }) => {
  const childRef = useRef()
  const [visible, setVisible] = useState({})

  useEffect(() => {
    if (
      childRef.current &&
      childRef.current.getBoundingClientRect().width <
        Math.floor(width || window.innerWidth * 0.15)
    ) {
      setVisible({
        visible: false,
      })
    }
  }, [])

  const randomID = Math.random()
  const childrenWithRef = React.cloneElement(children, {
    ...props,
    ref: childRef,
  })

  const _content = (
    <div
      style={{
        wordBreak: 'break-word',
        minWidth: '150px',
      }}
    >
      {childrenWithRef}
    </div>
  )

  return (
    <Popover
      {...visible}
      content={_content}
      getPopupContainer={() =>
        document.getElementById('ellipsis_text' + randomID)
      }
    >
      <div
        id={'ellipsis_text' + randomID}
        className="ellipsis_text"
        style={{
          width,
        }}
      >
        {childrenWithRef}
      </div>
    </Popover>
  )
}
