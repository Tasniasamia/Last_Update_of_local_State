const userModel = require("../module/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport=require('passport');
const getdata=(req,res,next)=>{
    try{

        res.render('index')
    }
    catch(error){
        next(error)
    }
}
const getUser=(req,res,next)=>{
    res.render('resister');
};
const findUser=(req,res,next)=>{
    res.render('login');
}
const createuser=async(req,res,next)=>{
    try{
        // res.render('resister');
        const user=await userModel.findOne({email:req.body.email});
        if(user){
            return res.send("user Already exists")
        }
        bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
            const NewUser=new userModel({
                username:req.body.username,
                email:req.body.email,
                password:hash
            })
            await NewUser.save()
            res.redirect('/user/route/login')

        });

      
    }
    catch(error){
        next(error)
    }
}
const loginmiddle = passport.authenticate('local', {
    failureRedirect: '/user/route/login',
    successRedirect: '/user/route',
});




const loguser=(req,res,next)=>{
    
if(req.isAuthenticated()){
    res.redirect('/user/route/profile')
}
next()

    }
    const loginuser = async(req, res, next) => {
        try {
         res.render('login');
    }
        catch (error) {
            next(error);
        }
    }
    const logout=(req,res,next)=>{
        try{
            res.render('index');
            req.logout((err)=>{
                if(err){
                  return  next(err)
                }
                return res.redirect('/user/route/')
            })
        }
        catch(error){
          return  next(error)
        }
    }
    const profile = (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                res.render('profile',{username:req.body.username});
            } else {
                res.redirect('/user/route/login');
            }
        } catch (error) {
            next(error);
        }
    }
    

module.exports={getdata,createuser,loginuser,logout,getUser,findUser,loguser,loginmiddle,profile}