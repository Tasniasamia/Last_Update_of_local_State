const passport=require('passport');
const userModel = require('../module/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect user." });
        }
  
        // Use await with bcrypt.compare
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
  
        return done(null, user);
      } catch (error) {
        if (error) {
          return done(error);
        }
      }
    }
  ));
  

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
