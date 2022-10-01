// const express = require('express')
// const server = express();
// server.use(express.json())
// server.get('/bb',(req,res,next)=>{
//     res.json({
//         name : 'Pyae Sone Aung',
//         age : 20,
//         nickNake : "BigBoss"
//     })    
// });

// server.post('/bb',(req,res,next)=>{
//     res.json({
//         name : 'Antony Santos',
//         age : 22,
//         nickName : 'Killer'
//     })
// })

// server.get('*',(req,res,next)=>{
//     res.send("No Route Found!")
// })

// let users = [
//     { id: 1 ,name : 'pyae sone aung',age : 20},
//     {id: 2,name : 'Antony Santos',age : 22},
//     {id: 3,name : 'Malacia',age : 19}

// ]
// server.get('/users',(req,res,next)=>{
//     res.json(users)
// })

// server.get('/users/:id',(req,res,next)=>{
//     let id = req.params.id;
//     console.log(id);
//     let data = users.find(element => element.id == id)
//     console.log(data);
//     if(data){
//         res.json(data)
//     }else{
//         res.json({message : `No data found at id : ${data}`})
//     }
// })

// server.post('/users',(req,res,next)=>{
//     let id = req.body.id;
//     let name = req.body.name;
//     let age = req.body.age;
//     let newData = {
//         id,
//         name,
//         age,
//     }
//     users.push(newData);
//     res.json(users)
// })

// server.patch('/users/:id',(req,res,next)=>{
//     let id = req.params.id;
//     let editData = users.find(element=>element.id == id)
//     if(editData){
//         editData.name = req.body.name
//         editData.age = req.body.age
//         res.json(users)
//     }else{
//         res.json({message : `User id ${editData} not found`})
//     }
// })

// server.delete('/users/:id',(req,res,next)=>{
//     let id = req.params.id;
//     let user = users.filter(element=> element.id != id);
//     if(user){
//         res.json(user)
//     }else{
//         res.status(200).json({message: `There is no user with id ${id}`})
//     }
// })

// server.get('*',(req,res,next)=>{
//     res.send("No Route Found!")
// })

// server.listen(3000,()=>console.log("server is running at port 3000"));

const express = require('express');
require('dotenv').config();
const server = express();
const fileUpload = require('express-fileupload')
const {saveFile,saveFiles,deleteFile} = require('./utilis/gallery')
const path = require('path')
server.use('/uploads',express.static(path.join(__dirname,'/upload')))
server.use(express.json());
server.use(fileUpload());
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

// const funky = (req,res,next)=>{
//     res.json({ msg : "Comming with get methods"})
// }

// const isLogged = (req,res,next)=>{
//     if(1+1 == 2){
//         next();
//     }else{
//         next(new Error("Your are not loggin,Try again"))
//     }
// }
// const isAdmin = (req,res,next)=>{
//     if(2 ==2){
//         next()
//     }else{
//         next(new Error("Your are not admin,Try again"))
//     }
// }
// server.get('/users',isLogged,isAdmin,funky)

const categoryRoute = require('./routes/category')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const tagRoute = require('./routes/tag')
const commentRoute = require('./routes/comment')
server.use('/category',categoryRoute)
server.use('/users',userRoute);
server.use('/posts',postRoute);
server.use('/tags',tagRoute);
server.use('/comments',commentRoute);

// server.get('/html',(req,res)=>{
//     res.sendFile(__dirname+"/test.html")
// })
// server.post('/gallery',saveFiles,(req,res,next)=>{
//     res.json({ msg : "File Uploaded" , FileName : req.body.images })
// })
// server.post('/gallery',(req,res,next)=>{
//     deleteFile(req.body.fileName)
//     res.json({ msg : "File deleted" , FileName : req.body.fileName })
// })

server.use((err,req,res,next)=>{
    err.status = err.status || 200;
    res.status(err.status).json({
        cons : false,
        msg : err.message
    })
})

server.listen(process.env.PORT,console.log(`Server is running at port ${process.env.PORT}`))