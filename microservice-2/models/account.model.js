module.exports = (sequelize, type) => {
    return sequelize.define('account', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'número de cuenta'
        },
        type: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'tipo de cuenta'
        },
        balance: {
            type: type.DOUBLE,
            allowNull: false,
            comment: 'saldo inicial'
        },
        status: {
            type: type.BOOLEAN,
            defaultValue: true,
            comment: 'estado'
        },
        customerId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'id cliente'
        }
    });
}