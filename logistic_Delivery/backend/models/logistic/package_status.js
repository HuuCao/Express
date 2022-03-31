"use strict";
module.exports = (sequelize, DataTypes) => {
  const package_status = sequelize.define(
    "package_status",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      statusCode: {
        type: DataTypes.STRING(64),
        field: "status_code",
        defaultValue: null,
      },
      statusText: {
        type: DataTypes.TEXT,
        field: "status_text",
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
      tableName: "package_status",
      timestamps: false,
    }
  );
  package_status.associate = function (models) {
    package_status.hasMany(models.warehouse_package, {
      foreignKey: "statusId",
    });
  };
  return package_status;
};
