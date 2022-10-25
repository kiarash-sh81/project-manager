
const { userModel } = require("../../models/user");
const { hashingString, tokenGenerator } = require("../../modules/function");
const bcrypt = require('bcrypt');

class AuthController{
    async register(req , res , next){
        console.log("this is the flag");
        try {
            const {username , email , mobile , password , confirm_password} = req.body;
            const hashedPassword = hashingString(password); 
            const resualt =await userModel.create({
                username,
                email,
                password: hashedPassword,
                mobile
            }).catch(err => {
                console.log(JSON.stringify(err , null , 2));
            })
            return res.json(resualt)
        } catch (error) {
            next(error)
        }

    }
    async login(req , res , next){
        try {
            const {username , password} = req.body;
            const user =await userModel.findOne({username});
            if(!user) throw {status: 401 , message: "username or password is inccorect"};
            const comparePassword = bcrypt.compareSync(password , user.password);
            if(!comparePassword) throw {status: 401 , message: "username or password is inccorect"};
            const token = tokenGenerator({username});
            user.token  = token;
            await user.save();
            return res.json({
                status: 201,
                success: true,
                message: "your authentication is successfull",
                token
            })
        } catch (error) {
            next(error)
        }
    }
    forgotPassword(){
        
    }
}
module.exports ={
    AuthController: new  AuthController()
}