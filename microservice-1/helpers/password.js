const bcrypt = require('bcryptjs');

const Password = {};

//Codifica la contraseña
Password.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//Decodifica la contraseña
Password.matchPassword = function (userPassword, password) {
    return bcrypt.compareSync(userPassword, password);
};

module.exports = Password;
