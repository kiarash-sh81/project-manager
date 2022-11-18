const { projectModel } = require("../../models/project");

class projectController{
    async creatProject(req , res , next){
        try {
            const {title , text , image} = req.body;
            const owner = req.user._id;
            const resualt =await projectModel.create({title , text , owner , image});
            if(!resualt) throw {status: 500 , success: false , message: "project cant save"};
            return res.status(201).json({
                status: 201 , 
                success: true,
                message: "project create successfully"
            });
        } catch (error) {
            next(error)
        }
    }
    getAllProject(){

    }
    getProjectById(){

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
    removeProject(){
        
    }
}
module.exports ={
    projectController: new projectController()
}