import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

//components
import Title from './Title'

//components antd
import { Row, Col, Typography, Divider, Form, Input, Card, Tree } from 'antd'

export default () => {
  const location = useLocation()
  console.log(location)

  const product = [
    {
      title: 'Sản phẩm',
      key: 'p1',
      children: [
        {
          title: 'Xem sản phẩm',
          key: 'p2',
        },
        {
          title: 'Tạo sản phẩm',
          key: 'p3',
        },
        {
          title: 'Sửa sản phẩm',
          key: 'p4',
        },
        {
          title: 'Xóa sản phẩm',
          key: 'p5',
        },
        {
          title: 'Xuất file sản phẩm',
          key: 'p6',
        },
        {
          title: 'Nhập file sản phẩm',
          key: 'p7',
        },
      ],
    },
  ]

  const InputProduct = [
    {
      title: 'Nhập hàng',
      key: 'p1',
      children: [
        // {
        //   title: 'Xem sản phẩm',
        //   key: 'p2',
        // },
        // {
        //   title: 'Tạo sản phẩm',
        //   key: 'p3',
        // },
        // {
        //   title: 'Sửa sản phẩm',
        //   key: 'p4',
        // },
        // {
        //   title: 'Xóa sản phẩm',
        //   key: 'p5',
        // },
        // {
        //   title: 'Xuất file sản phẩm',
        //   key: 'p6',
        // },
        // {
        //   title: 'Nhập file sản phẩm',
        //   key: 'p7',
        // },
      ],
    },
  ]

  const ChuyenHang = [
    {
      title: 'Chuyển hàng',
      key: 'p1',
      children: [
        // {
        //   title: 'Xem sản phẩm',
        //   key: 'p2',
        // },
        // {
        //   title: 'Tạo sản phẩm',
        //   key: 'p3',
        // },
        // {
        //   title: 'Sửa sản phẩm',
        //   key: 'p4',
        // },
        // {
        //   title: 'Xóa sản phẩm',
        //   key: 'p5',
        // },
        // {
        //   title: 'Xuất file sản phẩm',
        //   key: 'p6',
        // },
        // {
        //   title: 'Nhập file sản phẩm',
        //   key: 'p7',
        // },
      ],
    },
  ]

  return (
    <>
      <Col>
        <Title />
        <Typography.Title level={4}>Nhân viên kho</Typography.Title>
      </Col>
      <Divider />
      <Row>
        <Col span={9}>
          <Typography.Title level={5}>Chi tiết vai trò</Typography.Title>
          <p>
            Thông tin chi tiết của vai trò để phục vụ cho việc quản lí sau này
          </p>
        </Col>

        <Col span={15}>
          <Card>
            <Form>
              <Row>
                <Form.Item name="role" label="Tên vai trò" required>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="note"
                  label="Ghi chú"
                  style={{ width: 330, marginLeft: 20 }}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={9}>
          <Typography.Title level={5}>Phân quyền chi tiết</Typography.Title>
          <p>
            Cho phép người quản lý giới hạn quyền của vai trò trong hệ thống
          </p>
        </Col>
        <Col span={15}>
          <Card>
            <Tree treeData={product} checkable style={{ width: '100%' }} />
            <Divider />
            <Tree treeData={InputProduct} checkable style={{ width: '100%' }} />
            <p>
              Có quyền: Xem đơn nhập, sửa đơn nhập, duyệt đơn nhập, hoàn trả đơn
              nhập, thanh toán đơn nhập, nhận hàng vào kho, hủy đơn nhập, kết
              thúc đơn nhập, xuất file đơn nhập, nhập file đơn nhập
            </p>
            <Divider />
            <Tree treeData={ChuyenHang} checkable style={{ width: '100%' }} />
            <p>
              Có quyền: Xem phiếu chuyển, tạo phiếu chuyển, sửa phiếu chuyển,
              xác nhận chuyển, nhận hàng vào kho, hủy phiếu chuyển,xuất file
              phiếu chuyển, nhập file phiếu chuyển
            </p>
          </Card>
        </Col>
      </Row>
    </>
  )
}
