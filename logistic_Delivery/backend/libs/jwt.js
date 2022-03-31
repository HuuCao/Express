const jwt = require("jsonwebtoken");

const sign = (user, type, isSaveSession = false) => {
	const payload = {
		id: user.role_id,
		user_id:user.id,
		permissions: user.permissions,
		companyName: user.companyName,
		role: user.role.name,
		company_id: user.company_id,
	};

	return new Promise((resolve, reject) => {
		jwt.sign(
			{
				...payload,
				exp: Math.floor(Date.now() / 1000) + 1000 * 36000,
			},
			process.env[`${type}_PRIVATE_KEY`],
			{ algorithm: "RS256" },
			(error, encoded) => {
				if (error) return reject(error);
				return resolve(encoded);
			}
		);
	});
};

const verify = (token, type) => {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			process.env[`${type}_PUBLIC_KEY`],
			{ algorithms: "RS256" },
			(error, decoded) => {
				if (error) return reject(error);
				return resolve(decoded);
			}
		);
	});
};

const decode = jwt.decode;

const signResetPassword = (user) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{
				id: user.id,
				exp: Math.floor(Date.now() / 1000) + Number(process.env.DOWNLOAD_TIMEOUT || 15 * 60),
			},
			process.env.RESET_PASSWORD,
			(error, encoded) => {
				if (error) return reject(error);
				return resolve(encoded);
			}
		);
	});
};

const verifyResetPassword = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.RESET_PASSWORD, (error, decoded) => {
			if (error) return reject(error);
			return resolve(decoded);
		});
	});
};

module.exports = {
	decode,
	signToken: (user) => sign(user, "ACCESS_TOKEN"),
	signRefreshToken: (user, isSaveSession) => sign(user, "REFRESH_TOKEN", isSaveSession),
	signResetPassword,
	verifyToken: (token) => verify(token, "ACCESS_TOKEN"),
	verifyRefreshToken: (token) => verify(token, "REFRESH_TOKEN"),
	verifyResetPassword,
};
