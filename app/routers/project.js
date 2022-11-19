const { projectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { createProjectValidation } = require('../http/validation/project');
const { uploadFile } = require('../modules/express-file-upload');
const fileUpload = require('express-fileupload');
const { mongoIDValidation } = require('../http/validation/public');

const router = require('express').Router();

router.post("/create",fileUpload() , checkLogin,uploadFile , createProjectValidation() ,expressValidatorMapper, projectController.creatProject);
router.get("/get" , checkLogin , projectController.getAllProject);
router.get("/get/:id" , checkLogin ,mongoIDValidation() ,expressValidatorMapper ,  projectController.getProjectById);
router.delete("/delete/:id" , checkLogin , mongoIDValidation() , expressValidatorMapper , projectController.removeProject);
router.put("/update/:id" , checkLogin , mongoIDValidation() , expressValidatorMapper , projectController.updateProject);
router.patch("/update-uploadImage/:id" ,fileUpload(), checkLogin , uploadFile, mongoIDValidation() , expressValidatorMapper , projectController.updateProjectImage);

module.exports = {
    projectRouter : router
}