"use strict";
module.exports = (sequelize, DataTypes) => {
    const promotion = sequelize.define(
        "promotion",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            promotion_code: {
                type: DataTypes.STRING(100),
                field: "promotion_code",
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(255),
                field: "description",
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM("vnd", "percent"),
                field: "type",
                allowNull: false,
            },
            promotion_value: {
                type: DataTypes.DOUBLE,
                field: "promotion_value",
                allowNull: true,
            },
            promotion_name: {
                type: DataTypes.STRING(256),
                field: "promotion_name",
                allowNull: true,
            },
            time_start: {
                type: DataTypes.DATE,
                field: "time_start",
                allowNull: true,
            },
            time_end: {
                type: DataTypes.DATE,
                field: "time_end",
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                field: "created_at",
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("new", "happenning", "finished"),
                field: "status",
                allowNull: true,
            },
            is_activate: {
                type: DataTypes.INTEGER(1),
                field: "is_activate",
                defaultValue: 1,
            },
        },
        {
            tableName: "promotion",
            timestamps: false,
        }
    );
    promotion.associate = function (models) {
        promotion.hasOne(models.order, { foreignKey: "promotion_code" });
    };
    return promotion;
};
