"use strict";
module.exports = (sequelize, DataTypes) => {
  const role_permissions = sequelize.define(
    "role_permissions",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        field: "id_permission",
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER(11),
        field: "id_role",
        allowNull: false,
      },
    },
    {
      tableName: "role_permissions",
      timestamps: false,
    }
  );
  role_permissions.associate = function (models) {
    role_permissions.belongsTo(models.roles, { foreignKey: "roleId" });
    role_permissions.belongsTo(models.permissions, {
      foreignKey: "permissionId",
    });
  };
  return role_permissions;
};
