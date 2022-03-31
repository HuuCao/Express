const { getAllReason } = require("../services/reason");

module.exports.getAllReason = async (req, res, next) => {
	try {
		getAllReason(req, res, next);
	} catch (e) {
		next(e);
	}
};
