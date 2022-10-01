const DB = require('../models/users');
const Helper = require('../utilis/helper')

// const all = async(req,res,next)=>{
//     let users = await DB.find();
//     Helper.fMsg(res,"All Users!",users);
//     // res.status(200).json({
//     //     con : true,
//     //     msg : "All Users!",
//     //     result : []
//     // })
// }

// const post = async(req,res,next)=>{
//     let saveUser = new DB(req.body);
//     let result = await saveUser.save();
//     Helper.fMsg(res,"User Added",result);
// }

// const get = async(req,res,next)=>{
//     let id = req.params.id
//     let singleUser = await DB.findById(id);
//     Helper.fMsg(res,`User Data of ${id}`,singleUser)
// }

// const patch = async(req,res,next)=>{
//     let user = await DB.findById(req.params.id)
//     if(user){
//         await DB.findByIdAndUpdate(user._id,req.body)
//         let updateUser = await DB.findById(user._id)
//         Helper.fMsg(res,"User Updated",updateUser)
//     }else{
//         next(new Error("Error! No User with that id"))
//     }
// }

// const drop = async(req,res,next)=>{
//     await DB.findByIdAndDelete(req.params.id)
//     let users = await DB.find();
//     Helper.fMsg(res,"User Deleted",users)
// }

// module.exports = {
//     all,
//     post,
//     get,
//     patch,
//     drop,
// }

const login = async(req,res,next)=>{
    let userPhone = await DB.findOne({phone : req.body.phone}).select("-__v")
    if(userPhone){
        if(Helper.comparePass(req.body.password,userPhone.password)){
            let user = userPhone.toObject();
            delete user.password;
            user.token = Helper.makeToken(user)
            Helper.fMsg(res,"Login Success",user)
        }else{
            next(new Error("Creditial Error"))
        }
    }else{
        next(new Error("Creditial Error"))
    }
}

const register = async(req,res,next)=>{
    let userName = await DB.findOne({name : req.body.name})
    if(userName){
        next(new Error("Name is already in use"))
        return
    }
    let userEmail = await DB.findOne({email : req.body.email})
    if(userEmail){
        next(new Error("Email is already in use"))
        return
    }
    let userPhone = await DB.findOne({phone : req.body.phone})
    if(userPhone){
        next(new Error("Phone is already in use"))
        return
    }
    req.body.password = Helper.encode(req.body.password);
    let result = await new DB(req.body).save()
    Helper.fMsg(res,"Register Success",result);
}           

module.exports = {
    login,
    register
}