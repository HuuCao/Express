"use strict";
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define(
    "status",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tag: {
        type: DataTypes.STRING(45),
        field: "tag",
        defaultValue: null,
      },
      detail: {
        type: DataTypes.STRING(45),
        field: "detail",
        defaultValue: null,
      },
    },
    {
      tableName: "status",
      timestamps: false,
    }
  );
  status.associate = function (models) {
    // role_permissions.belongsTo(models.roles, { foreignKey: 'roleId' })
    // role_permissions.belongsTo(models.permissions, { foreignKey: 'permissionId' })
  };
  return status;
};
