const warehouseService = require("../services/warehouse");
const { sendSuccess } = require("../common/utils");

module.exports.createWarehouse = async (req, res, next) => {
	try {
		const response = await warehouseService.createWarehouse(req.body, req.user);
		res.json(response);
	} catch (e) {
		next(e);
	}
};

module.exports.getAllWareHouse = async (req, res, next) => {
	try {
		warehouseService.getAllWareHouse(req,res,next);
	} catch (e) {
		next(e);
	}
};

module.exports.getAllWareHouseByCPNId = async (req, res, next) => {
	try {
		warehouseService.getAllWareHouseByCPNId(req, res, next);
	} catch (e) {
		next(e);
	}
};
