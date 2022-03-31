const debitService = require("../services/debit");
const { Sequelize, logisticDB } = require("../models");

module.exports.getDebitByIdUser = async (req, res, next) => {
    try {
        debitService.getDebitByIdUser(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.getAllDebitCustomer = async (req, res, next) => {
    try {
        debitService.getAllDebitCustomer(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};


module.exports.getAllDebit= async (req, res, next) => {
    try {
        debitService.getAllDebit(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.updateDebit = async (req, res, next) => {
	try {
	  if (req.user.role != "admin") {
		return res.status(401).send({ success: false, mess: "User Not Found" });
	  }
	  debitService.updateDebit(req, res, next);
	} catch (e) {
	  res.send({ success: false, mess: "Error: " + e });
	}
};

module.exports.updateReceived = async (req, res, next) => {
	try {
	  if (req.user.role != "admin") {
		return res.status(401).send({ success: false, mess: "User Not Found" });
	  }
	  debitService.updateReceived(req, res, next);
	} catch (e) {
	  res.send({ success: false, mess: "Error: " + e });
	}
};

module.exports.updateDebit = async (req, res, next) => {
	try {
	  if (req.user.role != "admin") {
		return res.status(401).send({ success: false, mess: "User Not Found" });
	  }
	  debitService.updateDebit(req, res, next);
	} catch (e) {
	  res.send({ success: false, mess: "Error: " + e });
	}
};

module.exports.getDebitByTime = async (req, res, next) => {
    try {
        debitService.getDebitByTime(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.getDebitByIdShipping = async (req, res, next) => {
    try {
        debitService.getDebitByIdShipping(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};

module.exports.getTotalCharge = async (req, res, next) => {
    try {
        debitService.getTotalCharge(req, res, next);
	} catch (e) {
		res.send({ success: false, mess: "Error: " + e })
	}
};