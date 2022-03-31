const { logisticDB } = require("../models");
const reason = logisticDB.reason;

module.exports.getAllReason = async (req, res, next) => {
	reason
		.findAll({})
		.then((responsive) => res.send(responsive))
		.catch((e) => {
			next(new Error(`404:${e}`));
		});
};
