const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");

class teamController{
    async creatTeam(req ,res, next){
        try {
            const {name, username, description} = req.body;
            const owner = req.user._id;
            const creating = await teamModel.create({
                name,
                username,
                description,
                owner
            });
            if(!creating) throw {status:500,success: false , message: "cant creating team"};
            return res.status(201).json({
                status:201,
                success:true,
                message: "team created successfully"
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getAllTeam(req, res, next){
        try {
            const teams =await teamModel.find({});
            if(!teams) throw {status:500 , success: false , message:"cant finding team"};
            return res.status(200).json({
                status:200,
                success: true,
                teams
            });
        } catch (error) {
            next(error)
        }
    }
    async getTeamByID(req, res, next){
        try {
            const teamID = req.params.id;
            const finding = await teamModel.findById(teamID);
            if(!finding) throw {status:404 , success:false , message:"team not founded"};
            return res.status(200).json({
                status:200,
                success: true,
                finding
            });
        } catch (error) {
            next(error)
        }
    }
    async getMyTeam(req, res, next){
        try {
            const userID = req.user._id;
            const teams =await teamModel.find({
                $or :[
                    {owner:userID},
                    {users:userID}
                ]
            });
            if(!teams) throw {status:500 , success: false , message:"cant finding the teams"};
            return res.status(200).json({
                status:200,
                success: true,
                teams
            });
        } catch (error) {
            next(error)
        }
    }
    //* /team/invite/:teamID/:username
    async inviteUserToTeam(req, res, next){
        try {
            const userID = req.user._id;
            const teamID = req.params.teamID;
            const username = req.params.username;
            const checkInfo = await teamModel.findOne({$or:[{owner:userID},{users:userID}], _id:teamID});
            if(!checkInfo) throw {status:404 , success: false  ,message: "team not founded"};
            const user = await userModel.findOne({username});
            if(!user) throw {status:404 , success: false, message: "user not founded to invite"};
            const request = {
                teamID,
                caller: req.user.username,
                requestDate: new Date(),
                status:"pending"
            }
            const userInvited = await teamModel.findOne({$or:[{owner:user._id},{users:user._id}],_id:teamID});
            if(userInvited) throw {status:400 , success: false , message:"this user has been already invited"};
            const updateUserReasualt = await userModel.updateOne({username},{$push:{inviteRequest:request}});
            if(updateUserReasualt.modifiedCount == 0) throw {status:500 , success: false , message: "cant send invite"};
            return res.status(200).json({
                status:200,
                success: true,
                message: "invite sent successfully"
            });
        } catch (error) {
            next(error)
        }
    }
    async removeTeamByID(req, res, next){
        try {
            const teamID = req.params.id;
            const finding = await teamModel.find({_id:teamID});
            if(!finding) throw {status: 404 , success: false , message: "team not founded"};
            const removing = await teamModel.deleteOne({_id:teamID});
            if(removing.deletedCount == 0) throw {status:500 , success: false , message:"team cant deleted succussfully"};
            return res.status(200).json({
                status:200,
                success:true,
                message:"team deleted successfully"
            });
        } catch (error) {
            next(error)
        }
    }
    updateTeam(){

    }
    removeUserFromTeam(){
        
    }
}
module.exports ={
    teamController : new teamController()
}