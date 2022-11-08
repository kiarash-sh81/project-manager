const {userController} = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');

const router = require('express').Router();

router.get("/profile" , checkLogin ,userController.getProfile);
router.post("/profile" , checkLogin , userController.editeProfile);

module.exports = {
    userRouter : router
}