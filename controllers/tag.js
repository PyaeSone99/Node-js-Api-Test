const  DB = require('../models/tag')
const Helper = require('../utilis/helper')

const all = async(req,res,next)=>{
    let tags = await DB.find();
    Helper.fMsg(res,"All Tags",tags);
}

const post = async(req,res,next)=>{
    let dbTag = await DB.findOne({name : req.body.name});
    if(dbTag){
        next(new Error("Tag name is already exit"))
    }else{
        let result = await new DB(req.body).save();
        Helper.fMsg(res,"Tag Created",result)
    }
}

const get = async(req,res,next)=>{
    let singleTag = await DB.findById(req.params.id);
    if(singleTag){
        Helper.fMsg(res,"Single Tag",singleTag)
    }else{
        next(new Error("No Tag with That id"))
    }
}

const patch = async(req,res,next)=>{
    let singleTag = await DB.findById(req.params.id);
    if(singleTag){
        await DB.findByIdAndUpdate(singleTag._id,req.body)
        let updateTag =  await DB.findById(req.params.id)
        Helper.fMsg(res,"Tag Update Success",updateTag)
    }else{
        next(new Error("No Tag with That id"))
    }
}

const drop = async(req,res,next)=>{
    let singleTag = await DB.findById(req.params.id);
    if(singleTag){
        await DB.findByIdAndDelete(singleTag._id)
        Helper.fMsg(res,"Tag Update Success")
    }else{
        next(new Error("No Tag with That id"))
    }
}

module.exports = {
    all,
    post,
    get,
    patch,
    drop
}