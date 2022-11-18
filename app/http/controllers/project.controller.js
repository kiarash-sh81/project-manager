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
    async updateProject(req , res , next){
        try {
            const owner = req.user.id;
            const id  =req.params.id;
            const finding = await projectModel.findOne({owner , _id: id});
            if(!finding) throw {status:404 , success: false , message: "project not founded"};
            let data = {...req.body};
            Object.entries(data).forEach(([key , value])=>{
                if(!["title" , "text" , "tags"].includes(key)) delete data[key];
                if(["" , " " , undefined ,null , NaN , 0].includes(value)) delete data[key];
                if(key == "tags" && (data["tags"].constructor == Array)){
                    data["tags"] = data["tags"].filter(val =>{
                        if(!["" , " " , undefined ,null , NaN , 0].includes(val)) return val;
                    })
                    if(data["tags"].length == 0) delete data["tags"];
                }
            });
            const updateResualt = await projectModel.updateOne({_id: id} , {$set :data});
            if(updateResualt.modifiedCount == 0) throw {status: 500 , success: false , message: "cant update"};
            return res.status(201).json({
                status: 200,
                success: true,
                message: "update successfully"
            });
        } catch (error) {
            next(error)
        }
    }
}
module.exports ={
    projectController: new projectController()
}