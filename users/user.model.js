const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        eventgoing:{ type: DataTypes.INTEGER, allowNull:false}
    };

    const options = {
        defaultScope: {
        },
        scopes: {
        }
    };

    return sequelize.define('User', attributes, options);
}