"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      order_status: {
        type: DataTypes.ENUM("CameBack", "Delivery", "StackCar"),
        field: "order_status",
        allowNull: false,
      },
      code_bill: {
        type: DataTypes.STRING(45),
        field: "code_bill",
        allowNull: false,
      },
      total_quantity_package: {
        type: DataTypes.INTEGER(11),
        field: "total_quantity_package",
        allowNull: true,
      },
      amount_package_imported: {
        type: DataTypes.INTEGER(11),
        field: "amount_package_imported",
        allowNull: true,
      },
      tracking_number: {
        type: DataTypes.STRING(50),
        field: "tracking_number",
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        field: "user_id",
        allowNull: false,
      },
      card_in_out: {
        type: DataTypes.INTEGER(11),
        field: "card_in_out",
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        field: "description",
        allowNull: false,
      },
      bag: {
        type: DataTypes.STRING(255),
        field: "bag",
        allowNull: false,
      },
      cod: {
        type: DataTypes.DOUBLE,
        field: "cod",
        defaultValue: null,
        allowNull: true,
      },
      other_cost: {
        type: DataTypes.DOUBLE,
        field: "other_cost",
        allowNull: true,
      },
      sub_fee: {
        type: DataTypes.DOUBLE,
        field: "sub_fee",
        allowNull: true,
      },
      fee_package: {
        type: DataTypes.FLOAT,
        field: "fee_package",
        allowNull: true,
      },
      fee_package: {
        type: DataTypes.FLOAT,
        field: "fee_package",
        allowNull: true,
      },
      cost_origin: {
        type: DataTypes.FLOAT,
        field: "cost_origin",
        allowNull: true,
      },
      volume: {
        type: DataTypes.FLOAT,
        field: "volume",
        allowNull: true,
      },
      mass: {
        type: DataTypes.FLOAT,
        field: "mass",
        allowNull: true,
      },
      unit_price: {
        type: DataTypes.DOUBLE,
        field: "unit_price",
        allowNull: true,
      },
      promotion_code: {
        type: DataTypes.STRING(100),
        field: "promotion_code",
        allowNull: true,
      },
      type_card: {
        type: DataTypes.STRING(100),
        field: "type_card",
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      date_sign: {
        type: DataTypes.DATE,
        field: "date_sign",
        allowNull: false,
      },
      status_check: {
        type: DataTypes.ENUM("Checked", "Checking"),
        field: "status_check",
        allowNull: false,
      },
      shipping_partner_id: {
        type: DataTypes.INTEGER(1),
        field: "shipping_partner_id",
        allowNull: false,
      },
      is_activate: {
        type: DataTypes.INTEGER(1),
        field: "is_activate",
        defaultValue: 1,
      }
    },
    {
      tableName: "order",
      timestamps: false,
    }
  );
  order.associate = function (models) {
    order.belongsTo(models.user, { foreignKey: "user_id" });
    order.belongsTo(models.promotion, { foreignKey: "promotion_code" });
    order.belongsTo(models.shipping_partner, { foreignKey: "shipping_partner_id" });
    order.belongsTo(models.card_io, { foreignKey: "card_in_out" });
  };
  return order;
};
