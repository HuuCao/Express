const orderService = require("../services/order");
const { validator, mappingInputData } = require("../common/utils");
const {
  initialDataCreateOrder,
  descriptorCreateOrder,
} = require("../configs/FormDataDefine/order");
const { Sequelize, logisticDB } = require("../models");

module.exports.createOrder = async (req, res, next) => {
  try {
     return orderService.createOrder(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.scanOrder = async (req, res, next) => {
  try {

    if(req.query.code == undefined)
      return res.status(401).send({success:false,mess:"Not found code"});

    var order = await logisticDB.order.findOne({
      where: {
        tracking_number: req.query.code,
      },
    });

    if (order == undefined) {
      var _order = await logisticDB.order.findOne({
        where: {
          code_bill: req.query.code,
        },
      });

      if (!_order)
        return res.status(404).send({ success: false, mess: "Not Found Bill" });

      return res.send({ success: true, data: _order });
    }

    return res.send({ success: true, data: order });
  } catch (e) {
    next(e);
  }
};

module.exports.updateOrder = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }
    orderService.updateOrder(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }
    orderService.deleteOrder(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getAllOrder = async (req, res, next) => {
  try {
    orderService.getAllOrder(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getOrderByCustomerName = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }
    orderService.getOrderByCustomerName(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getOrderByIdShippingPartner = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }
    orderService.getOrderByIdShippingPartner(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getOrderByDates = async (req, res, next) => {
  try {
    orderService.getOrderByDates(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};
