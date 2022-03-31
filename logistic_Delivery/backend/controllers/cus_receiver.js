const {
	createCustomerRecevier,
	updateCustomerRecevier,
	getAllCustomerReceiver,
} = require("../services/cus_receiver");

module.exports.createCustomerRecevier = async (req, res, next) => {
	try {
		createCustomerRecevier(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.updateCustomerRecevier = async (req, res, next) => {
	try {
		updateCustomerRecevier(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getAllCustomerReceiver = async (req, res, next) => {
	try {
		getAllCustomerReceiver(req, res, next);
	} catch (e) {
		next(e);
	}
};
