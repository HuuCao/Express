"use strict";
module.exports = (sequelize, DataTypes) => {
  const warehouse_customer = sequelize.define(
    "warehouse_customer",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wareHouseId: {
        type: DataTypes.INTEGER,
        field: "warehouse_id",
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        field: "company_id",
        allowNull: false,
      },
    },
    {
      tableName: "warehouse_customer",
      timestamps: false,
    }
  );
  warehouse_customer.associate = function (models) {
    warehouse_customer.belongsTo(models.companies, { foreignKey: "companyId" });
    warehouse_customer.belongsTo(models.warehouse, {
      foreignKey: "wareHouseId",
    });
  };
  return warehouse_customer;
};
