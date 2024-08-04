module.exports = (sequelize, type) => {
    return sequelize.define('customer', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'contraseña'
        },
        status: {
            type: type.BOOLEAN,
            defaultValue: true,
            comment: 'estado'
        }
    });
}