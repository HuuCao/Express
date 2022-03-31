"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const dbconfig = require("../configs/database")[env];
const _ = require("lodash");

const logisticDB = {};

const logistic = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
	host: dbconfig.host,
	dialect: dbconfig.dialect,
});

const modelMonkeyPatch = function (model) {
	const attributes = _.map(model.tableAttributes, (_, attr) => attr);
	function trimColumns(data) {
		return _.pick(data, attributes);
	}
	function trimKeyGuard(originalFn) {
		return function () {
			const args = arguments;
			if (!(args[0] instanceof Sequelize.Model)) {
				args[0] = trimColumns(args[0]);
			} else {
				args[1] = trimColumns(args[1]);
			}
			return originalFn.apply(this, args);
		};
	}
	function toJSONGuard(originalFn, extraIncludes) {
		return function () {
			const self = this;
			const json = originalFn.apply(self, arguments);
			_.forEach(extraIncludes, function (key) {
				const val = self[key];
				if (val === undefined) {
					return;
				}
				json[key] = val;
			});
			return json;
		};
	}
	model.prototype.trimColumns = trimColumns;
	model.trimColumns = trimColumns;
	model.create = trimKeyGuard(model.create);
	model.update = trimKeyGuard(model.update);
	if (!model.options.extraIncludes) {
		return model;
	}
	model.prototype.toJSON = toJSONGuard(model.prototype.toJSON, model.options.extraIncludes);
	return model;
};

// Model Primary DB
fs.readdirSync(__dirname + "/logistic")
	.filter((file) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach((file) => {
		const model = logistic["import"](path.join(__dirname + "/logistic", file));
		logisticDB[model.name] = modelMonkeyPatch(model);
	});

Object.keys(logisticDB).forEach((modelName) => {
	if (logisticDB[modelName].associate) {
		logisticDB[modelName].associate(logisticDB);
	}
});

logisticDB.sequelize = logistic;

module.exports = {
	Sequelize,
	logisticDB,
};
