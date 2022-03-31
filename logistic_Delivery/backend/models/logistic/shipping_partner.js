"use strict";
module.exports = (sequelize, DataTypes) => {
  const shipping_partner = sequelize.define(
    "shipping_partner",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      shipping_partner_code: {
        type: DataTypes.STRING,
        field: "shipping_partner_code",
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(45),
        field: "name",
        defaultValue: null,
      },
      tel: {
        type: DataTypes.TEXT,
        field: "tel",
        defaultValue: null,
      },
      avt: {
        type: DataTypes.TEXT,
        field: "avt",
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      is_activate: {
        type: DataTypes.INTEGER(1),
        field: "is_activate",
        defaultValue: 1,
      },
      debit: {
        type: DataTypes.FLOAT,
        field: "debit",
        defaultValue: null,
      },
      area: {
        type: DataTypes.ENUM("International", "Inland"),
        field: "area",
        allowNull: false,
      }
    },
    {
      tableName: "shipping_partner",
      timestamps: false,
    }
  );
  shipping_partner.associate = function (models) {
    shipping_partner.hasOne(models.card_io, { foreignKey: "id_shipping" });
    shipping_partner.hasMany(models.order, { foreignKey: "shipping_partner_id" });
  };
  return shipping_partner;
};
