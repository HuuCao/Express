module.exports.initialData = [
  "blDescription",
  "invoiceType",
  "remarks",
  "shippedPer",
  "shippingDate",
  "shippingFrom",
  "shippingTo",
  "termPayment",
]
module.exports.initialDataCreateShipment = [
  "invoiceNo",
  "invoiceType",
  "shipperName",
  "shippingDate",
  "shipperAddress",
  "shipperPhone",
  "shipperCorporateNumber",
  "shipperConsigneeStandard"
]
module.exports.initialDataUpdateShipment = [
  "invoiceNo",
  "invoiceType",
  "blDescription",
  "flightNo",
  "invoiceType",
  "remarks",
  "shippedPer",
  "shippingDate",
  "shippingFrom",
  "shippingTo",
  "termPayment",
]


module.exports.descriptorCloseShipment = {
  blDescription: {
    type: 'string',
    required: true
  },
  invoiceType: {
    type: 'enum',
    enum: ['commercial', 'noncommercial'],
    required: true
  },
  remarks: {
    type: 'string',
    required: true
  },
  shippedPer: {
    type: 'string',
    required: true
  },
  shippingFrom: {
    type: 'string',
    required: true
  },
  shippingTo: {
    type: 'string',
    required: true
  },
  termPayment: {
    type: 'enum',
    enum: ['T/T', 'Non-Commercial'],
    required: true
  },
}
module.exports.descriptorCreateShipment = {
  invoiceNo: {
    type: 'string',
    required: true
  },
  invoiceType: {
    type: 'enum',
    enum: ['commercial', 'noncommercial'],
    required: true
  }
}
module.exports.descriptorUpdateShipment = {}