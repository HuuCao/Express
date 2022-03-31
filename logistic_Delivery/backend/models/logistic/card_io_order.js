"use strict";
module.exports = (sequelize, DataTypes) => {
  const card_io_order = sequelize.define(
    "card_io_order",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      card_io_id: {
        type: DataTypes.INTEGER(11),
        field: "card_io_id",
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER(11),
        field: "order_id",
        allowNull: false,
      },
    },
    {
      tableName: "card_io_order",
      timestamps: false,
    }
  );
  card_io_order.associate = function (models) {
    card_io_order.belongsTo(models.order, { foreignKey: "order_id" });
    card_io_order.belongsTo(models.card_io, { foreignKey: "card_io_id" });
  };
  return card_io_order;
};
