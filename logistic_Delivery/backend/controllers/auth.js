const authService = require("../services/auth");
const { validator, mappingInputData } = require("../common/utils");
const { descriptorLogin, initialDataLogin, verifyVal } = require("../configs/FormDataDefine/user");
const { Sequelize, logisticDB } = require("../models");

module.exports.handleLogin = async(req, res, next) => {
	const { tel, password, refreshToken } = req.body;

	if (tel == undefined || password == undefined)
		return res.status(401).send({ success: false, mess: "Tel or password not found" });
	var user = await logisticDB.user.findOne({
		where: {
		tel: req.body.tel,
		},
	});
	if (!user) {
		return res.send({ success: false, mess: "Username Not Found" });
	}

	if (user.is_activate == 0)
		return res.send({ success: false, mess: "Account Not Active" });

	authService
		.login(tel, password, refreshToken)
		.then((response) => res.json(response))
		.catch((err) => next(err));
};

module.exports.authenticate = (permissions) => (req, res, next) => {
	const { headers } = req;
	const token = headers.authorization ? headers.authorization.replace("Bearer ", "") : null;

	if (!token) {
		return next(new Error("401:Forbiden"));
	}

	authService
		.authenticate(token, permissions, req)
		.then((payload) => {
			req.user = payload;
			next();
		})
		.catch((err) => next(err));
};

module.exports.register = async (req, res, next) => {
	try {
		// console.log(req.user);
		let body = mappingInputData(initialDataLogin, req.body);
		// await validator(descriptorLogin, body);
		const response = await authService.register(req, res, next);
		res.json(response);
	} catch (err) {
		res.send({ success: false, mess: "Error: " + err })
	}
};

module.exports.sendOTP = async (req, res, next) => {
	try {
		if (req.body.email == undefined) {
			res.send({ success: false, mess: "Not found email!" });
		}
		await authService.sendOTP(req, res, next);
	}
	catch (err) {
		res.send({ success: false, mess: "Error: " + err });
	}
}

module.exports.verifyOTP = async (req, res, next) => {
	try {
	  const val = validator(req.body, verifyVal);
  
	  if (val == false) return res.send({ success: false, mess: "Valid wrong" });
  
	  const response = await authService.verifyOTP(req, res, next);
  
	  res.json(response);
	} catch (err) {
	  throw new Error("Error: " + err);
	}
};

module.exports.changePass = async (req, res, next) => {
	try {
	  if (req.body.email == undefined) {
		res.send({ success: false, mess: "not found email" });
	  }
	  if (req.body.passwordnew == undefined) {
		res.send({ success: false, mess: "not found passwordnew" });
	  }
  
	  await authService.changePass(req, res, next);
	} catch (err) {
	  throw new Error("Error: " + err);
	}
};