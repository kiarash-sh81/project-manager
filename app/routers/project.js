const { projectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { createProjectValidation } = require('../http/validation/project');
const { uploadFile } = require('../modules/express-file-upload');
const fileUpload = require('express-fileupload');

const router = require('express').Router();

router.post("/create",fileUpload() , checkLogin,uploadFile , createProjectValidation() ,expressValidatorMapper, projectController.creatProject);
router.get("/get" , checkLogin , projectController.getAllProject);

module.exports = {
    projectRouter : router
}