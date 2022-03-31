const { logisticDB, Sequelize } = require("../models");
const bags = logisticDB.bags;

module.exports.createBagByShipmentId = async (req, res, next) => {
  if (req.body.bagCode == undefined || req.body.shipment_id == undefined)
    return res.status(400).json({ success: false, mess: "Missing parram" });

  var bag = await bags.findOne({
    where: {
      bagCode: req.body.bagCode,
      shipment_id: req.body.shipment_id,
    },
  });

  if (bag != undefined) {
    return res.status(400).json({ success: false, mess: "Bag Existed" });
  } else {
    bags
    .create(req.body)
    .then((result) => {
      return res.status(200).json({ success: true});
    })
    .catch((e) => {
      return res.status(400).json({ success: false, mess: "Error" });
    });
  }
};

module.exports.allBagByShipmentId = async (req, res, next) => {
  try {
    if (req.body.shipment_id == undefined)
      return res.status(400).json({ success: false, mess: "Missing parram" });

    var _result = await bags.findAll({
      where: {
        shipment_id: req.body.shipment_id,
      },
    });

    return res.status(200).json({ success: true, data: _result });
  } catch (e) {
    return res.status(400).json({ success: false, mess: "Error" });
  }
};
