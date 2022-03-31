'use strict';
module.exports = (sequelize, DataTypes) => {
  const countries = sequelize.define('countries', {
    unlocode: {
      type: DataTypes.STRING(2),
      field: 'unlocode',
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      field: 'name',
      allowNull: false,
    }
    
  }, {
    tableName: 'jsfpri_countries',
    timestamps: false,
  });
  countries.associate = function (models) {
    // associations can be defined here
  };
  return countries;
};