const {
  getAllShipper,
  getAllShipperByWhId,
  getPkgHistoryByShipper,
  getShipperCodConfirmByWhId,
  getAllShipperByCompanyId,
  getSumCodNeedConfirm,
  getShippingMethod
} = require("../services/shipper");


module.exports.getShippingMethod = (req, res, next) => {
  try {
    getShippingMethod(req, res, next);
  } catch (e) {
    next(e);
  }
};
module.exports.getAllShipper = (req, res, next) => {
  try {
    getAllShipper(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getAllShipperByWhId = (req, res, next) => {
  try {
    getAllShipperByWhId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPkgHistoryByShipper = (req, res, next) => {
  try {
    getPkgHistoryByShipper(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getShipperCodConfirmByWhId = (req, res, next) => {
  try {
    getShipperCodConfirmByWhId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getAllShipperByCompanyId = (req, res, next) => {
  try {
    getAllShipperByCompanyId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getSumCodNeedConfirm = (req, res, next) => {
  try {
    getSumCodNeedConfirm(req, res, next);
  } catch (e) {
    next(e);
  }
};
