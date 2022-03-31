const { Sequelize, logisticDB } = require("../models");
const jwt = require("../libs/jwt");
const bcrypt = require("../libs/bcrypt");
const logger = require("../libs/Logger");
const { checkArrayInArray } = require("../common/utils");
const validateRule = require("../models/validate");
const utils = require("../common/utils");
const { sendMail } = require("../libs/mail");
const roles = logisticDB.roles;
const companies = logisticDB.companies;

module.exports.login = async (tel, password, refreshToken) => {
	// logger.debug(tel, password, refreshToken);
	if (refreshToken) {
		try {
			const payload = await jwt.verifyRefreshToken(refreshToken);
			const accessToken = await jwt.signToken({
				...payload,
				role: {
					name: payload.role,
				},
			});
			return {
				fullname: payload.fullname,
				accessToken,
				refreshToken,
			};
		} catch (error) {
			logger.debug(error);
			throw new Error("401:Forbiden");
		}
	}
	if (!tel || !password) {
		throw new Error("400:Missing parameter `tel` or `password`");
	}

	const user = await logisticDB.user.findOne({
		where: {
			tel: tel,
		},
		include: [
			roles
		],
	});

	if (!user || !bcrypt.compare(password, user.password)) {
		throw new Error("400:Tel or password not match");
	}

	// if (user.company) {
	// 	user["companyName"] = user.company.enName;
	// }

	await user.role.getPermissions().then((a) => {
		user.permissions = JSON.parse(JSON.stringify(a)).map((value, index) => value.action);
	});

	const [accessToken, _refreshToken] = await Promise.all([
		jwt.signToken(user),
		jwt.signRefreshToken(user),
	]);

	return {
		accessToken,
		refreshToken: _refreshToken,
		tel: tel,
		// warehouse_id:user.wareHouseId,
		userid: user.id,
	};
};
//
// const acceptAPIroute = (baseURL, method) => {
//   if (baseURL.match(/^(\/api\/v1\/(datas|models|projects))/g)) {
//     return true;
//   }
//   if (baseURL.match(/^(\/api\/v1\/users)/g) && baseU=== 3 && method.toLowerCase() === get") {
//     return true
//   }
//   return false
// }

module.exports.authenticate = async (token, permissions, { baseUrl, method, query }) => {
	let payload;
	try {
		payload = await jwt.verifyToken(token);
	} catch (error) {
		logger.error(error);
		throw new Error("401:Forbiden");
	}
	if (!checkArrayInArray(payload.permissions, permissions)) {
		throw new Error("403:Permission denied");
	}
	return payload;
};

module.exports.register = async (req, res, next) => {
	// const fieldFailuresUser = utils.validate(data, validateRule.modelUsers);
	// if (fieldFailuresUser !== true) {
	// 	throw new Error("400:" + fieldFailuresUser.map((field) => field.message).join("\n"));
	// }
	// const _data = utils.mapping(data, validateRule.modelUsers);
	var data = req.body
	const countUsername = await logisticDB.user.count({
		where: {
			tel: data.tel
		},
	});
	if (countUsername > 0) {
		throw new Error("400:Username has ben taken");
	}
	
	req.body.password = bcrypt.hash(req.body.password);
	const user = await logisticDB.user.create({
		...data,
		is_activate: 1
	});
	delete user.password;
	res.send({ success: true, mess: "Success" });
	// return user;
	// res.send({ success: true, mess: "Success" })
	// if (actor.role === "admin" && ![2, 3, 4, 5,6].includes(data.roleId)) {
	// 	throw new Error("400:You haven't permission 1!");
	// }
	// if (actor.role === "subAdmin" && ![3, 4, 5,6].includes(data.roleId)) {
	// 	throw new Error("400:You haven't permission 2!");
	// }
	// if (actor.role === "client") {
	// 	throw new Error("400:You haven't permission 3!");
	// }

	// const [user] = await Promise.all([
	// 	logisticDB.user.create({
	// 		..._data,
	// 		address: data.address,
	// 		companyId: data.companyId,
	// 		email: data.email,
	// 		position: data.position,
	// 		name: data.name,
	// 		tel: data.tel,
	// 		wareHouseId: data.wareHouseId,
	// 	}),
	// ]);

	// delete user.password;
	// user.password = "******";
	// return user;
};

module.exports.sendOTP = async (req, res, next) => {
	try {
		var user = await logisticDB.user.findOne({
			where: {
				email: req.body.email,
			},
		});
		console.log(user.codeOTP);

		if (user == undefined) {
			return res.status(401).send({ success: false, mess: "User not exsied" });
		}
		var code = Math.floor(Math.random() * (99999 - 10000)) + 10000;
		req.user = user;
		req.user.code = code;
		console.log(req.user.code);
		await sendMail(
			req.user.email,
			"Forgot Password",
			`Mã OTP của bạn là: ${req.user.code}\nCreate by BaoBao .`
		  ).catch((e) => {
			throw next(new Error(`402:${`Send mail fail !`}`));
		  });

		await logisticDB.user.update(
			{
				codeOTP: req.user.code,
			},
			{
				where: {
				email: user.email,
				},
			}
		);
    return res.send({ success: true, mess: "had sent OTP" });
	}
	catch (err) {
		res.send({ success: false, mess: "Error: " + err });
	}
}

module.exports.verifyOTP = async (req, res, next) => {
	try {
	  var user = await logisticDB.user.findOne({
		where: {
		  email: req.body.email,
		  codeOTP: req.body.codeOTP,
		},
	  });

	  if (!user) {
		res.send({ success: false, mess: "OTP code Incorrect " });
	  } else {
		res.send({ success: true, mess: "Success" });
	  }
	} catch (err) {
	  next(err);
	}
};

module.exports.changePass = async (req, res, next) => {
	try {
	  var user = await logisticDB.user.findOne({
		email: req.body.email,
	  });
  
	  req.body.passwordnew = await bcrypt.hash(req.body.passwordnew);
  
	  if (user) {
		await logisticDB.user.update(
		  {
			password: req.body.passwordnew,
		  },
		  {
			where: {
			  email: req.body.email,
			},
		  }
		);
		res.send({ success: true, mess: "Change password success " });
	  } else {
		res.send({ success: false, mess: "User not found" });
	  }
	} catch (err) {
	  next(err);
	}
};