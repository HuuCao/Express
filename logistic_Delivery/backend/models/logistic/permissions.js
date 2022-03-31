"use strict";
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define(
    "permissions",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      action: {
        type: DataTypes.STRING(64),
        field: "action",
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        field: "description",
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "permissions",
      timestamps: false,
    }
  );
  permissions.associate = function (models) {
    permissions.belongsToMany(models.roles, { through: "role_permissions" });
  };
  return permissions;
};
