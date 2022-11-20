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
    async getAllRequest(req, res, next){
        try {
            const userID = req.user._id;
            const {inviteRequest} = await userModel.findOne({_id: userID} , {inviteRequest:1});
            return res.status(200).json({
                status:200,
                success:true,
                inviteRequest
            });
        } catch (error) {
            next(error)
        }
    }
    async getRequestByStatus(req, res, next){
        try {
            const {status} =req.params;
            const userID = req.user._id;
            const requests = await userModel.aggregate([
                {
                    $match :{_id:userID}
                },
                {
                    $project:{
                        inviteRequest:1,
                        _id:0,
                        inviteRequest:{
                            $filter:{
                                input: "$inviteRequest",
                                as: "request",
                                cond:{
                                    $eq : ["$$request.status" , status]
                                }
                            }
                        },
                        }
                    },
            ]);
            return res.status(200).json({
                status:200,
                success:true,
                requests:requests?.[0].inviteRequest || []
            })
        } catch (error) {
            next(error)
        }
    }
    async changeStatusRequest(req, res, next){
        try {
            const {id , status} = req.params;
            const request = await userModel.findOne({"inviteRequest._id":id});
            if(!request) throw {status:404 , success: false , message:"request not founded"};
            const findRequest = request.inviteRequest.find(item=>item.id == id);
            if(findRequest.status !== "pending") throw {status:400, success: false , message:"this request has been already accepted or rejected"};
            if(!["accepted" , "rejected"].includes(status)) throw {status:400 , success: false , message:"sending information has not true"};
            const updateResualt = await userModel.updateOne({"inviteRequest._id":id} , {
                $set:{"inviteRequest.$.status": status}
            });
            if(updateResualt.modifiedCount == 0) throw {status: 500 , success:false , message: "changing invite not happend"};
            return res.status(200).json({
                status:200,
                success:true,
                message: "change invite successfully"
            });
        } catch (error) {
            next(error)
        }
    }
    addSkills(){

    }
    editeSkills(){

    }
}
module.exports ={
    userController : new userController()
}