const { createBagByShipmentId, allBagByShipmentId } = require("../services/bags");

module.exports.allBagByShipmentId = async (req, res, next) => {
  try {
    allBagByShipmentId (req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.createBagByShipmentId = async (req, res, next) => {
  try {
    createBagByShipmentId(req, res, next);
  } catch (e) {
    next(e);
  }
};


