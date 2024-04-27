const jwt = require('jsonwebtoken');
const secret = 'secret';

module.exports = {
    signToken: (payload)=>jwt.sign(payload,secret),
    verifyToken:(token)=>jwt.verify(token,secret)
}