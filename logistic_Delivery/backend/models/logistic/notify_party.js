"use strict";
module.exports = (sequelize, DataTypes) => {
  const notify_party = sequelize.define(
    "consignee",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      npName: {
        type: DataTypes.STRING(45),
        field: "np_name",
        defaultValue: null,
      },
      npAddress: {
        type: DataTypes.STRING(45),
        field: "np_address",
        defaultValue: null,
      },
      npPhone: {
        type: DataTypes.STRING(45),
        field: "np_phone",
        defaultValue: null,
      },
      npEmail: {
        type: DataTypes.STRING(45),
        field: "np_email",
        defaultValue: null,
      },
    },
    {
      tableName: "notify_party",
      timestamps: false,
    }
  );
  notify_party.associate = function (models) {};
  return notify_party;
};
