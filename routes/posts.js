const express =require('express');
const router=express();

// router.use(express.json())
const posts={
    1:{
        title:"post 1",
        description:"post 1 description"
    },
    2:{
        title:"post 2",
        description:"post 2 description"
    }
}
router.get('/',(req,res)=>{
    res.json(posts)
})

module.exports=router