'use strict'
module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define('reno-transactions', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        eventId: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        desc: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.DECIMAL(10,2)
        },
        transactionDate: {
            type: DataTypes.STRING
        },
    });
    return Transactions;
};
