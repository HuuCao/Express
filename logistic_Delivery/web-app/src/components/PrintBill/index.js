import React from 'react'

import QRCode from 'qrcode.react'

//components antd
import { Row, Col, Divider } from 'antd'

class PrintBill extends React.Component {
  render() {
    console.log(this.props.packages)
    return (
      <div style={{ width: '100%' }}>
        {this.props.packages &&
          this.props.packages.map((e) => {
            const qr = {
              packageId: e.id,
              shipmentId: e.shipmentId,
              statusShipment: e.shipment && e.shipment.state,
            }
            return (
              <>
                <Row justify="center">
                  <Col>
                    <QRCode
                      value={JSON.stringify(qr)}
                      level="H"
                      size={140}
                      includeMargin={true}
                    />
                  </Col>
                </Row>
                <Col>
                  <h3 style={{ marginBottom: 0 }}>PKG No: {e.cartonNo}</h3>
                  <h3 style={{ marginBottom: 0 }}>PKG Type: {e.pkgType}</h3>
                  <h3 style={{ marginBottom: 0 }}>NW: {e.net}</h3>
                  <h3 style={{ marginBottom: 0 }}>GW: {e.gross}</h3>
                  <h3 style={{ marginBottom: 0 }}>Height(Cm): {e.height}</h3>
                  <h3 style={{ marginBottom: 0 }}>Width(Cm): {e.width}</h3>
                  <h3 style={{ marginBottom: 0 }}>
                    Bag: {e.bag && e.bag.bagCode}
                  </h3>
                  <h3 style={{ marginBottom: 0 }}>
                    Co Check: {e.coCheck ? 'Has' : 'No'}
                  </h3>
                  <h3 style={{ marginBottom: 0 }}>
                    Name Receiver:{' '}
                    {e.pkg_receiver && e.pkg_receiver.customer_receiver.name}
                  </h3>
                  <h3 style={{ marginBottom: 0 }}>Cod: {e.cod && e.cod}</h3>
                </Col>
                <Divider />
              </>
            )
          })}
      </div>
    )
  }
}

export default PrintBill
