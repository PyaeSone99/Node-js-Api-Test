const Routes = require('express').Router();
const controller = require('../controllers/tag')
const {saveFile} = require('../utilis/gallery')
const {tagSchema,singleCategory} = require('../utilis/schema')
const { validateBody,validateToken,validateParams } = require('../utilis/validator')

Routes.get('/',controller.all);

Routes.post('/',validateToken,saveFile,validateBody(tagSchema),controller.post);

Routes.route('/:id')
    .get(validateParams(singleCategory.id,"id"),controller.get)
    .patch(validateToken,validateParams(singleCategory.id,"id"),controller.patch)
    .delete(validateToken,validateParams(singleCategory.id,"id"),controller.drop)

module.exports = Routes
