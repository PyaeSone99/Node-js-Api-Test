const router = require('express').Router();
const controller = require('../controllers/category')
const {saveFile} = require('../utilis/gallery')
const {validateBody,validateParams, validateImage,validateToken} = require('../utilis/validator')
const {addCategory,singleCategory} = require('../utilis/schema')
router.get('/',controller.all);

router.post('/',[validateToken,saveFile,validateBody(addCategory),controller.post]);
router.route('/:id')
    .get(validateParams(singleCategory.id,"id"),controller.get)
    // .patch(validateParams(singleCategory.id,"id"),controller.patch) //name update
    .patch([validateToken,saveFile,validateImage(singleCategory.image,"image"),controller.patch]) //image update 
    .delete(validateToken,validateParams(singleCategory.id,"id"),controller.drop)

module.exports = router;