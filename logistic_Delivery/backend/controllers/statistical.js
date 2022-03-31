const statisticalService = require("../services/statistical");
const { Sequelize, logisticDB } = require("../models");

module.exports.getTotalCharge = async (req, res, next) => {
    try {
        statisticalService.getTotalCharge(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.countOrder = async (req, res, next) => {
    try {
        statisticalService.countOrder(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.orderLookup = async (req, res, next) => {
    try {
        statisticalService.orderLookup(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};
