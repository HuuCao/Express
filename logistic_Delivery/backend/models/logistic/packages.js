"use strict";

const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const packages = sequelize.define(
    "packages",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cartonNo: {
        type: String(64),
        field: "carton_no",
        allowNull: false,
      },
      net: {
        type: DataTypes.FLOAT,
        field: "net",
        defaultValue: 0,
      },
      gross: {
        type: DataTypes.FLOAT,
        field: "gross",
        defaultValue: 0,
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT,
        field: "height",
        defaultValue: 0,
        allowNull: false,
      },
      width: {
        type: DataTypes.FLOAT,
        field: "width",
        defaultValue: 0,
        allowNull: false,
      },
      realWeight: {
        type: DataTypes.FLOAT,
        field: "real_weight",
        defaultValue: 0,
        allowNull: false,
      },
      length: {
        type: DataTypes.DOUBLE,
        field: "length",
        defaultValue: 0,
        allowNull: false,
      },
      pkgType: {
        type: DataTypes.ENUM("Loose carton", "Pallet", "Wooden crate", "Bag"),
        field: "pkg_type",
        defaultValue: null,
      },
      warning: {
        type: DataTypes.BOOLEAN,
        field: "warning",
        defaultValue: null,
      },
      currentStatusId: {
        type: DataTypes.INTEGER,
        field: "current_status_id",
        defaultValue: null,
      },
      note: {
        type: DataTypes.TEXT("tiny"),
        field: "note",
        defaultValue: null,
      },
      cod: {
        type: DataTypes.DOUBLE,
        field: "cod",
        defaultValue: null,
      },
      volume: {
        type: DataTypes.FLOAT,
        field: "volume",
        defaultValue: null,
      },
      numItem: {
        type: DataTypes.INTEGER,
        field: "num_item",
        defaultValue: null,
      },
      coCheck: {
        type: DataTypes.INTEGER(1),
        field: "co_check",
        defaultValue: 0,
      },
      pcs: {
        type: DataTypes.INTEGER,
        field: "pcs",
        defaultValue: null,
      },
      shipmentId: {
        type: DataTypes.INTEGER,
        field: "shipment_id",
        require: true,
        defaultValue: null,
      },
      wareHouseId: {
        type: DataTypes.INTEGER,
        field: "warehouse_id",
        defaultValue: null,
      },
      bagId: {
        type: DataTypes.INTEGER,
        field: "bag_id",
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "packages",
      timestamps: false,
    }
  );
  packages.associate = function (models) {
    // packages.hasMany(models.pkg_source_link, { foreignKey: "packageId" });
    // packages.hasOne(models.package_user, { foreignKey: "packageId" });
    // packages.hasOne(models.fee, { foreignKey: "packageId" });
    // packages.hasMany(models.user_lock, { foreignKey: "packageId" });
    // packages.hasMany(models.tracking_package, { foreignKey: "package_id" });
    // packages.hasOne(models.warehouse_package, { foreignKey: "packageId" });
    // packages.hasOne(models.pkg_effort, { foreignKey: "packageId" });
    // packages.hasOne(models.pkg_receiver, { foreignKey: "pkgId" });
    // packages.belongsTo(models.shipment, { foreignKey: "shipmentId" });
    // packages.belongsTo(models.warehouse, { foreignKey: "wareHouseId" });
    // packages.belongsTo(models.bags, { foreignKey: "bagId" });
  };
  return packages;
};
