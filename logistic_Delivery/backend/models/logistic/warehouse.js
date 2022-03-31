"use strict";
module.exports = (sequelize, DataTypes) => {
  const warehouse = sequelize.define(
    "warehouse",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(64),
        field: "code",
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        field: "name",
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        field: "address",
        allowNull: false,
      },
      capacity: {
        type: DataTypes.DOUBLE,
        field: "capacity",
        defaultValue: null,
      },
      description: {
        type: DataTypes.TEXT,
        field: "description",
        defaultValue: null,
      },
      companyId: {
        type: DataTypes.INTEGER,
        field: "company_id",
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
      tableName: "warehouse",
      timestamps: false,  
    }
  );
  warehouse.associate = function (models) {
    warehouse.hasMany(models.warehouse_customer, { foreignKey: "wareHouseId" });
    // warehouse.hasMany(models.user, { foreignKey: "wareHouseId" });
    warehouse.hasMany(models.shipment, { foreignKey: "wareHouseId" });
    warehouse.hasMany(models.packages, { foreignKey: "wareHouseId" });
    warehouse.hasMany(models.warehouse_package, { foreignKey: "wareHouseId" });
    warehouse.belongsTo(models.companies, { foreignKey: "companyId" });
  };
  return warehouse;
};
