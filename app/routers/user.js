const {userController} = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { imageValidator } = require('../http/validation/user');
const { upload_multer } = require('../modules/multer');

const router = require('express').Router();

router.get("/profile" , checkLogin ,userController.getProfile);
router.get("/requested" , checkLogin ,userController.getAllRequest);
router.post("/profile" , checkLogin , userController.editeProfile);
router.post("/profile-image" ,upload_multer.single("image") , imageValidator() , expressValidatorMapper ,checkLogin  , userController.uploadProfileImage);
router.get("/requested/:status" , checkLogin ,userController.getRequestByStatus);
router.get("/change-request/:id/:status" , checkLogin ,userController.changeStatusRequest);

module.exports = {
    userRouter : router
}