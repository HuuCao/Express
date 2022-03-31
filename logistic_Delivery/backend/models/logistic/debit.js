"use strict";
module.exports = (sequelize, DataTypes) => {
  const debit = sequelize.define(
    "debit",
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
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        field: "note",
        defaultValue: null,
      },
      id_customer: {
        type: DataTypes.INTEGER,
        field: "id_customer",
        allowNull: true,
        defaultValue: null,
      },
      id_shipping_partner: {
        type: DataTypes.INTEGER,
        field: "id_shipping_partner",
        allowNull: true,
        defaultValue: null,
      },
      sum_cost: {
        type: DataTypes.FLOAT,
        field: "sum_cost",
        allowNull: true,
        defaultValue: 0,
      },
      cost_received: {
        type: DataTypes.FLOAT,
        field: "cost_received",
        allowNull: true,
        defaultValue: 0,
      },
      cost_remain: {
        type: DataTypes.FLOAT,
        field: "cost_remain",
        allowNull: true,
        defaultValue: 0,
      },
      id_card: {
        type: DataTypes.INTEGER,
        field: "id_card",
        defaultValue: null,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        field: "description",
        defaultValue: null,
      },
      type: {
        type: DataTypes.STRING,
        field: "type",
        defaultValue: null,
      },
      is_received: {
        type: DataTypes.BOOLEAN,
        field: "is_received",
        defaultValue: false,
      },
      category: {
        type: DataTypes.ENUM("International", "Inland", "Customer"),
        field: "category",
        allowNull: false,
      },
    },
    {
      tableName: "debit",
      timestamps: false,
    }
  );
  debit.associate = function (models) {
    debit.belongsTo(models.card_io, { foreignKey: "id_card" });
    debit.belongsTo(models.user, { foreignKey: "id_customer" });
    debit.belongsTo(models.shipping_partner, {
      foreignKey: "id_shipping_partner",
    });
  };
  return debit;
};
