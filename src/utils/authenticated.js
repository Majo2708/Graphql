const bcrypt = require('bcrypt');
const User = require('../models/User');
const createToken = require('./createToken');

const authenticated = (args) => {
    return new Promise((resolve, reject) => {
        let { email, password } = args.data;
        User.findOne({ email })
        .then((user) => {
            if(!user) reject(new Error('El usuario no existe'));
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(err) reject(new Error('Ocurrió un error'))
                isValid ? resolve(createToken(user)) : reject(new Error('Credenciales inválidas'));
            })
        })
        .catch((err) => reject(err))
    }) //Para estar al pendiente de una respuesta se usan las promesas
    
}

module.exports = authenticated;