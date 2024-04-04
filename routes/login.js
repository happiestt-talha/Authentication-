const express=require('express')
const {body,validationResult}=require('express-validator')
const router=express.Router()

router.post('/',[],(req,res)=>{
    console.log("Name: ",req.body.name);
    console.log("Password: ",req.body.password);

    res.json({
        msg:"Login Successfull",
        name:req.body.name,
        password:req.body.password
    })
})


module.exports=router