const jwt = require ('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async(req) => {
    const Authorization = req.get('Authorization');
    if(!Authorization){
        return req;
    }else{
        const formToken = Authorization.replace('JWT ', "");
        const payload = jwt.verify(formToken, process.env.SECRET_KEY);
        if(!payload){
            return req
        }
        const user = await User.findOne({_id:payload._id});
        return {...req, user}
    }
}

module.exports = verifyToken;