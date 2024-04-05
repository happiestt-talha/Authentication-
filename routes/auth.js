require('dotenv').config()
const express=require('express')
const jwt=require('jsonwebtoken')
const app=express();

app.post('/',(req,res)=>{
    const username=req.body.username;

    //? serialize user with using a secret key REQUIRED
    const user={name:username}

        //?sign the created user
    const accessToken= jwt.sign(user,process.env.PRIVATE_ACCESS_TOKEN)
    res.json({accessToken:accessToken})
// res.json({name:user.name})
})

module.exports=app