"use strict";
module.exports = (sequelize, DataTypes) => {
  const consignee = sequelize.define(
    "consignee",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ccneName: {
        type: DataTypes.STRING(45),
        field: "ccne_name",
        defaultValue: null,
      },
      ccneAddress: {
        type: DataTypes.STRING(45),
        field: "ccne_address",
        defaultValue: null,
      },
      ccnePhone: {
        type: DataTypes.STRING(45),
        field: "ccne_phone",
        defaultValue: null,
      },
      cneeEmail: {
        type: DataTypes.STRING(45),
        field: "ccne_email",
        defaultValue: null,
      },
    },
    {
      tableName: "consignee",
      timestamps: false,
    }
  );
  consignee.associate = function (models) {};
  return consignee;
};
