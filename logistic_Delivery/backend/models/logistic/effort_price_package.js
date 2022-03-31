"use strict";
module.exports = (sequelize, DataTypes) => {
	const effort_price_package = sequelize.define(
		"effort_price_package",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
            effort_price_id:{
                type: DataTypes.INTEGER,
				field: "effort_price_id",
				allowNull: false,
            },
			cost_per_kg: {
				type: DataTypes.FLOAT,
				field: "cost_per_kg",
				allowNull: false,
			},
			cost_per_m3: {
				type: DataTypes.FLOAT,
				field: "cost_per_m3",
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				field: "created_at",
				allowNull: false,
				defaultValue: DataTypes.NOW
			},
			condition_maximum_kg: {
				type: DataTypes.FLOAT,
				field: "condition_maximum_kg",
				allowNull: false,
				defaultValue: 0,
			},
			condition_miximum_kg: {
				type: DataTypes.FLOAT,
				field: "condition_miximum_kg",
				allowNull: false,
				defaultValue: 0,
			},
			modified_at: {
				type: DataTypes.DATE,
				field: "modified_at",
				defaultValue: DataTypes.NOW
			},
		},
		{
			tableName: "effort_price_package",
			timestamps: false,
		}
	);
	effort_price_package.associate = function (models) {
	//	effort_price_package.belongsTo(models.effort_price, { foreignKey: "effort_price_id" });
	};
	return effort_price_package;
};
