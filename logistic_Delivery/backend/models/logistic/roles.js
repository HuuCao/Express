"use strict";
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define(
    "roles",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        field: "name",
        allowNull: false,
      },
      // user_id: {
      //   type: DataTypes.TEXT,
      //   field: "user_id",
      //   allowNull: false,
      // },
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
      tableName: "roles",
      timestamps: false,
    }
  );
  
  roles.associate = function (models) {
    roles.belongsToMany(models.permissions, { through: 'role_permissions' })
    roles.hasOne(models.user, { foreignKey: 'role_id' })
  };
  return roles;
};
