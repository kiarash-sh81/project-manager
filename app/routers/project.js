const { projectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { createProjectValidation } = require('../http/validation/project');

const router = require('express').Router();

router.post("/create",checkLogin, createProjectValidation() ,expressValidatorMapper, projectController.creatProject);

module.exports = {
    projectRouter : router
}