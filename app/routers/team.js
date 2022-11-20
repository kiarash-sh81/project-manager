const {teamController} = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { creatingTeamValidation } = require('../http/validation/team');

const router = require('express').Router();

router.post("/create" , checkLogin  ,creatingTeamValidation() , expressValidatorMapper, teamController.creatTeam);

module.exports = {
    teamRouter : router
}