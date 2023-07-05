const jwt = require('jwt-simple');
const moment = require('moment');

//Llave del token
const secret = process.env.SECRET_KEY;

//Generación de tokens por usuario
exports.createToken = function(user) {

    const payload = {

        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()

    }

    return jwt.encode(payload, secret);

}