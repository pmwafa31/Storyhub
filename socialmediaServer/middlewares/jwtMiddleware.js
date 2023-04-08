const jwt = require('jsonwebtoken') //import json web token


//token verify middleware
const jwtMiddleware = (req,res,next) =>{
    //get token from request headers
    const token = req.headers.authorization
    try{
        //verify token
        const verify_token = jwt.verify(token,'secretsuperkey')
        // req.frmAcno = verify_token.currentAcno
        next()
    }
    catch{
        res.status(401).json({
            message:'Invalid user'
        })
    }
}

module.exports={
    jwtMiddleware
}