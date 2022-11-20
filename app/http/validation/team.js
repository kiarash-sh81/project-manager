const { body } = require("express-validator");
const { teamModel } = require("../../models/team");

function creatingTeamValidation(){
    return[
        body("name").isLength({min: 5}).withMessage("name should be at least 5 char"),
        body("description").notEmpty().withMessage("description should not be empty"),
        body("username").custom(async (username)=>{
            const usenameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim;
            if(usenameRegex.test(username)){
                const checking = await teamModel.findOne({username});
                if(checking) throw "username has been already in use"
                return true;
            }
            throw "please select an username correctly"
        })

    ]
}

module.exports ={
    creatingTeamValidation
}