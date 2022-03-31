"use strict";
module.exports = (sequelize, DataTypes) => {
  const fee = sequelize.define(
    "fee",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        field: "discount",
        defaultValue: 0,
        allowNull: true,
      },
      cod: {
        type: DataTypes.FLOAT,
        field: "cod",
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT,
        field: "cost",
        defaultValue: 0,
      },
      note: {
        type: DataTypes.TEXT("tiny"),
        field: "note",
        defaultValue: null,
      },
      packageId: {
        type: DataTypes.INTEGER,
        field: "package_id",
        allowNull: false,
      },
      isPaidDone: {
        type: DataTypes.INTEGER(1),
        field: "is_paid_done",
        allowNull: true,
        defaultValue: false,
      },
      paidDate: {
        type: DataTypes.DATE,
        field: "paid_date",
        defaultValue: null,
        allowNull: true,

      },
      isRefundDone: {
        type: DataTypes.INTEGER(1),
        field: "is_refund_done",
        allowNull: true,
        defaultValue: false,
      },
      refundDate: {
        type: DataTypes.DATE,
        field: "refund_date",
        defaultValue: null,
        allowNull: true,
      },
      idAccountantPaid: {
        type: DataTypes.INTEGER,
        field: "id_accountant_paid",
        defaultValue: null,
        allowNull: true,
      },
      idAccountantRefund: {
        type: DataTypes.INTEGER,
        field: "id_accountant_refund",
        defaultValue: null,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "fee",
      timestamps: false,
    }
  );
  fee.associate = function (models) {
    // fee.belongsTo(models.user, { foreignKey: "userId" });
    fee.belongsTo(models.packages, { foreignKey: "packageId" });
  };
  return fee;
};
