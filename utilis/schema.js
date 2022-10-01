const joi = require('joi')

module.exports = {
        addCategory:joi.object({
            name : joi.string().required(),
            image : joi.string().required(),
            user : joi.optional(),
        }),
        registerSchema : joi.object ({
            name : joi.string().required(),
            email : joi.string().email().required(),
            phone : joi.string().min(8).max(11).required(),
            password : joi.string().min(8).max(25).required(),
        }),
        postSchema : joi.object ({
            cat : joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            tag : joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title : joi.string().required(),
            image : joi.string().required(),
            desc : joi.string().required(),
            user : joi.optional(),
            like : joi.number(),
        }),
        tagSchema : joi.object({
            image : joi.string().required(),
            name : joi.string().required(),
            user : joi.optional(),
        }),
        commentSchema : joi.object({
            postId : joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name : joi.string().required(),
            email : joi.string().email().required(),
            content : joi.string().required()
        }),
        singleCategory : {
            id : joi.object({
                id : joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            }),
            page : joi.object({
                page : joi.number().required(),
            }),
            image : joi.object({
                image : joi.string().required(),
            })
        }
    }

