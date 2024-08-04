module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: type.DATEONLY,
            allowNull: false,
            comment: 'fecha'
        },
        type: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'tipo movimiento'
        },
        balance_initial: {
            type: type.DOUBLE,
            allowNull: false,
            comment: 'saldo inicial'
        },
        value: {
            type: type.DOUBLE,
            allowNull: false,
            comment: 'valor'
        },
        balance: {
            type: type.DOUBLE,
            allowNull: false,
            comment: 'saldo'
        }
    });
}