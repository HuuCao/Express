"use strict";
module.exports = (sequelize, DataTypes) => {
  const shipping_method = sequelize.define(
    "shipping_method",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        field: "name",
        defaultValue: null,
      },
    },
    {
      tableName: "shipping_method",
      timestamps: false,
    }
  );

  shipping_method.associate = function (models) {};
  return shipping_method;
};
