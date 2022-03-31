"use strict";
module.exports = (sequelize, DataTypes) => {
	const warehouse_package = sequelize.define(
		"warehouse_package",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			wareHouseId: {
				type: DataTypes.INTEGER,
				field: "warehouse_id",
				allowNull: false,
			},
			packageId: {
				type: DataTypes.INTEGER,
				field: "package_id",
				defaultValue: null,
			},
			statusId: {
				type: DataTypes.INTEGER,
				field: "status_id",
				allowNull: false,
			},
			reasonId: {
				type: DataTypes.INTEGER,
				field: "reason_id",
				defaultValue: null,
			},
			modifiedAt: {
				type: DataTypes.DATE,
				field: "modified_at",
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
			tableName: "warehouse_package",
			timestamps: false,
		}
	);
	warehouse_package.associate = function (models) {
		warehouse_package.belongsTo(models.warehouse, {
			foreignKey: "wareHouseId",
		});
		warehouse_package.belongsTo(models.reason, {
			foreignKey: "reasonId",
		});
		warehouse_package.belongsTo(models.package_status, {
			foreignKey: "statusId",
		});
		warehouse_package.belongsTo(models.packages, {
			foreignKey: "packageId",
		});
	};
	return warehouse_package;
};
