"use strict";
module.exports = (sequelize, DataTypes) => {
  const effort_price = sequelize.define(
    "effort_price",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
	  title: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: ""
      },
	  description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modified_at: {
        type: DataTypes.DATE,
        field: "modified_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "effort_price",
      timestamps: false,
    }
  );
  effort_price.associate = function (models) {
    effort_price.hasMany(models.effort_price_package, {
      foreignKey: "effort_price_id",
    });
  };
  return effort_price;
};
