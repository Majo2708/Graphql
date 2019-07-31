const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userShema = new Schema({
    name: String,
    email: String,
    password: String,
    img: {
        type: String,
        default: ''
    },
});

userShema.pre('save', function(next){
    const user = this;
    console.log(user);   
    const SALT_ROUNDS = 10;
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt){
        if(err)return next();
        bcrypt.hash(user.password, salt, function(erro, hash){
            if(err)return next(err);
            user.password = hash;
            next();
        })
    });
})

const User = mongoose.model('user', userShema);

module.exports = User //user es un objeto
