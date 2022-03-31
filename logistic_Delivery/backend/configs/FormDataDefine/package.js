module.exports.initialPackage = [
  "cartonNo",
  "pkgType",
  "state",
  "gross",
  "height",
  "width",
  "length",
  "shipmentId",
];

module.exports.changePackage = ["id"];

module.exports.descriptorCreatePackage = {
  cartonNo: {
    type: "string",
    required: true,
  },
  pkgType: {
    type: "enum",
    enum: ["Loose carton", "Pallet", "Wooden crate", "Bag"],
    required: true,
  },
  state: {
    type: "enum",
    enum: ["editable", "closed"],
    required: true,
  },
  shipmentId: {
    type: "number",
    required: true,
  },
};

module.exports.descriptorChangePackage = {
  id: {
    type: "number",
    required: true,
  },
};
