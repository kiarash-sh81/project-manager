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
    async getProjectById(req , res, next){
        try {
            const PrjID = req.params.id;
            const owner = req.user._id;
            const resualt =await projectModel.findOne({owner , _id: PrjID});
            if(!resualt) throw {status: 404 , success: false , message: "the project not founded"};
            return res.status(200).json({
                status:200,
                success: true,
                resualt
            });
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async removeProject(req , res , next){
        try {
            const prjID = req.params.id;
            const owner =req.user.id;
            const findPRJ = await projectModel.findOne({owner , _id: prjID});
            if(!findPRJ) throw {status: 404 , success: false , message: "the project not founded"};
            const deletedProject = await projectModel.deleteOne({owner , _id: prjID});
            if(deletedProject.deletedCount == 0) throw {status : 500 , success: false , message: "cant deleted project"};
            return res.status(200).json({
                status:200,
                success: true,
                message: "the prj successfully deleted"
            });
            
        } catch (error) {
            next(error)
        }
    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
}
module.exports ={
    projectController: new projectController()
}