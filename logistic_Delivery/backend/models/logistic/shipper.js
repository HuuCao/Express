"use strict";
module.exports = (sequelize, DataTypes) => {
  const shipper = sequelize.define(
    "shipper",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      shipperName: {
        type: DataTypes.STRING(45),
        field: "shipper_name",
        defaultValue: null,
      },
      shipperAddress: {
        type: DataTypes.STRING(45),
        field: "shipper_address",
        defaultValue: null,
      },
      shipperPhone: {
        type: DataTypes.STRING(45),
        field: "shipper_phone",
        defaultValue: null,
      },
      shipperCorporateNumber: {
        type: DataTypes.STRING(45),
        field: "shipper_corporate_number",
        defaultValue: null,
      },
      shipperConsigneeStandard: {
        type: DataTypes.STRING(45),
        field: "shipper_consignee_standard",
        defaultValue: null,
      },
    },
    {
      tableName: "shipper",
      timestamps: false,
    }
  );
  shipper.associate = function (models) {};
  return shipper;
};
