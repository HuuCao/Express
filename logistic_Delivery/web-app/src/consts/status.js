import React from 'react'

import { Tooltip } from 'antd'

import planing from 'assets/img/icon-status/planing.svg'
import wait_plane from 'assets/img/icon-status/wait_plane.svg'
import at_warehouse from 'assets/img/icon-status/at_warehouse.svg'
import shipping from 'assets/img/icon-status/shipping.svg'
import shipped from 'assets/img/icon-status/shipped.svg'
import not_shipped from 'assets/img/icon-status/not_shipped.png'
import inventory from 'assets/img/icon-status/inventory.svg'
import out_inventory from 'assets/img/icon-status/out_inventory.svg'

export default function StatusPackage({ status }) {
  switch (status) {
    case 'WAIT_PLANE':
      return (
        <Tooltip title="Wait Plane">
          <img
            alt="icon status"
            src={wait_plane}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    case 'PLANNING':
      return (
        <Tooltip title="Planning">
          <img
            alt="icon status"
            src={planing}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    case 'AT_WAREHOUSE':
      return (
        <Tooltip title="At Warehouse">
          <img
            alt="icon status"
            src={at_warehouse}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    case 'SHIPPING':
      return (
        <Tooltip title="Shipping">
          <img
            alt="icon status"
            src={shipping}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    case 'SHIPPED':
      return (
        <Tooltip title="Shipped">
          <img
            alt="icon status"
            src={shipped}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    case 'NOT_SHIPPED':
      return (
        <Tooltip title="Not Shipped">
          <img
            alt="icon status"
            src={not_shipped}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    case 'INVENTORY':
      return (
        <Tooltip title="Inventory">
          <img
            alt="icon status"
            src={inventory}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    case 'OUT_INVENTORY':
      return (
        <Tooltip title="Out Inventory">
          <img
            alt="icon status"
            src={out_inventory}
            style={{ width: 20, height: 20 }}
          />
        </Tooltip>
      )
    default:
      return ''
  }
}
