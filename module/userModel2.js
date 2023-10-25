const mongoose=require('mongoose');


const googleSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    googleId:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("googleUser",googleSchema)