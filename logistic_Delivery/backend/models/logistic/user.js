"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(256),
        field: "password",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        field: "email",
      },
      tel: {
        type: DataTypes.STRING(100),
        field: "tel",
      },
      address: {
        type: DataTypes.STRING(200),
        field: "address",
      },
      name: {
        type: DataTypes.STRING(100),
        field: "name",
      },
      companyId: {
        type: DataTypes.INTEGER(11),
        field: "company_id",
        defaultValue: null,
      },
      customer_code: {
        type: DataTypes.STRING,
        field: "customer_code",
        defaultValue: null,
      },
      role_id: {
        type: DataTypes.INTEGER(11),
        field: "role_id",
        allowNull: false,
        defaultValue: 0,
      },
      order_id: {
        type: DataTypes.INTEGER(11),
        field: "order_id",
        allowNull: true,
      },
      sum_debit: {
        type: DataTypes.FLOAT,
        field: "sum_debit",
        allowNull: false,
        defaultValue: 0,
      },
      is_activate: {
        type: DataTypes.INTEGER(1),
        field: "is_activate",
        defaultValue: 1,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      effort_price_id: {
        type: DataTypes.INTEGER,
        field: "effort_price_id",
        allowNull: false,
        defaultValue: 0,
      },
      time_expired_price: {
        type: DataTypes.DATE,
        field: "time_expired_price",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
  user.associate = function (models) {
    user.belongsTo(models.roles, { foreignKey: "role_id" });
    user.hasMany(models.order, { foreignKey: "user_id" });
    user.hasMany(models.debit, { foreignKey: "id_customer" });
    user.hasMany(models.card_io, { foreignKey: "id_customer" });
    user.belongsTo(models.effort_price, { foreignKey: "effort_price_id" });
  };
  return user;
};
