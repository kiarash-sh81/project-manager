const { teamModel } = require("../../models/team");

class teamController{
    async creatTeam(req ,res, next){
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
    }
    inviteUserToTeam(){

    }
    removeTeam(){

    }
    updateTeam(){

    }
    removeUserFromTeam(){
        
    }
}
module.exports ={
    teamController : new teamController()
}