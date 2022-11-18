const { projectModel } = require("../../models/project");

class projectController{
    async creatProject(req , res , next){
        try {
            const {title , text , image , tags} = req.body;
            const owner = req.user._id;
            const resualt =await projectModel.create({title , text , owner , image , tags});
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
    async getAllProject(req , res , next){
        try {
            const owner = req.user._id;
            const project = await projectModel.find({owner});
            return res.status(200).json({
                status:200,
                success: true,
                project
            });
        } catch (error) {
            next(error)
        }
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