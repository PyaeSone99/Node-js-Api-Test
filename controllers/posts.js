const DB = require('../models/posts')
const Helper = require('../utilis/helper');
const commentDB = require('../models/comment')

const all = async(req,res,next)=>{
    const allPosts = await DB.find().populate('user cat','-__v -password');
    Helper.fMsg(res,"All posts",allPosts)
}

const get = async(req,res,next)=>{
    let singlePost = await DB.findById(req.params.id).populate('user cat','-__v -password')
    if(singlePost){
        let comments = await commentDB.find({postId : singlePost._id})
        singlePost = singlePost.toObject();
        singlePost.comment = comments
        Helper.fMsg(res,"Single Post",singlePost);
    }else{
        next(new Error("NO Post with that id"))
    }
}

const post = async(req,res,next)=>{
    let userId = req.body.user._id;
    delete req.body.user
    req.body.user = userId;
    let result = await new DB(req.body).save();
    // const addPost = await new DB(req.body).save();
    Helper.fMsg(res,"Post Added",result)
}

const patch = async(req,res,next)=>{
    let post = await DB.findById(req.params.id)
    if(post){
        await DB.findByIdAndUpdate(post._id,req.body)
        let result = await DB.findById(post._id)
        Helper.fMsg(res,"Post Updated",result)
    }else{
        next(new Error("No post with that Id"))
    }
}

const drop = async(req,res,next)=>{
    let post = await DB.findById(req.params.id)
    if(post){
        await DB.findByIdAndDelete(post._id)
        Helper.fMsg(res,"Post Deleted")
    }else{
        next(new Error("There is no Post With That Id"))
    }
}

const byCatId = async(req,res,next)=>{
    let posts = await DB.find({cat : req.params.id}).populate('user cat');
    Helper.fMsg(res,"All Post by Category",posts)
}

const byuser = async(req,res,next)=>{
    let posts = await DB.find({user: req.params.id}).populate('user cat')
    if(posts){
        Helper.fMsg(res,"All post by User",posts)
    }else{
        next(new Error("No Post With That User Id"))
    }
}

const bytag = async(req,res,next)=>{
    let posts = await DB.find({tag: req.params.id}).populate('user cat')
    if(posts){
        Helper.fMsg(res,"All post by Tag",posts)
    }else{
        next(new Error("No Post With That Tag Id"))
    }
}

const paginate = async(req,res,next)=>{
    let page = req.params.page;
    page = page == 1 ? 0 : page - 1;
    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * page;
    let posts = await DB.find().skip(skipCount).limit(limit)
    Helper.fMsg(res,"Paginated Post",posts)
}

// const addLike = async(req,res,next)=>{
//     let post = await DB.findById(req.params.id)
//     if(post){
//         post.like += 1;
//         await DB.findByIdAndUpdate(post._id,post);
//         let result = await DB.findById(req.params.id)
//         Helper.fMsg(res,"Like Added",result)
//     }else{
//         next(new Error("There is no Post With That Id"))
//     }
// }

// const removeLike = async(req,res,next)=>{
//     let post = await DB.findById(req.params.id)
//     if(post){
//         post.like -= 1;
//         await DB.findByIdAndUpdate(post._id,post);
//         let result = await DB.findById(req.params.id)
//         Helper.fMsg(res,"Like Removed",result)
//     }else{
//         next(new Error("There is no Post With That Id"))
//     }
// }

const toggleLike = async(req,res,next)=>{
        let post = await DB.findById(req.params.id)
        if(post){
            if(req.params.page == 1){
                post.like += 1; 
            }else{
                post.like -= 1;
            }
            await DB.findByIdAndUpdate(post._id,post);
            let result = await DB.findById(req.params.id)
            Helper.fMsg(res,"Like Added",result)
        }else{
            next(new Error("There is no Post With That Id"))
        }
    }

module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    byCatId,
    byuser,
    paginate,
    bytag,
    // addLike,
    // removeLike,
    toggleLike,
}