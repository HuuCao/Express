import React, { useState } from 'react'

import { STATE_PACKAGE } from 'consts'

//components antd
import { Modal, Row, Image } from 'antd'

//icons antd
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

export default ({ pkg }) => {
  const [visible, setVisible] = useState(false)

  const toggle = () => setVisible(!visible)

  return (
    <>
      {/* Nếu trạng thái đã giao hàng thành công thì mới cho nhấn vào mở //modal
      lên xem đồng kiểm, ngược lại thì chỉ hiện thị icon */}
      {pkg && pkg.coCheck ? (
        <CheckCircleOutlined
          style={{ fontSize: 20, color: 'green' }}
          onClick={() => {
            if (
              pkg &&
              pkg.warehouse_package &&
              pkg.warehouse_package.statusId == STATE_PACKAGE.SHIPPED
            ) {
              toggle()
              console.log(2134)
            }
          }}
        />
      ) : (
        <CloseCircleOutlined
          style={{ fontSize: 20, color: 'red' }}
          onClick={() => {
            if (
              pkg &&
              pkg.warehouse_package &&
              pkg.warehouse_package.statusId == STATE_PACKAGE.SHIPPED
            ) {
              toggle()
              console.log(2134)
            }
          }}
        />
      )}
      <Modal
        title="Image/Video Co Check"
        width="70vw"
        visible={visible}
        onCancel={toggle}
        footer={null}
      >
        <Row justify="space-between">
          <Image
            width={400}
            height={300}
            src="https://image.phunuonline.com.vn/fckeditor/upload/2021/20210418/images/ngan-hang-cam-lot-qua-dich-_251618761620.jpg"
          />
          <iframe
            width="400"
            height="300"
            src="https://www.youtube.com/embed/hgWYqhc86QA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Row>
      </Modal>
    </>
  )
}
