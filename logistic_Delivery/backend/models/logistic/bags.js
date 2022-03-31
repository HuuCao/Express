"use strict";
module.exports = (sequelize, DataTypes) => {
	const bags = sequelize.define(
		"bags",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				field: "idbags",

			},
			shipment_id: {
				type: DataTypes.INTEGER,
				field: "shipment_id",
				allowNull: false,
			},
			bagCode: {
				type: DataTypes.STRING,
				field: "bag_code",
				defaultValue: null,
			},
		},
		{
			tableName: "bags",
			timestamps: false,
		}
	);
	bags.associate = function (models) {
		bags.hasMany(models.packages, { foreignKey: "bagId" });
	};
	return bags;
};
