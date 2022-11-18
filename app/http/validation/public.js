const { param } = require("express-validator");

function mongoIDValidation(){
    return [
        param("id").isMongoId().withMessage("the selected item is invalid")
    ]
}

module.exports ={
    mongoIDValidation
}