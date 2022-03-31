"use strict";
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	const shipment = sequelize.define(
		"shipment",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			invoiceNo: {
				type: DataTypes.STRING(64),
				field: "invoice_no",
				allowNull: false,
			},
			invoiceType: {
				type: DataTypes.ENUM("commercial", "noncommercial"),
				field: "invoice_type",
				allowNull: false,
				defaultValue: "commercial",
			},
			shippingDate: {
				type: DataTypes.DATE,
				field: "shipping_date",
				allowNull: false,
			},
			flightNo: {
				type: DataTypes.STRING(64),
				field: "flight_no",
				defaultValue: null,
			},
			shippingFrom: {
				type: DataTypes.STRING(64),
				field: "shipping_from",
				defaultValue: null,
			},
			shippingTo: {
				type: DataTypes.STRING(64),
				field: "shipping_to",
				defaultValue: null,
			},
			termPayment: {
				type: DataTypes.ENUM("T/T", "Non-Commercial"),
				field: "term_payment",
				allowNull: false,
			},
			blDescription: {
				type: DataTypes.TEXT("tiny"),
				field: "bl_description",
				defaultValue: null,
			},
			shippedPer: {
				type: DataTypes.STRING(256),
				field: "shipped_per",
				defaultValue: null,
			},
			remarks: {
				type: DataTypes.STRING(256),
				field: "remarks",
				defaultValue: null,
			},
			state: {
				type: DataTypes.ENUM(
					"creating",
					"closed",
					"wait_confirm",
					"confirming",
					"confirmed",
					"shipped",
					"preparing"
				),
				field: "state",
				allowNull: false,
				defaultValue: "creating",
			},
			userId: {
				type: DataTypes.INTEGER,
				field: "user_id",
				allowNull: false,
			},
			wareHouseId: {
				type: DataTypes.INTEGER,
				field: "warehouse_id",
				defaultValue: null,
			},
			csId: {
				type: DataTypes.INTEGER,
				field: "cs_id",
				allowNull: false,
			},
			cneeName: {
				type: DataTypes.TEXT("tiny"),
				field: "ccne_name",
				defaultValue: null,
			},
			cneeAddress: {
				type: DataTypes.TEXT("tiny"),
				field: "ccne_address",
				defaultValue: null,
			},
			cneePhone: {
				type: DataTypes.TEXT("tiny"),
				field: "ccne_phone",
				defaultValue: null,
			},
			cneeEmail: {
				type: DataTypes.TEXT("tiny"),
				field: "ccne_email",
				defaultValue: null,
			},
			npName: {
				type: DataTypes.TEXT("tiny"),
				field: "np_name",
				defaultValue: null,
			},
			npAddress: {
				type: DataTypes.TEXT("tiny"),
				field: "np_address",
				defaultValue: null,
			},
			npPhone: {
				type: DataTypes.TEXT("tiny"),
				field: "np_phone",
				defaultValue: null,
			},
			npEmail: {
				type: DataTypes.TEXT("tiny"),
				field: "np_email",
				defaultValue: null,
			},
			shipperName: {
				type: DataTypes.TEXT("tiny"),
				field: "shipper_name",
				defaultValue: null,
			},
			shipperAddress: {
				type: DataTypes.TEXT("tiny"),
				field: "shipper_address",
				defaultValue: null,
			},
			shipperPhone: {
				type: DataTypes.TEXT("tiny"),
				field: "shipper_phone",
				defaultValue: null,
			},
			shipperCorporateNumber: {
				type: DataTypes.TEXT("tiny"),
				field: "shipper_corporate_number",
				defaultValue: null,
			},
			shipperConsigneeStandard: {
				type: DataTypes.TEXT("tiny"),
				field: "shipper_consignee_standard",
				defaultValue: null,
			},
			processedDate: {
				type: DataTypes.DATE,
				field: "processed_date",
				defaultValue: null,
			},
			csProcessedName: {
				type: DataTypes.STRING,
				field: "cs_processed_name",
				defaultValue: null,
			},
			wbId: {
				type: DataTypes.STRING(32),
				field: "mawb",
				defaultValue: null,
			},
			at_warehouse: {
				type: DataTypes.INTEGER(2),
				field: "at_warehouse",
				defaultValue: 0,
				allowNull: true,
			},
			id_company: {
				type: DataTypes.INTEGER(11),
				field: "id_company",
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
			tableName: "shipment",
			timestamps: false,
		}
	);
	shipment.associate = function (models) {
		shipment.hasMany(models.packages, { foreignKey: "shipmentId" });
		shipment.belongsTo(models.user, { foreignKey: "userId" });
		shipment.belongsTo(models.companies, { foreignKey: "id_company" });
		shipment.belongsTo(models.warehouse, { foreignKey: "wareHouseId" });
	};
	return shipment;
};
