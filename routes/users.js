const route = require('express').Router();
const controller = require('../controllers/users')
const {validateBody} = require('../utilis/validator')
const {registerSchema} = require ('../utilis/schema.js')
// route.get('/',controller.all)

// route.post('/',controller.post);

// route.route('/:id')
//     .get(controller.get)
//     .patch(controller.patch)
//     .delete(controller.drop)

// route.get('/:id',(req,res)=>{
//     let id = req.params.id;
//     res.json({message: `This is user id ${id}`})
// })
// route.patch('/:id',(req,res)=>{
//     let id = req.params.id;
//     res.status(200).json({message: `This is user id ${id}`})
// })

// route.delete('/:id',(req,res)=>{
//     let id = req.params.id;
//     res.status(200).json({message : `The Delete id is  ${id}`})
// })

route.post('/',controller.login)
route.post('/register',[validateBody(registerSchema),controller.register])

module.exports = route;