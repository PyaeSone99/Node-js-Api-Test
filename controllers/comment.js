const DB = require('../models/comment');
const Helper = require('../utilis/helper')

const all = async(req,res,next)=>{
    let comments = await DB.find({postId : req.params.id})
    if(comments){
        Helper.fMsg(res,"All Comment For Post",comments);
    }else{
        next(new Error("No Comment With That Post Id"))
    }
}

const post  = async(req,res,next)=>{
    let addComment = await new DB(req.body).save()
    Helper.fMsg(res,"Comment Added",addComment)
}

const drop = async(req,res,next)=>{
    let dbComment = await DB.findById(req.params.id);
    if(dbComment){
        await DB.findByIdAndDelete(dbComment._id);
        Helper.fMsg(res,"Comment Deleted")
    }else{
        next(new Error("No Comment With That Id"));
    }
}

module.exports = {
    post,
    drop,
    all
}
