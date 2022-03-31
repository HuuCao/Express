"use strict";
module.exports = (sequelize, DataTypes) => {
  const tracking_package = sequelize.define(
    "tracking_package",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status_id: {
        type: DataTypes.INTEGER,
        field: "status_id",
        allowNull: false,
      },
      package_id: {
        type: DataTypes.INTEGER,
        field: "package_id",
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "createdAt",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "tracking_package",
      timestamps: false,
    }
  );
  tracking_package.associate = function (models) {
    tracking_package.belongsTo(models.packages, { foreignKey: "package_id" });
  };
  return tracking_package;
};
