const { userModel } = require("../../models/user");
const { verifyJwtToken } = require("../../modules/function");

const checkLogin =async (req , res , next)=>{
    const Authorization = req?.headers?.authorization;
    if(!Authorization) throw {status : 401 , success: false , message: "please login again 1"};
    let token = Authorization.split(" ")?.[1];
    if(!token) throw {status : 401 , success: false , message: "please login again 2"};
    const verify =  verifyJwtToken(token);
    console.log(verify);
    const {username} = verify;
    const user =await userModel.findOne({username} , {password: 0});
    if(!user) throw {status: 401 , success: false , message: "please login again 3"};
    req.user = user;
    next()
}

module.exports = {
    checkLogin
}