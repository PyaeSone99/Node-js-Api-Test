const Routes = require('express').Router();
const controller = require('../controllers/comment')
const {validateParams,validateBody,validateToken} = require ('../utilis/validator')
const {commentSchema,singleCategory} = require('../utilis/schema');

Routes.get('/:id',validateParams(singleCategory.id,"id"),controller.all);
Routes.post('/',validateBody(commentSchema),controller.post);
Routes.delete('/:id',validateParams(singleCategory.id,"id"),validateToken,controller.drop);

module.exports = Routes