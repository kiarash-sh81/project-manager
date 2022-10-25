const { validationResult } = require("express-validator");

function expressValidatorMapper(req , res , next){
    let message ={};
    const resualt = validationResult(req);
    if(resualt?.errors?.length > 0){
        resualt?.errors.forEach((err) => {
            message[err.param] = err.msg;
        })
        return res.status(400).json({
            statuse: 400,
            success: false,
            message
        });
    }
    // console.log("this is the flag");
    message = {};
    next()
}

module.exports = {
    expressValidatorMapper
}