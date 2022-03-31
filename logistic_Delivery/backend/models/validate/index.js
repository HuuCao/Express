const bcrypt = require("../../libs/bcrypt");

module.exports.modelUsers = {
	username: {
		require: true,
		type: "string",
	},
	password: {
		require: true,
		type: "string",
		reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/g,
		map: (data) => bcrypt.hash(data),
		message:
			"Password not validate, your password must be have at least 8 characters long, 1 uppercase & 1 lowercase character, 1 number",
	},
	roleId: {
		require: true,
		type: "number",
	},
};

// module.exports.updatePassword = (data, user) => {
//   const fields = ["currentPassword", "newPassword", "confirmPassword"];
//   fields.map(f => {
//     if (!data[f] || data[f].trim() === "") {
//       throw new Error(`400:Missing parameter "${f}"`)
//     }
//   })
//
//   if (data.newPassword !== data.confirmPassword) {
//     throw new Error("400:New password and confirm password not match")
//   }
//
//   if (!bcrypt.compare(data.currentPassword, user.password)) {
//     throw new Error("400:Password not match")
//   }
// }
