require('dotenv').config()
const mongoose=require('mongoose');


// const dbURL=`mongodb+srv://${process.env.PASSWORD}:${process.env.USER}/Authentication`
const dbURL=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.wuakpfi.mongodb.net/Authentication
`
mongoose.connect(dbURL)
.then(()=>{console.log("mongodb is connected")})
.catch((error)=>{console.log(error)})