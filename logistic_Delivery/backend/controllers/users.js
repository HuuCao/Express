const {
	getAllRole,
	getUsers,
	updateUser,
	getUserByRole,
	getAllUser,
	getuserDetail,
	addUser,
	deleteUser
} = require("../services/users");
const { Sequelize, logisticDB } = require("../models");

module.exports.getAllUser = (req, res, next) => {
	try {
		getAllUser(req, res, next);
	} catch (e) {
		throw new Error(e);
	}
};

module.exports.addUser = (req, res, next) => {
	try {
		addUser(req, res, next);
	} catch (e) {
		throw new Error(e);
	}
};


module.exports.getAllRole = (req, res, next) => {
	try {
		getAllRole(req, res, next);
	} catch (e) {
		throw new Error(e);
	}
};

module.exports.getUserByRole = (req, res, next) => {
	try {
		getUserByRole(req, res, next);
	} catch (e) {
		throw new Error(e);
	}
};

module.exports.updateUser = async (req, res, next) => {
	try {
		var user = await logisticDB.user.findOne({
			where: {
				id: req.params.id,
		},
		});

		if (!user) {
			return res.send({ success: false, mess: "User Not Found" });
		}


		updateUser(req, res, next);
	} catch (e) {
		throw new Error(e);
	}
};

module.exports.getuserDetail = async (req, res, next) => {
	try {
		return getuserDetail(req,res,next);
	} catch (e) {
		next(e);
	}
};


module.exports.deleteUser = (req, res, next) => {
	try {
		deleteUser(req, res, next);
	} catch (e) {
		throw new Error(e);
	}
};

module.exports.getHomeData = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const response = await userService.getHomeData({ userId }, next);
		res.json(response);
	} catch (e) {
		throw new Error(e);
	}
};
