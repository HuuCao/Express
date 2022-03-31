const promotionService = require("../services/promotion");
const { validator, mappingInputData } = require("../common/utils");
const {
	initialDataCreatePromotion, descriptorCreateOrder
} = require("../configs/FormDataDefine/promotion");
const { Sequelize, logisticDB } = require("../models");

module.exports.createPromotion = async (req, res, next) => {
	try {
		let body = mappingInputData(initialDataCreatePromotion, req.body);
		// await validator(descriptorCreateOrder, body);
		// console.log(req.user);

		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}

		promotionService.createPromotion(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getAllPromotion = async (req, res, next) => {
    try {
        if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
        promotionService.getAllPromotion(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.updatePromotion = async (req, res, next) => {
	try {
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
		promotionService.updatePromotion(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};