"use strict";
module.exports = (sequelize, DataTypes) => {
	const pkg_receiver = sequelize.define(
		"pkg_receiver",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			pkgId: {
				type: DataTypes.INTEGER,
				field: "pkg_id",
				allowNull: false,
			},
			creceiverId: {
				type: DataTypes.INTEGER,
				field: "creceiver_id",
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
			tableName: "pkg_receiver",
			timestamps: false,
		}
	);
	pkg_receiver.associate = function (models) {
		pkg_receiver.belongsTo(models.packages, { foreignKey: "pkgId" });
		pkg_receiver.belongsTo(models.packages, { foreignKey: "creceiverId" });
		pkg_receiver.belongsTo(models.customer_receiver, { foreignKey: "creceiverId" });
	};
	return pkg_receiver;
};
