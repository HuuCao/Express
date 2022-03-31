"use strict";
module.exports = (sequelize, DataTypes) => {
    const price_list = sequelize.define(
        "price_list",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                field: "name",
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                field: "description",
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM("vip", "normal"),
                field: "type",
                allowNull: false,
            },
            price_regular_kg: {
                type: DataTypes.DOUBLE,
                field: "price_regular_kg",
                allowNull: true,
            },
            price_regular_cm3: {
                type: DataTypes.DOUBLE,
                field: "price_regular_cm3",
                allowNull: true,
            },
            price_medium_kg: {
                type: DataTypes.DOUBLE,
                field: "price_medium_kg",
                allowNull: true,
            },
            price_medium_cm3: {
                type: DataTypes.DOUBLE,
                field: "price_medium_cm3",
                allowNull: true,
            },
            price_premium_kg: {
                type: DataTypes.DOUBLE,
                field: "price_premium_kg",
                allowNull: true,
            },
            price_premium_cm3: {
                type: DataTypes.DOUBLE,
                field: "price_premium_cm3",
                allowNull: true,
            },
            
            created_at: {
                type: DataTypes.DATE,
                field: "created_at",
                allowNull: true,
            },
            is_activate: {
                type: DataTypes.INTEGER(1),
                field: "is_activate",
                defaultValue: 1,
            },
        },
        {
            tableName: "price_list",
            timestamps: false,
        }
    );
    // promotion.associate = function (models) {
    //     promotion.hasOne(models.order, { foreignKey: "promotion_code" });
    // };
    return price_list;
};
