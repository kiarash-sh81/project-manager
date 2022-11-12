const {userModel} = require('../../models/user');
const path = require('path');
class userController{
    getProfile(req , res , next){
        try {
            const user = req.user;
            user.profile = req.protocol + "://" + req.get("host")+ "/" + user.profile;
            return res.status(200).json({
                status: 200,
                success: true,
                user
            });
        } catch (error) {
            next(error)
        }
    }
    async editeProfile(req , res , next){
        try {
            const userId = req.user._id;
            let data = {...req.body};
            let fileds = ["first_name" , "last_name" , "skills"];
            let badValues = [" " , "" , null , undefined , NaN];
            Object.entries(data).forEach(([key , value])=>{
                if(!fileds.includes(key)) delete data[key];
                if(badValues.includes(value)) delete data[key];
            });
            const resualt = await userModel.updateOne({_id: userId} , {$set : data});
            if(resualt.modifiedCount > 0){
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "user updated successfully"
                });
            }
            throw {status: 400 , success: false , message: "update not successfully"};
            
        } catch (error) {
            next(error)
        }
    }

    async uploadProfileImage(req , res , next){
        try {
            const userId = req.user._id;
            if(Object.keys(req.file).length == 0) throw {status: 400 , success: false , message: "please upload an image"};
            const filePath = req.file?.path.replace(/\\/g ,"/").substring(7);
            const resualt = await userModel.updateOne({_id: userId} , {$set: {profile: filePath}});
            if(resualt.modifiedCount == 0) throw {status:400 , success: false , message: "please upload an image"};
            return res.status(200).json({
                status:200,
                success: true,
                message: "update profile successfully"
            });
        } catch (error) {
            next(error)
        }
    }

    addSkills(){

    }
    editeSkills(){

    }
    acceptInviteInTeam(){

    }
    rejectInviteInTeam(){

    }
}
module.exports ={
    userController : new userController()
}