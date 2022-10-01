const Routes = require('express').Router();
const controller = require('../controllers/posts')
const {validateToken,validateBody, validateParams} = require('../utilis/validator')
const {postSchema,singleCategory} = require('../utilis/schema')
const {saveFile} = require('../utilis/gallery')

Routes.get('/', controller.all);

Routes.post('/',validateToken,saveFile,validateBody(postSchema),controller.post);

Routes.route('/:id')
    .get(validateParams(singleCategory.id,"id"),controller.get)
    .patch(validateToken,validateParams(singleCategory.id,"id"),controller.patch)
    .delete(validateToken,validateParams(singleCategory.id,"id"),controller.drop)

Routes.get('/bycat/:id',validateParams(singleCategory.id,"id"),controller.byCatId);
Routes.get('/byuser/:id',validateParams(singleCategory.id,"id"),controller.byuser);
Routes.get('/bytag/:id',validateParams(singleCategory.id,"id"),controller.bytag);
Routes.get('/paginate/:page',[validateParams(singleCategory.page,"page"),controller.paginate]);
// Routes.get('/like/add/:id',[validateParams(singleCategory.id,"id"),controller.addLike]);
// Routes.get('/like/remove/:id',[validateParams(singleCategory.id,"id"),controller.removeLike]);
Routes.get('/like/toggle/:id/:page',[validateParams(singleCategory.id,"id"),controller.toggleLike]);

// Routes.get('/:id',(req,res)=>{
//     let id = req.params.id;
//     res.json({message: `This is post id ${id}`})
// })

// Routes.patch('/:id',(req,res)=>{
//     let id = req.params.id;
//     res.status(200).json({message: `This is post id ${id}`})
// })

// Routes.delete('/:id',(req,res)=>{
//     let id = req.params.id;
//     res.status(200).json({message : `The Delete post id is  ${id}`})
// })

module.exports = Routes