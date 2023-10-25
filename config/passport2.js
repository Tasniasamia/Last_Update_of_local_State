const passport = require('passport');
const userModel2 = require('../module/userModel2');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/user/route/auth/google/callback"
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const user = await userModel2.findOne({ googleId: profile.id });
        if (!user) {
            const newUser = new userModel2({
                googleId: profile.id,
                username: profile.displayName
            });
            await newUser.save();
            return cb(null, newUser);
        } else {
            console.log(user);
            return cb(null, user);
        }
    } catch (err) {
        return cb(err, null);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel2.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
