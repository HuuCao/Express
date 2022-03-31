"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_lock = sequelize.define(
    "user_lock",
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
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "user_lock",
      timestamps: false,
    }
  );
  user_lock.associate = function (models) {
    user_lock.belongsTo(models.user, { foreignKey: "userId" });
    user_lock.belongsTo(models.packages, { foreignKey: "packageId" });
  };
  return user_lock;
};
