"use strict";
module.exports = (sequelize, DataTypes) => {
	const customer_receiver = sequelize.define(
		"customer_receiver",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			phone: {
				type: DataTypes.STRING,
				field: "phone",
				allowNull: false,
			},
			name: {
				type: DataTypes.TEXT("tiny"),
				field: "name",
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				field: "email",
				defaultValue: null,
			},
			tel: {
				type: DataTypes.STRING,
				field: "tel",
				defaultValue: null,
			},
			address: {
				type: DataTypes.STRING,
				field: "address",
			},
		},
		{
			tableName: "customer_receiver",
			timestamps: false,
		}
	);
	customer_receiver.associate = function (models) {
		customer_receiver.hasOne(models.company_customer, { foreignKey: "customerId" });
		customer_receiver.hasMany(models.pkg_receiver, { foreignKey: "creceiverId" });
	};
	return customer_receiver;
};
