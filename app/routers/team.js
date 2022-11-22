const {teamController} = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { mongoIDValidation } = require('../http/validation/public');
const { creatingTeamValidation } = require('../http/validation/team');

const router = require('express').Router();

router.post("/create" , checkLogin  ,creatingTeamValidation() , expressValidatorMapper, teamController.creatTeam);
router.get("/list" , checkLogin , teamController.getAllTeam);
router.get("/me" , checkLogin , teamController.getMyTeam);
router.get("/invite/:teamID/:username" , checkLogin , teamController.inviteUserToTeam)
router.put("/update/:teamID" , checkLogin , teamController.updateTeam)
router.get("/:id" , checkLogin , mongoIDValidation() , expressValidatorMapper ,teamController.getTeamByID);
router.delete("/remove/:id" , checkLogin ,mongoIDValidation() , expressValidatorMapper , teamController.removeTeamByID);

module.exports = {
    teamRouter : router
}