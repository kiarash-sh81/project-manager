const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function hashingString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str , salt);
}

function tokenGenerator(payload){
    const token = jwt.sign(payload ,process.env.SECRET_KEY , {expiresIn: "365 days"} );
    return token;
}

function verifyJwtToken(token){
    const reualt = jwt.verify(token , process.env.SECRET_KEY);
    if(!reualt?.username) throw {status: 401 , success: false , message: "please login again 4"};
    return reualt;
}

module.exports ={
    hashingString,
    tokenGenerator,
    verifyJwtToken
}


