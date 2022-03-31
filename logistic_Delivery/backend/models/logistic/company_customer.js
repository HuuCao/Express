"use strict";
module.exports = (sequelize, DataTypes) => {
	const company_customer = sequelize.define(
		"company_customer",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			companyId: {
				type: DataTypes.INTEGER,
				field: "company_id",
				allowNull: false,
			},
			customerId: {
				type: DataTypes.INTEGER,
				field: "customer_id",
				defaultValue: null,
			},
			createdAt: {
				type: DataTypes.DATE,
				field: "created_at",
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			tableName: "company_customer",
			timestamps: false,
		}
	);
	company_customer.associate = function (models) {
		company_customer.belongsTo(models.companies, { foreignKey: "companyId" });
		company_customer.belongsTo(models.customer_receiver, { foreignKey: "customerId" });
	};
	return company_customer;
};
