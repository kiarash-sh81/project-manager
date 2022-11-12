const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

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

function createFilePath(){
    let d = new Date();
    const year = d.getFullYear() + "";
    const mounth = d.getMonth() + "";
    const day = d.getDate() + "";

    const fileUploadDirectory = path.join(__dirname , ".." , ".." , "public" , "uploads" , year , mounth , day);
    fs.mkdirSync(fileUploadDirectory , {recursive: true});
    return path.join("public" , "uploads" , year , mounth , day);
}

module.exports ={
    hashingString,
    tokenGenerator,
    verifyJwtToken,
    createFilePath
}


