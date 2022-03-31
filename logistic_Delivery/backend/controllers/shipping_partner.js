const shippingService = require("../services/shipping_partner");
const { validator, mappingInputData } = require("../common/utils");
const {
	initialDataCreateShippingPartner
} = require("../configs/FormDataDefine/shipping_partner");
const { Sequelize, logisticDB } = require("../models");

module.exports.createShippingPartner = async (req, res, next) => {
	try {
		// let body = mappingInputData(initialDataCreateShippingPartner, req.body);
		// await validator(descriptorCreateOrder, body);
		// console.log(req.user);
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
		shippingService.createShippingPartner(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getAllShippingPartner = async (req, res, next) => {
    try {
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
        shippingService.getAllShippingPartner(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.updateShippingPartner = async (req, res, next) => {
	try {
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
		shippingService.updateShippingPartner(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};