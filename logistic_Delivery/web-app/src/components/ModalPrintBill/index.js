import React, { useRef, useState } from 'react'

import ReactToPrint from 'react-to-print'

//components
import PrintBill from 'components/PrintBill'

//components antd
import { Button, Modal, Row } from 'antd'
import { translate } from 'utils/i18n'

export default ({ packages, disabled }) => {
  const printBillRef = useRef(null)

  const [visible, setVisible] = useState(false)

  const toggle = () => setVisible(!visible)
  return (
    <>
      <Button type="primary" onClick={toggle} disabled={disabled}>
        {translate('Print Bill')}
      </Button>

      <Modal
        width="50vw"
        title="Bill"
        visible={visible}
        onCancel={toggle}
        footer={
          <Row justify="end">
            <Button onClick={toggle} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button type="primary">{translate('Print Bill')}</Button>
              )}
              content={() => printBillRef.current}
            />
          </Row>
        }
      >
        <PrintBill ref={printBillRef} packages={packages} />
      </Modal>
    </>
  )
}
