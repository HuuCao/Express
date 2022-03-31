const companyService = require("../services/companies");
const { validator, mappingInputData } = require("../common/utils");
const { descriptorCreateCompany, initialData } = require("../configs/FormDataDefine/company");
const { sendSuccess } = require("../common/utils");

module.exports.createCompany = async (req, res, next) => {
	try {
		//let body = mappingInputData(initialData, req.body);
		//await validator(descriptorCreateCompany, body);
		const response = await companyService.createCompany(req.body, req.user);
		res.json(response);
	} catch (e) {
		next(e);
	}
};

module.exports.getDetailCompany = async (req, res, next) => {
	try {
		const { id } = req.user;
		const response = await companyService.getDetailCompany(id);
		res.json(response);
	} catch (e) {
		next(e);
	}
};

module.exports.getAllCompanies = async (req, res, next) => {
	try {
		companyService.getAllCompanies(req,res,next);
	} catch (e) {
		next(e);
	}
};

module.exports.updateCompanies = async (req, res, next) => {
	try {
		companyService.updateCompanies(req,res,next);
	} catch (e) {
		next(e);
	}
};
