"use strict";
module.exports = (sequelize, DataTypes) => {
  const package_user = sequelize.define(
    "package_user",
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
      packageId: {
        type: DataTypes.INTEGER,
        field: "package_id",
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER(1),
        field: "is_active",
        allowNull: false,
        defaultValue:1
      },
      codDone: {
        type: DataTypes.INTEGER(1),
        field: "cod_done",
        allowNull: false,
      },
      idAccountantConfirm: {
        type: DataTypes.INTEGER,
        field: "id_accountant_confirm",
        defaultValue: null,
      },
      codDoneDatetime: {
        type: DataTypes.DATE,
        field: "cod_done_datetime",
        defaultValue: null,
      },
      codReceived: {
        type: DataTypes.FLOAT,
        field: "cod_received",
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
      tableName: "package_user",
      timestamps: false,
    }
  );
  package_user.associate = function (models) {
    package_user.belongsTo(models.user, { foreignKey: "userId" });
    package_user.belongsTo(models.packages, { foreignKey: "packageId" });
  };
  return package_user;
};
