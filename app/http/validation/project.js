const { body } = require("express-validator");

function createProjectValidation(){
  return [
    body("title").notEmpty().withMessage("title should not be empty"),
    body("text").notEmpty().isLength({min: 25}).withMessage("text should be at least 25 char and should not be empty")  
  ]
}

module.exports = {
    createProjectValidation
}