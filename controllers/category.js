const DB = require('../models/category');
const { head } = require('../routes/category');
const Helper = require('../utilis/helper')
const all = async(req,res,next)=>{
    const category = await DB.find()
    Helper.fMsg(res,"All Category",category);
}

const post = async(req,res,next)=>{
    let nameCheck = await DB.findOne({name : req.body.name});
    if(nameCheck){
        next(new Error("Category Name is already in use"))
        return
    }
    let addCategory = await new DB(req.body).save();
    Helper.fMsg(res,"Category Added",addCategory)
}

const get = async(req,res,next)=>{
    let singleCat = await DB.findById(req.params.id);
    Helper.fMsg(res,"Single Category",singleCat)
}

const patch = async(req,res,next)=>{
    let updateCategory = await DB.findById(req.params.id);
    if(updateCategory){
        await DB.findByIdAndUpdate(updateCategory.id,req.body)
        let result = await DB.findById(updateCategory.id);
        Helper.fMsg(res,"Category Updated",result)
    }else{
        next(new Error("There is no category with that id"))
    }
}

const drop = async(req,res,next)=>{
    let deleteCategory = await DB.findById(req.params.id)
    if(deleteCategory){
        await DB.findByIdAndDelete(deleteCategory.id)
        Helper.fMsg(res,"Category Deleted")
    }else{
        next(new Error("No Category with that id"))
    }
}

module.exports = {
    all,
    post,
    get,
    patch,
    drop
}