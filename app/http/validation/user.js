const { body } = require('express-validator');
const path = require('path');

function imageValidator(){
    return [
        body("image").custom((value , {req})=>{
            if(Object.keys(req.file).length == 0) throw "please upload an image";
            const ext = path.extname(req.file.originalname);
            const exts = [".png" , ".jpeg" , ".jpg" , ".gif" , ".webp"];
            if(!exts.includes(ext)) throw "file format is not acceptable";
            const maxSize = 2 * 1024 * 1024;
            if(req.file.size > maxSize) throw "file size is not acceptable";
            return true;
        })
    ]
}

module.exports ={
    imageValidator
}