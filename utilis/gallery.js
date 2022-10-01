const fs = require('fs')

const saveFile = async(req,res,next)=>{
    let file = req.files.file
    let fileName = new Date().valueOf() + "_" + file.name
    file.mv(`./upload/${fileName}`);
    req.body['image'] = fileName
    next()
}
const saveFiles = async(req,res,next)=>{
    let fileNames = [];
    const files = req.files.files;
    files.forEach((file) => {
        let fileName = new Date().valueOf() + "_" + file.name;
        file.mv(`./upload/${fileName}`);
        fileNames.push(fileName)
    });
    req.body["images"] = fileNames
    next();
}

const deleteFile = async(filename)=>{
    await fs.unlinkSync(`./upload/${filename}`);
}

module.exports = {
    saveFile,
    saveFiles,
    deleteFile,
}