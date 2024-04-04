const URI="mongodb://localhost:27017/userAuth2"
const mongoose=require('mongoose')
const connectToMongo=async ()=>{
    try{
        mongoose.connect(URI);
        console.log("connected To Database...");
    }catch(err){
        console.log("Error at connecting Database",err);
    }
}

module.exports=connectToMongo