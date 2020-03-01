'use strict'
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('reno-events', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING
        },
        estimate: {
            type: DataTypes.DECIMAL(10,2)
        }
    });
    return Event;
};
