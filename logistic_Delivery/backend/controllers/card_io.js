const cardService = require("../services/card_io");
const { validator, mappingInputData } = require("../common/utils");
const {
	initialDataCreateCardIn,
    initialDataCreateCardOut,
	
} = require("../configs/FormDataDefine/card_io");
const { Sequelize, logisticDB } = require("../models");

module.exports.createCardIn = async (req, res, next) => {
	try {
		let body = mappingInputData(initialDataCreateCardIn, req.body);
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
		cardService.createCardIn(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.createCardOut = async (req, res, next) => {
	try {
		let body = mappingInputData(initialDataCreateCardOut, req.body);
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
		cardService.createCardOut(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.updateCard = async (req, res, next) => {
	try {
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "Permisison not Accepted" });
		}
		cardService.updateCard(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.getAllCard = async (req, res, next) => {
    try {
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
        await cardService.getAllCard(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.getOrderInventory = async (req, res, next) => {
    try {
		if(req.user.role != 'admin'){
			return res.status(401).send({ success: false, mess: "User Not Found" });
		}
        await cardService.getOrderInventory(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};