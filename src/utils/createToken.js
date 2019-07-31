const jwt = require('jsonwebtoken');

const createToken = (user) => {
    console.log(user);
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '2h'});
}

module.exports = createToken