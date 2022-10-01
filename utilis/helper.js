const bcrypt = require('bcryptjs')
const { json } = require('express')
const jwt = require('jsonwebtoken')

const fMsg = async(res,msg,result=[])=>{
    res.status(200).json({
        con : true,
        msg,
        result,
    })
}

module.exports = {
    encode : password => bcrypt.hashSync(password),
    comparePass : (plain,hash)=>bcrypt.compareSync(plain,hash),
    makeToken : payload =>jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"}) ,
    fMsg,
}