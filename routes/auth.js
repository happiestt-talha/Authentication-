require('dotenv').config()
const express=require('express')
const jwt=require('jsonwebtoken')
const app=express();
const posts=[
    {
        username:'talha',
        msg:'hi talha'
    },
    {
        username:'ali',
        msg:'hi ali'
    },
    {
        username:'ahmad',
        msg:'hi ahmad'
    },
    {
        username:'noone',
        msg:'hi noone'
    }
]
app.post('/',authenticateToken,(req,res)=>{
    const username=req.body.username;

    //? serialize user with using a secret key REQUIRED
    const user={name:username}

        //?sign the created user
    const accessToken= jwt.sign(user,process.env.PRIVATE_ACCESS_TOKEN)
    res.json(user)
    
})

function authenticateToken(req,res,next){

    //! get and verify existance the token from users request
    const authHeader=req.headers['authorization'];
    const token=authHeader?.split(' ')[1];
    if(token===null) res.sendStatus(401)

    //! now we know user have a token
    jwt.verify(token,process.env.PRIVATE_ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user=user;
        next();
    })
    
}
module.exports=app