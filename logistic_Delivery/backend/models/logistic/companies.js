"use strict";
module.exports = (sequelize, DataTypes) => {
	const companies = sequelize.define(
		"companies",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			enName: {
				type: DataTypes.TEXT,
				field: "en_name",
				allowNull: false,
			},
			oriName: {
				type: DataTypes.TEXT,
				field: "ori_name",
				defaultValue: null,
			},
			viName: {
				type: DataTypes.TEXT,
				field: "vi_name",
				defaultValue: null,
			},
			otherName: {
				type: DataTypes.TEXT,
				field: "other_name",
				defaultValue: null,
			},
			enAddress: {
				type: DataTypes.TEXT,
				field: "en_address",
				defaultValue: null,
			},
			oriAddress: {
				type: DataTypes.TEXT,
				field: "ori_address",
				defaultValue: null,
			},
			viAddress: {
				type: DataTypes.TEXT,
				field: "vi_address",
				defaultValue: null,
			},
			tel: {
				type: DataTypes.STRING(64),
				field: "tel",
				defaultValue: null,
			},
			expCode: {
				type: DataTypes.STRING(64),
				field: "exp_code",
				defaultValue: null,
			},
			taxCode: {
				type: DataTypes.STRING(64),
				field: "tax_code",
				defaultValue: null,
			},
			companyCode: {
				type: DataTypes.STRING(64),
				field: "company_code",
				allowNull: false,
			},
			cellPhone: {
				type: DataTypes.STRING(64),
				field: "cell_phone",
				defaultValue: null,
			},
			representative: {
				type: DataTypes.TEXT,
				field: "representative",
				defaultValue: null,
			},
			type: {
				type: DataTypes.ENUM("Agency", "ShipperCompany"),
				field: "type",
				allowNull: false,
			},
			isActive: {
				type: DataTypes.INTEGER(1),
				field: "is_active",
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				field: "created_at",
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			tableName: "companies",
			timestamps: false,
		}
	);
	companies.associate = function (models) {
		// companies.hasMany(models.warehouse, { foreignKey: "companyId" });
		// companies.hasMany(models.warehouse_customer, { foreignKey: "companyId" });
		// companies.hasMany(models.user, { foreignKey: "companyId" });
		// companies.hasOne(models.effort_prices, { foreignKey: "companyId" });
		// companies.hasMany(models.company_customer, { foreignKey: "companyId" });
	};
	return companies;
};
