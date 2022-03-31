"use strict";
const { COUNTRY_CODE } = require("./constant");
const Validator = require("async-validator");
const _ = require("lodash");
const validator = async (descriptor, data) => {
	try {
		await new Validator.default(descriptor).validate(data);
	} catch ({ errors }) {
		console.log(errors);
		const message = errors.map((error) => error.message).join(",");
		throw new Error(`400:${message}`);
	}
};
let sendSuccess = (response) => {
	if (Array.isArray(response)) {
		return {
			data: response,
			totalRecord: response.length,
		};
	} else {
		return response;
	}
};
let error = (errMessage) => {
	return {
		message: errMessage ? errMessage.toString() : undefined,
	};
};
let sendError = (code, errMessage) => {
	return {
		status: code || 500,
		data: {
			error: error(errMessage),
		},
	};
};
const timestamp = () => {
	function pad(n) {
		return n < 10 ? "0" + n : n;
	}
	var d = new Date();
	var dash = "-";
	var colon = ":";
	return (
		d.getFullYear() +
		dash +
		pad(d.getMonth() + 1) +
		dash +
		pad(d.getDate()) +
		" " +
		pad(d.getHours()) +
		colon +
		pad(d.getMinutes()) +
		colon +
		pad(d.getSeconds())
	);
};
let checkArrayInArray = (bigArr, smallArr) =>
	bigArr.filter((item) => !smallArr.length || smallArr.includes(item)).length > 0;
const types = (type, data) => {
	if (type === "Array") {
		return data instanceof Array;
	}
	return typeof data === type;
};
const regexs = (pattern, data) => data.match(pattern);
const validate = (data, validate) => {
	const keyFailures = Object.keys(data)
		.map((key) => {
			console.log(validate[key]);
			if (!validate[key]) {
				return undefined;
			}
			if (validate[key].require && !data[key]) {
				return {
					field: key,
					message: `Missing parameter '${key}'`,
				};
			}
			if (validate[key].type && !types(validate[key].type, data[key])) {
				return {
					field: key,
					message: `Parameter '${key}' must be ${validate[key].type}`,
				};
			}
			if (validate[key].reg && !regexs(validate[key].reg, data[key])) {
				return {
					field: key,
					message: validate[key].message,
				};
			}
			if (validate[key].validate) {
				const failures = validate[key].validate(data[key]);
				if (failures === true) {
					return;
				}
				if (typeof failures === "object")
					return {
						field: key,
						message: failures,
					};
				return {
					field: key,
					message: validate[key].message,
				};
			}
		})
		.filter((key) => typeof key !== "undefined");
	if (keyFailures.length) {
		return keyFailures;
	}
	return true;
};
const mapping = (data, validate) => {
	const _object = {};
	Object.keys(data).map((key) => {
		if (validate[key]) {
			_object[key] =
				typeof validate[key].map === "function" ? validate[key].map(data[key]) : data[key];
		}
		return key;
	});
	return _object;
};
const getNameCountryByCountryCode = (code) => {
	console.log("CODEEEEEEEEEEEEE", code);
	return COUNTRY_CODE[code];
};
const totalQty = (dataExcel) => {
	let total = 0;
	for (let i = 0; i < dataExcel.length; i++) {
		total = total + dataExcel[i].qty;
	}
	return total;
};
const totalPrice = (dataExcel) => {
	let total = 0;
	for (let i = 0; i < dataExcel.length; i++) {
		total = total + dataExcel[i].price * dataExcel[i].qty;
	}
	return total || 0;
};

const mappingInputData = (fields, body) => {
	const newBody = {};
	fields.map((field) => {
		if (field in body) {
			newBody[field] = body[field];
		}
	});
	return newBody;
};
const validateRequestBodyShipment = (requiredFieldKey, body) => {
	requiredFieldKey.map((field) => {
		if (!field in body || !body[field]) {
			throw new Error(`400:Please input "${field}"`);
		}
	});
};
const formatDataExcel = (data) => {
	return _.sortBy(data, "itemNo");
};

module.exports = {
	sendSuccess,
	sendError,
	error,
	checkArrayInArray,
	validate,
	mapping,
	getNameCountryByCountryCode,
	totalQty,
	validateRequestBodyShipment,
	validator,
	mappingInputData,
	totalPrice,
	formatDataExcel,
	timestamp,
};
