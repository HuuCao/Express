"use strict";
module.exports = (sequelize, DataTypes) => {
	const pkg_source_link = sequelize.define(
		"pkg_source_link",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			packageId: {
				type: DataTypes.INTEGER,
				field: "package_id",
				allowNull: false,
			},
			type: {
				type: DataTypes.INTEGER(1),
				field: "type",
				allowNull: null,
			},
			link: {
				type: DataTypes.STRING(256),
				field: "link",
				defaultValue: null,
			},
			isActive: {
				type: DataTypes.INTEGER(1),
				field: "isactivate",
				allowNull: null,
				defaultValue: 1,
			},
		},
		{
			tableName: "pkg_source_link",
			timestamps: false,
		}
	);
	pkg_source_link.associate = function (models) {
		pkg_source_link.belongsTo(models.packages, { foreignKey: "packageId" });
	};
	return pkg_source_link;
};
