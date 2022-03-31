"use strict";
module.exports = (sequelize, DataTypes) => {
  const card_io = sequelize.define(
    "card_io",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      cost_import: {
        type: DataTypes.DOUBLE,
        field: "cost_import",
        allowNull: true,
      },
      cost_export: {
        type: DataTypes.DOUBLE,
        field: "cost_export",
        allowNull: true,
      },
      cod: {
        type: DataTypes.DOUBLE,
        field: "cod",
        allowNull: true,
      },
      sub_cost: {
        type: DataTypes.DOUBLE,
        field: "sub_cost",
        allowNull: true,
      },
      id_shipping: {
        type: DataTypes.INTEGER(11),
        field: "id_shipping",
        allowNull: true,
      },
      sub_code: {
        type: DataTypes.INTEGER(100),
        field: "sub_code",
        allowNull: true,
      },
      code: {
        type: DataTypes.INTEGER(100),
        field: "code",
        allowNull: true,
      },
      id_customer: {
        type: DataTypes.INTEGER(11),
        field: "id_customer",
        allowNull: true,
      },
      amount_import_package: {
        type: DataTypes.INTEGER(11),
        field: "amount_import_package",
        allowNull: true,
      },
      amount_export_package: {
        type: DataTypes.INTEGER(11),
        field: "amount_export_package",
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("import", "export"),
        field: "type",
        allowNull: false,
      },
      is_activate: {
        type: DataTypes.INTEGER(1),
        field: "is_activate",
        defaultValue: 1,
      },
      link_image: {
        type: DataTypes.STRING,
        field: "link_image",
        defaultValue: 1,
      },
      note: {
        type: DataTypes.STRING,
        field: "note",
        defaultValue: 1,
      },
    },
    {
      tableName: "card_io",
      timestamps: false,
    }
  );
  card_io.associate = function (models) {
    card_io.hasMany(models.order, { foreignKey: "card_in_out" });
   //card_io.hasMany(models.order, { foreignKey: "card_out_id" });
    card_io.belongsTo(models.user, { foreignKey: "id_customer" })
    card_io.belongsTo(models.shipping_partner, { foreignKey: "id_shipping" });
  };
  return card_io;
};
