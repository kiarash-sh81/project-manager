const fileupload = require('express-fileupload');
const path = require('path');
const { createFilePath } = require('./function');
const uploadFile = async (req , res , next)=>{
    try {
        if(Object.keys(req.files).length == 0 ) throw {status: 400 , success: false , message: "please upload an image"};
        let image = req.files.image;
        let type =  path.extname(image.name);
        if(![".png" , ".jpeg" , ".jpg" , ".gif"].includes(type)) throw {status: 400 , success: false , message: "file format is not accepted"};
        let imagePath = path.join(createFilePath() ,(Date.now() + type));
        req.body.image = imagePath; 
        let uploadPath = path.join(__dirname , ".." , ".." , imagePath);
        image.mv(uploadPath , (err)=>{
            if(err) throw {status: 500 , success: false , message: "cant upload the image"};
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports ={
    uploadFile
}