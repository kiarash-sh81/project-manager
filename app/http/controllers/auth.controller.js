class authController{
    register(req , res , next){
        try {
            const {username , email , mobile , password , confirm_password} = req.body;
        } catch (error) {
            next(error)
        }

    }
    login(){

    }
    forgotPassword(){
        
    }
}
module.exports ={
    authController: new  authController()
}