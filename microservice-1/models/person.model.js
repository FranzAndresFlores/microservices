module.exports = (sequelize, type) => {
    return sequelize.define('person', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'nombre'
        },
        gender: {
            type: type.STRING(100),
            comment: 'genero'
        },
        age: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'edad'
        },
        identification: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'identificación'
        },
        address: {
            type: type.STRING(100),
            comment: 'dirección'
        },
        cellphone: {
            type: type.STRING(10),
            comment: 'teléfono'
        }
    });
}