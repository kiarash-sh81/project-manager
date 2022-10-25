const {body} = require('express-validator');
const { userModel } = require('../../models/user');
function regidterValidator(){
    return [
        body("username").custom(async(value , cntx)=>{
            if(value){
                const resualt = await userModel.findOne({username : value});
                if(resualt) throw "this username has been already taken";

                const usernameRejex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRejex.test(value)){
                    return true
                }
                throw "username is inccorect";
            }
            throw "user name cant be empty";
        }),
        body("email").isEmail().withMessage("email is inccorect").custom(async(email)=>{
            const user =  await userModel.findOne({email});
            if(user) throw "this email has been already taken";
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("mobile number is inccorect").custom(async mobile=>{
            const user =await userModel.findOne({mobile});
            if(user) throw "this mobile phone number has been already use"
        }),
        body("password").custom((value , cntx)=>{
            if(!value) throw "password fileds cant be empty";
            if(value !== cntx.req.body.confirm_password){
                throw "password and confirm password is not match";
            }
            return true
        })
    ]

}
function loginValidator(){
    return [
        body("username").notEmpty().withMessage("username filed should not be empty").custom(userneme=>{
            if(userneme){
                const usernameRejex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRejex.test(userneme)){
                    return true
                }
                throw "username is inccorect";
            }
        }),
        body("password").isLength({min: 6 , max: 16}).withMessage("password length should be beetwen 6 and 16")
    ]
}

module.exports = {
    regidterValidator,
    loginValidator
}