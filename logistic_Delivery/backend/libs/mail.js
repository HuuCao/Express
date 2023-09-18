var nodemail = require("nodemailer");

var transporter = nodemail.createTransport({
	service: "gmail",
	auth: {
		user: "bot.huucao.2021@gmail.com",
		pass: "",
	},
});

const sendMail = (address, subject, content) => {
	var mailOptions = {
		from: "bot.huucao.2021@gmail.com",
		to: address,
		subject: subject,
		text: content,
	};
	return transporter.sendMail(mailOptions);
};

module.exports = {
	sendMail,
};
