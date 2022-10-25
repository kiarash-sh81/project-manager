const {AuthController} = require('../http/controllers/auth.controller');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { regidterValidator, loginValidator } = require('../http/validation/auth');

const router = require('express').Router();

router.post("/register" , regidterValidator() , expressValidatorMapper,AuthController.register);
router.post("/login" , loginValidator() , expressValidatorMapper,AuthController.login);

module.exports = {
    authRouter : router
}