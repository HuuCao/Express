"use strict";
module.exports = (sequelize, DataTypes) => {
  const reason = sequelize.define(
    "reason",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tag: {
        type: DataTypes.STRING,
        field: "tag",
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
      tableName: "reason",
      timestamps: false,
    }
  );
  reason.associate = function (models) {
    reason.hasMany(models.warehouse_package, { foreignKey: "reasonId" });
  };
  return reason;
};
