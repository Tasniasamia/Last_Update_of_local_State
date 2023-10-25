const express = require('express');
const { getdata, createuser, loginuser, logout,getUser,findUser, loginmiddle, profile, loguser} = require('../controller/useController');
const router = express.Router(); // Change 'route' to 'router'
const passport=require('passport');
router.use(passport.initialize());
router.use(passport.session());
// Your other routes here

router.get('/', getdata);
router.get('/logout', logout);
router.get('/getUser',getUser);
router.get('/login', loguser, loginuser);
router.post('/resister', createuser);
router.get('/profile',profile)
router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/user/route/login",successRedirect:'/user/route/profile'    })
  ); // Export 'router' as 'route'
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));


router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/user/route/login' ,successRedirect:'/user/route/profile'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
  
  );


  module.exports =router;