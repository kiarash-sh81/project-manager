const { teamModel } = require("../../models/team");

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
    inviteUserToTeam(){

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