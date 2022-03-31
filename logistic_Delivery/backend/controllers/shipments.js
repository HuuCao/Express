const shipmentService = require("../services/shipments");
const { validator, mappingInputData } = require("../common/utils");
const {
	descriptorCloseShipment,
	initialData,
	initialDataCreateShipment,
	descriptorCreateShipment,
	getShipmentByCompanyId,
	getSumDebitShipment,
	getLastInvoiceShipment,
	getShipmentHavePkgShipped
} = require("../configs/FormDataDefine/shipment");

module.exports.createShipment = async (req, res, next) => {
	try {
		let body = mappingInputData(initialDataCreateShipment, req.body);
		await validator(descriptorCreateShipment, body);
		shipmentService.createShipment(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getAllShipment = async (req, res, next) => {
	await shipmentService.getAllShipment(req, res, next);
};

module.exports.updateShipment = async (req, res, next) => {
	try {
		shipmentService.updateShipment(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getShipment = async (req, res, next) => {
	const { idShipment } = req.params;
	try {
		const results = await shipmentService.getShipment(idShipment);
		res.json(results);
	} catch (e) {
		next(e);
	}
};

module.exports.getListPklByUserId = async (req, res, next) => {
	const { id } = req.user;
	try {
		const results = await shipmentService.getListPklByUserId(id);
		res.json(results);
	} catch (e) {
		next(e);
	}
};

module.exports.generateInvoiceNo = (req, res, next) => {
	try {
		shipmentService.generateInvoiceNo(req, res, next);
	} catch (e) {
		throw new Error(e);
	}
};

module.exports.closeShipment = async (req, res, next) => {
	try {
		let body = mappingInputData(initialData, req.body);
		await validator(descriptorCloseShipment, body);
		await shipmentService.closeShipment(req, res, body, next);
	} catch (e) {
		next(e);
	}
};

module.exports.closeInvoice = async (req, res, next) => {
	try {
		shipmentService.closeInvoice(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getShipmentById = async (req, res, next) => {
	try {
		shipmentService.getShipmentById(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getShipmentByStatusText = async (req, res, next) => {
	try {
		shipmentService.getShipmentByStatusText(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getShipmentByIdWarehouse = async (req, res, next) => {
	try {
		shipmentService.getShipmentByIdWarehouse(req, res, next);
	} catch (e) {
		next(e);
	}
};


module.exports.getShipmentByCompanyId = async (req, res, next) => {
	try {
		shipmentService.getShipmentByCompanyId(req, res, next);
	} catch (e) {
		next(e);
	}
};

module.exports.getSumDebitShipment = async (req, res, next) => {
	try {
		shipmentService.getSumDebitShipment(req, res, next);
	} catch (e) {
		next(e);
	}
};



module.exports.getLastInvoiceShipment = async (req, res, next) => {
	try {
		shipmentService.getLastInvoiceShipment(req, res, next);
	} catch (e) {
		next(e);
	}
};


module.exports.getShipmentHavePkgShipped = async (req, res, next) => {
	try {
		shipmentService.getShipmentHavePkgShipped(req, res, next);
	} catch (e) {
		next(e);
	}
};

