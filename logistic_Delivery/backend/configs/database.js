module.exports = {
	development: {
		username: "baobao",
		password: "@Baobao123",
		database: "express",
		host: "119.82.130.212",
		dialect: "mysql",
		port: 3306,
		pool: {
			min: 0,
			max: 100,
		},
	},
	release: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		port: process.env.PORT,
		dialect: "mysql",
		pool: {
			min: 0,
			max: 100,
		},
	},
	production: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		port: process.env.PORT,
		dialect: "mysql",
		pool: {
			min: 0,
			max: 100,
		},
	},
};
